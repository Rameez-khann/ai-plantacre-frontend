import { generateCareInstructionsHTML } from "./plant-instructions.js";

// Enhanced CSS with professional styling
export const plantResultsCSS = `
<style>
.plant-results-container {
    animation: slideUp 0.6s ease-out;
}

.results-header {
    text-align: center;
    padding: 2rem 0;
    border-bottom: 3px solid var(--cream);
    margin-bottom: 2.5rem;
    background: linear-gradient(135deg, rgba(45, 90, 39, 0.02) 0%, rgba(167, 210, 143, 0.05) 100%);
}

.detection-status {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.8rem;
}

.detection-status.is-plant {
    color: var(--primary-green);
}

.detection-status.not-plant {
    color: var(--text-light);
}

.detection-status i {
    font-size: 3rem;
    margin-bottom: 0.5rem;
    padding: 1rem;
    background: rgba(45, 90, 39, 0.1);
    border-radius: 50%;
    width: 80px;
    height: 80px;
    display: flex;
    align-items: center;
    justify-content: center;
}

.detection-status h2 {
    margin: 0;
    font-size: 2.2rem;
    font-weight: 700;
    letter-spacing: -0.5px;
}

.detection-status p {
    margin: 0;
    font-size: 1.2rem;
    font-weight: 600;
}

.suggestions-section h3 {
    color: var(--primary-green);
    margin-bottom: 0.8rem;
    font-size: 1.6rem;
    font-weight: 700;
}

.suggestions-section > p {
    color: var(--text-light);
    margin-bottom: 2rem;
    font-size: 1.1rem;
}

.plant-suggestions {
    display: flex;
    flex-direction: column;
    gap: 2.5rem;
}

.plant-suggestion {
    background: linear-gradient(135deg, var(--cream) 0%, rgba(167, 210, 143, 0.08) 100%);
    border-radius: 16px;
    padding: 2rem;
    border: 2px solid var(--accent-green);
    transition: all 0.3s ease;
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.08);
}

.plant-suggestion.top-match {
    border-color: var(--primary-green);
    background: linear-gradient(135deg, rgba(45, 90, 39, 0.08) 0%, rgba(167, 210, 143, 0.15) 100%);
    box-shadow: 0 8px 24px rgba(45, 90, 39, 0.15);
    position: relative;
}

.plant-suggestion.top-match::before {
    content: "Best Match";
    position: absolute;
    top: -12px;
    left: 2rem;
    background: var(--primary-green);
    color: white;
    padding: 0.4rem 1rem;
    border-radius: 12px;
    font-size: 0.85rem;
    font-weight: 600;
    letter-spacing: 0.5px;
}

.plant-suggestion:hover {
    transform: translateY(-4px);
    box-shadow: 0 12px 32px rgba(45, 90, 39, 0.2);
}

.suggestion-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1.5rem;
    flex-wrap: wrap;
    gap: 1rem;
}

.suggestion-header h3 {
    color: var(--primary-green);
    margin: 0;
    font-size: 1.8rem;
    font-weight: 700;
    letter-spacing: -0.5px;
}

.confidence-badge {
    background: linear-gradient(135deg, var(--accent-green) 0%, #7CB342 100%);
    color: white;
    padding: 0.6rem 1.4rem;
    border-radius: 25px;
    font-size: 0.95rem;
    font-weight: 700;
    letter-spacing: 0.5px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
}

.top-match .confidence-badge {
    background: linear-gradient(135deg, var(--primary-green) 0%, #2E5A27 100%);
}

.similar-images {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
    gap: 1.2rem;
    margin-bottom: 2rem;
    max-width: 600px;
}

.similar-image {
    width: 100%;
    height: 140px;
    object-fit: cover;
    border-radius: 12px;
    border: 3px solid var(--accent-green);
    transition: all 0.3s ease;
    cursor: pointer;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.similar-image:hover {
    transform: scale(1.05);
    border-color: var(--primary-green);
    box-shadow: 0 8px 20px rgba(45, 90, 39, 0.25);
}

.plant-info {
    margin-top: 1rem;
}

.no-results {
    text-align: center;
    padding: 3rem 2rem;
    color: var(--text-light);
    background: linear-gradient(135deg, rgba(167, 210, 143, 0.05) 0%, rgba(45, 90, 39, 0.02) 100%);
    border-radius: 16px;
    border: 2px dashed var(--accent-green);
}

.no-results p {
    font-size: 1.2rem;
    line-height: 1.6;
    max-width: 400px;
    margin: 0 auto;
}

.results-visible {
    animation: slideUp 0.6s ease-out;
}

@keyframes slideUp {
    from {
        opacity: 0;
        transform: translateY(40px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
}

@media (max-width: 768px) {
    .suggestion-header {
        flex-direction: column;
        align-items: flex-start;
    }
    
    .suggestion-header h3 {
        font-size: 1.5rem;
    }
    
    .similar-images {
        grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
        gap: 1rem;
    }
    
    .similar-image {
        height: 120px;
    }
    
    .detection-status h2 {
        font-size: 1.8rem;
    }
    
    .plant-suggestion {
        padding: 1.5rem;
    }
    
    .detection-status i {
        font-size: 2.5rem;
        width: 70px;
        height: 70px;
    }
}
</style>
`;

export function displayPlantResults2(resultData, targetElementId = 'plant-results') {
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
                <i class="fas fa-camera" style="font-size: 3rem; margin-bottom: 1rem; opacity: 0.5;"></i>
                <p>We couldn't identify any plants in this image. Try uploading a clearer photo with the plant as the main subject for better results.</p>
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
                    ${plant.similarImages.slice(0, 4).map(imageUrl => `
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
            <p>Here are the most likely matches for your plant with detailed care instructions:</p>
            <div class="plant-suggestions">
                ${suggestionsHTML}
            </div>
        </div>
    `;
}