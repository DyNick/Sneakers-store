import React, { Fragment, useEffect, useState } from "react";
import { connect } from "react-redux";
import styles from "../Components/Cards/Card/Card.module.scss";
import style from "../Components/Cards/Cards.module.scss";

function Favorites() {
  const [items, setItems] = useState([]);
  //const [favorite, setFavorite] = useState([]);
  useEffect(() => {
    fetch("https://61769eed03178d00173dada0.mockapi.io/favorites")
      .then((resp) => resp.json())
      .then((json) => {
        setItems(json);
      });
  }, []);

  function onFavoriteHandler(item) {
    console.log(item);
  }
  return (
    <Fragment>
      <div className="container">
        <div className={style.cardWrapper}>
          {items.length <= 0 ? (
            <div className="">
              <h1>Yo do not have favorite items </h1>
            </div>
          ) : (
            items.map((item) => {
              return (
                <div className={styles.card} key={item.id}>
                  <div className={styles.cardBody}>
                    <img
                      src={item.imageUrl}
                      className={styles.cardImage}
                      alt={item.title}
                    />
                    <h5 className={styles.cardTitle}>{item.title}</h5>
                    <p className={styles.cardPrice}>
                      <b>{item.price} $</b>
                    </p>

                    <div className={styles.cardButtonWrapper}>
                      <button className={styles.cardButton}>
                        <img src="img/plus.svg" alt="add to basket" />
                      </button>

                      <button
                        className={styles.cardButton}
                        onClick={(e) => onFavoriteHandler.bind(e, item)}
                      >
                        {item.favorites ? (
                          <img
                            src={"img/heart-liked.svg"}
                            alt="add to favorites"
                          />
                        ) : (
                          <img src={"img/heart.svg"} alt="add to favorites" />
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
    </Fragment>
  );
}

// const mapStateToProps = (state) => {
//   console.log(state);
//   return {
//     getFavoritesCards: state.favoriteReducer.cards,
//   };
// };
// const mapDispatchToProps = (dispatch) => {
//   return {
//     onGetFavoriteCards: (cards) => {
//       dispatch(favoritesGetCard(cards))
//     }
//   }
// }

export default connect(null, null)(Favorites);
