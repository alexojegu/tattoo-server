import { Application } from "express";
import { autoInjectable } from "tsyringe";
import OrmClient from "../ormClient";
import { WebServerMiddleware } from "../webServer";

@autoInjectable()
export default class OrmMiddleware implements WebServerMiddleware {
    private ormClient: OrmClient;

    public constructor(ormClient?: OrmClient) {
        this.ormClient = ormClient as OrmClient;
    }

    public apply(application: Application): void {
        application.use((_req, _res, next) => this.ormClient.context(next));
    }
}
