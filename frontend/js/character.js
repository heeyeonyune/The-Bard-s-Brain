// The Bard's Brain - Character Generation Module

/**
 * Parse character profile into structured data
 * @param {string} profile - Character profile text from backend
 * @param {number} index - Character index number
 * @returns {Object} Structured character data
 */
function parseCharacterProfile(profile, index) {
    // Default character structure
    let character = {
        name: `Character ${index}`,
        race: "Unknown",
        characterClass: "Adventurer",
        description: profile,
        visuals: "A fantasy character"
    };
    
    // Try to extract name
    const nameMatch = profile.match(/(?:Name|Called):\s*([A-Z][a-zA-Z\s]+)/i);
    if (nameMatch) {
        character.name = nameMatch[1].trim();
    }
    
    // Try to extract race
    for (const race of CHARACTER_KEYWORDS.RACES) {
        if (profile.toLowerCase().includes(race)) {
            character.race = race.charAt(0).toUpperCase() + race.slice(1);
            break;
        }
    }
    
    // Try to extract class
    for (const charClass of CHARACTER_KEYWORDS.CLASSES) {
        if (profile.toLowerCase().includes(charClass)) {
            character.characterClass = charClass.charAt(0).toUpperCase() + charClass.slice(1);
            break;
        }
    }
    
    // Extract visual description
    const visualMatch = profile.match(/(?:appears|looks|visual|appearance):\s*([^.]+)/i);
    if (visualMatch) {
        character.visuals = visualMatch[1].trim();
    }
    
    return character;
}

/**
 * Generate character descriptions using backend API
 * @param {string} worldDesc - World description context
 * @param {string} charDetails - Character details from user
 * @param {number} charCount - Number of characters to generate
 * @returns {Promise<Array>} Array of character objects
 */
async function generateCharacterDescriptions(worldDesc, charDetails, charCount) {
    const characters = [];
    
    for (let i = 0; i < charCount; i++) {
        // Call backend character generation API
        const response = await generateCharacterDescription({
            name: `Character ${i + 1}`,
            race: "Unknown",
            characteristics: charDetails,
            visual_description: "Fantasy character",
            backstory: "To be generated",
            world_context: worldDesc.substring(0, 800),
            world_id: null
        });
        
        // Parse the character profile to extract structured data
        const character = parseCharacterProfile(response.profile, i + 1);
        characters.push(character);
    }
    
    return characters;
}

/**
 * Generate and display character images
 * @param {Array} characters - Array of character objects
 * @param {HTMLElement} gallery - Gallery element to display images
 */
async function generateCharacterImages(characters, gallery) {
    for (const char of characters) {
        const imagePrompt = `${char.visuals}, ${char.name} the ${char.race} ${char.characterClass}`;
        await generateAndDisplayCharacterImage(imagePrompt, gallery);
    }
}

/**
 * Generate and display a character image
 * @param {string} prompt - Image generation prompt
 * @param {HTMLElement} gallery - Gallery element to display image
 */
async function generateAndDisplayCharacterImage(prompt, gallery) {
    const placeholder = createImagePlaceholder(gallery);

    try {
        const response = await generateCharacterImage(prompt);
        const imageUrl = `data:image/png;base64,${response.image_data}`;
        const img = displayImage(imageUrl, prompt, gallery);
        placeholder.replaceWith(img);
    } catch(error) {
        console.error('Character image generation error:', error);
        placeholder.innerHTML = '<p class="text-xs text-center p-2">Image failed</p>';
    }
}

/**
 * Main character generation function
 * @param {string} worldDesc - World description context
 * @param {string} charDetails - Character details from user
 * @param {number} charCount - Number of characters to generate
 */
async function generateCharacters(worldDesc, charDetails, charCount) {
    navigateTo(UI_IDS.SCREENS.SCREEN5);
    showCharacterLoading();
    
    try {
        // Generate character descriptions using backend
        const characters = await generateCharacterDescriptions(worldDesc, charDetails, charCount);
        
        hideCharacterLoading();
        
        // Display characters and generate images
        for (const char of characters) {
            displayCharacter(char);
        }
        
        await generateCharacterImages(characters, charUI.gallery);

    } catch (error) {
        console.error("Error generating characters:", error);
        showCharacterError("The Bard is struggling to imagine your characters. An error occurred. Please try again.");
    }
} 