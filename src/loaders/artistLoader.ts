import DataLoader from "dataloader";
import { Lifecycle, scoped } from "tsyringe";
import ArtistEntity from "../entities/artistEntity";
import ArtistStore from "../stores/artistStore";

@scoped(Lifecycle.ContainerScoped)
export default class ArtistLoader {
    private artistStore: ArtistStore;
    private idCache: DataLoader<number, ArtistEntity | undefined>;

    public constructor(artistStore: ArtistStore) {
        this.artistStore = artistStore;
        this.idCache = new DataLoader(async (ids) => this.batchIds(ids as number[]));
    }

    public async getById(id: number): Promise<ArtistEntity | undefined> {
        return this.idCache.load(id);
    }

    private async batchIds(ids: number[]): Promise<(ArtistEntity | undefined)[]> {
        const entities = await this.artistStore.findIds(ids);

        return ids.map((id) => entities.find((entity) => entity.id === id));
    }
}
