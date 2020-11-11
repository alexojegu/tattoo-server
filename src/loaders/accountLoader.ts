import DataLoader from "dataloader";
import { Lifecycle, scoped } from "tsyringe";
import AccountEntity from "../entities/accountEntity";
import AccountStore from "../stores/accountStore";

@scoped(Lifecycle.ContainerScoped)
export default class AccountLoader {
    private accountStore: AccountStore;
    private idCache: DataLoader<number, AccountEntity | undefined>;

    public constructor(accountStore: AccountStore) {
        this.accountStore = accountStore;
        this.idCache = new DataLoader(async (ids) => this.batchIds(ids as number[]));
    }

    public async getById(id: number): Promise<AccountEntity | undefined> {
        return this.idCache.load(id);
    }

    private async batchIds(ids: number[]): Promise<(AccountEntity | undefined)[]> {
        const entities = await this.accountStore.findIds(ids);

        return ids.map((id) => entities.find((entity) => entity.id === id));
    }
}
