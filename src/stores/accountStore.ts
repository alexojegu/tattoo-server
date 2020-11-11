import { EntityRepository } from "@mikro-orm/mysql";
import { singleton } from "tsyringe";
import AccountEntity from "../entities/accountEntity";
import OrmClient from "../ormClient";

@singleton()
export default class AccountStore {
    private accountRepository: EntityRepository<AccountEntity>;

    public constructor(ormClient: OrmClient) {
        this.accountRepository = ormClient.em.getRepository(AccountEntity);
    }

    public async findId(id: string | number): Promise<AccountEntity | null> {
        return this.accountRepository.findOne({ id: { $eq: id as number } });
    }

    public async findIds(ids: (string | number)[]): Promise<AccountEntity[]> {
        return this.accountRepository.find({ id: { $in: ids as number[] } });
    }
}
