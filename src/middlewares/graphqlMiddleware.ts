import { loadFilesSync } from "@graphql-tools/load-files";
import { ApolloServer, IResolvers } from "apollo-server-express";
import { Application } from "express";
import { autoInjectable, container } from "tsyringe";
import AccountSource from "../sources/accountSource";
import ArtistSource from "../sources/artistSource";
import StudioSource from "../sources/studioSource";
import TattooSource from "../sources/tattooSource";
import { WebServerMiddleware } from "../webServer";

@autoInjectable()
export default class GraphqlMiddleware implements WebServerMiddleware {
    private apolloServer: ApolloServer;

    public constructor() {
        this.apolloServer = new ApolloServer({
            typeDefs: loadFilesSync<string>("../schemas/*.graphql", { globOptions: { cwd: __dirname } }),
            resolvers: loadFilesSync<IResolvers>("../resolvers/*.{js,ts}", { globOptions: { cwd: __dirname } }),
            dataSources: (): GraphqlMiddlewareContext["dataSources"] => {
                const child = container.createChildContainer();

                return {
                    accountSource: child.resolve(AccountSource),
                    artistSource: child.resolve(ArtistSource),
                    studioSource: child.resolve(StudioSource),
                    tattooSource: child.resolve(TattooSource),
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
        artistSource: ArtistSource;
        studioSource: StudioSource;
        tattooSource: TattooSource;
    };
}
