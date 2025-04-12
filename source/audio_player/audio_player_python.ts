// import * as cproc from "child_process"
// import { ApArgs, IAudioPlayer } from "./audio_player_interface";

// export class AudioPlayerPython implements IAudioPlayer {

//     #player: cproc.ChildProcess | undefined = undefined;

//     async init(): Promise<void> {
//     }

//     async free(): Promise<void> {

//     }

//     async playAudio(path: string, args: ApArgs): Promise<void> {
//         if (!path.endsWith(".mp3")) {
//             console.warn("can only play .mp3 using playAudio")
//             return
//         }

//         let temp_audio_device = (0).toString();

//         this.#player = cproc.spawn("python", [
//             temp_audio_device,
//             path
//         ], {
//             cwd: process.cwd(),
//             detached: false,
//             shell: false
//         })

//         this.#player.stderr?.on("data", (data) => {
//             console.warn(data.toString())
//         })
//         this.#player.stdout?.on("data", (data) => {
//             console.log(data.toString())
//         })
//     }
// }