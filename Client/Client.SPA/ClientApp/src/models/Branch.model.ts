import { Entity } from "./Entity.model";

export interface Branch extends Entity {
  bankId: number;
  name: string;
  code: string;
  address?: string;
}
