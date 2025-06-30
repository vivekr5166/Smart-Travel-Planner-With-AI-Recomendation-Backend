const ItineraryModel = require("../model/Itinerary");
const PromptTemplate = require("../model/PromptTemplate");
const generatePrompt = require("../Utility function/promptGenerator");

// Retry function
const fetchWithRetry = async (url, options, retries = 3, delay = 2000) => {
    for (let i = 0; i < retries; i++) {
        const response = await fetch(url, options);
        const result = await response.json();

        if (result.candidates) {
            return result;
        }

        // Retry if model is overloaded
        if (result.error?.status === "UNAVAILABLE") {
            console.warn(`Model overloaded. Retrying ${i + 1}/${retries}...`);
            await new Promise(res => setTimeout(res, delay));
        } else {
            throw new Error(result.error?.message || "Unknown error from Gemini API");
        }
    }
    throw new Error("Model overloaded even after retries");
};

const travelPlanner = async (req, res) => {
    try {
        console.log(req.body);
        const { venue, day, total_people } = req.body;

        if (!venue || !day || !total_people) {
            return res.status(400).json({
                message: "Please provide venue, day, and total_people",
                success: false
            });
        }

        // Fetch prompt template from DB
        const promptDoc = await PromptTemplate.findOne({ name: "travel-itinerary" });
        if (!promptDoc) {
            return res.status(500).json({ message: "Prompt template not found", success: false });
        }

        // Replace placeholders in prompt
        const prompt = generatePrompt(promptDoc.template, { day, total_people, venue });
        console.log("Generated Prompt: \n", prompt);

        const payload = {
            contents: [
                {
                    parts: [
                        { text: prompt }
                    ]
                }
            ]
        };

        const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${process.env.GEMINI_API_KEY}`;
        const options = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        };

        const result = await fetchWithRetry(url, options, 3, 2000);

        const text = result.candidates[0].content.parts[0].text.trim();
        const startIndex = text.indexOf('{');
        const endIndex = text.lastIndexOf('}');
        const jsonString = text.substring(startIndex, endIndex + 1);

        const itineraryData = JSON.parse(jsonString);

        // Save to MongoDB
        const newItinerary = new ItineraryModel({
            venue,
            day_count: day,
            total_people,
            ...itineraryData
        });

        await newItinerary.save();

        return res.status(200).json({
            message: "Itinerary generated and saved successfully",
            success: true,
            itinerary: newItinerary
        });

    } catch (err) {
        console.error("Error in travelPlanner:", err);
        return res.status(500).json({
            message: "Failed to generate or save itinerary",
            error: err.message,
            success: false
        });
    }
};



module.exports = travelPlanner;
