import DataLoader from "dataloader";
import { Lifecycle, scoped } from "tsyringe";
import TattooEntity from "../entities/tattooEntity";
import TattooStore, { TattooStoreCursor } from "../stores/tattooStore";

@scoped(Lifecycle.ContainerScoped)
export default class TattooLoader {
    private tattooStore: TattooStore;
    private artistCache: Record<string, DataLoader<number, TattooEntity[]>>;

    public constructor(tattooStore: TattooStore) {
        this.tattooStore = tattooStore;
        this.artistCache = {};
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

    // eslint-disable-next-line prettier/prettier
    private async batchArtists(artists: number[], limit: number, cursor?: TattooStoreCursor): Promise<TattooEntity[][]> {
        const entities = await this.tattooStore.findArtists(artists, limit, cursor);

        return artists.map((artist) => entities.filter((entity) => entity.artist.unwrap().id === artist));
    }
}
