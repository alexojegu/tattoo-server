import { gql } from "apollo-server-express";

export const ACCOUNT = gql`
    query account($id: ID!) {
        account(id: $id) {
            id
            email
            name
            image
            created
            updated
        }
    }
`;
