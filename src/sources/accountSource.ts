import { DataSource } from "apollo-datasource";
import { Lifecycle, scoped } from "tsyringe";
import AccountEntity from "../entities/accountEntity";
import AccountLoader from "../loaders/accountLoader";
import AccountStore from "../stores/accountStore";

@scoped(Lifecycle.ContainerScoped)
export default class AccountSource extends DataSource {
    private accountStore: AccountStore;
    private accountLoader: AccountLoader;

    public constructor(accountStore: AccountStore, accountLoader: AccountLoader) {
        super();

        this.accountStore = accountStore;
        this.accountLoader = accountLoader;
    }

    public async getNode(id: string): Promise<AccountEntity | null> {
        return this.accountStore.findId(id);
    }

    public async loadById(id: number): Promise<AccountEntity | undefined> {
        return this.accountLoader.getById(id);
    }
}
