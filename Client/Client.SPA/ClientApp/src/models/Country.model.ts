import { City } from "./City.model";
import { Entity } from "./Entity.model";

export interface Country extends Entity {
  name: string;
  flagUrl?: string;
  cities?: City[]
}
