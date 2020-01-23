import axios from 'axios';
import { ROOT_URL } from '../../config';

export const requestRestaurants = (params)=>{
 // console.log("estamos en getAll")
  return axios({
    method: 'get',
    url: `${ROOT_URL}/restaurants`,
    headers: [],
    params:Object.assign({
      format:'json'
    },params)
  })
}

export const requestRestaurant = (id)=>{
  //console.log(id);
 // console.log(ROOT_URL);
  return axios({
    method: 'get',
    url: `${ROOT_URL}/restaurant/${id}/`,
    headers: [],
    params:Object.assign({
      format:'json'
    })
  })
}

