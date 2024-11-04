import {Dimensions, StyleSheet} from 'react-native';
import theme from '../../../global/styles/theme';

const windowWidth = Dimensions.get('window').width;

export const styles = StyleSheet.create({
  loadingScreen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    backgroundColor: 'white',
    flex: 1,
    position: 'relative',
  },
  header: {
    width: windowWidth,
    marginLeft: -20,
    height: 200,
    backgroundColor: theme.colors.background,
  },
  title: {
    color: 'red',
    fontSize: 32,
    lineHeight: 38,
    fontWeight: 'bold',
    marginTop: 120,
    textAlign: 'center',
  },
  flatListContainer: {
    paddingHorizontal: 20,
  },
  paginationContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  paginationButton: {
    backgroundColor: 'red',
    borderRadius: 10,
    paddingVertical: 10,
    width: 100,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  disabledButton: {
    backgroundColor: '#B0BEC5',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  pageIndicator: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#f8d7da',
  },
  errorMessage: {
    color: '#721c24',
    fontSize: 16,
    marginBottom: 10,
    textAlign: 'center',
  },
  refreshButton: {
    backgroundColor: '#f5c6cb',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  refreshButtonText: {
    color: '#721c24',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 16,
    marginBottom: 16,
    justifyContent: 'space-between',
  },
  searchInput: {
    flex: 1,
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 8,
    marginRight: 8,
    width: '50%',
  },
  searchButton: {
    backgroundColor: '#007bff',
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: 'center',
    flex: 1,
    marginRight: 5,
  },
  searchButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  searchedPokemonContainer: {
    marginHorizontal: 16,
    marginBottom: 16,
  },
  searchButtonsContainer: {
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'space-between',
    width: '50%',
  },
  resetButton: {
    backgroundColor: '#FF6347',
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: 'center',
    flex: 1,
  },
  searchViewContainer: {
    flexDirection: 'row',
    paddingHorizontal: 20,
  },
});
