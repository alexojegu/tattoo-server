export default class EdgeUtil {
    public static create<T, K extends keyof T>(list: T[], limit: number, props: K[]): EdgeUtilData<T> {
        const next = list.length > limit;
        const nodes = next ? list.slice(0, -1) : list;
        const cursor = JSON.stringify(nodes[nodes.length - 1], props as string[]);

        return { nodes, page: { next, cursor } };
    }

    public static encode(cursor?: string): string | undefined {
        if (!cursor) {
            return;
        }

        return Buffer.from(cursor, "utf8").toString("base64");
    }

    public static decode(cursor?: string): string | undefined {
        if (!cursor) {
            return;
        }

        return Buffer.from(cursor, "base64").toString("utf8");
    }

    public static parse<T>(cursor?: string): T | undefined {
        if (!cursor) {
            return;
        }

        return JSON.parse(cursor);
    }
}

export interface EdgeUtilData<T> {
    nodes: T[];
    page: {
        next: boolean;
        cursor?: string;
    };
}
