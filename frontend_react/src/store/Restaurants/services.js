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

export const requestRestaurant = (slug)=>{
  //console.log("estamos en getOne");
  return axios({
    method: 'get',
    url: `${ROOT_URL}/restaurants/${slug}/`,
    headers: [],
    params:Object.assign({
      format:'json'
    })
  })
}

