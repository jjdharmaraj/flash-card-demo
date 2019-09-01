import React from "react";
import { Button, Card, Paper } from "@material-ui/core";
import { PlayArrow } from "@material-ui/icons";
const Immutable = require("immutable");
var _ = require("lodash");

const QUESTION_URL = `https://pdlahxxojf.execute-api.us-east-1.amazonaws.com/prod/basic-test/`;

class FlashCard extends React.Component {
  constructor() {
    super();
    this.state = {
      showAnswer: false
    };
  }
  PlaySound(url) {
    new Audio(url).play();
  }
  render() {
    //back && answer=true are the english and front && answer=false is the simplified/pinyin
    const pinyinContent = this.props.pinyinContent;
    const content = this.state.showAnswer
      ? this.props.backContent
      : this.props.simplifiedContent;
    const audioFile = this.state.showAnswer
      ? this.props.backAudio
      : this.props.frontAudio;
    const cardClass = this.state.showAnswer ? "back" : "";
    const contentClass = this.state.showAnswer ? "back" : "front";
    const pinyinClass = this.state.showAnswer ? "nope" : "pinyin";

    return React.createElement(
      Paper,
      { elevation: 0 },
      React.createElement(
        Card,
        {
          className: `card ${cardClass} text-center`,
          onClick: () => this.setState({ showAnswer: !this.state.showAnswer })
        },

        React.createElement(
          "div",
          { className: `card__content--${contentClass}` },
          React.createElement(
            "span",
            { className: "card__content--simplified" },
            content.replace("。", "")
          ),
          React.createElement(
            "div",
            { className: `card__content--${pinyinClass}` },
            pinyinContent
          )
        )
      ),
      React.createElement(
        "div",
        { className: `audioButton` },
        React.createElement(
          Button,
          {
            color: `primary`,
            variant: `text`,
            size: `small`,
            style: {},
            disabled: false,
            title: `Play Audio`,
            onClick: () => {
              this.PlaySound(audioFile);
            }
          },
          React.createElement(PlayArrow, { fontSize: "default" })
        )
      ),
      React.createElement(
        "div",
        { className: `card__actions` },
        React.createElement(
          Button,
          {
            color: `primary`,
            variant: `text`,
            size: `small`,
            className: "card__prev-button",
            onClick: () => {
              this.props.showPrevCard();
              this.setState({ showAnswer: false });
            }
          },
          "Prev"
        ),
        React.createElement(
          Button,
          {
            color: `primary`,
            variant: `text`,
            size: `small`,
            className: "card__next-button",
            onClick: () => {
              this.props.showNextCard();
              this.setState({ showAnswer: false });
            }
          },
          "Next"
        )
      )
    );
  }
}

class CardContainer extends React.Component {
  constructor() {
    super();
    this.state = {
      cards: Immutable.fromJS([]),
      cardNumber: 0
    };

    this.boundCreateCard = this.setCard.bind(this);
    this.boundShowPrevCard = this.showPrevCard.bind(this);
    this.boundShowNextCard = this.showNextCard.bind(this);
  }
  componentDidMount() {
    const body = {
      numberOfQuestions: 10,
      numberOfChoices: 1,
      category: "HSK_1"
    };
    fetch(QUESTION_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(body)
    })
      .then(response => {
        if (!response.ok) {
          throw Error(response.statusText);
        }
        return response.json();
      })
      .then(cards => {
        let questions = cards.questions;
        console.log(cards.META_DATA);
        this.setState({ cards: Immutable.fromJS(questions), cardNumber: 0 });
      })
      .catch(function(error) {
        console.log("Looks like there was a problem: \n", error);
      });
  }

  showNextCard() {
    if (this.state.cardNumber + 1 !== this.state.cards.size) {
      let cardNumber = this.state.cardNumber + 1;
      this.setState({ cardNumber });
    }
  }

  showPrevCard() {
    if (this.state.cardNumber !== 0) {
      let cardNumber = this.state.cardNumber - 1;
      this.setState({ cardNumber });
    }
  }

  setCard(card) {
    const newCards = this.state.cards.push(card);
    this.setState({ cards: newCards });
  }
  //TODO-1: replace this with material and porbably remove lodash
  generateDots() {
    const times = this.state.cards.size;
    let arr = [];
    _.times(times).forEach((num, index) => {
      const dotClass = num === this.state.cardNumber ? "active" : "";
      arr.push(
        React.createElement("span", {
          className: `card-container__dot fa fa-circle ${dotClass}`,
          key: index,
          onClick: () => this.setState({ cardNumber: num })
        })
      );
    });
    return arr;
  }
  generateCards() {
    const cards = this.state.cards;
    const cardsList = cards.map(card => {
      return React.createElement(
        "div",
        {},
        React.createElement(FlashCard, {
          simplifiedContent: card.get("simplified"),
          pinyinContent: card.get("pinyin"),
          backContent: card.get("english"),
          frontAudio: card.get("simplifiedUrl"),
          backAudio: card.get("englishUrl"),
          showNextCard: this.boundShowNextCard,
          showPrevCard: this.boundShowPrevCard,
          cardNumber: this.state.cardNumber
        })
      );
    });
    return cardsList.toJS()[this.state.cardNumber];
  }
  render() {
    return React.createElement(
      Paper,
      { elevation: 0 },
      this.generateCards(),
      React.createElement(
        "div",
        { className: "card-container__dots-wrapper" },
        this.generateDots()
      )
    );
  }
}
export default CardContainer;
