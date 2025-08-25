import { getRequest } from "../../core/requests.js";
import { getCurrentUser } from "../authentication/auth.js";

export async function getUserPlants(){
    const user = getCurrentUser();
    const result = await getRequest(`/dashboard/user-plants/${user.id}`);
    return result;
}  

export function createPlantCard(plantResult) {
    const card = document.createElement('div');
    card.className = 'plant-card';
    const url = `plant-health.html?id=${plantResult.plantId}`;
    
    // Get primary classification (first suggestion or fallback)
    const primaryClassification = plantResult.classification;
    
    const plantName = primaryClassification?.name || "Unknown Plant";
    const scientificName = primaryClassification?.scientificName || "";
    const confidence = Math.round(plantResult.probability * 100);
    
    // Determine health indicator based on identification confidence and health data
    let healthClass = 'excellent';
    let healthStatus = 'Identified';
    
    if (!plantResult.isPlant) {
        healthClass = 'poor';
        healthStatus = 'Not a plant';
    } else if (confidence < 70) {
        healthClass = 'warning';
        healthStatus = 'Low confidence';
    } else if (plantResult.health?.overallHealth) {
        healthStatus = plantResult.health.overallHealth;
        if (plantResult.health.overallHealth.toLowerCase().includes('poor')) {
            healthClass = 'poor';
        } else if (plantResult.health.overallHealth.toLowerCase().includes('warning')) {
            healthClass = 'warning';
        }
    }

    const pulseClass = (!plantResult.isPlant || confidence < 50) ? 'urgent-pulse' : '';
    
    // Get care level from classification or default
    const careLevel = primaryClassification?.careLevel || 'unknown';
    const lightRequirement = primaryClassification?.lightRequirement || 'Unknown';
    
    card.innerHTML = `
        <div class="plant-card-inner">
            <div class="plant-image-container">
                <img src="${plantResult.imageUrl}" alt="${plantName}" class="plant-image" 
                     onerror="this.src='/assets/images/default-plant.jpg'">
                <div class="health-indicator ${healthClass} ${pulseClass}"></div>
                <div class="plant-badges">
                    <span class="badge confidence">${confidence}%</span>
                </div>
                <div class="plant-actions">
                    <button class="action-btn edit-btn" onclick="editPlant('${plantResult.plantId}')" title="Edit Plant">✏️</button>
                    <button class="action-btn delete-btn" onclick="deletePlant('${plantResult.plantId}')" title="Delete Plant">🗑️</button>
                </div>
            </div>
            <div class="plant-content">
                <div class="plant-header">
                    <div class="plant-name">${plantName}</div>
                    <div class="scientific-name">${scientificName}</div>
                </div>
                
                <div class="plant-stats">
                    
                    <div class="stat-item">
                        <span class="stat-icon">☀️</span>
                        <span class="stat-label">Light:</span>
                        <span class="stat-value">${lightRequirement}</span>
                    </div>
             
                    <div class="stat-item">
                        <span class="stat-icon">🔍</span>
                        <span class="stat-label">Status:</span>
                        <span class="stat-value">${healthStatus}</span>
                    </div>
                </div>
                
                <div class="plant-footer">
                    <div class="last-care">
                        ${plantResult.classification && plantResult.classification.length > 1 
                            ? `${plantResult.classification.length} suggestions`
                            : 'Single match'
                        }<br>
                        <strong>${plantResult.isPlant ? 'Plant detected' : 'Not a plant'}</strong>
                    </div>
                    <a class="view-btn text-decoration-none" onclick="viewPlantDetails('${plantResult.plantId}')" href="${url}">View Details</a>
                </div>
            </div>
        </div>
    `;

    return card;
}

// Helper function to get best plant suggestion from classification array
export function getBestSuggestion(plantResult) {
    if (!plantResult.classification || plantResult.classification.length === 0) {
        return null;
    }
    
    // Return the first suggestion (assuming they're ordered by confidence)
    return plantResult.classification[0];
}

// Helper function to format health information
export function formatHealthInfo(health) {
    if (!health) return "No health data available";
    
    const issues = [];
    if (health.diseases && health.diseases.length > 0) {
        issues.push(`${health.diseases.length} disease(s) detected`);
    }
    if (health.pests && health.pests.length > 0) {
        issues.push(`${health.pests.length} pest(s) detected`);
    }
    
    return issues.length > 0 ? issues.join(', ') : health.overallHealth || "Healthy";
}