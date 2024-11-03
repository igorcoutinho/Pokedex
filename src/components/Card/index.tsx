import React from 'react';

import pokeballCardImage from '../../assets/pokeballCard.png';
import dotsImage from '../../assets/dots.png';
import {CardAnimation} from '../CardAnimated';
import {TouchableOpacityProps} from 'react-native';
import {
  ImageCardDetailLeftSide,
  LeftSide,
  PokeballCardDetail,
  PokemonCard,
  PokemonContentType,
  PokemonId,
  PokemonImage,
  PokemonName,
  PokemonType,
  PokemonTypeText,
  RightSide,
} from './styles';

type PokemonType = {
  type: {
    name: string;
  };
};

type Pokemon = {
  name: string;
  url: string;
  id: number;
  types: PokemonType[];
};

type CardProps = {
  data: Pokemon;
} & TouchableOpacityProps;

export function Card({data, ...rest}: CardProps) {
  return (
    <PokemonCard type={data.types[0].type.name} {...rest}>
      <LeftSide>
        <PokemonId>#{data.id}</PokemonId>
        <PokemonName>{data.name}</PokemonName>
        <ImageCardDetailLeftSide source={dotsImage} />
        <PokemonContentType>
          {data.types.map(pokemonType => (
            <PokemonType
              key={pokemonType.type.name}
              type={pokemonType.type.name}>
              <PokemonTypeText>{pokemonType.type.name}</PokemonTypeText>
            </PokemonType>
          ))}
        </PokemonContentType>
      </LeftSide>

      <RightSide>
        <PokeballCardDetail source={pokeballCardImage} />
        <CardAnimation>
          <PokemonImage
            source={{
              uri: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${data.id}.png`,
            }}
          />
        </CardAnimation>
      </RightSide>
    </PokemonCard>
  );
}
