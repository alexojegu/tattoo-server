export const STUDIO = `
    query studio($id: ID!) {
        studio(id: $id) {
            id
            artists {
                id
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
