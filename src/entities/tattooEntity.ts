import { Entity, PrimaryKey, Property } from "@mikro-orm/core";

@Entity({ tableName: "tattoo" })
export default class TattooEntity {
    @PrimaryKey()
    public id!: number;

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
