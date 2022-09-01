import React, { Component } from 'react';
import { TabType } from './helpers/entities';

interface NavBarProps {
  setActiveTab: (tab: TabType) => void;
  currentTab: TabType;
  printQueueCount: number;
}

export class NavBar extends Component<NavBarProps> {
  render() {
    const currentTab = this.props.currentTab;
    return (
      <ul className="nav nav-tabs milonga" id="myTab" role="tablist">
        <li className="nav-item">
          <a className={`nav-link ${currentTab === 'NewRecipe' ? 'active' : ''}`} id="checker-tab" 
             data-toggle="tab" href="#checker" role="tab"
             aria-controls="checker" onClick={() => this.props.setActiveTab('NewRecipe')}>
            New Recipe Input
          </a>
        </li>
        <li className="nav-item">
          <a className={`nav-link ${currentTab === 'PropertiesList' ? 'active' : ''}`} id="properties-tab"
             data-toggle="tab" href="#properties" role="tab" 
             aria-controls="properties" onClick={() => this.props.setActiveTab('PropertiesList')}>
            List of All Properties
          </a>
        </li>
        <li className="nav-item">
          <a className={`nav-link ${currentTab === 'RecipesList' ? 'active' : ''}`} id="recipes-tab"
             data-toggle="tab" href="#recipes" role="tab"
             aria-controls="recipes" onClick={() => this.props.setActiveTab('RecipesList')}>
            List of All Recipes
          </a>
        </li>
        <li className="nav-item">
          <a className={`nav-link ${currentTab === 'PrintList' ? 'active' : ''}`} id="print-tab"
            data-toggle="tab" href="#print" role="tab"
            aria-controls="print" onClick={() => this.props.setActiveTab('PrintList')}
          >
            Print 
            {this.props.printQueueCount > 0 &&
              <span className="badge badge-pill" id="print-recipes-count">
                {this.props.printQueueCount}
              </span>
            }
          </a>
        </li>
      </ul>
    );
  }
}