import axios from 'axios';

async function toggleArticle(state, action) {
  let nextState
  switch (action.type) {
    case 'TOGGLE_ARTICLE':
      const resp = await axios.get( 'http://vps746183.ovh.net:3000/api/articles/articles/')
      nextState = {
        ...state,
        articles: resp
      }
      return nextState || state
  default:
    return state
  }
}

export default toggleArticle
