import { IResolverObject, IResolvers } from "apollo-server-express";
import StudioEntity from "../entities/studioEntity";
import { GraphqlMiddlewareContext } from "../middlewares/graphqlMiddleware";

const queryType: IResolverObject<undefined, GraphqlMiddlewareContext> = {
    studio: async (_parent, { id }, { dataSources }) => {
        return dataSources.studioSource.getNode(id);
    },
};

const studioType: IResolverObject<StudioEntity, GraphqlMiddlewareContext> = {
    artists: async ({ id }, _args, { dataSources }) => {
        return dataSources.artistSource.loadByStudio(id);
    },
};

function studioResolver(): IResolvers {
    return {
        Query: queryType,
        Studio: studioType,
    };
}

export default studioResolver();
