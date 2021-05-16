import DataLoader from "dataloader";
import { Lifecycle, scoped } from "tsyringe";
import TattooEntity from "../entities/tattooEntity";
import TattooStore, { TattooStoreCursor } from "../stores/tattooStore";

@scoped(Lifecycle.ContainerScoped)
export default class TattooLoader {
    private tattooStore: TattooStore;
    private artistCache: Record<string, DataLoader<number, TattooEntity[]>>;
    private studioCache: Record<string, DataLoader<number, TattooEntity[]>>;

    public constructor(tattooStore: TattooStore) {
        this.tattooStore = tattooStore;
        this.artistCache = {};
        this.studioCache = {};
    }

    public async getByArtist(artist: number, limit: number, cursor?: TattooStoreCursor): Promise<TattooEntity[]> {
        const key = JSON.stringify({ limit, cursor });

        if (!this.artistCache[key]) {
            this.artistCache[key] = new DataLoader(async (artists) => {
                return this.batchArtists(artists as number[], limit, cursor);
            });
        }

        return this.artistCache[key].load(artist);
    }

    public async getByStudio(studio: number, limit: number, cursor?: TattooStoreCursor): Promise<TattooEntity[]> {
        const key = JSON.stringify({ limit, cursor });

        if (!this.studioCache[key]) {
            this.studioCache[key] = new DataLoader(async (studios) => {
                return this.batchStudios(studios as number[], limit, cursor);
            });
        }

        return this.studioCache[key].load(studio);
    }

    // eslint-disable-next-line prettier/prettier
    private async batchArtists(artists: number[], limit: number, cursor?: TattooStoreCursor): Promise<TattooEntity[][]> {
        const entities = await this.tattooStore.findArtists(artists, limit, cursor);

        return artists.map((artist) => entities.filter((entity) => entity.artist.unwrap().id === artist));
    }

    // eslint-disable-next-line prettier/prettier
    private async batchStudios(studios: number[], limit: number, cursor?: TattooStoreCursor): Promise<TattooEntity[][]> {
        const entities = await this.tattooStore.findStudios(studios, limit, cursor);

        return studios.map((studio) => entities.filter((entity) => entity.studio.unwrap().id === studio));
    }
}
