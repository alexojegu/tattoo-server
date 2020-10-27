import "reflect-metadata";
import { SchemaGenerator } from "@mikro-orm/mysql";
import { container } from "tsyringe";
import OrmClient from "../../src/ormClient";
import WebServer from "../../src/webServer";

// https://github.com/facebook/jest/issues/8479
import { register } from "ts-node";
register();

const ormClient = container.resolve(OrmClient);
const webServer = container.resolve(WebServer);

export default async function setup(): Promise<void> {
    await ormClient.connect();
    await new SchemaGenerator(ormClient.em).createSchema();
    await webServer.listen();
}
