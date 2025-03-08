import { Character } from "../types/character";
import * as fs from "fs";
import * as path from "path";
import { isOfClass } from "../validation/validation";

export function getCharacter(): Record<string, Character> {
    const PATH = path.join(process.cwd(), "userdata", "characters");
    const files: string[] = fs.readdirSync(PATH, { encoding: "utf8" });

    let result: Record<string, Character> = {};

    for (let file_name of files) {
        const absolute_path = path.join(PATH, file_name)

        // read file 
        const file_content: string = fs.readFileSync(absolute_path, { encoding: "utf8" })

        const obj: unknown = JSON.parse(file_content)

        if (!isOfClass(obj, new Character(), { add_missing_fields: true, print: true, obj_name: "character" })) {
            console.error("Could not parse character:", file_name)
            continue
        }
        const character: Character = obj as Character;

        result[character.name] = character
    }

    return result
}