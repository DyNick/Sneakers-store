import React, { Fragment, useEffect, useState } from "react";
import styles from "./Card.module.scss";
import { connect } from "react-redux";
import { favoritesGetCard } from "../../../Redux/Actions/favoritesActions";
function Card({
  items,
  filterInputValue,
  filterSelectValue,
  onGetFavoriteCards,
  getFavoritesCards,
}) {
  const [favorite, setFavorite] = useState(false);
  const priceFilter = (vals, c, d) => {
    let ordered = vals.sort((a, b) => (a.price > b.price ? c : d));
    return ordered;
  };
  if (filterSelectValue === "Highest") {
    priceFilter(items, -1, 1);
  }
  if (filterSelectValue === "Lowest") {
    priceFilter(items, 1, -1);
  }

  function onFavoriteHandle(item) {
    //console.log (item.favorite);
    if (item.favorite == false || item.favorite == undefined) {
      item.favorites = true;
    } else {
      item.favorites = false;
    }

    // items.map(i=>{
    //   console.log("i.id",i.id);
    //   console.log("item.id",item.id);
    //   if(i.id === item.id) {
    //     setFavoriteId(item.id)
    //   }
    // })
    onGetFavoriteCards(item);
    postFavorite(item);
  }

  const url = "https://61769eed03178d00173dada0.mockapi.io/favorites";
  async function postFavorite(data) {
    try {
      const response = await fetch(url, {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const json = await response.json();
      console.log("Successes:", JSON.stringify(json));
    } catch (error) {
      console.error("Error:", error);
    }
  }
  
  return (
    <Fragment>
      {items
        .filter((item) =>
          item.title.toLowerCase().includes(filterInputValue.toLowerCase())
        )
        .map((item) => {
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
                    onClick={() => onFavoriteHandle(item)}
                  >
                    <img
                      src={favorite ? "img/heart-liked.svg" : "img/heart.svg"}
                      alt="add to favorites"
                    />
                  </button>
                </div>
              </div>
            </div>
          );
        })}
    </Fragment>
  );
}

const mapStateToProps = (state) => {
  //console.log(state);
  return {
    filterInputValue: state.inputFilterReducer.inputVal,
    filterSelectValue: state.inputFilterReducer.selectVal,
    getFavoritesCards: state.favoriteReducer.cards,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    onGetFavoriteCards: (cards) => {
      dispatch(favoritesGetCard(cards));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Card);
