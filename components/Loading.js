import React, { Component } from 'react';
import { View, Text } from 'react-native';
import PropTypes from 'prop-types';
import { ActivityIndicator } from 'react-native-paper';

export default class Loading extends Component {
  static propTypes = {
    displayColor: PropTypes.string.isRequired
  }
  
  state = {}

  render() {
    return (
      <View style={ { flex: 1, justifyContent: 'center', alignItems: 'center' } }>
        <ActivityIndicator size='large' color={ this.props.displayColor } />
        <Text style={ { color: this.props.displayColor } }> Loading... </Text>
      </View>
    );
  }
}