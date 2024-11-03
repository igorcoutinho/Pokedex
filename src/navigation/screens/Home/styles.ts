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
    marginTop: 160,
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
});
