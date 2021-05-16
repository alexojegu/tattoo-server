import { Collection, Entity, OneToMany, PrimaryKey, Property } from "@mikro-orm/core";
import ArtistEntity from "./artistEntity";
import TattooEntity from "./tattooEntity";
import PointType from "./types/pointType";

@Entity({ tableName: "studio" })
export default class StudioEntity {
    @PrimaryKey()
    public id!: number;

    @OneToMany({ entity: () => ArtistEntity, mappedBy: "studio" })
    public artists: Collection<ArtistEntity>;

    @OneToMany({ entity: () => TattooEntity, mappedBy: "studio" })
    public tattoos: Collection<TattooEntity>;

    @Property()
    public name!: string;

    @Property()
    public image!: string;

    @Property({ nullable: true })
    public website?: string;

    @Property({ nullable: true })
    public instagram?: string;

    @Property({ nullable: true })
    public facebook?: string;

    @Property()
    public phone!: string;

    @Property()
    public address!: string;

    @Property({ type: PointType })
    public location!: number[];

    @Property({ columnType: "text" })
    public about!: string;

    @Property({ onCreate: () => new Date() })
    public created!: Date;

    @Property({ onUpdate: () => new Date(), nullable: true })
    public updated?: Date;

    public constructor() {
        this.artists = new Collection<ArtistEntity>(this);
        this.tattoos = new Collection<TattooEntity>(this);
    }
}
