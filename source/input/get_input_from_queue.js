"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getInputFromQueue = getInputFromQueue;
const state_1 = require("../state/state");
function getInputFromQueue() {
    let msg = state_1.Hikari?.state?.priority_queue.shift();
    if (msg) {
        return ({
            success: true,
            value: msg
        });
    }
    msg = state_1.Hikari?.state?.message_queue.shift();
    if (msg) {
        return ({
            success: true,
            value: msg
        });
    }
    return { success: false, value: undefined };
}
