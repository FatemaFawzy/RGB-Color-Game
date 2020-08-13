import React, {Component} from 'react';
import './App.css';

function randomize() {
  return Math.floor(Math.random() * 256);
}

export class App extends Component {
  state ={
    Red: 100,
    Green: 200,
    Blue:300,
    Message: "",
    correctBoxId: 0,
    difficult: true,
    Win: false,
  }

  componentDidMount() {

    // reset the header color to a shade of blue
    if (document.getElementsByClassName("header")) document.getElementsByClassName("header")[0].style.backgroundColor= "#4878ab";

    // get a random color and set it to one of the boxes. Get random colors for the rest of the boxes
    this.setState({
      Red: randomize(),
      Green: randomize(),
      Blue: randomize(),
      Message: "",
      win: false,
      correctBoxId: this.state.difficult? Math.floor(Math.random() * 6) + 1 : Math.floor(Math.random() * 3) + 1,
    }, ()=> {
      for (var i=1; i<7; i++) {
        if (document.getElementById(i)) 
        document.getElementById(i).style.backgroundColor = "rgb("+randomize()+","+randomize()+","+randomize()+")";
      }
      if (document.getElementById(this.state.correctBoxId)) 
        document.getElementById(this.state.correctBoxId).style.backgroundColor = "rgb("+this.state.Red+","+this.state.Green+","+this.state.Blue+")";
    });

  }

  chooseLevel =e => {

    const {id} = e.target;
    const level= document.getElementById(id);
    var otherlevel;
    const secondRow= document.getElementsByClassName("second-row")[0];

    if(id==="easy") {
      otherlevel= document.getElementById("hard");
      // hide the second row to reduce the number of boxes
      secondRow.classList.add("hide");
      this.setState({ difficult: false, Message: ""}, ()=> {
        // reset everything
        this.componentDidMount();
      });
    }
    else if(id==="hard") {
      otherlevel= document.getElementById("easy");
      secondRow.classList.remove("hide");
      this.setState({ difficult: true, Message: ""}, ()=> {
        this.componentDidMount();
      });
    }

    // highlight the chosen level button
    level.classList.add("chosen-level");
    otherlevel.classList.remove("chosen-level");

    // show all boxes to start a new game
    for (var i=1; i<7 ; i++) {
      if(document.getElementById(i)) document.getElementById(i).classList.remove("hide");
    }
    
  }

  changeColors =e => {
    this.componentDidMount();
    // show all boxes to start a new game
    for (var i=1; i<7 ; i++) {
      if(document.getElementById(i)) document.getElementById(i).classList.remove("hide");
    }
  }

  pickBox =e => {
    const {id} = e.target;
    const box= document.getElementById(id);

    // enable picking only while the game is still on
    if (!this.state.win) {
      // if the wrong box is picked hide it and show a try again message
      if (id!=this.state.correctBoxId) {
        this.setState({Message: "TRY AGAIN"});
        box.classList.add("hide");
        box.classList.remove("show");
      }

      // if the correct box is picked show a correct message
      else if(id==this.state.correctBoxId) {
        const correctColor= "rgb("+this.state.Red+","+this.state.Green+","+this.state.Blue+")";
        this.setState({Message: "  CORRECT!  ", win: true});
        // show all the boxes and make them the same color
        for (var i=1; i<7 ; i++) {
          if(document.getElementById(i)) {
            document.getElementById(i).classList.remove("hide");
            document.getElementById(i).classList.add("show");
            document.getElementById(i).style.backgroundColor= correctColor;
            // change the header color to match the boxes
            if (document.getElementsByClassName("header")) {
              document.getElementsByClassName("header")[0].style.backgroundColor= correctColor;
              document.getElementsByClassName("header")[0].style.transition= "background-color 0.5s 0s"
            }
          }
        }      
      }
    }
  }

  render(){
    var messageColor= this.state.Message=="TRY AGAIN"? "red": "#2ee82e";
    return (
      <div className="game">
        <div className="header">
          <h4 className="pt-3"> THE GREAT </h4>
          <h1> RGB({this.state.Red}, {this.state.Green}, {this.state.Blue}) </h1>
          <h4 className="pb-3"> GUESSING GAME </h4>
        </div>

        <div className="bar">
          <button className="btn rounded-0" onClick={this.changeColors}> NEW COLORS </button>
          <span className=" message ml-5 mr-5" style={{color: messageColor}}> {this.state.Message} </span>
          <button className="btn rounded-0" id="easy" onClick={this.chooseLevel}> EASY </button>
          <button className="btn rounded-0 chosen-level" id="hard" onClick={this.chooseLevel}> HARD </button>
        </div>

        <div className="container mt-3">

          <div className="row first-row">
            <div id="1" onClick={this.pickBox}> </div> 
            <div id="2" onClick={this.pickBox}> </div> 
            <div id="3" onClick={this.pickBox}> </div> 
          </div>
          <div className="row second-row">
            <div id="4" onClick={this.pickBox}> </div> 
            <div id="5" onClick={this.pickBox}> </div> 
            <div id="6" onClick={this.pickBox}> </div> 
          </div>
          
        </div>

      </div>
    );
  }
}

export default App;
