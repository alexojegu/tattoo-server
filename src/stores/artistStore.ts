import { EntityRepository } from "@mikro-orm/mysql";
import { singleton } from "tsyringe";
import ArtistEntity from "../entities/artistEntity";
import OrmClient from "../ormClient";

@singleton()
export default class ArtistStore {
    private entityRepository: EntityRepository<ArtistEntity>;

    public constructor(ormClient: OrmClient) {
        this.entityRepository = ormClient.em.getRepository(ArtistEntity);
    }

    public async findId(id: string | number): Promise<ArtistEntity | null> {
        return this.entityRepository.findOne({ id: { $eq: id as number } });
    }

    public async findIds(ids: (string | number)[]): Promise<ArtistEntity[]> {
        return this.entityRepository.find({ id: { $in: ids as number[] } });
    }

    public async findStudios(studios: (string | number)[]): Promise<ArtistEntity[]> {
        return this.entityRepository.find({ studio: { $in: studios as number[] } });
    }

    public async findList(limit: number, cursor?: ArtistStoreCursor): Promise<ArtistEntity[]> {
        if (!cursor) {
            return this.entityRepository.findAll({ orderBy: { id: "desc" }, limit });
        }

        return this.entityRepository.find({ id: { $lt: cursor.id as number } }, { orderBy: { id: "desc" }, limit });
    }
}

export interface ArtistStoreCursor {
    id: string | number;
}
