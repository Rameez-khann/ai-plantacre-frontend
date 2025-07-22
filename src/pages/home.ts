import { getCssFile } from "../utils/get-css-file";
import { navbar } from "./navbar";

export function homePage(): string {
  return `
    <!DOCTYPE html>
    <html>
      <head>
        ${getCssFile('style.css')}

        <title>Home Page</title>
      </head>
      ${navbar()}

      <div class='container page'>
        <h1>Welcome to the Home Page</h1>
        <p>This HTML page includes a CSS file!</p>
      </div>
    </html>
  `;
}
