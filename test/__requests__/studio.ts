import { gql } from "apollo-server-express";

export const STUDIO = gql`
    query studio($id: ID!, $tattooLimit: Int!) {
        studio(id: $id) {
            id
            artists {
                id
            }
            tattoos(limit: $tattooLimit) {
                nodes {
                    id
                }
            }
            name
            image
            website
            instagram
            facebook
            phone
            address
            location
            about
            created
            updated
        }
    }
`;

export const STUDIOS = gql`
    query studios($limit: Int!, $cursor: String, $tattooLimit: Int!) {
        studios(limit: $limit, cursor: $cursor) {
            nodes {
                id
                artists {
                    id
                }
                tattoos(limit: $tattooLimit) {
                    nodes {
                        id
                    }
                }
                name
                image
                website
                instagram
                facebook
                phone
                address
                location
                about
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
