import { sortArrayByKey } from "victor-dev-toolbox";
import { createPage } from "../../../core/create-page";
import { getCssFile } from "../../../core/get-css-file";
import { indoorPlantsList } from "../indoor-plants-list";
import { indoorPlantCard } from "./indoor-plant-card";

export function indoorPlantListPage(): string {
    const sortedPlants = sortArrayByKey('name', 'ASC', indoorPlantsList);
    const html = `
    <section class="plant-page">
      <div class="plant-container">
        <h1 class="plant-header">
          🌿 Common Indoor Plants in Dublin
        </h1>
        <p class="plant-description">
          Here's a collection of 15 popular indoor houseplants typically found in Dublin homes.
        </p>
        <div class="plant-grid">
          ${sortedPlants.map((plant) => indoorPlantCard(plant)).join("")}
        </div>
      </div>
    </section>
  `;

    const css = 'indoor-plants.css';

    const page = createPage(html, css);
    return page;
}
