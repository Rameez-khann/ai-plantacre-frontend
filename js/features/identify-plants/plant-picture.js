import { getQueryParams } from "../../core/route-handler.js";

 document.addEventListener('DOMContentLoaded', () => {
    
  const grid = document.getElementById('plant-grid');
  if (!grid) return;

  grid.innerHTML = indoorPlantsList.map((plant) => indoorPlantCard(plant)).join('');
});