import React, {useState} from 'react';
import {
  Alert,
  FlatList,
  ImageBackground,
  Text,
  View,
  TouchableOpacity,
  TextInput,
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
  const [searchName, setSearchName] = useState('');
  const [triggerSearch, setTriggerSearch] = useState(false);
  const limit = 40;

  const {data, isLoading, isError, refetch} = usePokemons(
    (currentPage - 1) * limit,
    limit,
    triggerSearch ? searchName : '',
  );

  const pokemons =
    triggerSearch && searchName ? (data ? [data] : []) : data?.pokemons || [];
  const totalPokemons = data?.count;

  const handleNavigationPokemonDetail = (pokemonId: number) => {
    navigate('Details', {pokemonId});
  };

  const goToPage = (page: number) => {
    if (page > 0 && (!searchName || page <= Math.ceil(totalPokemons / limit))) {
      setCurrentPage(page);
    }
  };

  const handleSearch = () => {
    setCurrentPage(1);
    setTriggerSearch(true);
    refetch();
  };

  const handleReset = () => {
    setSearchName('');
    setCurrentPage(1);
    setTriggerSearch(false);
    refetch();
  };

  if (isLoading) return <LoadingOverlay />;
  if (isError) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorMessage}>Ops, algo deu errado.</Text>
        <TouchableOpacity
          onPress={() => refetch()}
          style={styles.refreshButton}>
          <Text style={styles.refreshButtonText}>Tentar Novamente</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        ListHeaderComponent={
          <>
            <ImageBackground source={pokeballImage} style={styles.header}>
              <Text style={styles.title}>Pokédex</Text>
              <View style={styles.searchContainer}>
                <TextInput
                  style={styles.searchInput}
                  placeholder="Search Pokémon by name"
                  placeholderTextColor="#999"
                  value={searchName}
                  onChangeText={setSearchName}
                />
                <View style={styles.searchButtonsContainer}>
                  <TouchableOpacity
                    style={styles.searchButton}
                    onPress={handleSearch}>
                    <Text style={styles.buttonText}>Search</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.resetButton}
                    onPress={handleReset}>
                    <Text style={styles.buttonText}>Reset</Text>
                  </TouchableOpacity>
                </View>
              </View>
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
      {!triggerSearch && !searchName && (
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
          <Text
            style={styles.pageIndicator}>{`Page ${currentPage} of ${Math.ceil(
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
      )}
    </View>
  );
};

export default HomeScreen;
