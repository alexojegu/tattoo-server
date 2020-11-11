import { ARTISTS } from "./__requests__/artist";
import { seed, wipe } from "./__utils__/database";
import { post } from "./__utils__/request";

describe("GraphQL API artista", () => {
    describe("Consultas de artista", () => {
        beforeAll(async () => {
            await seed();
        });

        afterAll(async () => {
            await wipe();
        });

        test("Obtiene los primeros 5 artistas", async () => {
            const variables = { limit: 5, tattooLimit: 3 };
            const response = await post(ARTISTS, variables);

            expect(await response.json()).toMatchSnapshot();
        });

        test("Obtiene los ultimos 5 artistas", async () => {
            const variables = { limit: 5, cursor: "eyJpZCI6Nn0=", tattooLimit: 3 };
            const response = await post(ARTISTS, variables);

            expect(await response.json()).toMatchSnapshot();
        });
    });
});
