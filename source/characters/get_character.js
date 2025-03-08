"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCharacter = getCharacter;
const character_1 = require("../types/character");
const fs = __importStar(require("fs"));
const path = __importStar(require("path"));
const validation_1 = require("../validation/validation");
function getCharacter() {
    const PATH = path.join(process.cwd(), "userdata", "characters");
    const files = fs.readdirSync(PATH, { encoding: "utf8" });
    let result = {};
    for (let file_name of files) {
        const absolute_path = path.join(PATH, file_name);
        // read file 
        const file_content = fs.readFileSync(absolute_path, { encoding: "utf8" });
        const obj = JSON.parse(file_content);
        if (!(0, validation_1.isOfClass)(obj, new character_1.Character(), { add_missing_fields: true, print: true, obj_name: "character" })) {
            console.error("Could not parse character:", file_name);
            continue;
        }
        const character = obj;
        result[character.name] = character;
    }
    return result;
}
