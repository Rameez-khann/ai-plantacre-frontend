// plant-instructions.js
const plantDB = {
  "Aloe Vera": {
    light: "Bright, indirect light",
    water: "Water every 3 weeks",
    soil: "Well-draining cactus mix",
    fertilizer: "Once in spring with balanced fertilizer"
  },
  // Add more plant mappings here
};

export async function getPlantCareInstructions(plantName) {
  return plantDB[plantName] || null;
}

export function generateCareInstructionsHTML(instructions) {
  console.log({instructions});
  
    if (!instructions) return '';
    
    // Helper function to format soil type
    const formatSoilType = (soilType) => {
        const soilTypes = {
       SAND : 'Sand',
    LOAM : 'Loam',
    CLAY : 'Clay',
    PEAT : 'Peat',
    CHALK : 'Chalk',
    SILT : 'Silt',
    WELL_DRAINING : 'Well-draining mix'
        };
        return soilTypes[soilType] || soilType;
    };
    
    // Helper function to format sunlight requirement
    const formatSunlight = (sunlight) => {
        const sunlightTypes = {
           FULL_SUN : 'Full Sun',
    PARTIAL_SUN : 'Partial Sun',
    INDIRECT : 'Bright Indirect',
    LOW_LIGHT : 'Low Light'
        };
        return sunlightTypes[sunlight] || sunlight;
    };


    
    // Helper function to get sunlight icon
    const getSunlightIcon = (sunlight) => {
        const icons = {
            'FULL_SUN': 'fas fa-sun',
            'PARTIAL_SUN': 'fas fa-cloud-sun',
            'INDIRECT': 'fas fa-cloud',
            'LOW_LIGHT': 'fas fa-tree'
        };
        return icons[sunlight] || 'fas fa-sun';
    };
    
    return `
        <div class="care-instructions">
            <div class="care-grid">
                <!-- Watering Instructions -->
                <div class="care-item">
                    <div class="care-icon">
                        <i class="fas fa-tint"></i>
                    </div>
                    <div class="care-content">
                        <h4>Watering</h4>
                        <p><strong>${instructions.waterVolume}ml</strong> every <strong>${instructions.wateringInterval} days</strong></p>
                    </div>
                </div>
                
                <!-- Sunlight Requirements -->
                <div class="care-item">
                    <div class="care-icon">
                        <i class="${getSunlightIcon(instructions.sunlight)}"></i>
                    </div>
                    <div class="care-content">
                        <h4>Light</h4>
                        <p>${formatSunlight(instructions.sunlight)}</p>
                    </div>
                </div>
                
                <!-- Soil Type -->
                <div class="care-item">
                    <div class="care-icon">
                        <i class="fas fa-seedling"></i>
                    </div>
                    <div class="care-content">
                        <h4>Soil</h4>
                        <p>${formatSoilType(instructions.soilType)} soil</p>
                    </div>
                </div>
                
                <!-- Nutrition -->
                ${instructions.nutrition && instructions.nutrition.length > 0 ? `
                    <div class="care-item nutrition-item">
                        <div class="care-icon">
                            <i class="fas fa-flask"></i>
                        </div>
                        <div class="care-content">
                            <h4>Nutrition</h4>
                            ${instructions.nutrition.map(nutrient => `
                                <div class="nutrient">
                                    <span class="nutrient-name">${nutrient.nutrient}</span>
                                    <span class="nutrient-schedule">${nutrient.quantity}g every ${nutrient.interval} days</span>
                                </div>
                            `).join('')}
                        </div>
                    </div>
                ` : ''}
            </div>
        </div>
    `;
}