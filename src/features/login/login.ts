export function loginPage(): string {
    return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>Login</title>
    </head>
    <body>
      <div id="login">
        <input type="email" id="email" placeholder="Enter email" />
        <button id="login-btn">Login</button>
      </div>
      <script src="/login/login-functions.js" defer></script>
    </body>
    </html>
  `;
}
