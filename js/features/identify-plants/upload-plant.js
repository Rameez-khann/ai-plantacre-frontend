// identify-plant.js
// import { uploadAndIdentifyPlant } from "./plant-id.js";
import { displayPlantInfo, hideLoading, showLoading } from "./plant-instructions-page.js";
import { uploadAndIdentifyPlant } from "./plant-id.js";
import { showAlert } from "../../core/alerts.js";
import { getPlantCareInstructions } from "./plant-instructions.js";
import { displayPlantResults } from "./plant-results.js";
// import { getPlantCareInstructions } from "./plant-instructions.js";
// DOM Elements
const uploadZone = document.getElementById('upload-zone');
const fileInput = document.getElementById('plant-input');
const previewContainer = document.getElementById('preview-container');
const submitBtn = document.getElementById('submit-btn');
const clearBtn = document.getElementById('clear-btn');

// State
let selectedFile = null;


/**
 * Validates if the selected file is a valid image
 * @param {File} file - The file to validate
 * @returns {boolean} - True if valid image file
 */
const isValidImageFile = (file) => {
    if (!file) return false;
    
    const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/heic', 'image/webp'];
    const maxSize = 10 * 1024 * 1024; // 10MB
    
    return validTypes.includes(file.type) && file.size <= maxSize;
};

/**
 * Converts a file to base64 string
 * @param {File} file - The file to convert
 * @returns {Promise<string>} - Base64 string of the file
 */
const convertFileToBase64 = (file) => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = (e) => resolve(e.target.result);
        reader.onerror = (error) => reject(error);
        reader.readAsDataURL(file);
    });
};

/**
 * Creates and returns an image preview element
 * @param {string} base64String - Base64 image data
 * @param {string} fileName - Name of the file
 * @returns {HTMLElement} - Image preview container
 */
const createImagePreview = (base64String, fileName) => {
    const container = document.createElement('div');
    container.className = 'image-preview-wrapper';
    
    const img = document.createElement('img');
    img.src = base64String;
    img.alt = 'Plant preview';
    img.className = 'preview-image';
    
    const info = document.createElement('div');
    info.className = 'image-info';
    info.innerHTML = `
        <p><i class="fas fa-image"></i> ${fileName}</p>
        <p><i class="fas fa-check-circle"></i> Ready for identification</p>
    `;
    
    container.appendChild(img);
    container.appendChild(info);
    
    return container;
};

/**
 * Displays the image preview in the UI
 * @param {File} file - The selected file
 */
const displayImagePreview = async (file) => {
    try {
        const base64String = await convertFileToBase64(file);
        const previewElement = createImagePreview(base64String, file.name);
        
        previewContainer.innerHTML = '';
        previewContainer.appendChild(previewElement);
        previewContainer.classList.add('show');
    } catch (error) {
        console.error('Error creating image preview:', error);
        showErrorMessage('Failed to load image preview');
    }
};

/**
 * Shows the action buttons (submit and clear)
 */
const showActionButtons = () => {
    submitBtn.style.display = 'inline-block';
    clearBtn.style.display = 'inline-block';
};

/**
 * Hides the action buttons
 */
const hideActionButtons = () => {
    submitBtn.style.display = 'none';
    clearBtn.style.display = 'none';
};

/**
 * Updates the upload zone UI state
 * @param {boolean} hasImage - Whether an image is selected
 */
const updateUploadZoneState = (hasImage) => {
    if (hasImage) {
        uploadZone.classList.add('has-image');
    } else {
        uploadZone.classList.remove('has-image');
    }
};

/**
 * Shows an error message to the user
 * @param {string} message - Error message to display
 */
const showErrorMessage = (message) => {
    // Create a temporary error message element
    const errorDiv = document.createElement('div');
    errorDiv.className = 'error-message';
    errorDiv.innerHTML = `<i class="fas fa-exclamation-triangle"></i> ${message}`;
    errorDiv.style.cssText = `
        background: #ff6b6b;
        color: white;
        padding: 1rem;
        border-radius: var(--border-radius);
        margin: 1rem 0;
        text-align: center;
        animation: fadeIn 0.3s ease-out;
    `;
    
    previewContainer.innerHTML = '';
    previewContainer.appendChild(errorDiv);
    
    // Remove error message after 5 seconds
    setTimeout(() => {
        if (errorDiv.parentNode) {
            errorDiv.remove();
        }
    }, 5000);
};

/**
 * Handles file selection and validation
 * @param {File} file - The selected file
 */
const handleFileSelection = async (file) => {
    if (!isValidImageFile(file)) {
        showAlert('Please select a valid image file (JPG, PNG, HEIC) under 10MB','error');
        return;
    }
    
    selectedFile = file;
    await displayImagePreview(file);
    updateUploadZoneState(true);
    showActionButtons();
};

/**
 * Clears the current selection and resets the UI
 */
const clearSelection = () => {
    selectedFile = null;
    fileInput.value = '';
    previewContainer.innerHTML = '';
    previewContainer.classList.remove('show');
    updateUploadZoneState(false);
    hideActionButtons();
    
    // Reset any error states
    uploadZone.classList.remove('error');
};

/**
 * Handles the drag over event
 * @param {DragEvent} e - The drag event
 */
const handleDragOver = (e) => {
    e.preventDefault();
    uploadZone.classList.add('dragover');
};

/**
 * Handles the drag leave event
 * @param {DragEvent} e - The drag event
 */
const handleDragLeave = (e) => {
    e.preventDefault();
    uploadZone.classList.remove('dragover');
};

/**
 * Handles the file drop event
 * @param {DragEvent} e - The drop event
 */
const handleDrop = (e) => {
    e.preventDefault();
    uploadZone.classList.remove('dragover');
    
    const files = e.dataTransfer.files;
    if (files.length > 0) {
        handleFileSelection(files[0]);
    }
};

/**
 * Handles the plant identification submission
 */
const handleSubmit = async () => {
    if (!selectedFile) {
        showErrorMessage('Please select a plant image first');
        return;
    }

    showLoading();
    try {
        const result = await uploadAndIdentifyPlant(selectedFile);
    //  Call method here to render plant results to the div id plant-results. 
    displayPlantResults(result)
    } catch (err) {
        showErrorMessage('Failed to identify plant. Please try again.');
        console.error('Plant identification error:', err);
    } finally {
        hideLoading();
    }
};

/**
 * Initializes all event listeners
 */
const initializeEventListeners = () => {
    // File input change event
    fileInput.addEventListener('change', (e) => {
        const file = e.target.files[0];
        if (file) {
            handleFileSelection(file);
        }
    });

    // Drag and drop events
    uploadZone.addEventListener('dragover', handleDragOver);
    uploadZone.addEventListener('dragleave', handleDragLeave);
    uploadZone.addEventListener('drop', handleDrop);

    // Click to select file
    uploadZone.addEventListener('click', (e) => {
        if (e.target === uploadZone || e.target.closest('.upload-content')) {
            fileInput.click();
        }
    });

    // Submit button
    submitBtn.addEventListener('click', handleSubmit);

    // Clear button
    clearBtn.addEventListener('click', clearSelection);

    // Prevent default drag behaviors on document
    ['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
        document.addEventListener(eventName, (e) => {
            e.preventDefault();
            e.stopPropagation();
        });
    });
};

/**
 * Initializes the plant identification interface
 */
const initializePlantIdentification = () => {
    initializeEventListeners();
    console.log('Plant identification interface initialized');
};

// Initialize when DOM is loaded
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializePlantIdentification);
} else {
    initializePlantIdentification();
}