import React, {useState, useEffect} from 'react';
import {
  Alert,
  FlatList,
  ImageBackground,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import pokeballImage from '../../../assets/pokeball.png';
import {useNavigation} from '@react-navigation/native';
import {Pokemon} from '../../../models/pokemon';
import api from '../../../services/axiosInstance';
import {PokemonRequest} from '../../../models/pokemonRequest';
import {Card} from '../../../components/Card';
import {styles} from './styles';

const HomeScreen: React.FC<{navigation: any}> = ({navigation}) => {
  const {navigate} = useNavigation();
  const [load, setLoad] = useState<boolean>(true);
  const [pokemons, setPokemons] = useState<Pokemon[]>([]);

  useEffect(() => {
    async function getPokemons(): Promise<void> {
      try {
        const response = await api.get('/pokemon');
        const {results} = response.data;

        const payloadPokemons = await Promise.all(
          results.map(async (pokemon: Pokemon) => {
            const {id, types} = await getMoreInfoAboutPokemonsByUrl(
              pokemon.url,
            );

            return {
              name: pokemon.name,
              id,
              types,
            };
          }),
        );

        setPokemons(payloadPokemons as Pokemon[]);
      } catch (err) {
        Alert.alert(
          'Ops, algo de errado aconteceu. Tente novamente mais tarde.',
        );
      } finally {
        setLoad(false);
      }
    }

    getPokemons();
  }, []);

  async function getMoreInfoAboutPokemonsByUrl(
    url: string,
  ): Promise<PokemonRequest> {
    const response = await api.get(url);
    const {id, types} = response.data as PokemonRequest;
    return {id, types};
  }

  function handleNavigationPokemonDetail(id: number) {
    navigate('PokemonDetail', {id});
  }

  return (
    <View style={styles.container}>

      <FlatList
        ListHeaderComponent={
          <>
            <ImageBackground source={pokeballImage} style={styles.header}>
              <Text style={styles.title}>Pokédex</Text>
            </ImageBackground>
          </>
        }
        data={pokemons}
        keyExtractor={pokemon => pokemon.id.toString()}
        showsVerticalScrollIndicator={true}
        renderItem={({item: pokemon}) => (
          <Card
            data={pokemon}
            onPress={() => {
              handleNavigationPokemonDetail(pokemon.id);
              console.log('pokemonId,', pokemon.id);
            }}
          />
        )}
        contentContainerStyle={styles.flatListContainer}
      />
    </View>
  );
};

export default HomeScreen;
