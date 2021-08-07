import React, { Component } from 'react';

export class PropertiesTab extends Component {
  render() {
    return (
      <div className="tab-pane fade" id="properties" role="tabpanel" aria-labelledby="properties-tab">
        <br/>
        <ul className="list-group" id="properties-list-display">
        </ul>
      </div>
    );
  }
}