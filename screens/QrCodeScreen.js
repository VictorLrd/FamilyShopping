import React, { Component } from 'react';
import { AsyncStorage, StyleSheet, View } from 'react-native';
import QRCode from 'react-native-qrcode';



export default class FamilyScreen extends Component {
    static navigationOptions = {
        title: 'QRCode',
    };

    state = {
        qrCode : ''
    }

    async componentDidMount () {
        let user = await AsyncStorage.getItem('USER')
        user = user != null ? JSON.parse(user) : null
        this.setState({qrCode: user.familyId})
    }

  render() {
    return(
      <View style={ styles.container }>
        <QRCode
          value={this.state.qrCode}
          size={200}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 23
 },
 input: {
    margin: 15,
    height: 40,
    borderColor: 'blue',
    borderWidth: 1
 },
 submitButton: {
    backgroundColor: 'blue',
    padding: 10,
    margin: 15,
    height: 40,
 }
});