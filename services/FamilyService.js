import axios from 'axios';

const url = `http://vps746183.ovh.net:3000/api/family/`;

export default class UserService {
    addFamily ( title ) {
      return axios.post( `${url}`, {
            title
      })
    }
    async getFamilys ( ) {
        const resp = await axios.get( 'http://vps746183.ovh.net:3000/api/family/families')
        return resp
    }
    updateFamily ( family, userId ) {
        return axios.put( `${url}updatebyid`, {
            id: family._id,
            userId: userId,
            data: family
        })
    }
}