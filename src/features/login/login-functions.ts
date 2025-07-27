export function login(): void {
    console.log("Logging in...");
    alert("Login success!");
}

export function verifyEmail(email: string): boolean {
    return /^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/.test(email);
}

document.addEventListener("DOMContentLoaded", () => {
    const btn = document.getElementById("login-btn");
    const input = document.getElementById("email") as HTMLInputElement;

    btn?.addEventListener("click", () => {
        const email = input.value;
        if (verifyEmail(email)) {
            login();
        } else {
            alert("Invalid email!");
        }
    });
});
