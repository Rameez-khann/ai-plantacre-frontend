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