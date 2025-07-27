//   <div class="plant-grid">
//                 ${sortedPlants.map((plant) => indoorPlantCard(plant)).join("")}
//             </div>

import { sortItemsByField } from "../../core/arrays.js";
import { indoorPlantsList } from "./indoor-plant-list.js";

//   function indoorPlantCard(plant) {
//   const html = `
//     <div class="plant-card">
//       <img src="${plant.image}" alt="${plant.name}" class="plant-image" />
//       <div class="plant-info">
//         <h2 class="plant-title">${plant.name}</h2>
//         <p class="plant-subtitle">${plant.scientificName}</p>
//         <div class="plant-details">
//           <p><strong>Soil:</strong> ${plant.soilType}</p>
//           <p><strong>Water (ml):</strong> ${plant.waterVolume}</p>
//           <p><strong>Fertilize every:</strong> ${plant.nutritionFrequency} days</p>
//           <p><strong>Fertilizer:</strong> ${plant.fertilizer}</p>
//         </div>
//       </div>
//     </div>
//   `;
//   re
// turn html;
//  }

function indoorPlantCard(plant) {
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
        <div class="plant-action">
          <button class="select-button">Select</button>
        </div>
      </div>
    </div>
  `;
  return html;
}


 const sortedPlants = sortItemsByField(indoorPlantsList,'id','ASC')

 document.addEventListener('DOMContentLoaded', () => {
  const grid = document.getElementById('plant-grid');
  if (!grid) return;

  grid.innerHTML = sortedPlants.map((plant) => indoorPlantCard(plant)).join('');
});
