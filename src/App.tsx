import React, { Component } from 'react';
import { NewRecipeTab } from './tabs/new-recipe-tab';
import { PropertiesTab } from './tabs/properties-tab';
import { RecipesTab } from './tabs/recipes-tab';
import { PrintTab } from './tabs/print-tab';
import { NewRecipeModal } from './components/new-recipe-modal';
import { NavBar } from './nav-bar';
import './stylesheets/App.css';
import { IChemProperty, IChemRecipe } from './helpers/entities';
import { AirTableLoader } from './loader/airtable-loader';

var $ = require('jquery');

interface IChemLoader {
  handleClientLoad(callback: () => AppState): AppState;
  loadAll(): AppState;
  isLoading: boolean;
  isLoadingProperties: boolean;
  isLoadingRecipes: boolean;
  chemProperties: IChemProperty[];
  chemRecipes: IChemRecipe[];
}

interface AppState {
}

interface AppProps {
}

class App extends Component<AppProps, AppState> {
  private propertiesList: IChemProperty[] = [];
  private recipesList: IChemRecipe[] = [];

  private airtableLoader = new AirTableLoader();
  constructor(props: any) {
    super(props);
    this.propertiesList = this.airtableLoader.getPropertiesList();
    this.recipesList = this.airtableLoader.getRecipesList();
  }

  render() {
    return (
      <div className="App">
        {this.airtableLoader.isLoading() &&
          <div className="load-indicator-parent">
            {this.airtableLoader.isLoadingProperties &&
              <div className="alert alert-warning" id="properties-load-indicator">
                  Properties loading...
              </div>
            }
            {this.airtableLoader.isLoadingRecipes &&
              <div className="alert alert-warning" id="recipes-load-indicator">
                  Recipes loading...
              </div>
            }
          </div>
        }
        <NavBar/>
        <div className="tab-content container" id="myTabContent">
          <NewRecipeTab allProperties={this.propertiesList}/>
          <PropertiesTab/>
          <RecipesTab/>
          <PrintTab/>
        </div>
        <NewRecipeModal/>
        <hr/>
      </div>
    );
  }
}

export default App;
