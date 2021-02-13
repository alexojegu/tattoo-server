import { STUDIO } from "./__requests__/studio";
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
            const variables = { id: 1 };
            const response = await post(STUDIO, variables);

            expect(await response.json()).toMatchSnapshot();
        });
    });
});
