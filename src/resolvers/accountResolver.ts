import { IResolverObject, IResolvers } from "apollo-server-express";
import { GraphqlMiddlewareContext } from "../middlewares/graphqlMiddleware";

const queryType: IResolverObject<undefined, GraphqlMiddlewareContext> = {
    account: (_parent, { id }, { dataSources }) => {
        return dataSources.accountSource.getNode(id);
    },
};

function accountResolver(): IResolvers<unknown, GraphqlMiddlewareContext> {
    return {
        Query: queryType,
    };
}

export default accountResolver();
