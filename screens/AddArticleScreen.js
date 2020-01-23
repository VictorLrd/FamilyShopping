import React, { Component } from 'react';
import { AsyncStorage, StyleSheet, View, Alert } from 'react-native';
import { TextInput } from 'react-native';
import { Button } from 'react-native';
import ArticleService from '../services/ArticleService';

export default class AddArticleScreen extends Component {
  service = new ArticleService();

  static navigationOptions = (e) => {
    return {
      title: 'Ajouter un article'
    }
  }
  state = {
    article: '',
    quantite: ''
  }



  save = async () => {
      let user = await AsyncStorage.getItem('USER')
      user = user != null ? JSON.parse(user) : null
      if(user === null) {
        this.props.navigation.navigate('SignUp')
      }
      this.service.addArticle(this.state.article, this.state.quantite, user).then( (response) => {
        Alert.alert(
          'Article bien ajouté'
        )
      })
  }

  render() {
    return(
      <View style={ styles.container }>
        <TextInput style={ styles.input } placeholder="Article" onChangeText={(value) => this.setState({article: value})} value={this.state.article}/>
        <TextInput style={ styles.input } placeholder="Quantité" onChangeText={(value) => this.setState({quantite: value})} value={this.state.quantite}/>
        <Button style={ styles.submitButton }
                title="Ajouter"
                onPress={this.save}/>
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