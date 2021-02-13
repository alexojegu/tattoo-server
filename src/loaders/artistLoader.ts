import DataLoader from "dataloader";
import { Lifecycle, scoped } from "tsyringe";
import ArtistEntity from "../entities/artistEntity";
import ArtistStore from "../stores/artistStore";

@scoped(Lifecycle.ContainerScoped)
export default class ArtistLoader {
    private artistStore: ArtistStore;
    private idCache: DataLoader<number, ArtistEntity | undefined>;
    private studioCache: DataLoader<number, ArtistEntity[]>;

    public constructor(artistStore: ArtistStore) {
        this.artistStore = artistStore;
        this.idCache = new DataLoader(async (ids) => this.batchIds(ids as number[]));
        this.studioCache = new DataLoader(async (studios) => this.batchStudios(studios as number[]));
    }

    public async getById(id: number): Promise<ArtistEntity | undefined> {
        return this.idCache.load(id);
    }

    public async getByStudio(studio: number): Promise<ArtistEntity[]> {
        return this.studioCache.load(studio);
    }

    private async batchIds(ids: number[]): Promise<(ArtistEntity | undefined)[]> {
        const entities = await this.artistStore.findIds(ids);

        return ids.map((id) => entities.find((entity) => entity.id === id));
    }

    private async batchStudios(studios: number[]): Promise<ArtistEntity[][]> {
        const entities = await this.artistStore.findStudios(studios);

        return studios.map((studio) => entities.filter((entity) => entity.studio.unwrap().id === studio));
    }
}
