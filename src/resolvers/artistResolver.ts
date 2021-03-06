import { IResolverObject, IResolvers } from "apollo-server-express";
import ArtistEntity from "../entities/artistEntity";
import { GraphqlMiddlewareContext } from "../middlewares/graphqlMiddleware";
import EdgeUtil from "../utils/edgeUtil";

const queryType: IResolverObject<undefined, GraphqlMiddlewareContext> = {
    artist: async (_parent, { id }, { dataSources }) => {
        return dataSources.artistSource.getNode(id);
    },
    artists: async (_parent, { limit, cursor }, { dataSources }) => {
        return dataSources.artistSource.getEdge(limit, EdgeUtil.decode(cursor));
    },
};

const artistType: IResolverObject<ArtistEntity, GraphqlMiddlewareContext> = {
    account: async ({ account }, _args, { dataSources }) => {
        return dataSources.accountSource.loadById(account.unwrap().id);
    },
    studio: async ({ studio }, _args, { dataSources }) => {
        return dataSources.studioSource.loadById(studio.unwrap().id);
    },
    tattoos: async ({ id }, { limit, cursor }, { dataSources }) => {
        return dataSources.tattooSource.loadByArtist(id, limit, EdgeUtil.decode(cursor));
    },
};

function artistResolver(): IResolvers<unknown, GraphqlMiddlewareContext> {
    return {
        Query: queryType,
        Artist: artistType,
    };
}

export default artistResolver();
