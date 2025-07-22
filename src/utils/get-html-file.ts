import { readFileSync } from "fs";
import { join } from "path";

export function getHtmlFile(fileName: string) {
    const path = join(process.cwd(), "public", "html", fileName);
    return readFileSync(path, "utf-8");
}
