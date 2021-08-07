import React, { Component } from 'react';

export class NavBar extends Component {
  render() {
    return (
      <ul className="nav nav-tabs milonga" id="myTab" role="tablist">
        <li className="nav-item">
          <a className="nav-link active" id="checker-tab" data-toggle="tab" href="#checker" role="tab" aria-controls="checker" aria-selected="true">
            New Recipe Input
          </a>
        </li>
        <li className="nav-item">
          <a className="nav-link" id="properties-tab" data-toggle="tab" href="#properties" role="tab" aria-controls="properties" aria-selected="false">
            List of All Properties
          </a>
        </li>
        <li className="nav-item">
          <a className="nav-link" id="recipes-tab" data-toggle="tab" href="#recipes" role="tab" aria-controls="recipes" aria-selected="false">
            List of All Recipes
          </a>
        </li>
        <li className="nav-item">
          <a className="nav-link" id="print-tab" data-toggle="tab" href="#print" role="tab" aria-controls="print" aria-selected="false">
            Print <span className="badge badge-pill" id="print-recipes-count"></span>
          </a>
        </li>
      </ul>
    );
  }
}