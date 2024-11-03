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

const getMoreInfoAboutPokemonsByUrl = async (
  url: string,
): Promise<PokemonRequest> => {
  const response = await api.get(url);
  const {id, types} = response.data as PokemonRequest;
  return {id, types};
};

export const usePokemons = (offset: number, limit: number) => {
  return useQuery({
    queryKey: ['pokemons', offset, limit],
    queryFn: () => fetchPokemons(offset, limit),
  });
};
