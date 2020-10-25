import { loadFilesSync } from "@graphql-tools/load-files";
import { ApolloServer, IResolvers } from "apollo-server-express";
import { Application } from "express";
import { autoInjectable, container } from "tsyringe";
import AccountSource from "../sources/accountSource";
import { WebServerMiddleware } from "../webServer";

@autoInjectable()
export default class GraphqlMiddleware implements WebServerMiddleware {
    private apolloServer: ApolloServer;

    public constructor() {
        this.apolloServer = new ApolloServer({
            typeDefs: loadFilesSync<string>("../schemas/*.gql", { globOptions: { cwd: __dirname } }),
            resolvers: loadFilesSync<IResolvers>("../resolvers/*.{js,ts}", { globOptions: { cwd: __dirname } }),
            dataSources: (): GraphqlMiddlewareContext["dataSources"] => {
                const child = container.createChildContainer();

                return {
                    accountSource: child.resolve(AccountSource),
                };
            },
        });
    }

    public apply(application: Application): void {
        this.apolloServer.applyMiddleware({
            app: application,
            path: "/",
        });
    }
}

export interface GraphqlMiddlewareContext {
    dataSources: {
        accountSource: AccountSource;
    };
}
