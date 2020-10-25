import "reflect-metadata";
import { container } from "tsyringe";
import WebServer from "./webServer";

const webServer = container.resolve(WebServer);

async function bootstrap(): Promise<void> {
    await webServer.listen();
}

bootstrap();
