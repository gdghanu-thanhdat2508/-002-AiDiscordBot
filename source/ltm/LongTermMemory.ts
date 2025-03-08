import sqlite3 from "sqlite3";
import * as sqlite from "sqlite";
import { ILongTermMemory } from "./ltm_interface";

export class LongTermMemory implements ILongTermMemory {
    private db!: sqlite.Database;

    async init(): Promise<void> {
        this.db = await sqlite.open({
            filename: "memory.db",
            driver: sqlite3.Database
        });

        await this.db.exec(`
            CREATE TABLE IF NOT EXISTS memory (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                user TEXT NOT NULL,
                message TEXT NOT NULL
            );

            CREATE INDEX IF NOT EXISTS idx_user ON memory(user);
        `);
    }

    async free(): Promise<void> {
        await this.db.close();
    }

    async store(user: string, message: string): Promise<void> {
        await this.db.run("INSERT INTO memory (user, message) VALUES (?, ?)", [user, message]);
    }

    async query(user: string): Promise<string[]> {
        const rows = await this.db.all("SELECT message FROM memory WHERE user = ?", [user]);
        return rows.map((row: any) => row.message);
    }
}
