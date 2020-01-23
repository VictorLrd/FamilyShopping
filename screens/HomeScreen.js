import React, { Component } from 'react';
import { AsyncStorage, Button, StyleSheet, View, Text, Image } from 'react-native';
import Loading from '../components/Loading';
import ArticleService from '../services/ArticleService';
import Icon from 'react-native-vector-icons/Ionicons'
import { connect } from 'react-redux'



class HomeScreen extends Component {
  service = new ArticleService();

  state = {
    articles: []
  }

  static navigationOptions = (e) => {
    return {
      title: 'Home',
      headerRight: (
        <Icon style={{color: 'yellow'}} size={25} name={'ios-add'} onPress={() => {
          e.navigation.push('Article')
        }}></Icon>
      ),
      headerLeft: (
        <View>
          <Icon style={{color: 'yellow'}} size={25} name={'ios-barcode'} onPress={() => {
            e.navigation.push('QRCode')
          }}></Icon>
          <Icon style={{color: 'yellow'}} size={25} name={'ios-qr-scanner'} onPress={() => {
            e.navigation.push('Scanner')
          }}></Icon>
        </View>
      )
    }
  };

  componentDidMount = () => {
    this.getArticles()
  }

  componentDidUpdate = () => {
    setTimeout( async ()=> {
      let user = await AsyncStorage.getItem('USER')
      user = user != null ? JSON.parse(user) : null
      if(user != null && user.familyId) {
        this.service.getArticles(user.familyId)
          .then( ( response ) => {
            this.setState( {
              articles: response.data,
            } );
          });
      }
    }, 2000)
  }

   disconnect = async () => {
    await AsyncStorage.removeItem('USER')
    this.props.navigation.navigate('SignUp')
  }

  async getArticles(){
    let user = await AsyncStorage.getItem('USER')
    user = user != null ? JSON.parse(user) : null
    console.log(user)
    if(user === null || !user.familyId) {
      this.props.navigation.navigate('SignUp')
    } else {
      this.service.getArticles(user.familyId)
        .then( ( response ) => {
          this.setState( {
            articles: response.data,
          } );
        });
    }
  }

  render() {
    return(
      <View style={ styles.container }>
          {this.state.articles.map(article => {
                return (
                <View style={ styles.row } key={article._id}>
                  <Text style={ styles.text }>{ article.name } - { article.quantity } - { article._user.username }</Text>
                </View>)
            })}
            <Button style={ styles.submitButton }
                title="Se déconnecter"
                onPress={this.disconnect}/>
      </View>
    );
  }
}

const mapStateToProps = state => {
  return {
    artscles: state
  }
}

export default connect(mapStateToProps)(HomeScreen)
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#003f5c"
  },
  row: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  text: {
    color: '#FFFFFF',
    justifyContent: 'space-between',
  }
});
