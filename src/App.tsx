import React, { Component } from 'react';
import DataStreamer, { ServerRespond } from './DataStreamer';
import Graph from './Graph';
import './App.css';

interface IState {
  data: ServerRespond[],
  showGraph: boolean,
}

class App extends Component<{}, IState> {
  constructor(props: {}) {
    super(props);
    this.state = {
      data: [],
      showGraph: false,
    };
  }

  renderGraph() {
    if(this.state.showGraph){
      return (<Graph data={this.state.data}/>)
   }
   }


  getDataFromServer() {
    let x=0;
    const interval = setInterval(() => {
       DataStreamer.getData((serverResponds: ServerRespond[]) => {
        this.setState({ 
          data: serverResponds,
          showGraph: true,
         });
      });
      x++;
      if(x > 1000) {
        clearInterval(interval);
      }
      }, 100 );
  
    }

    render() {
      return (
        <div className="App">
          <header className="App-header">
            Bank & Merge Co Task 2
          </header>
          <div className="App-content">
            <button className="btn btn-primary Stream-button"
              // when button is click, our react app tries to request
              // new data from the server.
              // As part of your task, update the getDataFromServer() function
              // to keep requesting the data every 100ms until the app is closed
              // or the server does not return anymore data.
              onClick={() => {this.getDataFromServer()}}>
              Start Streaming Data
            </button>
            <div className="Graph">
              {this.renderGraph()}
            </div>
          </div>
        </div>
      )
    }
  }
  export default App;
