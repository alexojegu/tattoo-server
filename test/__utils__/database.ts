import "reflect-metadata";
import { join } from "path";
import { container } from "tsyringe";
import OrmClient from "../../src/ormClient";

// https://github.com/facebook/jest/issues/7184
const ormClient = container.resolve(OrmClient);
const seedFile = join(__dirname, "../__datasets__/seed.sql");
const wipeFile = join(__dirname, "../__datasets__/wipe.sql");

export async function seed(): Promise<void> {
    await ormClient.connect();
    await ormClient.em.getConnection("write").loadFile(seedFile);
    await ormClient.close(true);
}

export async function wipe(): Promise<void> {
    await ormClient.connect();
    await ormClient.em.getConnection("write").loadFile(wipeFile);
    await ormClient.close(true);
}
