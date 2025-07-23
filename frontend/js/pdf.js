// The Bard's Brain - PDF Export Module

/**
 * Show feedback message to user
 * @param {string} message - Message to display
 */
function showFeedback(message) {
    let feedbackEl = document.getElementById('pdf-feedback');
    if (!feedbackEl) {
        feedbackEl = document.createElement('div');
        feedbackEl.id = 'pdf-feedback';
        feedbackEl.className = 'pdf-feedback';
        document.body.appendChild(feedbackEl);
    }
    feedbackEl.textContent = message;
    feedbackEl.classList.remove('hidden');
}

/**
 * Hide feedback message
 */
function hideFeedback() {
    let feedbackEl = document.getElementById('pdf-feedback');
    if(feedbackEl) feedbackEl.classList.add('hidden');
}

/**
 * Capture HTML element as canvas
 * @param {HTMLElement} element - Element to capture
 * @returns {Promise<HTMLCanvasElement>} Canvas element
 */
async function captureElementAsCanvas(element) {
    return await html2canvas(element, EXPORT_CONFIG.CANVAS_OPTIONS);
}

/**
 * Add image to PDF
 * @param {jsPDF} pdf - PDF document instance
 * @param {HTMLCanvasElement} canvas - Canvas element to add
 */
function addImageToPDF(pdf, canvas) {
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const imgData = canvas.toDataURL('image/png');
    const imgProps = pdf.getImageProperties(imgData);
    const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
    pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
}

/**
 * Export world and character content to PDF
 */
async function exportToPDF() {
    const { jsPDF } = window.jspdf;
    const pdf = new jsPDF(EXPORT_CONFIG.PDF_OPTIONS);
    
    const worldContentEl = worldUI.displayContent;
    const charContentEl = charUI.displayContent;

    // Temporarily make screens visible for capturing
    worldContentEl.style.display = 'block';
    charContentEl.style.display = 'block';

    showFeedback('Preparing your PDF. This may take a moment...');

    try {
        // Use a short timeout to allow the browser to render the elements before capture
        await new Promise(resolve => setTimeout(resolve, 100));

        // Capture world content
        const worldCanvas = await captureElementAsCanvas(worldContentEl);
        addImageToPDF(pdf, worldCanvas);

        // Add character content to new page
        pdf.addPage();
        const charCanvas = await captureElementAsCanvas(charContentEl);
        addImageToPDF(pdf, charCanvas);

        // Save the PDF
        pdf.save(EXPORT_CONFIG.PDF_FILENAME);
        showFeedback('PDF downloaded!');
        
    } catch (e) {
        console.error("Error creating PDF:", e);
        showFeedback("Sorry, there was an error creating the PDF.");
    } finally {
        // Hide the elements again
        worldContentEl.style.display = 'none';
        charContentEl.style.display = 'none';
        navigateTo(UI_IDS.SCREENS.SCREEN5); // Go back to final screen
        setTimeout(hideFeedback, 3000);
    }
} 