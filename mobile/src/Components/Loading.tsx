import React from 'react';
import {View, ActivityIndicator, StyleSheet} from 'react-native';

const LoadingCard: React.FC = () => {
  return (
    <View style={styles.loader}>
      <ActivityIndicator size="large" color="#333" />
    </View>
  );
};

export default LoadingCard;

const styles = StyleSheet.create({
  loader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
