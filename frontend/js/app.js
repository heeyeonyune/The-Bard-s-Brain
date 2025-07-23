// The Bard's Brain - Main Application Module

/**
 * Initialize the application
 */
async function initializeApp() {
    console.log('Initializing application...');
    try {
        // Initialize UI elements
        initializeUIElements();
        
        // Configure markdown parsing
        configureMarkdown();
        
        // Check backend connection
        console.log('Checking backend connection...');
        const isConnected = await checkBackendConnection();
        console.log('Backend connection result:', isConnected);
        showConnectionStatus(isConnected);
        
        console.log('Application initialized successfully');
    } catch (error) {
        console.error('Error initializing application:', error);
    }
}

/**
 * Set up all event listeners
 */
function setupEventListeners() {
    console.log('Setting up event listeners...');
    
    try {
        // Navigation buttons
        const startBtn = document.getElementById(UI_IDS.BUTTONS.START_GENERATION);
        console.log('Start button:', startBtn);
        if (startBtn) {
            startBtn.addEventListener('click', () => {
                console.log('Start button clicked');
                navigateTo(UI_IDS.SCREENS.SCREEN2);
            });
        } else {
            console.error('Start button not found!');
        }
        
        // World generation buttons
        const generateWorldBtn = document.getElementById(UI_IDS.BUTTONS.GENERATE_WORLD);
        console.log('Generate world button:', generateWorldBtn);
        if (generateWorldBtn) {
            generateWorldBtn.addEventListener('click', () => {
                console.log('Generate world button clicked');
                const { worldPrompt } = getInputValues();
                console.log('World prompt:', worldPrompt);
                generateWorld(worldPrompt, 'user');
            });
        } else {
            console.error('Generate world button not found!');
        }
        
        const randomizeWorldBtn = document.getElementById(UI_IDS.BUTTONS.RANDOMIZE_WORLD);
        console.log('Randomize world button:', randomizeWorldBtn);
        if (randomizeWorldBtn) {
            randomizeWorldBtn.addEventListener('click', () => {
                console.log('Randomize world button clicked');
                generateWorld(PROMPTS.RANDOM_WORLD, 'random');
            });
        } else {
            console.error('Randomize world button not found!');
        }
        
        const skipWorldBtn = document.getElementById(UI_IDS.BUTTONS.SKIP_WORLD);
        console.log('Skip world button:', skipWorldBtn);
        if (skipWorldBtn) {
            skipWorldBtn.addEventListener('click', () => {
                console.log('Skip world button clicked');
                generateWorld(PROMPTS.RANDOM_WORLD, 'random');
            });
        } else {
            console.error('Skip world button not found!');
        }

        // Character generation navigation
        console.log('Character gen button:', worldUI.char_gen_btn);
        if (worldUI.char_gen_btn) {
            worldUI.char_gen_btn.addEventListener('click', () => {
                console.log('Character gen button clicked');
                setCharacterWorldPrompt();
                navigateTo(UI_IDS.SCREENS.SCREEN4);
            });
        } else {
            console.error('Character gen button not found!');
        }

        // Character generation buttons
        const generateCharsBtn = document.getElementById(UI_IDS.BUTTONS.GENERATE_CHARS);
        console.log('Generate chars button:', generateCharsBtn);
        if (generateCharsBtn) {
            generateCharsBtn.addEventListener('click', () => {
                console.log('Generate chars button clicked');
                const { charWorldPrompt, charDetailsPrompt, charCount } = getInputValues();
                console.log('Character inputs:', { charWorldPrompt, charDetailsPrompt, charCount });
                generateCharacters(charWorldPrompt, charDetailsPrompt, charCount);
            });
        } else {
            console.error('Generate chars button not found!');
        }

        const skipCharsBtn = document.getElementById(UI_IDS.BUTTONS.SKIP_CHARS);
        console.log('Skip chars button:', skipCharsBtn);
        if (skipCharsBtn) {
            skipCharsBtn.addEventListener('click', () => {
                console.log('Skip chars button clicked');
                const { charWorldPrompt, charCount } = getInputValues();
                generateCharacters(charWorldPrompt, PROMPTS.DEFAULT_CHARACTER, charCount);
            });
        } else {
            console.error('Skip chars button not found!');
        }

        // PDF export
        console.log('Export button:', charUI.export_btn);
        if (charUI.export_btn) {
            charUI.export_btn.addEventListener('click', () => {
                console.log('Export button clicked');
                exportToPDF();
            });
        } else {
            console.error('Export button not found!');
        }
        
        console.log('Event listeners set up successfully');
    } catch (error) {
        console.error('Error setting up event listeners:', error);
    }
}

/**
 * Main application entry point
 */
function main() {
    console.log('Main function called');
    // Initialize the app when DOM is loaded
    document.addEventListener('DOMContentLoaded', async () => {
        console.log('DOM content loaded');
        try {
            await initializeApp();
            setupEventListeners();
            console.log('Application setup complete');
        } catch (error) {
            console.error('Error in main application setup:', error);
        }
    });
}

// Start the application
main(); 