import React, { Component } from 'react';
import { AsyncStorage, StyleSheet, View, Alert, Picker } from 'react-native';
import { TextInput } from 'react-native';
import { Button } from 'react-native';
import FamilyService from '../services/FamilyService';
import Icon from 'react-native-vector-icons/Ionicons'



export default class FamilyScreen extends Component {

  static navigationOptions = (e) => {
    return {
      title: 'Family'
    }
  };
  service = new FamilyService();

  state = {
    title: '',
    familys: [],
    family: null
  }

  componentDidMount(){
    this.service.getFamilys()
      .then( ( response ) => {
        this.setState( {
          familys: response.data,
        } );
        this.state.familys.forEach(f => console.log(f.title))
      } );
  }

  qrCode () {
    this.props.navigation.navigate('Scanner')
  }

  save = async () => {
      this.service.addFamily(this.state.title)
      .then(async (response) => {
        let user = await AsyncStorage.getItem('USER')
        user = user != null ? JSON.parse(user) : null
        if(user) {
            user['familyId'] = response.data._id
            await AsyncStorage.setItem('USER', JSON.stringify(user))
            this.props.navigation.navigate('Home')
        }
      }).catch( (err) => {
        Alert.alert(
          'Cet utilisateur existe déjà...'
       )
      });
  }
  chooseFamily = async () => {
    let user = await AsyncStorage.getItem('USER')
    user = user != null ? JSON.parse(user) : null
    this.service.updateFamily(this.state.family, user._id.toString()).then(async (response) => {
        user['familyId'] = this.state.family._id
        await AsyncStorage.setItem('USER', JSON.stringify(user))
        this.props.navigation.navigate('Home')
      }).catch( (err) => {
        Alert.alert(
            'Problème rencontré'
        )
        console.log('err', err)
    });
}

  render() {
    return(
      <View style={ styles.container }>
        <TextInput style={ styles.input } placeholder="Nom de votre famille" onChangeText={(value) => this.setState({title: value})} value={this.state.title}/>
        <Button style={ styles.submitButton }
                title="Ajouter"
                onPress={this.save}/>
        <Picker
            selectedValue={this.state.family}
            onValueChange={(itemValue, itemIndex) => this.setState({family: itemValue})}
        >
            {this.state.familys.map(family => {
                return (<Picker.Item label={family.title} value={family} key={family.title}/>)
            })}
        </Picker>
        <Button style={ styles.submitButton }
                title="Choisir cette famille"
                onPress={this.chooseFamily}/>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 23,
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
    marginTop: 20,
    height: 40,
 }
});