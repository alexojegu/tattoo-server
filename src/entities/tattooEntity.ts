import { Entity, ManyToOne, PrimaryKey, Property, Reference } from "@mikro-orm/core";
import ArtistEntity from "./artistEntity";

@Entity({ tableName: "tattoo" })
export default class TattooEntity {
    @PrimaryKey()
    public id!: number;

    @ManyToOne(() => ArtistEntity, { wrappedReference: true })
    public artist!: Reference<ArtistEntity>;

    @Property()
    public image!: string;

    @Property()
    public width!: number;

    @Property()
    public height!: number;

    @Property({ onCreate: () => new Date() })
    public created!: Date;

    @Property({ nullable: true, onUpdate: () => new Date() })
    public updated?: Date;
}
