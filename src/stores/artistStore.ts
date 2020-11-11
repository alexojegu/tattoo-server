import { EntityRepository } from "@mikro-orm/mysql";
import { singleton } from "tsyringe";
import ArtistEntity from "../entities/artistEntity";
import OrmClient from "../ormClient";

@singleton()
export default class ArtistStore {
    private artistRepository: EntityRepository<ArtistEntity>;

    public constructor(ormClient: OrmClient) {
        this.artistRepository = ormClient.em.getRepository(ArtistEntity);
    }

    public async findList(limit: number, cursor?: ArtistStoreCursor): Promise<ArtistEntity[]> {
        const query = this.artistRepository.createQueryBuilder("e0").select(["e0.*"]);

        if (cursor) {
            query.where({ id: { $lt: cursor.id } });
        }

        return query.orderBy({ id: "desc" }).limit(limit).getResult();
    }
}

export interface ArtistStoreCursor {
    id: string | number;
}
