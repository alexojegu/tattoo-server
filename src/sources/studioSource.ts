import { DataSource } from "apollo-datasource";
import { Lifecycle, scoped } from "tsyringe";
import StudioEntity from "../entities/studioEntity";
import StudioLoader from "../loaders/studioLoader";
import StudioStore from "../stores/studioStore";
import EdgeUtil, { EdgeUtilData } from "../utils/edgeUtil";

@scoped(Lifecycle.ContainerScoped)
export default class StudioSource extends DataSource {
    private studioStore: StudioStore;
    private studioLoader: StudioLoader;

    public constructor(studioStore: StudioStore, studioLoader: StudioLoader) {
        super();

        this.studioStore = studioStore;
        this.studioLoader = studioLoader;
    }

    public async getNode(id: string): Promise<StudioEntity | null> {
        return this.studioStore.findId(id);
    }

    public async getEdge(limit: number, cursor?: string): Promise<EdgeUtilData<StudioEntity>> {
        const entities = await this.studioStore.findList(limit + 1, EdgeUtil.parse(cursor));

        return EdgeUtil.create(entities, limit, ["id"]);
    }

    public async loadById(id: number): Promise<StudioEntity | undefined> {
        return this.studioLoader.getById(id);
    }
}
