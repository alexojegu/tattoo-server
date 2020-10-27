import { IResolvers } from "apollo-server-express";
import { GraphqlMiddlewareContext } from "../middlewares/graphqlMiddleware";
import dateScalar from "./scalars/dateScalar";

function rootResolver(): IResolvers<unknown, GraphqlMiddlewareContext> {
    return {
        Date: dateScalar,
    };
}

export default rootResolver();
