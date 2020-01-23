import React, { Component } from 'react';
import { StyleSheet, View, Text } from 'react-native';

export default class SettingsScreen extends Component {
  render() {
    return (
      <View style={ styles.container }>
        <Text> Settings </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#003f5c',
    alignItems: 'center',
    justifyContent: 'center',
  },
});