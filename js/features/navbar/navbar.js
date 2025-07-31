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
                <div id="notifications"></div>
            </ul>
        </div>
    </div>
</nav>

<script src="./js/features/notifications/notifications.js" type="module"></script>

    `;
}

// ✅ Auto-run: inject navbar on load
document.addEventListener("DOMContentLoaded", () => {

    
    const wrapper = document.createElement("div");
    wrapper.innerHTML = navbar();

    const cssLink = wrapper.querySelector("link");
    const navElement = wrapper.querySelector("nav");
    const scriptElement = wrapper.querySelector("script");

    if (cssLink) document.head.appendChild(cssLink);
    if (navElement) document.body.prepend(navElement);
    if (scriptElement) document.body.appendChild(scriptElement);


  const script = document.createElement("script");
    script.type = "module";
    script.src = "/js/features/notifications/notifications.js";
    
    script.onload = () => {
        // Wait a bit to ensure window.markAsRead etc. are ready
        // setTimeout(() => {
        //     if (window.initNotifications) {
        //         // window.initNotifications(); // manual trigger
        //     }
        // }, 0);
    };

    document.body.appendChild(script);
});