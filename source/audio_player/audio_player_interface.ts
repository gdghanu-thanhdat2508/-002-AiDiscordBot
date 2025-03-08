import { Module } from "../module/module_interface";

enum AUDIO_DEVICE {
    MAIN,
    OTHER,
}

export type ApArgs = {
    id: string;
    device: AUDIO_DEVICE;
}

export interface IAudioPlayer extends Module {
    playAudio(path: string, args: ApArgs): Promise<void>;
}