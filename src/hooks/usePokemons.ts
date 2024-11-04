import {useQuery} from '@tanstack/react-query';
import api from '../services/axiosInstance';
import {Pokemon} from '../models/pokemon';
import {PokemonRequest} from '../models/pokemonRequest';

const fetchPokemons = async (
  offset: number,
  limit: number,
): Promise<{count: number; pokemons: Pokemon[]}> => {
  const response = await api.get(`/pokemon?offset=${offset}&limit=${limit}`);
  const {count, results} = response.data;

  const payloadPokemons = await Promise.all(
    results.map(async (pokemon: Pokemon) => {
      const {id, types} = await getMoreInfoAboutPokemonsByUrl(pokemon.url);
      return {
        name: pokemon.name,
        id,
        types,
      };
    }),
  );

  return {count, pokemons: payloadPokemons};
};

const fetchPokemonByName = async (name: string): Promise<Pokemon | null> => {
  try {
    const response = await api.get(`/pokemon/${name.toLowerCase()}`);
    const {id, types} = response.data;
    return {name, id, types};
  } catch {
    return null;
  }
};

const getMoreInfoAboutPokemonsByUrl = async (
  url: string,
): Promise<PokemonRequest> => {
  const response = await api.get(url);
  const {id, types} = response.data as PokemonRequest;
  return {id, types};
};

export const usePokemons = (offset: number, limit: number, name?: string) => {
  return useQuery({
    queryKey: name ? ['pokemon', name] : ['pokemons', offset, limit],
    queryFn: () =>
      name ? fetchPokemonByName(name) : fetchPokemons(offset, limit),
    enabled: !name || name.trim().length > 0,
  });
};
