export class Page {
    constructor(private filePath: string) { }

    async render(containerId: string = 'app') {
        try {
            const response = await fetch(this.filePath);
            const html = await response.text();
            document.getElementById(containerId)!.innerHTML = html;
            this.executeInlineScripts();
        } catch (err) {
            console.error(`Failed to load ${this.filePath}`, err);
        }
    }

    private executeInlineScripts() {
        const container = document.getElementById('app');
        if (!container) return;

        const scripts = container.querySelectorAll("script");
        scripts.forEach(oldScript => {
            const newScript = document.createElement("script");
            if (oldScript.src) {
                newScript.src = oldScript.src;
            } else {
                newScript.textContent = oldScript.textContent;
            }
            oldScript.replaceWith(newScript);
        });
    }
}
