import { Page } from "./page";
import { navbar } from '../features/navbar/navbar';

export function createPage(html: string, css: string, noNavbar?: 'noNavbar'): string {
    const page = new Page({ html, css: [css], noNavbar });
    return page.render();
}