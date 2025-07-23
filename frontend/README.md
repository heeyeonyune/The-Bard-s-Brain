# The Bard's Brain - Frontend

This directory contains the modular frontend application for The Bard's Brain world and character generator.

## File Structure

```
frontend/
├── index.html              # Main HTML file (clean and minimal)
├── styles/
│   └── main.css           # All application styles
├── js/
│   ├── config.js          # Configuration and constants
│   ├── api.js             # Backend API communication
│   ├── ui.js              # UI management and navigation
│   ├── world.js           # World generation logic
│   ├── character.js       # Character generation logic
│   ├── pdf.js             # PDF export functionality
│   └── app.js             # Main application initialization
└── README.md              # This file
```

## Module Overview

### `index.html`
- Clean, semantic HTML structure
- References external libraries (Tailwind CSS, jsPDF, html2canvas)
- Loads all modular JavaScript files in the correct order

### `styles/main.css`
- All application-specific styles
- Responsive design improvements
- Connection status indicators
- Screen transitions and animations

### `js/config.js`
- Backend configuration (URLs, endpoints)
- UI element IDs and constants
- Default prompts and keywords
- Export configuration

### `js/api.js`
- Backend connection checking
- API communication functions
- Error handling for network requests
- Specific API functions for world and character generation

### `js/ui.js`
- DOM element management
- Screen navigation
- Loading states and error display
- Image display and placeholder creation
- Input value management

### `js/world.js`
- World prompt parsing
- World generation workflow
- World image generation
- Integration with backend world API

### `js/character.js`
- Character profile parsing
- Character generation workflow
- Character image generation
- Integration with backend character API

### `js/pdf.js`
- PDF export functionality
- Canvas capture and processing
- User feedback during export
- Error handling for PDF generation

### `js/app.js`
- Application initialization
- Event listener setup
- Main application entry point
- Module coordination

## Benefits of Modular Structure

1. **Maintainability**: Each module has a single responsibility
2. **Readability**: Code is organized by functionality
3. **Reusability**: Functions can be easily reused across modules
4. **Debugging**: Easier to locate and fix issues
5. **Testing**: Individual modules can be tested in isolation
6. **Scalability**: Easy to add new features or modify existing ones

## Development Workflow

1. **Adding New Features**:
   - Identify the appropriate module for the feature
   - Add the functionality to that module
   - Update `config.js` if new constants are needed
   - Update `app.js` if new event listeners are required

2. **Modifying Existing Features**:
   - Locate the relevant module
   - Make changes within that module
   - Update related modules if necessary

3. **Styling Changes**:
   - Modify `styles/main.css`
   - Use Tailwind CSS classes in HTML for quick styling

## Dependencies

- **Tailwind CSS**: Utility-first CSS framework
- **jsPDF**: PDF generation library
- **html2canvas**: HTML to canvas conversion
- **Google Fonts**: IM Fell English SC font

## Browser Compatibility

The application is designed to work with modern browsers that support:
- ES6+ JavaScript features
- Fetch API
- CSS Grid and Flexbox
- Async/await syntax

## Performance Considerations

- JavaScript files are loaded in dependency order
- CSS is externalized for better caching
- Images are loaded asynchronously
- PDF generation uses efficient canvas capture

## Integration with Backend

The frontend communicates with the backend through REST API endpoints:
- World generation: `/api/world/generate`
- World visualization: `/api/world/visualize`
- Character generation: `/api/character/generate`
- Character visualization: `/api/character/visualize`

All API communication is handled in the `api.js` module with proper error handling and user feedback. 