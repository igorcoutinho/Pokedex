import {PokemonType} from './pokemonType';

export interface PokemonRequest {
  id: number;
  types: PokemonType[];
}
