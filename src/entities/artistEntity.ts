import { Collection, Entity, ManyToOne, OneToMany, OneToOne, PrimaryKey, Property, Reference } from "@mikro-orm/core";
import AccountEntity from "./accountEntity";
import StudioEntity from "./studioEntity";
import TattooEntity from "./tattooEntity";

@Entity({ tableName: "artist" })
export default class ArtistEntity {
    @PrimaryKey()
    public id!: number;

    @OneToOne({ entity: () => AccountEntity, wrappedReference: true })
    public account!: Reference<AccountEntity>;

    @ManyToOne({ entity: () => StudioEntity, wrappedReference: true })
    public studio!: Reference<StudioEntity>;

    @OneToMany({ entity: () => TattooEntity, mappedBy: "artist" })
    public tattoos: Collection<TattooEntity>;

    @Property({ nullable: true })
    public website?: string;

    @Property({ nullable: true })
    public instagram?: string;

    @Property({ nullable: true })
    public facebook?: string;

    @Property({ onCreate: () => new Date() })
    public created!: Date;

    @Property({ onUpdate: () => new Date(), nullable: true })
    public updated?: Date;

    public constructor() {
        this.tattoos = new Collection<TattooEntity>(this);
    }
}
