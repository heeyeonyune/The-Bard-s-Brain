// The Bard's Brain - UI Management Module

// Global state
let worldDescriptionForCharGen = '';

// DOM element references
const screens = {};
const worldUI = {};
const charUI = {};

/**
 * Configure marked.js for markdown parsing
 */
function configureMarkdown() {
    marked.setOptions({
        breaks: true,
        gfm: true,
        headerIds: false,
        mangle: false
    });
}

/**
 * Render markdown content to HTML
 * @param {string} markdownText - Markdown text to render
 * @returns {string} Rendered HTML
 */
function renderMarkdown(markdownText) {
    if (!markdownText) return '';
    try {
        return marked.parse(markdownText);
    } catch (error) {
        console.error('Markdown parsing error:', error);
        return markdownText; // Fallback to plain text
    }
}

/**
 * Initialize DOM element references
 */
function initializeUIElements() {
    console.log('Initializing UI elements...');
    
    // Initialize screen references
    Object.values(UI_IDS.SCREENS).forEach(screenId => {
        screens[screenId] = document.getElementById(screenId);
        console.log(`Screen ${screenId}:`, screens[screenId]);
    });

    // Initialize world UI references
    Object.entries(UI_IDS.WORLD).forEach(([key, id]) => {
        const element = document.getElementById(id);
        worldUI[key.toLowerCase()] = element;
        console.log(`World UI ${key.toLowerCase()}:`, element);
    });

    // Initialize character UI references
    Object.entries(UI_IDS.CHARACTER).forEach(([key, id]) => {
        const element = document.getElementById(id);
        charUI[key.toLowerCase()] = element;
        console.log(`Character UI ${key.toLowerCase()}:`, element);
    });
    
    console.log('UI elements initialized:', { worldUI, charUI });
}

/**
 * Navigate to a specific screen
 * @param {string} screenName - Name of the screen to navigate to
 */
function navigateTo(screenName) {
    Object.values(screens).forEach(s => s.classList.add('hidden'));
    screens[screenName].classList.remove('hidden');
}

/**
 * Show connection status indicator
 * @param {boolean} isConnected - Whether backend is connected
 */
function showConnectionStatus(isConnected) {
    const connectionStatus = document.getElementById(UI_IDS.STATUS.CONNECTION_STATUS);
    const statusText = document.getElementById(UI_IDS.STATUS.STATUS_TEXT);
    
    if (isConnected) {
        connectionStatus.className = 'connection-status connected';
        statusText.textContent = '✓ Backend connected';
    } else {
        connectionStatus.className = 'connection-status disconnected';
        statusText.textContent = '⚠ Backend not available - Please start the backend server';
    }
    
    connectionStatus.classList.remove('hidden');
}

/**
 * Show loading state for world generation
 */
function showWorldLoading() {
    worldUI.loader.classList.remove('hidden');
    worldUI.content.classList.add('hidden');
    worldUI.char_gen_btn.classList.add('hidden');
    worldUI.gallery.innerHTML = '';
}

/**
 * Hide loading state for world generation
 */
function hideWorldLoading() {
    worldUI.loader.classList.add('hidden');
    worldUI.content.classList.remove('hidden');
    worldUI.char_gen_btn.classList.remove('hidden');
}

/**
 * Show loading state for character generation
 */
function showCharacterLoading() {
    charUI.loader.classList.remove('hidden');
    charUI.content.classList.add('hidden');
    charUI.export_btn.classList.add('hidden');
    charUI.list.innerHTML = '';
    charUI.gallery.innerHTML = '';
}

/**
 * Hide loading state for character generation
 */
function hideCharacterLoading() {
    charUI.loader.classList.add('hidden');
    charUI.content.classList.remove('hidden');
    charUI.export_btn.classList.remove('hidden');
}

/**
 * Display world information in the UI
 * @param {string} worldName - Name of the world
 * @param {string} worldDescription - Description of the world
 * @param {string} generationType - Type of generation (user/random)
 */
function displayWorld(worldName, worldDescription, generationType) {
    worldUI.name.textContent = worldName;
    worldUI.description.innerHTML = renderMarkdown(worldDescription);
    worldUI.description.className = 'markdown-content';
    worldDescriptionForCharGen = `World Name: ${worldName}. World Description: ${worldDescription}`;
    
    // Set gallery title based on generation type
    if (generationType === 'user') {
        worldUI.gallery_title.textContent = "VISIONS OF YOUR WORLD";
    } else {
        worldUI.gallery_title.textContent = "VISIONS OF A RANDOM WORLD";
    }
}

/**
 * Display character information in the UI
 * @param {Object} character - Character object
 */
function displayCharacter(character) {
    const charCard = document.createElement('div');
    charCard.className = 'card p-4 rounded-lg';
    charCard.innerHTML = `
        <h4 class="text-xl font-bold">${character.name}</h4>
        <p class="text-md italic">${character.race} ${character.characterClass}</p>
        <div class="mt-2 text-sm markdown-content">${renderMarkdown(character.description)}</div>
    `;
    charUI.list.appendChild(charCard);
}

/**
 * Create and display an image in a gallery
 * @param {string} imageUrl - Base64 image URL
 * @param {string} altText - Alt text for the image
 * @param {HTMLElement} gallery - Gallery element to append to
 */
function displayImage(imageUrl, altText, gallery) {
    const img = document.createElement('img');
    img.src = imageUrl;
    img.alt = altText;
    img.className = 'w-full h-48 object-cover rounded-lg shadow-md';
    return img;
}

/**
 * Create a loading placeholder for images
 * @param {HTMLElement} gallery - Gallery element to append to
 * @returns {HTMLElement} The placeholder element
 */
function createImagePlaceholder(gallery) {
    const placeholder = document.createElement('div');
    placeholder.className = 'w-full h-48 bg-gray-500/30 rounded-lg flex items-center justify-center';
    placeholder.innerHTML = `<div class="loader"></div>`;
    gallery.appendChild(placeholder);
    return placeholder;
}

/**
 * Show error message in world UI
 * @param {string} message - Error message to display
 */
function showWorldError(message) {
    worldUI.description.innerHTML = renderMarkdown(message);
    worldUI.description.className = 'markdown-content';
    hideWorldLoading();
}

/**
 * Show error message in character UI
 * @param {string} message - Error message to display
 */
function showCharacterError(message) {
    charUI.list.innerHTML = `<div class="text-center md:col-span-2 markdown-content">${renderMarkdown(message)}</div>`;
    hideCharacterLoading();
}

/**
 * Get input values from the UI
 * @returns {Object} Object containing all input values
 */
function getInputValues() {
    return {
        worldPrompt: document.getElementById(UI_IDS.INPUTS.WORLD_PROMPT).value,
        charCount: document.getElementById(UI_IDS.INPUTS.CHAR_COUNT).value,
        charWorldPrompt: document.getElementById(UI_IDS.INPUTS.CHAR_WORLD_PROMPT).value,
        charDetailsPrompt: document.getElementById(UI_IDS.INPUTS.CHAR_DETAILS_PROMPT).value
    };
}

/**
 * Set character world prompt from previous world generation
 */
function setCharacterWorldPrompt() {
    document.getElementById(UI_IDS.INPUTS.CHAR_WORLD_PROMPT).value = worldDescriptionForCharGen;
} 