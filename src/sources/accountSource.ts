import { DataSource } from "apollo-datasource";
import { Lifecycle, scoped } from "tsyringe";

@scoped(Lifecycle.ContainerScoped)
export default class AccountSource extends DataSource {
    public getNode(id: string): Record<string, string> {
        return { id };
    }
}
