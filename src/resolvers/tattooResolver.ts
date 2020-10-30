import { IResolverObject, IResolvers } from "apollo-server-express";
import { GraphqlMiddlewareContext } from "../middlewares/graphqlMiddleware";
import EdgeUtil from "../utils/edgeUtil";

const queryType: IResolverObject<undefined, GraphqlMiddlewareContext> = {
    tattoos: async (_parent, { limit, cursor }, { dataSources }) => {
        return dataSources.tattooSource.getEdge(limit, EdgeUtil.decode(cursor));
    },
};

function tattooResolver(): IResolvers<unknown, GraphqlMiddlewareContext> {
    return {
        Query: queryType,
    };
}

export default tattooResolver();
