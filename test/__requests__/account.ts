export const ACCOUNT = `
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
