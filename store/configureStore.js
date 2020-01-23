// Store/configureStore.js

import { createStore } from 'redux';
import toggleArticle from './Reducers/articleReducer'

export default createStore(toggleArticle)