(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{52:function(e,t,a){e.exports=a(65)},57:function(e,t,a){},65:function(e,t,a){"use strict";a.r(t);var n=a(0),r=a.n(n),o=a(15),s=a.n(o),c=(a(57),a(8)),i=a(18),u=a(10),l=a(38),d=a(39),h=a(40),m=a(66),f=a(76),p=a(78),b=a(79),v=a(58),w=a(59),C=function(e){function t(){var e;return Object(i.a)(this,t),(e=Object(l.a)(this,Object(d.a)(t).call(this))).state={showAnswer:!1},e}return Object(h.a)(t,e),Object(u.a)(t,[{key:"PlaySound",value:function(e){new Audio(e).play()}},{key:"render",value:function(){var e=this,t=this.props.pinyinContent,a=this.state.showAnswer?this.props.backContent:this.props.simplifiedContent,n=this.state.showAnswer?this.props.backAudio:this.props.frontAudio,o=this.state.showAnswer?"back":"",s=this.state.showAnswer?"back":"front",c=this.state.showAnswer?"nope":"pinyin";return r.a.createElement(m.a,{elevation:0},r.a.createElement(f.a,{className:"card ".concat(o," text-center"),onClick:function(){return e.setState({showAnswer:!e.state.showAnswer})}},r.a.createElement("div",{className:"card__content--".concat(s)},a.replace("\u3002",""),r.a.createElement("div",{className:"card__content--".concat(c)},t))),r.a.createElement("div",{className:"audioButton"},r.a.createElement(p.a,{color:"primary",variant:"text",size:"small",style:{},disabled:!1,title:"Play Audio",onClick:function(){e.PlaySound(n)}},r.a.createElement(b.a,{fontSize:"default"}))),r.a.createElement("div",{className:"card__actions"},r.a.createElement(p.a,{color:"primary",variant:"text",size:"small",className:"card__prev-button",onClick:function(){e.props.showPrevCard(),e.setState({showAnswer:!1})}},"Prev"),r.a.createElement(p.a,{color:"primary",variant:"text",size:"small",className:"card__next-button",onClick:function(){e.props.showNextCard(),e.setState({showAnswer:!1})}},"Next")))}}]),t}(r.a.Component),y=function(e){function t(){var e;return Object(i.a)(this,t),(e=Object(l.a)(this,Object(d.a)(t).call(this))).state={cards:v.fromJS([]),cardNumber:0},e.boundCreateCard=e.setCard.bind(Object(c.a)(e)),e.boundShowPrevCard=e.showPrevCard.bind(Object(c.a)(e)),e.boundShowNextCard=e.showNextCard.bind(Object(c.a)(e)),e}return Object(h.a)(t,e),Object(u.a)(t,[{key:"componentDidMount",value:function(){var e=this;fetch("https://pdlahxxojf.execute-api.us-east-1.amazonaws.com/prod/basic-test/",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({numberOfQuestions:5,numberOfChoices:1,category:"HSK_1"})}).then(function(e){if(!e.ok)throw Error(e.statusText);return e.json()}).then(function(t){var a=t.questions;console.log(t.META_DATA),e.setState({cards:v.fromJS(a),cardNumber:0})}).catch(function(e){console.log("Looks like there was a problem: \n",e)})}},{key:"showNextCard",value:function(){if(this.state.cardNumber+1!==this.state.cards.size){var e=this.state.cardNumber+1;this.setState({cardNumber:e})}}},{key:"showPrevCard",value:function(){if(0!==this.state.cardNumber){var e=this.state.cardNumber-1;this.setState({cardNumber:e})}}},{key:"setCard",value:function(e){var t=this.state.cards.push(e);this.setState({cards:t})}},{key:"generateDots",value:function(){var e=this,t=this.state.cards.size,a=[];return w.times(t).forEach(function(t,n){var o=t===e.state.cardNumber?"active":"";a.push(r.a.createElement("span",{className:"card-container__dot fa fa-circle ".concat(o),key:n,onClick:function(){return e.setState({cardNumber:t})}}))}),a}},{key:"generateCards",value:function(){var e=this;return this.state.cards.map(function(t){return r.a.createElement("div",{},r.a.createElement(C,{simplifiedContent:t.get("simplified"),pinyinContent:t.get("pinyin"),backContent:t.get("english"),frontAudio:t.get("simplifiedUrl"),backAudio:t.get("englishUrl"),showNextCard:e.boundShowNextCard,showPrevCard:e.boundShowPrevCard,cardNumber:e.state.cardNumber}))}).toJS()[this.state.cardNumber]}},{key:"render",value:function(){return r.a.createElement(m.a,{elevation:0},this.generateCards(),r.a.createElement("div",{className:"card-container__dots-wrapper"},this.generateDots()))}}]),t}(r.a.Component),k=a(77),N=a(49),g=a.n(N),E=a(50),S=a(48),x=a.n(S),A=Object(E.a)({palette:{primary:{main:"#2e2b8a"},secondary:x.a},overrides:{MuiCard:{root:{color:"#f1f2f6",backgroundColor:"#38383d"}},MuiPaper:{root:{backgroundColor:"transparent",color:"#f1f2f6"}},MuiSvgIcon:{root:{fontSize:"32px",color:"#f1f2f6"}},MuiButtonBase:{root:{backgroundColor:"#0090eb"}},MuiButton:{root:{margin:"4px"},textPrimary:{"&:hover":{backgroundColor:"#2e2b8a"}},label:{color:"#f1f2f6",fontSize:"16px"}}}});var j=document.getElementById("root");s.a.render(r.a.createElement(function(){return r.a.createElement(g.a,{theme:A},r.a.createElement(k.a,{alignItems:"center",alignContent:"center",container:!0,justify:"center",direction:"column",spacing:0},r.a.createElement(k.a,{item:!0},r.a.createElement(y,{}))))},null),j)}},[[52,1,2]]]);
//# sourceMappingURL=main.c79c810d.chunk.js.map