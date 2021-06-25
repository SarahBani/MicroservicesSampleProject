import { Country } from "./Country.model";
import { Entity } from "./Entity.model";

export interface City extends Entity {
  countryId: number;
  name: string;
  country: Country;
}
