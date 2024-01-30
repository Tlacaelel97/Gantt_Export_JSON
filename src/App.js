import React, { Component } from 'react';
import Gantt from './components/Gantt';
import { gantt } from 'dhtmlx-gantt';
import Toolbar from './components/Toolbar';
import MessageArea from './components/MessageArea';
import data from './tasks.json'
import './App.css';

gantt.plugins({
  export_api: true
});

class App extends Component {
  state = {
    currentZoom: 'Days',
    messages: []
  };

  addMessage(message) {
    const maxLogLength = 5;
    const newMessage = { message };
    const messages = [
      newMessage,
      ...this.state.messages
    ];

    if (messages.length > maxLogLength) {
      messages.length = maxLogLength;
    }
    this.setState({ messages });
  }

  logDataUpdate = (type, action, item, id) => {
    let text = item && item.text ? ` (${item.text})` : '';
    let message = `${type} ${action}: ${id} ${text}`;
    if (type === 'link' && action !== 'delete') {
      message += ` ( source: ${item.source}, target: ${item.target} )`;
    }
    this.addMessage(message);
  }

  handleZoomChange = (zoom) => {
    this.setState({
      currentZoom: zoom
    });
  }

  onClick(){
    gantt.exportToJSON({
    	name:"gantt.json"
	});
  }

  render() {
    const { currentZoom, messages } = this.state;
    return (
      <div>
        <div className="zoom-bar">
          <Toolbar
            zoom={currentZoom}
            onZoomChange={this.handleZoomChange}
          />
        </div>
        <div className="gantt-container">
          <Gantt
            tasks={data}
            zoom={currentZoom}
            onDataUpdated={this.logDataUpdate}
          />
        </div>
        <div>
          <button type="button" onClick={this.onClick}>
            Export
          </button>
        </div>
        <MessageArea
          messages={messages}
        />
      </div>
    );
  }
}

export default App;