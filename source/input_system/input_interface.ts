import { Module } from "../module/module_interface";
import { Message } from "../types/message";
import { Option } from "../types/option";

export interface IInputSystem extends Module {
    getInput(): Promise<Option<Message>>
}