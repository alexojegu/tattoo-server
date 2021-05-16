import { DocumentNode, print } from "graphql";
import fetch, { Response } from "node-fetch";
import { URL } from "url";

const graphqlUrl = new URL(`http://${process.env.SERVER_HOST}:${process.env.SERVER_PORT}`);

export async function post(request: DocumentNode, variables?: Record<string, unknown>): Promise<Response> {
    return fetch(graphqlUrl.toString(), {
        method: "post",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query: print(request), variables }),
    });
}
