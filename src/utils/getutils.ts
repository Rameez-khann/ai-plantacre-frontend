export function getCss(relativePath: string): string {
    return `<link rel="stylesheet" href="/css/${relativePath}">`;
}