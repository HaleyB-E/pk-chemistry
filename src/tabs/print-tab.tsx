import React, { Component } from 'react';

export class PrintTab extends Component {
  render() {
    return (
      <div className="tab-pane fade" id="print" role="tabpanel" aria-labelledby="print-tab">
        <br/>
        <div className="print-button-container">
          <button className="print-button btn btn-lg action-button">
            Print All
          </button>
        </div>
        <br/>
        <div>
          <table className="table table-striped border">
            <tbody id="recipes-print-display"></tbody>
          </table>
        </div>
      </div>
    );
  }
}