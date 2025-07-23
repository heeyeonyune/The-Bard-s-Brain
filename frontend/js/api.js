// The Bard's Brain - API Communication Module

/**
 * Check if the backend server is available
 * @returns {Promise<boolean>} True if backend is connected
 */
async function checkBackendConnection() {
    console.log('Checking backend connection...');
    try {
        const response = await fetch(`${CONFIG.BACKEND_BASE_URL}/health`);
        console.log('Backend connection response:', response.status, response.ok);
        return response.ok;
    } catch (error) {
        console.warn('Backend not available:', error);
        return false;
    }
}

/**
 * Make a request to the backend API
 * @param {string} endpoint - API endpoint path
 * @param {Object} payload - Request payload
 * @returns {Promise<Object>} API response
 */
async function callBackendApi(endpoint, payload) {
    console.log(`Making API call to: ${CONFIG.BACKEND_BASE_URL}${endpoint}`, payload);
    try {
        const response = await fetch(`${CONFIG.BACKEND_BASE_URL}${endpoint}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        });
        
        console.log(`API response status: ${response.status}`);
        
        if (!response.ok) {
            const errorText = await response.text();
            console.error("Backend API call failed:", response.status, errorText);
            throw new Error(`Backend request failed with status ${response.status}: ${errorText}`);
        }
        
        const result = await response.json();
        console.log('API call successful:', result);
        return result;
    } catch (error) {
        console.error('API call error:', error);
        if (error.name === 'TypeError' && error.message.includes('fetch')) {
            throw new Error('Cannot connect to backend server. Please ensure the backend is running on localhost:8000');
        }
        throw error;
    }
}

/**
 * Generate world description using backend API
 * @param {Object} worldInfo - World information object
 * @returns {Promise<Object>} World generation response
 */
async function generateWorldDescription(worldInfo) {
    return await callBackendApi(CONFIG.API_ENDPOINTS.WORLD_GENERATE, {
        name: worldInfo.name,
        geography: worldInfo.geography,
        magic_systems: worldInfo.magic_systems,
        lore: worldInfo.lore,
        other: worldInfo.other
    });
}

/**
 * Generate world image using backend API
 * @param {string} visualPrompt - Image generation prompt
 * @returns {Promise<Object>} Image generation response
 */
async function generateWorldImage(visualPrompt) {
    return await callBackendApi(CONFIG.API_ENDPOINTS.WORLD_VISUALIZE, {
        visual_prompt: `fantasy art, dungeons and dragons style. ${visualPrompt}`
    });
}

/**
 * Generate character description using backend API
 * @param {Object} characterInfo - Character information object
 * @returns {Promise<Object>} Character generation response
 */
async function generateCharacterDescription(characterInfo) {
    return await callBackendApi(CONFIG.API_ENDPOINTS.CHARACTER_GENERATE, {
        name: characterInfo.name,
        race: characterInfo.race,
        characteristics: characterInfo.characteristics,
        visual_description: characterInfo.visual_description,
        backstory: characterInfo.backstory,
        world_context: characterInfo.world_context,
        world_id: characterInfo.world_id
    });
}

/**
 * Generate character image using backend API
 * @param {string} visualPrompt - Image generation prompt
 * @returns {Promise<Object>} Image generation response
 */
async function generateCharacterImage(visualPrompt) {
    return await callBackendApi(CONFIG.API_ENDPOINTS.CHARACTER_VISUALIZE, {
        visual_prompt: `fantasy art, dungeons and dragons style. ${visualPrompt}`
    });
} 