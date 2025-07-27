import { navbar } from "../features/navbar/navbar";
import { getCssFile } from "./get-css-file";
import { PageOptions } from "./page.interface";

export class Page {
    private readonly htmlContent: string;
    private readonly cssPaths: string[];
    private readonly noNavbar: 'noNavbar' | null = null;

    constructor(options: PageOptions) {

        this.htmlContent = options.html;
        this.cssPaths = options.css;
        this.noNavbar = options.noNavbar || null;
    }

    // public static create({ html, css }: PageOptions): string {
    //     return new Page({ html, css }).render();
    // }

    public render(): string {

        const cssFiles = this.addCssFiles();

        if (this.noNavbar) {
            return `${cssFiles}\n${this.htmlContent}`;
        } else {
            return `${cssFiles}\n${navbar()}\n<div class="page">${this.htmlContent}</div>`;
        }
    }



    private addCssFiles() {

        const styles = [...this.cssPaths]; // clone the array to avoid mutating this.cssPaths
        styles.unshift('style.css');       // insert plain file name

        const css = styles
            .map(style => getCssFile(style)) // now getCssFile is only called on file names
            .join('\n');


        return css;
    }
}




