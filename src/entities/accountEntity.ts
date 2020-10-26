import { Entity, PrimaryKey, Property } from "@mikro-orm/core";

@Entity({ tableName: "account" })
export default class AccountEntity {
    @PrimaryKey()
    public id!: number;

    @Property({ unique: true })
    public email!: string;

    @Property({ hidden: true })
    public password!: string;

    @Property()
    public name!: string;

    @Property()
    public image!: string;

    @Property({ onCreate: () => new Date() })
    public created!: Date;

    @Property({ nullable: true, onUpdate: () => new Date() })
    public updated?: Date;
}
