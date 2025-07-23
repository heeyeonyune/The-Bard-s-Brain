// The Bard's Brain - Configuration

// Backend Configuration
const CONFIG = {
    BACKEND_BASE_URL: 'http://localhost:8000',
    API_ENDPOINTS: {
        WORLD_GENERATE: '/api/world/generate',
        WORLD_VISUALIZE: '/api/world/visualize',
        CHARACTER_GENERATE: '/api/character/generate',
        CHARACTER_VISUALIZE: '/api/character/visualize'
    }
};

// Default prompts
const PROMPTS = {
    RANDOM_WORLD: "Generate a completely random, unique, and interesting fantasy world for a Dungeons & Dragons campaign. Include a name, a brief overview of its geography, dominant races, a key historical event, and a unique magical phenomenon.",
    DEFAULT_CHARACTER: "any characters will do, surprise me"
};

// UI Element IDs
const UI_IDS = {
    SCREENS: {
        SCREEN1: 'screen1',
        SCREEN2: 'screen2',
        SCREEN3: 'screen3',
        SCREEN4: 'screen4',
        SCREEN5: 'screen5'
    },
    WORLD: {
        CONTENT: 'world-content',
        NAME: 'world-name',
        DESCRIPTION: 'world-description',
        GALLERY: 'image-gallery',
        GALLERY_TITLE: 'world-gallery-title',
        LOADER: 'loading-indicator-world',
        CHAR_GEN_BTN: 'character-generation-btn',
        DISPLAY_CONTENT: 'world-display-content'
    },
    CHARACTER: {
        CONTENT: 'character-content',
        LIST: 'character-list',
        GALLERY: 'character-image-gallery',
        LOADER: 'loading-indicator-char',
        EXPORT_BTN: 'export-pdf-btn',
        DISPLAY_CONTENT: 'character-display-content'
    },
    INPUTS: {
        WORLD_PROMPT: 'world-prompt',
        CHAR_COUNT: 'char-count',
        CHAR_WORLD_PROMPT: 'char-world-prompt',
        CHAR_DETAILS_PROMPT: 'char-details-prompt'
    },
    BUTTONS: {
        START_GENERATION: 'start-generation-btn',
        GENERATE_WORLD: 'generate-world-btn',
        RANDOMIZE_WORLD: 'randomize-world-btn',
        SKIP_WORLD: 'skip-world-btn',
        GENERATE_CHARS: 'generate-chars-btn',
        SKIP_CHARS: 'skip-chars-btn'
    },
    STATUS: {
        CONNECTION_STATUS: 'connection-status',
        STATUS_TEXT: 'status-text'
    }
};

// Character parsing keywords
const CHARACTER_KEYWORDS = {
    RACES: ['dwarf', 'elf', 'human', 'orc', 'halfling', 'dragonborn', 'tiefling', 'gnome', 'half-elf', 'half-orc'],
    CLASSES: ['fighter', 'wizard', 'rogue', 'cleric', 'paladin', 'ranger', 'barbarian', 'bard', 'druid', 'monk', 'sorcerer', 'warlock']
};

// World parsing keywords
const WORLD_KEYWORDS = {
    GEOGRAPHY: ['mountain', 'forest', 'river', 'ocean', 'desert', 'plains', 'valley', 'island'],
    RACES: ['dwarf', 'elf', 'human', 'orc', 'halfling', 'dragonborn', 'tiefling', 'gnome']
};

// Export configuration
const EXPORT_CONFIG = {
    PDF_FILENAME: 'The-Bards-Brain-Generation.pdf',
    PDF_OPTIONS: {
        orientation: 'p',
        unit: 'px',
        format: 'a4',
        putOnlyUsedFonts: true,
        floatPrecision: 16
    },
    CANVAS_OPTIONS: {
        scale: 2,
        useCORS: true,
        backgroundColor: '#6d6a5f'
    }
}; 