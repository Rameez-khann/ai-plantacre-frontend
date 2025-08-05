import { uploadAndIdentifyPlant } from "./plant-id.js";
import { displayPlantInfo, hideLoading, showLoading } from "./plant-instructions-page.js";
import { getPlantCareInstructions } from "./plant-instructions.js";

const uploadBtn = document.getElementById('upload-btn');
const fileInput = document.getElementById('plant-input');

uploadBtn.addEventListener('click', async () => {
  const file = fileInput.files[0];
  if (!file) return alert('Please select a photo of your plant.');

  showLoading();
  try {
    const plantName = await uploadAndIdentifyPlant(file);
    const plantInfo = await getPlantCareInstructions(plantName);
    displayPlantInfo(plantName, plantInfo);
  } catch (err) {
    alert('Failed to identify plant. Please try again.');
    console.error(err);
  } finally {
    hideLoading();
  }
});






