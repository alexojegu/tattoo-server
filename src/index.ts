import "reflect-metadata";
import { container } from "tsyringe";
import OrmClient from "./ormClient";
import WebServer from "./webServer";

const ormClient = container.resolve(OrmClient);
const webServer = container.resolve(WebServer);

async function bootstrap(): Promise<void> {
    await ormClient.connect();
    await webServer.listen();
}

bootstrap();
