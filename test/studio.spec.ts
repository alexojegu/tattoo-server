import { STUDIO, STUDIOS } from "./__requests__/studio";
import { seed, wipe } from "./__utils__/database";
import { post } from "./__utils__/request";

describe("GraphQL API estudio", () => {
    describe("Consultas de estudio", () => {
        beforeAll(async () => {
            await seed();
        });

        afterAll(async () => {
            await wipe();
        });

        test("Obtiene un estudio por id", async () => {
            const variables = { id: 1, tattooLimit: 3 };
            const response = await post(STUDIO, variables);

            expect(await response.json()).toMatchSnapshot();
        });

        test("Obtiene los primeros 5 estudios", async () => {
            const variables = { limit: 5, tattooLimit: 3 };
            const response = await post(STUDIOS, variables);

            expect(await response.json()).toMatchSnapshot();
        });

        test("Obtiene los ultimos 5 estudios", async () => {
            const variables = { limit: 5, cursor: "eyJpZCI6Nn0=", tattooLimit: 3 };
            const response = await post(STUDIOS, variables);

            expect(await response.json()).toMatchSnapshot();
        });
    });
});
