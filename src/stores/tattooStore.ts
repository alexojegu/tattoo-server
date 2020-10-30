import { EntityRepository } from "@mikro-orm/mysql";
import { singleton } from "tsyringe";
import TattooEntity from "../entities/tattooEntity";
import OrmClient from "../ormClient";

@singleton()
export default class TattooStore {
    private tattooRepository: EntityRepository<TattooEntity>;

    public constructor(ormClient: OrmClient) {
        this.tattooRepository = ormClient.em.getRepository(TattooEntity);
    }

    public async findList(limit: number, cursor?: TattooStoreCursor): Promise<TattooEntity[]> {
        const query = this.tattooRepository.createQueryBuilder("e0").select(["e0.*"]);

        if (cursor) {
            query.where({ id: { $lt: cursor.id } });
        }

        return query.orderBy({ id: "desc" }).limit(limit).getResult();
    }
}

export interface TattooStoreCursor {
    id: string | number;
}
