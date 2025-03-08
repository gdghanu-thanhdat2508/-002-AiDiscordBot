import { Hikari } from "../state/state";
import { Message } from "../types/message";
import { Option } from "../types/option";
import { getInputFromQueue } from "./get_input_from_queue";

export async function getInput(): Promise<Option<Message>> {
    let input = getInputFromQueue();
    if (input.success) {
        return input;
    }

    input = await Hikari.modules!.input.getInput();
    if (input.success) {
        return input;
    } else {
        return {
            success: false,
            value: undefined
        }
    }
}