import axios from 'axios';

const url = `http://vps746183.ovh.net:3000/api/articles/`;

export default class ArticleService {
    addArticle ( name, quantity, user ) {
        console.log(user)
        console.log(name, quantity)
      return axios.post( 'http://vps746183.ovh.net:3000/api/articles/', {
        name: name,
        quantity: quantity,
        _user: user._id,
        _family: user.familyId
      })
    }
    async getArticles ( familyId ) {
        const resp = await axios.get( 'http://vps746183.ovh.net:3000/api/articles/articles/'+familyId)
        return resp
    }
}