import axios from 'axios';

const url = `http://vps746183.ovh.net:3000/api/users/`;

export default class UserService {
    addUser ( username, password ) {
      return axios.post( `${url}`, {
          username, password
      })
    }

    signIn ( username, password ) {
        return axios.get( `${url}user/${username}/${password}`)
      }
}