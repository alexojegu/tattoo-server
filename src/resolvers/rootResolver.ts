import { IResolverObject, IResolvers } from "apollo-server-express";
import { GraphqlMiddlewareContext } from "../middlewares/graphqlMiddleware";
import EdgeUtil, { EdgeUtilData } from "../utils/edgeUtil";
import dateScalar from "./scalars/dateScalar";

const pageType: IResolverObject<EdgeUtilData<unknown>["page"], GraphqlMiddlewareContext> = {
    cursor: ({ cursor }) => {
        return EdgeUtil.encode(cursor);
    },
};

function rootResolver(): IResolvers<unknown, GraphqlMiddlewareContext> {
    return {
        Date: dateScalar,
        Page: pageType,
    };
}

export default rootResolver();
