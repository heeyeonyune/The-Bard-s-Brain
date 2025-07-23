// The Bard's Brain - World Generation Module

/**
 * Parse world prompt into structured data for backend API
 * @param {string} prompt - User input prompt
 * @returns {Object} Structured world information
 */
function parseWorldPrompt(prompt) {
    // Default values for random generation
    let worldInfo = {
        name: "Random World",
        geography: "A diverse landscape with mountains, forests, and rivers",
        magic_systems: "Various forms of magic exist in this world",
        lore: "A world with rich history and ancient secrets",
        other: prompt
    };
    
    // If it's a user prompt, try to extract structured information
    if (prompt && prompt.trim()) {
        worldInfo.other = prompt;
        
        // Try to extract name if it's mentioned
        const nameMatch = prompt.match(/(?:named|called|known as)\s+([A-Z][a-zA-Z\s]+)/i);
        if (nameMatch) {
            worldInfo.name = nameMatch[1].trim();
        }
        
        // Extract geography mentions
        const geoMentions = WORLD_KEYWORDS.GEOGRAPHY.filter(keyword => 
            prompt.toLowerCase().includes(keyword)
        );
        if (geoMentions.length > 0) {
            worldInfo.geography = `Features include ${geoMentions.join(', ')}`;
        }
        
        // Extract race mentions
        const raceMentions = WORLD_KEYWORDS.RACES.filter(race => 
            prompt.toLowerCase().includes(race)
        );
        if (raceMentions.length > 0) {
            worldInfo.lore = `Inhabited by ${raceMentions.join('s, ')}s`;
        }
    }
    
    return worldInfo;
}

/**
 * Generate world images and display them
 * @param {string} worldName - Name of the world
 * @param {HTMLElement} gallery - Gallery element to display images
 */
async function generateWorldImages(worldName, gallery) {
    const imagePrompts = [
        `A breathtaking landscape of ${worldName}`,
        `A central city in ${worldName}`,
        `The inhabitants of ${worldName}`,
        `A scene of magic in ${worldName}`
    ];
    
    for (const imagePrompt of imagePrompts) {
        await generateAndDisplayWorldImage(imagePrompt, gallery);
    }
}

/**
 * Generate and display a world image
 * @param {string} prompt - Image generation prompt
 * @param {HTMLElement} gallery - Gallery element to display image
 */
async function generateAndDisplayWorldImage(prompt, gallery) {
    const placeholder = createImagePlaceholder(gallery);

    try {
        const response = await generateWorldImage(prompt);
        const imageUrl = `data:image/png;base64,${response.image_data}`;
        const img = displayImage(imageUrl, prompt, gallery);
        placeholder.replaceWith(img);
    } catch(error) {
        console.error('World image generation error:', error);
        placeholder.innerHTML = '<p class="text-xs text-center p-2">Image failed</p>';
    }
}

/**
 * Main world generation function
 * @param {string} prompt - User input prompt
 * @param {string} generationType - Type of generation (user/random)
 */
async function generateWorld(prompt, generationType) {
    console.log('Starting world generation:', { prompt, generationType });
    navigateTo(UI_IDS.SCREENS.SCREEN3);
    showWorldLoading();

    try {
        // Parse the prompt to extract world information
        const worldInfo = parseWorldPrompt(prompt);
        console.log('Parsed world info:', worldInfo);
        
        // Call backend world generation API
        console.log('Calling backend world generation API...');
        const worldResponse = await generateWorldDescription(worldInfo);
        console.log('World generation response:', worldResponse);
        
        const worldDescription = worldResponse.description;
        const worldId = worldResponse.world_id;
        
        // Extract world name from description (first line)
        const lines = worldDescription.split('\n');
        const worldName = lines[0].replace(/\*\*|Name:/g, '').trim();
        const worldDescriptionText = lines.slice(1).join('\n').trim();

        // Display world information
        displayWorld(worldName, worldDescriptionText, generationType);
        hideWorldLoading();
        
        // Generate world images
        console.log('Starting world image generation...');
        await generateWorldImages(worldName, worldUI.gallery);
        
    } catch (error) {
        console.error("Error generating world:", error);
        showWorldError("The Bard seems to be sleeping... An error occurred. Please try again.");
    }
} 