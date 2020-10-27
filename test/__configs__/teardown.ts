import { SchemaGenerator } from "@mikro-orm/mysql";
import { container } from "tsyringe";
import OrmClient from "../../src/ormClient";
import WebServer from "../../src/webServer";

const webServer = container.resolve(WebServer);
const ormClient = container.resolve(OrmClient);

export default async function teardown(): Promise<void> {
    await webServer.close();
    await new SchemaGenerator(ormClient.em).dropSchema();
    await ormClient.close(true);
}
