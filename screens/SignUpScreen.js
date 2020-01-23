import React, { Component } from 'react';
import { AsyncStorage, StyleSheet, View, Alert } from 'react-native';
import { TextInput } from 'react-native';
import { Button } from 'react-native';
import UserService from '../services/UserService';

export default class SignUpScreen extends Component {
  service = new UserService();

  static navigationOptions = (e) => {
    return {
      title: 'Inscription'
    }
  }
  state = {
    username: '',
    password: ''
  }

  async componentDidMount() {
    let user = await AsyncStorage.getItem('USER')
    user = user != null ? JSON.parse(user) : null
    if(user && user.familyId) {
      this.props.navigation.navigate('Home')
    }
  }

  async componentDidUpdate() {
    let user = await AsyncStorage.getItem('USER')
    user = user != null ? JSON.parse(user) : null
    if(user && user.familyId) {
      this.props.navigation.navigate('Home')
    }
  }

  save = async () => {
      this.service.addUser(this.state.username, this.state.password )
      .then(async (response) => {
        await AsyncStorage.setItem('USER', JSON.stringify(response.data))
        this.props.navigation.navigate('Family')
      }).catch( (err) => {
        Alert.alert(
          'Cet utilisateur existe déjà...'
       )
        console.log('err', err)
      });
  }

  signIn = async () => {
    this.service.signIn(this.state.username, this.state.password )
    .then(async (response) => {
        console.log('signin', response)
        if(response && response.data) {
            await AsyncStorage.setItem('USER', JSON.stringify(response.data))
            this.props.navigation.navigate('Family')
        }
    }).catch( (err) => {
      Alert.alert(
        'Erreur de combinaison'
     )
      console.log('err', err)
    });
}

  render() {
    return(
      <View style={ styles.container }>
        <TextInput style={ styles.input } placeholder="Username" onChangeText={(value) => this.setState({username: value})} value={this.state.username}/>
        <TextInput style={ styles.input } secureTextEntry={true} placeholder="Password" onChangeText={(value) => this.setState({password: value})} value={this.state.password}/>
        <View style={{flex: 1, flexDirection: 'row'}}>
          <View style={{width: 20, height: 50}}></View>
          <View style={{width: 150, height: 50}}>
            <Button style={ styles.submitButton }
                    title="S'inscrire"
                    onPress={this.save}/>
          </View>
          <View style={{width: 50, height: 50}}></View>
          <View style={{width: 150, height: 50}}>
            <Button style={ styles.submitButton }
                    title="Se connecter"
                    onPress={this.signIn}/>
          </View>
        </View>
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