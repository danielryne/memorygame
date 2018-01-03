import React, { Component } from "react";
import FriendCard from "./components/FriendCard";
import Nav from "./components/Nav";
import Wrapper from "./components/Wrapper";
import Header from "./components/Header";
import Container from "./Container";
import Row from "./Row";
import Column from "./Column";
import friends from "./friends.json";


// Function to randomly shuffle the friends in the friends array 
function shuffleFriends(array) {
  for (let i = array.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};

// Starts the app 
class App extends Component {
  
  // Sets the state for each item we'll need to keep track, including which images have been clicked  
  state = {
    friends,
    currentScore: 0,
    topScore: 0,
    gameStatus: "Let's Begin",
    clicked: [],
  };

  // Function to check the id of the image that's clicked and compare it to the last image
  handleClick = id => {
    
    //If the image doesn't match the last image clicked 
    if (this.state.clicked.indexOf(id) === -1) {  //checks the index of the given ID, if not found this returns a -1
      this.handleIncrement();
      this.setState({ clicked: this.state.clicked.concat(id) });
    } 

    // If the image does match the last one clicked, reset the game 
      else {
      this.handleReset();
    }
  };

  // Function to increment the score, change the top score and find whether or not someone won
  handleIncrement = () => {
    const newScore = this.state.currentScore + 1;
    this.setState({
      currentScore: newScore,
      gameStatus: "Well done. One step closer..."
    });
    if (newScore >= this.state.topScore) {
      this.setState({ topScore: newScore });
    }
    else if (newScore === 12) {
      this.setState({ gameStatus: "You found Will. Great job!" });
    }

    // Shuffles the characters no matter what
    this.handleShuffle(); 
  };

  // Function to reset the game and and the state data  
  handleReset = () => {
    this.setState({
      currentScore: 0,
      topScore: this.state.topScore,
      gameStatus: "Bad choice...Will is still lost.",
      clicked: []
    });
    this.handleShuffle();
  };

  // Shuffles friends and reassigns them to the state 
  handleShuffle = () => {
    let shuffledFriends = shuffleFriends(friends);
    this.setState({ friends: shuffledFriends });
  };

  // Renders the actual game in Jsx 
  render() {
    return (
      <Wrapper>
        <Header>
          Click the same character twice and Will Byers gets trapped in the upside down forever.
        </Header>

        <Nav
          title="stranger things game"
          score={this.state.currentScore}
          topScore={this.state.topScore}
          gameStatus={this.state.gameStatus}
        />

        <Container>
          <Row>
            {this.state.friends.map(friend => (
              <Column size="md-3 sm-6">
                <FriendCard
                  key={friend.id}
                  handleClick={this.handleClick}
                  id={friend.id}
                  image={friend.image}
                />
              </Column>
            ))}
          </Row>
        </Container>
      </Wrapper>
    );
  }
}

export default App;