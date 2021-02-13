import { Type } from "@mikro-orm/core";

export default class PointType extends Type<number[] | undefined, string | undefined> {
    public convertToDatabaseValue(value: number[] | undefined): string | undefined {
        return value ? `point(${value.join(" ")})` : undefined;
    }

    public convertToJSValue(value: string | undefined): number[] | undefined {
        return value?.match(/-?\d+(\.\d+)?/g)?.map(Number);
    }

    public convertToDatabaseValueSQL(key: string): string {
        return `ST_GeomFromText(${key}, 4326)`;
    }

    public convertToJSValueSQL(key: string): string {
        return `ST_AsText(${key})`;
    }

    public getColumnType(): string {
        return "point srid 4326";
    }
}
