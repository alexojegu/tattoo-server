import { IResolverObject, IResolvers } from "apollo-server-express";
import TattooEntity from "../entities/tattooEntity";
import { GraphqlMiddlewareContext } from "../middlewares/graphqlMiddleware";
import EdgeUtil from "../utils/edgeUtil";

const queryType: IResolverObject<undefined, GraphqlMiddlewareContext> = {
    tattoo: async (_parent, { id }, { dataSources }) => {
        return dataSources.tattooSource.getNode(id);
    },
    tattoos: async (_parent, { limit, cursor }, { dataSources }) => {
        return dataSources.tattooSource.getEdge(limit, EdgeUtil.decode(cursor));
    },
};

const tattooType: IResolverObject<TattooEntity, GraphqlMiddlewareContext> = {
    artist: async ({ artist }, _args, { dataSources }) => {
        return dataSources.artistSource.loadById(artist.unwrap().id);
    },
};

function tattooResolver(): IResolvers<unknown, GraphqlMiddlewareContext> {
    return {
        Query: queryType,
        Tattoo: tattooType,
    };
}

export default tattooResolver();
