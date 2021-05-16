import { gql } from "apollo-server-express";

export const TATTOO = gql`
    query tattoo($id: ID!) {
        tattoo(id: $id) {
            id
            artist {
                id
            }
            image
            width
            height
            created
            updated
        }
    }
`;

export const TATTOOS = gql`
    query tattoos($limit: Int!, $cursor: String) {
        tattoos(limit: $limit, cursor: $cursor) {
            nodes {
                id
                artist {
                    id
                }
                image
                width
                height
                created
                updated
            }
            page {
                next
                cursor
            }
        }
    }
`;
