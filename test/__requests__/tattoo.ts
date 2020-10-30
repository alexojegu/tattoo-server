export const TATTOOS = `
    query tattoos($limit: Int!, $cursor: String) {
        tattoos(limit: $limit, cursor: $cursor) {
            nodes {
                id
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
