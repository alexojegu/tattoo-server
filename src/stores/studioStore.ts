import { EntityRepository } from "@mikro-orm/mysql";
import { singleton } from "tsyringe";
import StudioEntity from "../entities/studioEntity";
import OrmClient from "../ormClient";

@singleton()
export default class StudioStore {
    private entityRepository: EntityRepository<StudioEntity>;

    public constructor(ormClient: OrmClient) {
        this.entityRepository = ormClient.em.getRepository(StudioEntity);
    }

    public async findId(id: string | number): Promise<StudioEntity | null> {
        return this.entityRepository.findOne({ id: { $eq: id as number } });
    }

    public async findIds(ids: (string | number)[]): Promise<StudioEntity[]> {
        return this.entityRepository.find({ id: { $in: ids as number[] } });
    }

    public async findList(limit: number, cursor?: StudioStoreCursor): Promise<StudioEntity[]> {
        if (!cursor) {
            return this.entityRepository.findAll({ orderBy: { id: "desc" }, limit });
        }

        return this.entityRepository.find({ id: { $lt: cursor.id as number } }, { orderBy: { id: "desc" }, limit });
    }
}

export interface StudioStoreCursor {
    id: string | number;
}
