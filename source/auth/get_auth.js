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
exports.getAuth = getAuth;
const fs = __importStar(require("fs"));
const path = __importStar(require("path"));
function getAuth() {
    const PATH = path.join(process.cwd(), ".env");
    const file_content = fs.readFileSync(PATH, { encoding: "utf8" });
    const file_lines = file_content.split(/\r\n|\n/g);
    let result = {};
    let idx = 0;
    for (let line of file_lines) {
        idx++;
        const trimmed_line = line.trim();
        if (trimmed_line == "")
            continue;
        const split_line = trimmed_line.split("=");
        if (split_line.length < 2) {
            console.error("Could not parase line : ", idx);
        }
        result[split_line[0]] = split_line.slice(1, undefined).join("=");
    }
    return result;
}
