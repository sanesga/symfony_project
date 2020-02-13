import React from "react";
import agent from "../../agent";
import {
  RESTAURANT_FAVORITED,
  RESTAURANT_UNFAVORITED
} from "../../constants/actionTypes";
import { connect } from "react-redux";

const FAVORITED_CLASS = "btn btn-sm btn-primary";
const NOT_FAVORITED_CLASS = "btn btn-sm btn-outline-primary";

const mapDispatchToProps = dispatch => ({
  favorite: id =>
    dispatch({
      type: RESTAURANT_FAVORITED,
      payload: agent.Tags.favorite(id)
    }),
  unfavorite: id =>
    dispatch({
      type: RESTAURANT_UNFAVORITED,
      payload: agent.Tags.unfavorite(id)
    })
});


const Tags = props => {
  const tags = props.tags;
  // const favoriteButtonClass = tags.favorited ?
  //   FAVORITED_CLASS :
  //   NOT_FAVORITED_CLASS;

  function handleClick(tag) {
    //console.log(id);
    if (tag.favorited) {
      // console.log("si que es favorito");
      // console.log(tag.favorited);
      props.unfavorite(tag.id);
    } else {
      // console.log("no es favorito");
      // console.log(tag.favorited);
      props.favorite(tag.id);
    }
  }

  // const handleClick = ev => {
  //   ev.preventDefault();
  //   // if (restaurant.favorited) {
  //   //   props.unfavorite(tag.id);
  //   // } else {
  //   //   props.favorite(tag.id);
  //   // }
  //  // console.log("click");
  //  props.favorite(tag);
  // };

  // if (props.tags == "undefined") {
  //   console.log("LOS TAGS ESTÁN VACÍOS");
  // }
  if (props.tags) {
  //  console.log("TAGS", tags);
    return (
      <div className="tag-list">
        {tags.map(tag => {
          // const handleClick = ev => {
          //   ev.preventDefault();
          //   props.onClickTag(tag, page => agent.Articles.byTag(tag, page), agent.Articles.byTag(tag));
          // };

          return (
            <div>
              <a href="" key={tag.id}>
                {tag.name}{" "}
              </a>
              <p>{tag.address}</p>
              {/* <button className="btn btn-success" onClick={handleClick(tag.id)}>Favorite</button> */}
              {(() => {
                switch (tag.favorited) {
                  case true:
                    return (
                      <button
                        className="btn btn-success"
                        onClick={() => handleClick(tag)}
                      >
                       Favorite
                      </button>
                    );
                  case false:
                    return (
                      <button
                        className="btn btn-danger"
                        onClick={() => handleClick(tag)}
                      >
                        No favorite
                      </button>
                    );
                }
              })()}
              <br></br>
              <br></br>
            </div>
          );
        })}
      </div>
    );
  } else {
    return <div>Loading restaurants...</div>;
  }
};

//export default Tags;
export default connect(() => ({}), mapDispatchToProps)(Tags);
