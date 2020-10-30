import { TATTOOS } from "./__requests__/tattoo";
import { seed, wipe } from "./__utils__/database";
import { post } from "./__utils__/request";

describe("GraphQL API tatuaje", () => {
    describe("Consultas de tatuaje", () => {
        beforeAll(async () => {
            await seed();
        });

        afterAll(async () => {
            await wipe();
        });

        test("Obtiene los primeros 5 tatuajes", async () => {
            const variables = { limit: 5 };
            const response = await post(TATTOOS, variables);

            expect(await response.json()).toMatchSnapshot();
        });

        test("Obtiene los ultimos 5 tatuajes", async () => {
            const variables = { limit: 5, cursor: "eyJpZCI6Nn0=" };
            const response = await post(TATTOOS, variables);

            expect(await response.json()).toMatchSnapshot();
        });
    });
});
