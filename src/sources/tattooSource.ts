import { DataSource } from "apollo-datasource";
import { Lifecycle, scoped } from "tsyringe";
import TattooEntity from "../entities/tattooEntity";
import TattooLoader from "../loaders/tattooLoader";
import TattooStore from "../stores/tattooStore";
import EdgeUtil, { EdgeUtilData } from "../utils/edgeUtil";

@scoped(Lifecycle.ContainerScoped)
export default class TattooSource extends DataSource {
    private tattooStore: TattooStore;
    private tattooLoader: TattooLoader;

    public constructor(tattooStore: TattooStore, tattooLoader: TattooLoader) {
        super();

        this.tattooStore = tattooStore;
        this.tattooLoader = tattooLoader;
    }

    public async getNode(id: string): Promise<TattooEntity | null> {
        return this.tattooStore.findId(id);
    }

    public async getEdge(limit: number, cursor?: string): Promise<EdgeUtilData<TattooEntity>> {
        const entities = await this.tattooStore.findList(limit + 1, EdgeUtil.parse(cursor));

        return EdgeUtil.create(entities, limit, ["id"]);
    }

    public async loadByArtist(artist: number, limit: number, cursor?: string): Promise<EdgeUtilData<TattooEntity>> {
        const entities = await this.tattooLoader.getByArtist(artist, limit + 1, EdgeUtil.parse(cursor));

        return EdgeUtil.create(entities, limit, ["id"]);
    }
}
