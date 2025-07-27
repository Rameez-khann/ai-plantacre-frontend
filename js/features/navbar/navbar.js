import { navbarLinks } from "./navbar-links.js";

/**
 * Generates HTML list items for each navigation link
 */
function showNavLinks() {
    return navbarLinks
        .map(({ text, link }) => `<li><a href="${link}">${text}</a></li>`)
        .join("\n");
}

/**
 * Returns the full HTML for the navigation bar,
 * including its CSS file link and inner content
 */
export function navbar() {
    const navItems = showNavLinks();

    return `
    <link rel="stylesheet" href="/css/navbar.css">

    <head>
    </head>
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

// ✅ Auto-run: inject navbar on load
document.addEventListener("DOMContentLoaded", () => {
    const wrapper = document.createElement("div");
    wrapper.innerHTML = navbar();

    const cssLink = wrapper.querySelector("link");
    const navElement = wrapper.querySelector("nav");

    if (cssLink) document.head.appendChild(cssLink);
    if (navElement) document.body.prepend(navElement);
});
