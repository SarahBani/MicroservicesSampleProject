import { Branch } from "./Branch.model";
import { Entity } from "./Entity.model";

export interface Bank extends Entity {
    name: string;
    grade?: number;
    logoUrl?: string;
    branches?: Branch[]
}
