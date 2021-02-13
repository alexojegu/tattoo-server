import { DataSource } from "apollo-datasource";
import { Lifecycle, scoped } from "tsyringe";
import ArtistEntity from "../entities/artistEntity";
import ArtistLoader from "../loaders/artistLoader";
import ArtistStore from "../stores/artistStore";
import EdgeUtil, { EdgeUtilData } from "../utils/edgeUtil";

@scoped(Lifecycle.ContainerScoped)
export default class ArtistSource extends DataSource {
    private artistStore: ArtistStore;
    private artistLoader: ArtistLoader;

    public constructor(artistStore: ArtistStore, artistLoader: ArtistLoader) {
        super();

        this.artistStore = artistStore;
        this.artistLoader = artistLoader;
    }

    public async getNode(id: string): Promise<ArtistEntity | null> {
        return this.artistStore.findId(id);
    }

    public async getEdge(limit: number, cursor?: string): Promise<EdgeUtilData<ArtistEntity>> {
        const entities = await this.artistStore.findList(limit + 1, EdgeUtil.parse(cursor));

        return EdgeUtil.create(entities, limit, ["id"]);
    }

    public async loadById(id: number): Promise<ArtistEntity | undefined> {
        return this.artistLoader.getById(id);
    }

    public async loadByStudio(studio: number): Promise<ArtistEntity[]> {
        return this.artistLoader.getByStudio(studio);
    }
}
