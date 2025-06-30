const mongoose = require("mongoose");

const promptTemplateSchema = new mongoose.Schema({
    name: { type: String, required: true, unique: true },
    description: String,
    template: { type: String, required: true },
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("PromptTemplate", promptTemplateSchema);
