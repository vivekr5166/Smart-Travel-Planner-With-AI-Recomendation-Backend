function generatePrompt(template, variables) {
    return template.replace(/{{(.*?)}}/g, (_, key) => {
        return variables[key.trim()] || "";
    });
}

module.exports = generatePrompt;
