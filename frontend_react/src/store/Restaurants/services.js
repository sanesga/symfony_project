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
  console.log("estamos en getOne en el service de request restaurant");
  return axios({
    method: 'get',
    url: `${ROOT_URL}/restaurant/${id}/`,
    headers: [],
    params:Object.assign({
      format:'json'
    })
  })
}

