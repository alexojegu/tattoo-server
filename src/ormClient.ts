import { MikroORM, Options } from "@mikro-orm/core";
import { MySqlDriver, SqlEntityManager } from "@mikro-orm/mysql";
import { AsyncLocalStorage } from "async_hooks";
import { NextFunction } from "express";
import { singleton } from "tsyringe";

@singleton()
export default class OrmClient {
    private initialized: Promise<boolean>;
    private asyncLocalStorage: AsyncLocalStorage<SqlEntityManager>;
    private options: Options<MySqlDriver>;
    private mikroOrm!: MikroORM<MySqlDriver>;

    public constructor() {
        this.initialized = Promise.resolve(false);
        this.asyncLocalStorage = new AsyncLocalStorage();
        this.options = {
            type: "mysql",
            host: process.env.DATABASE_HOST,
            port: Number(process.env.DATABASE_PORT),
            user: process.env.DATABSE_USER,
            password: process.env.DATABASE_PASSWORD,
            dbName: process.env.DATABASE_NAME,
            entities: ["dist/entities/*.js"],
            entitiesTs: ["src/entities/*.ts"],
            autoJoinOneToOneOwner: false,
            forceUtcTimezone: true,
            multipleStatements: true,
            context: () => this.asyncLocalStorage.getStore(),
        };
    }

    public get em(): SqlEntityManager {
        if (!this.mikroOrm) {
            throw new Error("Database ORM: not initialized.");
        }

        return this.mikroOrm.em;
    }

    public context(next: NextFunction): void {
        this.asyncLocalStorage.run(this.em.fork(true, true), next);
    }

    public async connect(): Promise<void> {
        if (!(await this.initialized)) {
            await this.initialize();
        }

        if (await this.mikroOrm.isConnected()) {
            return;
        }

        await this.mikroOrm.connect();
    }

    public async close(force?: boolean): Promise<void> {
        if (!(await this.initialized) || !(await this.mikroOrm.isConnected())) {
            return;
        }

        await this.mikroOrm.close(force);
    }

    private async initialize(): Promise<void> {
        let deferred!: (value: boolean) => void;

        this.initialized = new Promise((resolve) => (deferred = resolve));
        this.mikroOrm = await MikroORM.init(this.options, false);

        deferred(true);
    }
}
