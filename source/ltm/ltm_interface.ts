// Long term memmory
import { Module } from "../module/module_interface"

export interface ILongTermMemory extends Module {
    store(user: string, message: string): Promise<void>;
    query(user: string): Promise<string[]>;
}