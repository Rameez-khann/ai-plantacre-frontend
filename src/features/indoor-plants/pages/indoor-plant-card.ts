import { createPage } from "../../../core/create-page";
import { IndoorPlant } from "../indoor-plants.interface";

export function indoorPlantCard(plant: IndoorPlant): string {
  const html = `
    <div class="plant-card">
      <img src="${plant.image}" alt="${plant.name}" class="plant-image" />
      <div class="plant-info">
        <h2 class="plant-title">${plant.name}</h2>
        <p class="plant-subtitle">${plant.scientificName}</p>
        <div class="plant-details">
          <p><strong>Soil:</strong> ${plant.soilType}</p>
          <p><strong>Water (ml):</strong> ${plant.waterVolume}</p>
          <p><strong>Fertilize every:</strong> ${plant.nutritionFrequency} days</p>
          <p><strong>Fertilizer:</strong> ${plant.fertilizer}</p>
        </div>
      </div>
    </div>
  `;

  const css = 'indoor-plant-card.css';

  const page = createPage(html, css, 'noNavbar');
  return page;
}
