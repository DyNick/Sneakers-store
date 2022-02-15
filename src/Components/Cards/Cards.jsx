import React, { Fragment,useEffect } from "react";
import styles from "./Cards.module.scss";
import { connect } from "react-redux";
import Card from "./Card/Card";
import CardsFilters from "../CardsFilter/CardsFiltre";
import { getCards } from "../../Redux/Actions/cardsActions";
import axios from "axios";
// import { useDispatch } from "react-redux";
// import { fetchCards } from "../../Redux/Actions/cardsActions";

function Cards({onLoadCards,allCards}) {
  
  useEffect(() => {

      fetch('https://61769eed03178d00173dada0.mockapi.io/cart')
      .then((resp) => resp.json())
      .then(json => {
       onLoadCards(json);
      })

   
  }, []);
  
  return (
    <div className="container">
      <CardsFilters />
      <div className={styles.cardWrapper}>
        <Card items = {allCards}/>
      </div>
    </div>
  );
}

const mapStateToProps = (state) => {
   return {
       allCards: state.cardReducer.cards,
       
   }
}


const mapDispatchToProps = (dispatch) => {
  return {
    onLoadCards: (cards) => {
      dispatch(getCards(cards))
    }
  }
}
export default connect(mapStateToProps,  mapDispatchToProps)(Cards);
