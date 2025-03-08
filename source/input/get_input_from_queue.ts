import { Hikari } from "../state/state";
import { Message } from "../types/message";
import { Option } from "../types/option";

export function getInputFromQueue(): Option<Message> {
    let msg = Hikari?.state?.priority_queue.shift();
    if (msg) {
        return ({
            success: true,
            value: msg
        })
    }
    msg = Hikari?.state?.message_queue.shift();

    if (msg) {
        return ({
            success: true,
            value: msg
        })
    }

    return { success: false, value: undefined }
}