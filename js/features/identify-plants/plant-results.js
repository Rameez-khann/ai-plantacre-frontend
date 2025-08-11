import { generateCareInstructionsHTML } from "./plant-instructions.js";
import { plantResultsCSS } from "./plant-result-styles.js";


export function displayPlantResults(resultData, targetElementId = 'plant-results') {
    const targetElement = document.getElementById(targetElementId);
    if (!targetElement) return;
    if(!resultData){
        targetElement.innerHTML = '';
    }

    targetElement.innerHTML = createResultsHTML(resultData);
    targetElement.style.display = 'block';
    targetElement.classList.add('results-visible');
}

function createResultsHTML(data) {
    const { isPlant, probability, classification } = data;
                // <p>Confidence: ${Math.round(probability * 100)}%</p>
    const headerHTML = `
        <div class="results-header">
            <div class="detection-status ${isPlant ? 'is-plant' : 'not-plant'}">
                <i class="fas ${isPlant ? 'fa-seedling' : 'fa-times-circle'}"></i>
                <h2>${isPlant ? 'Plant Detected!' : 'No Plant Detected'}</h2>
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
             ${generateCareInstructionsHTML(plant.instructions)}
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


