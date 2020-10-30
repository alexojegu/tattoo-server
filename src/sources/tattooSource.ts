import { DataSource } from "apollo-datasource";
import { Lifecycle, scoped } from "tsyringe";
import TattooEntity from "../entities/tattooEntity";
import TattooStore from "../stores/tattooStore";
import EdgeUtil, { EdgeUtilData } from "../utils/edgeUtil";

@scoped(Lifecycle.ContainerScoped)
export default class TattooSource extends DataSource {
    private tattooStore: TattooStore;

    public constructor(tattooStore: TattooStore) {
        super();

        this.tattooStore = tattooStore;
    }

    public async getEdge(limit: number, cursor?: string): Promise<EdgeUtilData<TattooEntity>> {
        const entities = await this.tattooStore.findList(limit + 1, EdgeUtil.parse(cursor));

        return EdgeUtil.create(entities, limit, ["id"]);
    }
}
