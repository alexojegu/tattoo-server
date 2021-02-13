import DataLoader from "dataloader";
import { Lifecycle, scoped } from "tsyringe";
import StudioEntity from "../entities/studioEntity";
import StudioStore from "../stores/studioStore";

@scoped(Lifecycle.ContainerScoped)
export default class StudioLoader {
    private studioStore: StudioStore;
    private idCache: DataLoader<number, StudioEntity | undefined>;

    public constructor(studioStore: StudioStore) {
        this.studioStore = studioStore;
        this.idCache = new DataLoader(async (ids) => this.batchIds(ids as number[]));
    }

    public async getById(id: number): Promise<StudioEntity | undefined> {
        return this.idCache.load(id);
    }

    private async batchIds(ids: number[]): Promise<(StudioEntity | undefined)[]> {
        const entities = await this.studioStore.findIds(ids);

        return ids.map((id) => entities.find((entity) => entity.id === id));
    }
}
