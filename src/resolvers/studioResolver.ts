import { IResolverObject, IResolvers } from "apollo-server-express";
import StudioEntity from "../entities/studioEntity";
import { GraphqlMiddlewareContext } from "../middlewares/graphqlMiddleware";
import EdgeUtil from "../utils/edgeUtil";

const queryType: IResolverObject<undefined, GraphqlMiddlewareContext> = {
    studio: async (_parent, { id }, { dataSources }) => {
        return dataSources.studioSource.getNode(id);
    },
    studios: async (_parent, { limit, cursor }, { dataSources }) => {
        return dataSources.studioSource.getEdge(limit, EdgeUtil.decode(cursor));
    },
};

const studioType: IResolverObject<StudioEntity, GraphqlMiddlewareContext> = {
    artists: async ({ id }, _args, { dataSources }) => {
        return dataSources.artistSource.loadByStudio(id);
    },
    tattoos: async ({ id }, { limit, cursor }, { dataSources }) => {
        return dataSources.tattooSource.loadByStudio(id, limit, EdgeUtil.decode(cursor));
    },
};

function studioResolver(): IResolvers {
    return {
        Query: queryType,
        Studio: studioType,
    };
}

export default studioResolver();
