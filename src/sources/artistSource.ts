import { DataSource } from "apollo-datasource";
import { Lifecycle, scoped } from "tsyringe";
import ArtistEntity from "../entities/artistEntity";
import ArtistStore from "../stores/artistStore";
import EdgeUtil, { EdgeUtilData } from "../utils/edgeUtil";

@scoped(Lifecycle.ContainerScoped)
export default class ArtistSource extends DataSource {
    private artistStore: ArtistStore;

    public constructor(artistStore: ArtistStore) {
        super();

        this.artistStore = artistStore;
    }

    public async getNode(id: string): Promise<ArtistEntity | null> {
        return this.artistStore.findId(id);
    }

    public async getEdge(limit: number, cursor?: string): Promise<EdgeUtilData<ArtistEntity>> {
        const entities = await this.artistStore.findList(limit + 1, EdgeUtil.parse(cursor));

        return EdgeUtil.create(entities, limit, ["id"]);
    }
}
