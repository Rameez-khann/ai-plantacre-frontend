import { getRequest, postRequest } from "../../core/requests.js";
import { getCurrentUser } from "../authentication/auth.js";

export async function uploadAndIdentifyPlant(file, plantId) {

  const formData = new FormData();
  formData.append('userId', getCurrentUser()?.id ?? null);
  formData.append('file', file); 
  if(plantId){
  formData.append('plantId', plantId); 
  }

  const response = await fetch('http://localhost:5501/identify-plant', {
    method: 'POST',
    body: formData,
  });
// const response = await postRequest('/identify-plant', formData);
  if (!response.ok) {
    throw new Error(`Upload failed with status ${response.status}`);
  }

  return response.json();
}

export async function checkPlantHealth(plantId,file) {
  const formData = new FormData();
  formData.append('userId', getCurrentUser()?.id ?? null);
  formData.append('file', file); // 👈 unchanged

  const response = await fetch('http://localhost:5501/plant-health', {
    method: 'POST',
    body: formData,
  });

  if (!response.ok) {
    throw new Error(`Upload failed with status ${response.status}`);
  }

  return response.json();
}

export async function getPlantHealth(id) {
  const plantHistory = await getRequest(`/plant-health/${id}`);

return plantHistory;
}