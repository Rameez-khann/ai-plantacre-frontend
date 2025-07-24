import { getCssFile } from "../../core/get-css-file";
import { navbarLinks } from "./links";

/**
 * Generates HTML list items for each navigation link
 */
function showNavLinks(): string {
    return navbarLinks
        .map(({ text, link }) => `<li><a href="${link}">${text}</a></li>`)
        .join("\n");
}

/**
 * Returns the full HTML for the navigation bar,
 * including its CSS file link and inner content
 */
export function navbar(): string {
    const navbarStyles = getCssFile("navbar.css");
    const navItems = showNavLinks();

    return `
${navbarStyles}
<nav class="nav">
    <div class="container">
        <div class="nav-content">
            <div class="logo">
                🌱 Smart Plant Care
            </div>
            <ul class="nav-links">
                ${navItems}
            </ul>
        </div>
    </div>
</nav>
    `;
}
