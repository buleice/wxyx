import React, { Component } from 'react';
import './App.css';
import Swipers from './components/slider/slider'
import FooterButtons  from './components/buttons/buttons'

class App extends Component {
  render() {
    const lists=['http://cliveimages.youban.com/20181024/5323151353FuXYsna9iN40yVQba8p9_ifamps5.jpg',
        'http://cliveimages.youban.com/20181024/5323151353FuXYsna9iN40yVQba8p9_ifamps5.jpg',
        'http://cliveimages.youban.com/20181024/5323151353FuXYsna9iN40yVQba8p9_ifamps5.jpg']
    return (
      <div className="App">
        <Swipers lists={lists}/>
      <FooterButtons/>
      </div>
    );
  }
}

export default App;
