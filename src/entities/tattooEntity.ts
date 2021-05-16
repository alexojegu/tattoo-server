import { Entity, ManyToOne, PrimaryKey, Property, Reference } from "@mikro-orm/core";
import ArtistEntity from "./artistEntity";
import StudioEntity from "./studioEntity";

@Entity({ tableName: "tattoo" })
export default class TattooEntity {
    @PrimaryKey()
    public id!: number;

    @ManyToOne({ entity: () => ArtistEntity, wrappedReference: true })
    public artist!: Reference<ArtistEntity>;

    @ManyToOne({ entity: () => StudioEntity, wrappedReference: true })
    public studio!: Reference<StudioEntity>;

    @Property()
    public image!: string;

    @Property()
    public width!: number;

    @Property()
    public height!: number;

    @Property({ onCreate: () => new Date() })
    public created!: Date;

    @Property({ onUpdate: () => new Date(), nullable: true })
    public updated?: Date;
}
