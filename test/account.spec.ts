import { ACCOUNT } from "./__requests__/account";
import { seed, wipe } from "./__utils__/database";
import { post } from "./__utils__/request";

describe("GraphQL API cuenta", () => {
    describe("Consultas de cuenta", () => {
        beforeAll(async () => {
            await seed();
        });

        afterAll(async () => {
            await wipe();
        });

        test("Obtiene una cuenta por id", async () => {
            const variables = { id: 1 };
            const response = await post(ACCOUNT, variables);

            expect(await response.json()).toMatchSnapshot();
        });
    });
});
