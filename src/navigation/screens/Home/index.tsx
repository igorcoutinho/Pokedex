import React, {useState} from 'react';
import {
  Alert,
  FlatList,
  ImageBackground,
  Text,
  View,
  TouchableOpacity,
} from 'react-native';
import pokeballImage from '../../../assets/pokeball.png';
import {useNavigation} from '@react-navigation/native';
import {Card} from '../../../components/Card';
import {usePokemons} from '../../../hooks/usePokemons';
import {styles} from './styles';
import {Pokemon} from '../../../models/pokemon';
import LoadingOverlay from '../../../components/Loading';

const HomeScreen: React.FC = () => {
  const {navigate} = useNavigation();
  const [currentPage, setCurrentPage] = useState(1);
  const limit = 40;

  const {data, isLoading, isError} = usePokemons(
    (currentPage - 1) * limit,
    limit,
  );

  const pokemons = data?.pokemons as Pokemon[];

  const totalPokemons = data?.count;

  const handleNavigationPokemonDetail = (id: number) => {
    navigate('PokemonDetail', {id});
  };

  const goToPage = (page: number) => {
    if (page > 0 && page <= Math.ceil(totalPokemons / limit)) {
      setCurrentPage(page);
    }
  };

  if (isLoading) return <LoadingOverlay />; // Show loading only on first load
  if (isError) return <Text>Ops, algo deu errado.</Text>;

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
        renderItem={({item: pokemon}) => (
          <Card
            data={pokemon}
            onPress={() => handleNavigationPokemonDetail(pokemon.id)}
          />
        )}
        contentContainerStyle={styles.flatListContainer}
      />
      <View style={styles.paginationContainer}>
        <TouchableOpacity
          onPress={() => goToPage(currentPage - 1)}
          disabled={currentPage === 1}
          style={[
            styles.paginationButton,
            currentPage === 1 && styles.disabledButton,
          ]}>
          <Text style={styles.buttonText}>Previous</Text>
        </TouchableOpacity>
        <Text style={styles.pageIndicator}>{`Page ${currentPage} of ${Math.ceil(
          totalPokemons / limit,
        )}`}</Text>
        <TouchableOpacity
          onPress={() => goToPage(currentPage + 1)}
          disabled={currentPage === Math.ceil(totalPokemons / limit)}
          style={[
            styles.paginationButton,
            currentPage === Math.ceil(totalPokemons / limit) &&
              styles.disabledButton,
          ]}>
          <Text style={styles.buttonText}>Next</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default HomeScreen;
