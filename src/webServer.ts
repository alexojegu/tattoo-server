import express, { Application } from "express";
import { Server, createServer } from "http";
import { singleton } from "tsyringe";
import GraphqlMiddleware from "./middlewares/graphqlMiddleware";

@singleton()
export default class WebServer {
    private initialized: boolean;
    private application: Application;
    private server: Server;

    public constructor() {
        this.initialized = false;
        this.application = express();
        this.server = createServer(this.application);
    }

    public async listen(): Promise<void> {
        if (!this.initialized) {
            this.initialize();
        }

        if (this.server.listening) {
            return;
        }

        await new Promise((resolve, reject) => {
            this.server.once("listening", resolve);
            this.server.once("error", reject);
            this.server.listen(Number(process.env.SERVER_PORT), process.env.SERVER_HOST);
        });
    }

    public async close(): Promise<void> {
        if (!this.initialized || !this.server.listening) {
            return;
        }

        await new Promise((resolve, reject) => {
            this.server.once("close", resolve);
            this.server.once("error", reject);
            this.server.close();
        });
    }

    private initialize(): void {
        const graphqlMiddleware = new GraphqlMiddleware();

        graphqlMiddleware.apply(this.application);

        this.initialized = true;
    }
}

export interface WebServerMiddleware {
    apply: (application: Application) => void;
}
