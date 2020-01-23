import React, { Component } from 'react';
import MainTabNavigator from './navigation/MainTabNavigator';
import { Provider } from 'react-redux'
import store from './store/configureStore'

class App extends Component {
  render() {
    return (
      <Provider store={store}>
          <MainTabNavigator/>
      </Provider>
    );
  }
}

export default App;
