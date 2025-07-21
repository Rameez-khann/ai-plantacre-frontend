import { getCss } from "../../utils/getutils";

export function homePage(): string {
    return `
    <!DOCTYPE html>
    <html>
      <head>
        <title>Home Page</title>
        <link rel="stylesheet" href="${getCss('')}">
      </head>
      <body>
        <h1>Welcome to the Home Page</h1>
        <p>This HTML page includes a CSS file.</p>
      </body>
    </html>
  `;
}
