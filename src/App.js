import React from 'react';
import logo from './logo.svg';
import './App.css';
import Items from './Items'
import Matrix from './Matrix'
import Stepper from './Stepper'

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      selected: "Home / Landing Page"
    };
  }

  changeMatrix(selected){
      this.setState({selected: selected})
  }

  render() {
    let selected = Items[this.state.selected];
    return (
      <div className="App">
        <Stepper selected={this.state.selected} steps={Object.getOwnPropertyNames(Items)} onClick={this.changeMatrix.bind(this)} />
        <Matrix items={selected} />
      </div>
    );
  }
}

export default App;
