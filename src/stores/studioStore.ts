import { EntityRepository } from "@mikro-orm/mysql";
import { singleton } from "tsyringe";
import StudioEntity from "../entities/studioEntity";
import OrmClient from "../ormClient";

@singleton()
export default class StudioStore {
    private studioRepository: EntityRepository<StudioEntity>;

    public constructor(ormClient: OrmClient) {
        this.studioRepository = ormClient.em.getRepository(StudioEntity);
    }

    public async findId(id: string | number): Promise<StudioEntity | null> {
        return this.studioRepository.findOne({ id: { $eq: id as number } });
    }

    public async findIds(ids: (string | number)[]): Promise<StudioEntity[]> {
        return this.studioRepository.find({ id: { $in: ids as number[] } });
    }
}
