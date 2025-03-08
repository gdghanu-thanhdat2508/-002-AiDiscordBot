"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getInput = getInput;
const state_1 = require("../state/state");
const get_input_from_queue_1 = require("./get_input_from_queue");
async function getInput() {
    let input = (0, get_input_from_queue_1.getInputFromQueue)();
    if (input.success) {
        return input;
    }
    input = await state_1.Hikari.modules.input.getInput();
    if (input.success) {
        return input;
    }
    else {
        return {
            success: false,
            value: undefined
        };
    }
}
