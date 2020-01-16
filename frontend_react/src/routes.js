import React from 'react';
import {  Route } from 'react-router-dom';
import { RestaurantsList } from './components/RestaurantsList';
import { RelatedRestaurantsList } from './components/RelatedRestaurantsList';
import { FeaturedRestaurantsList } from './components/FeaturedRestaurantsList';
import { RestaurantDetail } from './components/RestaurantDetail';
//import {PostsFeatured} from './components/PostsFeatured';
//import {PostsNext} from './components/RESTAURANTsNext';

//    <Route exact path='/' component={RESTAURANTsFeatured} />
//    <Route path='/' component={PostsNext} />
export const MainRoute = () => (
  <div>
    <Route exact path='/' component={FeaturedRestaurantsList} />
    <Route exact path='/' component={RestaurantsList} />
    <Route exact path='/:slug([a-z0-9-]+)/' component={RestaurantDetail} />
    <Route path='/' component={RelatedRestaurantsList} />
  </div>
)

