import { Module } from "../module/module_interface"
import { Option } from "../types/option";

export interface ILargeLanguageModel extends Module {
    generate(prompt: string): Promise<Option<string>>;
}