import React from 'react';
import {View, ActivityIndicator} from 'react-native';
import {styles} from './styles';

const LoadingOverlay = () => {
  return (
    <View style={styles.overlay}>
      <ActivityIndicator size={100} color="gray" />
    </View>
  );
};

export default LoadingOverlay;
