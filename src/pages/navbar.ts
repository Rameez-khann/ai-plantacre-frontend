import { NavLink } from "../interfaces/nav-links";
import { getCssFile } from "../utils/get-css-file";



const links: NavLink[] = [
    {
        text: 'Home',
        link: '/'
    },
    {
        text: 'About',
        link: '/about'
    },
    {
        text: 'Plants',
        link: '/plants'
    },
    {
        text: 'Login',
        link: '/login'
    },
    {
        text: 'Signup',
        link: '/signup'
    },
];


function showNavLinks(): string {
    return links
        .map(({ text, link }) => `<li><a href="${link}">${text}</a></li>`)
        .join("\n");
}


export function navbar(): string {
    return `
    ${getCssFile('navbar.css')}
        <nav class="nav">
            <div class="container">
                <div class="nav-content">
                    <div class="logo">
                        🌱 Smart Plant Care
                    </div>
                    <ul class="nav-links">
                       ${showNavLinks()}
                    </ul>
                </div>
            </div>
        </nav>
    `;
}
