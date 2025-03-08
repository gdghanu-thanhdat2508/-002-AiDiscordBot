import { Hikari } from "../state/state";
import { Message } from "../types/message";
import { Option } from "../types/option";
import { IInputSystem } from "./input_interface";
import * as readline from "readline"

export class InputSystemConsole implements IInputSystem {

    #reader?: readline.Interface = undefined;
    async init(): Promise<void> {
        this.#reader = readline.createInterface({
            input: process.stdin,
            output: process.stdout
        })

        const getConsoleInput = () => {
            this.#reader!.question("", (answer: string) => {
                Hikari.state?.message_queue.push({
                    username: "USER",
                    content: answer,
                    trusted: true,
                })
                setImmediate(getConsoleInput);
            })
        }
        getConsoleInput();
    }

    async free(): Promise<void> {

    }

    async getInput(): Promise<Option<Message>> {
        return { success: false, value: undefined };
    }
}