import * as fs from "fs"
import * as path from "path"

export function getAuth(): Record<string, string> {
    const PATH = path.join(process.cwd(), ".env")
    const file_content: string = fs.readFileSync(PATH, { encoding: "utf8" })

    const file_lines: string[] = file_content.split(/\r\n|\n/g)

    let result: Record<string, string> = {}

    let idx: number = 0;

    for (let line of file_lines) {
        idx++;
        const trimmed_line = line.trim()

        if (trimmed_line == "") continue

        const split_line = trimmed_line.split("=");

        if (split_line.length < 2) {
            console.error("Could not parase line : ", idx);
        }

        result[split_line[0]!] = split_line.slice(1, undefined).join("=")
    }

    return result
}