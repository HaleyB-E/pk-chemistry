import React, { Component } from 'react';

export class RecipesTab extends Component {
  render() {
    return (
      <div className="tab-pane fade" id="recipes" role="tabpanel" aria-labelledby="recipes-tab">
        <br/>
        <table className="table table-striped border">
          <tbody id="recipes-list-display"></tbody>
        </table>
      </div>
    );
  }
}