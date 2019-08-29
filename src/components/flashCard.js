import React from "react";
const Immutable = require("immutable");
var _ = require("lodash");
const QUESTION_URL = `https://pdlahxxojf.execute-api.us-east-1.amazonaws.com/prod/basic-test/`;
class Card extends React.Component {
  constructor() {
    super();
    this.state = {
      showAnswer: false
    };
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
    const actionClass = this.state.showAnswer ? "active" : "";

    return React.createElement(
      "div",
      {},
      React.createElement(
        "div",
        {
          className: `card ${cardClass} text-center`,
          onClick: () => this.setState({ showAnswer: !this.state.showAnswer })
        },

        React.createElement(
          "div",
          { className: `card__content--${contentClass}` },
          content.replace("。", ""),
          React.createElement(
            "div",
            { className: `card__content--${pinyinClass}` },
            pinyinContent
          )
        ),
        React.createElement(
          "div",
          { className: `card__actions ${actionClass}` },
          React.createElement(
            "div",
            {
              className: "card__prev-button",
              onClick: () => {
                this.props.showPrevCard();
                this.setState({ showAnswer: false });
              }
            },
            "Prev"
          ),
          React.createElement(
            "div",
            {
              className: "card__next-button",
              onClick: () => {
                this.props.showNextCard();
                this.setState({ showAnswer: false });
              }
            },
            "Next"
          )
        )
      ),
      React.createElement(
        "div",
        {
          className: "audio_container"
        },
        React.createElement("audio", {
          src: audioFile,
          id: "player",
          controls: "controls"
        })
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
      numberOfQuestions: 5,
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
  //TODO-1: this no longer works and lodash probably is not needed
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
        React.createElement(Card, {
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
      "div",
      {},
      this.generateCards(),
      React.createElement(
        "div",
        { className: "card-container__dots-wrapper" },
        this.generateDots()
      )
    );
  }
}

class FlashCard extends React.Component {
  render() {
    return React.createElement(
      "div",
      { className: "wrapper" },
      React.createElement(
        "div",
        { className: "content-wrapper" },
        React.createElement(CardContainer, null)
      )
    );
  }
}
// ReactDOM.render(
//   React.createElement(Main, null),
//   document.getElementById("app")
// );
export default FlashCard;
