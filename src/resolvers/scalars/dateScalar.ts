import { ApolloError } from "apollo-server-express";
import { GraphQLScalarType, GraphQLScalarTypeConfig, Kind } from "graphql";

const dateConfig: GraphQLScalarTypeConfig<Date, string> = {
    name: "Date",
    serialize: (value) => {
        if (!(value instanceof Date)) {
            throw new ApolloError("Scalar Date: not Date instance.");
        }

        return value.toISOString();
    },
    parseValue: (value) => {
        if (typeof value !== "string") {
            throw new ApolloError("Scalar Date: not string type.");
        }

        return new Date(value);
    },
    parseLiteral: (ast) => {
        if (ast.kind !== Kind.STRING) {
            throw new ApolloError("Scalar Date: not string kind.");
        }

        return new Date(ast.value);
    },
};

export default new GraphQLScalarType(dateConfig);
