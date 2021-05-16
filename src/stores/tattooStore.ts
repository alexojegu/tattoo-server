import { AbstractSqlConnection, EntityRepository } from "@mikro-orm/mysql";
import { singleton } from "tsyringe";
import TattooEntity from "../entities/tattooEntity";
import OrmClient from "../ormClient";

@singleton()
export default class TattooStore {
    private connection: AbstractSqlConnection;
    private entityRepository: EntityRepository<TattooEntity>;

    public constructor(ormClient: OrmClient) {
        this.connection = ormClient.em.getConnection("read");
        this.entityRepository = ormClient.em.getRepository(TattooEntity);
    }

    public async findId(id: string | number): Promise<TattooEntity | null> {
        return this.entityRepository.findOne({ id: { $eq: id as number } });
    }

    // eslint-disable-next-line prettier/prettier
    public async findArtists(artists: (string | number)[], limit: number, cursor?: TattooStoreCursor): Promise<TattooEntity[]> {
        let results;

        if (cursor) {
            results = await this.connection.execute(
                `select e0.id, e1.* from artist as e0 left join lateral (
                    select e2.* from tattoo as e2 where e2.artist_id = e0.id and e2.id < ? order by e2.id desc limit ?
                ) as e1 on e0.id = e1.artist_id where e1.artist_id in (?)`,
                [cursor.id, limit, artists],
            );
        } else {
            results = await this.connection.execute(
                `select e0.id, e1.* from artist as e0 left join lateral (
                    select e2.* from tattoo as e2 where e2.artist_id = e0.id order by e2.id desc limit ?
                ) as e1 on e0.id = e1.artist_id where e1.artist_id in (?)`,
                [limit, artists],
            );
        }

        return results.map((result) => this.entityRepository.map(result));
    }

    // eslint-disable-next-line prettier/prettier
    public async findStudios(studios: (string | number)[], limit: number, cursor?: TattooStoreCursor): Promise<TattooEntity[]> {
        let results;

        if (cursor) {
            results = await this.connection.execute(
                `select e0.id, e1.* from studio as e0 left join lateral (
                    select e2.* from tattoo as e2 where e2.studio_id = e0.id and e2.id < ? order by e2.id desc limit ?
                ) as e1 on e0.id = e1.studio_id where e1.studio_id in (?)`,
                [cursor.id, limit, studios],
            );
        } else {
            results = await this.connection.execute(
                `select e0.id, e1.* from studio as e0 left join lateral (
                    select e2.* from tattoo as e2 where e2.studio_id = e0.id order by e2.id desc limit ?
                ) as e1 on e0.id = e1.studio_id where e1.studio_id in (?)`,
                [limit, studios],
            );
        }

        return results.map((result) => this.entityRepository.map(result));
    }

    public async findList(limit: number, cursor?: TattooStoreCursor): Promise<TattooEntity[]> {
        const query = this.entityRepository.createQueryBuilder("e0").select(["e0.*"]);

        if (cursor) {
            query.where({ id: { $lt: cursor.id } });
        }

        return query.orderBy({ id: "desc" }).limit(limit).getResult();
    }
}

export interface TattooStoreCursor {
    id: string | number;
}
