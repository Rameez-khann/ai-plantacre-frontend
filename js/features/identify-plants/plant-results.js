import { plantResultsCSS } from "./plant-result-styles.js";

export function displayPlantResults(resultData, targetElementId = 'plant-results') {
    const targetElement = document.getElementById(targetElementId);
    if (!targetElement) return;

    targetElement.innerHTML = createResultsHTML(resultData);
    targetElement.style.display = 'block';
    targetElement.classList.add('results-visible');
}

function createResultsHTML(data) {
    const { isPlant, probability, classification } = data;
    
    const headerHTML = `
        <div class="results-header">
            <div class="detection-status ${isPlant ? 'is-plant' : 'not-plant'}">
                <i class="fas ${isPlant ? 'fa-seedling' : 'fa-times-circle'}"></i>
                <h2>${isPlant ? 'Plant Detected!' : 'No Plant Detected'}</h2>
                <p>Confidence: ${Math.round(probability * 100)}%</p>
            </div>
        </div>
    `+ plantResultsCSS;

    if (!isPlant || !classification || classification.length === 0) {
        return headerHTML + `
            <div class="no-results">
                <p>We couldn't identify any plants in this image. Try uploading a clearer photo with the plant as the main subject.</p>
            </div>
        `;
    }

    const suggestionsHTML = classification.map((plant, index) => `
        <div class="plant-suggestion ${index === 0 ? 'top-match' : ''}">
            <div class="suggestion-header">
                <h3>${plant.name}</h3>
                <div class="confidence-badge">
                    ${Math.round(plant.probability * 100)}% match
                </div>
            </div>
            
            ${plant.similarImages && plant.similarImages.length > 0 ? `
                <div class="similar-images">
                    ${plant.similarImages.slice(0, 3).map(imageUrl => `
                        <img src="${imageUrl}" alt="${plant.name}" class="similar-image" />
                    `).join('')}
                </div>
            ` : ''}
            
            <div class="plant-info">
                <button class="btn btn-secondary get-care-btn" onclick="getPlantCare('${plant.name}', '${plant.id}')">
                    <i class="fas fa-leaf"></i> Get Care Instructions
                </button>
            </div>
        </div>
    `).join('');

    return headerHTML + `
        <div class="suggestions-section">
            <h3>Plant Identification Results</h3>
            <p>Here are the most likely matches for your plant:</p>
            <div class="plant-suggestions">
                ${suggestionsHTML}
            </div>
        </div>
    `;
}

function getPlantCare(plantName, plantId) {
    console.log(`Getting care instructions for: ${plantName} (ID: ${plantId})`);
    // Integration point for existing care instructions functionality
    if (typeof getPlantCareInstructions === 'function') {
        getPlantCareInstructions(plantName);
    }
}

// Example usage:
// const sampleData = {
//     isPlant: true,
//     probability: 0.95,
//     classification: [
//         {
//             id: "plant_001",
//             name: "Monstera Deliciosa",
//             probability: 0.89,
//             similarImages: ["url1.jpg", "url2.jpg", "url3.jpg"]
//         },
//         {
//             id: "plant_002", 
//             name: "Philodendron Brasil",
//             probability: 0.67,
//             similarImages: ["url4.jpg", "url5.jpg"]
//         }
//     ]
// };
// displayPlantResults(sampleData);



// // Inject CSS if not already present
// if (!document.querySelector('#plant-results-styles')) {
//     const styleElement = document.createElement('div');
//     styleElement.id = 'plant-results-styles';
//     styleElement.innerHTML = plantResultsCSS;
//     document.head.appendChild(styleElement);
// }