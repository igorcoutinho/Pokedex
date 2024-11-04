import React, {useState, useEffect} from 'react';
import {useRoute, useNavigation} from '@react-navigation/native';

import {ScrollView, Alert} from 'react-native';

import {useTheme} from 'styled-components/native';
import LoadingOverlay from '../../../components/Loading';
import api from '../../../services/axiosInstance';
import {CardAnimation} from '../../../components/CardAnimated';
import {
  Ability,
  Attributes,
  AttributesNumber,
  BackButton,
  Container,
  Content,
  ContentBar,
  ContentImage,
  Header,
  PokemonId,
  PokemonImage,
  PokemonName,
  PokemonType,
  PokemonTypeContainer,
  PokemonTypeText,
  ProgressBar,
  StatusBar,
  Title,
} from './styles';

interface IAttributes {
  base_stat: number;
  stat: {
    name: string;
  };
}

interface IAbilitys {
  ability: {
    name: string;
  };
}

type PokemonTypes = {
  type: {
    name:
      | 'grass'
      | 'fire'
      | 'water'
      | 'poison'
      | 'normal'
      | 'bug'
      | 'flying'
      | 'eletric'
      | 'ground';
  };
};

type PokemonProps = {
  id: number;
  name: string;
  stats: IAttributes[];
  abilities: IAbilitys[];
  types: PokemonTypes[];
  color: string;
};

type RouteParams = {
  pokemonId: number;
};

const Details: React.FC = () => {
  const route = useRoute();
  const {colors} = useTheme();

  const {pokemonId} = route.params as RouteParams;
  const {goBack} = useNavigation();

  const [pokemon, setPokemon] = useState({} as PokemonProps);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    async function getPokemonDetail(): Promise<void> {
      try {
        const response = await api.get(`/pokemon/${pokemonId}/`);

        const {stats, abilities, id, name, types} = response.data;

        const currentType = types[0].type.name;

        const color = colors.backgroundCard[currentType];

        setPokemon({
          stats,
          abilities,
          id,
          name,
          types,
          color,
        });

        setIsLoading(false);
      } catch (err) {
        Alert.alert('Ops, ocorreu um erro, tente mais tarde');
      } finally {
        setIsLoading(false);
      }
    }

    getPokemonDetail();
  }, [pokemonId]);

  function navigateBack() {
    goBack();
  }

  if (isLoading) return <LoadingOverlay />;

  return (
    <ScrollView style={{flex: 1}}>
      <Header type={pokemon.types[0].type.name}>
        {/* <BackButton onPress={navigateBack}>
          <Feather name="chevron-left" size={24} color="#fff" />
        </BackButton> */}

        <ContentImage>
          <CardAnimation>
            <PokemonImage
              source={{
                uri: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon.id}.png`,
              }}
            />
          </CardAnimation>
        </ContentImage>

        <Content>
          <PokemonId>#{pokemon.id}</PokemonId>
          <PokemonName>{pokemon.name}</PokemonName>
          <PokemonTypeContainer>
            {pokemon.types.map(({type}) => (
              <PokemonType type={type.name} key={type.name}>
                <PokemonTypeText>{type.name}</PokemonTypeText>
              </PokemonType>
            ))}
          </PokemonTypeContainer>
        </Content>
      </Header>

      <Container>
        <Title type={pokemon.types[0].type.name}> Base States </Title>

        {pokemon.stats.map(attribute => (
          <StatusBar key={attribute.stat.name}>
            <Attributes>{attribute.stat.name}</Attributes>
            <AttributesNumber>{attribute.base_stat}</AttributesNumber>
            <ContentBar>
              <ProgressBar
                type={pokemon.types[0].type.name}
                borderWidth={0}
                progress={100}
                width={attribute.base_stat}
                color={pokemon.color}
              />
            </ContentBar>
          </StatusBar>
        ))}

        <Title type={pokemon.types[0].type.name}> Abilities </Title>
        {pokemon.abilities.map(abilityItem => (
          <Ability key={abilityItem.ability.name}>
            {abilityItem.ability.name}
          </Ability>
        ))}
      </Container>
    </ScrollView>
  );
};

export default Details;
