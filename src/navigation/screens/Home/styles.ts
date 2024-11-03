import {Dimensions, StyleSheet} from 'react-native';

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
    backgroundColor: 'red',
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
});
