export function getCssFile(relativePath: string): string {
    return `<link rel="stylesheet" href="/css/${relativePath}">`;
}