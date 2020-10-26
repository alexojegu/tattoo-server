import { DataSource } from "apollo-datasource";
import { Lifecycle, scoped } from "tsyringe";
import AccountEntity from "../entities/accountEntity";
import AccountStore from "../stores/accountStore";

@scoped(Lifecycle.ContainerScoped)
export default class AccountSource extends DataSource {
    private accountStore: AccountStore;

    public constructor(accountStore: AccountStore) {
        super();

        this.accountStore = accountStore;
    }

    public async getNode(id: string): Promise<AccountEntity | null> {
        return this.accountStore.findId(id);
    }
}
