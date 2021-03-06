import { gql } from "apollo-server-express";

export const ARTIST = gql`
    query artist($id: ID!, $tattooLimit: Int!) {
        artist(id: $id) {
            id
            account {
                id
            }
            studio {
                id
            }
            tattoos(limit: $tattooLimit) {
                nodes {
                    id
                }
            }
            website
            instagram
            facebook
            created
            updated
        }
    }
`;

export const ARTISTS = gql`
    query artists($limit: Int!, $cursor: String, $tattooLimit: Int!) {
        artists(limit: $limit, cursor: $cursor) {
            nodes {
                id
                account {
                    id
                }
                studio {
                    id
                }
                tattoos(limit: $tattooLimit) {
                    nodes {
                        id
                    }
                }
                website
                instagram
                facebook
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
