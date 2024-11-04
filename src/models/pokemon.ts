import {PokemonType} from './pokemonType';

export interface Pokemon {
  name: string;
  url: string;
  id: number;
  types: PokemonType[];
}
