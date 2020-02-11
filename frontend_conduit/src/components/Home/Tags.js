import React from 'react';
import agent from '../../agent';
//import { RESTAURANT_FAVORITED, RESTAURANT_UNFAVORITED } from '../constants/actionTypes';

// const mapDispatchToProps = dispatch => ({
//   favorite: slug => dispatch({
//     type: ARTICLE_FAVORITED,
//     payload: agent.Articles.favorite(slug)
//   }),
//   unfavorite: slug => dispatch({
//     type: ARTICLE_UNFAVORITED,
//     payload: agent.Articles.unfavorite(slug)
//   })
// });

const Tags = props => {
  const tags = props.tags;
 
  if (tags) {
    //console.log("juanantonio",tags[0].restaurants);
    return (
      <div className="tag-list">
        {
          tags[0].restaurants.map(tag => {
            // const handleClick = ev => {
            //   ev.preventDefault();
            //   props.onClickTag(tag, page => agent.Articles.byTag(tag, page), agent.Articles.byTag(tag));
            // };

            return (
              <div>
              <a href="" key={tag.id}>
                {tag.name}{" "}
              </a>
            <button type="button" className=" btn btn-success">Favorite</button>
              <br></br><br></br>
              </div>
            );
          })
        }
      </div>
    );
  } else {
    return (
      <div>Loading restaurants...</div>
    );
  }
};

export default Tags;
//export default connect(() => ({}), mapDispatchToProps)(Tags);
