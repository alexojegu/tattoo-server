import { Collection, Entity, OneToMany, OneToOne, PrimaryKey, Property, Reference } from "@mikro-orm/core";
import AccountEntity from "./accountEntity";
import TattooEntity from "./tattooEntity";

@Entity({ tableName: "artist" })
export default class ArtistEntity {
    @PrimaryKey()
    public id!: number;

    @OneToOne(() => AccountEntity, undefined, { wrappedReference: true })
    public account!: Reference<AccountEntity>;

    @OneToMany(() => TattooEntity, "artist")
    public tattoos: Collection<TattooEntity>;

    @Property({ nullable: true })
    public website?: string;

    @Property({ nullable: true })
    public instagram?: string;

    @Property({ nullable: true })
    public facebook?: string;

    @Property({ onCreate: () => new Date() })
    public created!: Date;

    @Property({ nullable: true, onUpdate: () => new Date() })
    public updated?: Date;

    public constructor() {
        this.tattoos = new Collection<TattooEntity>(this);
    }
}
