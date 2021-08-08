import React, { Component } from 'react';
import { NewRecipeTab } from './tabs/new-recipe-tab';
import { PropertiesTab } from './tabs/properties-tab';
import { RecipesTab } from './tabs/recipes-tab';
import { PrintTab } from './tabs/print-tab';
import { NewRecipeModal } from './components/new-recipe-modal';
import { NavBar } from './nav-bar';
import './stylesheets/App.css';
import { IChemProperty, IChemRecipe } from './helpers/entities';
import { AirTableLoaderService } from './loader/airtable-loader';

var $ = require('jquery');

interface AppState {
  isLoading: boolean;
  isPropertiesLoadedSuccess: boolean;
  isRecipesLoadedSuccess: boolean;
  propertiesList: IChemProperty[];
  recipesList: IChemRecipe[];
}

interface AppProps {
}

class App extends Component<AppProps, AppState> {

  private airtableLoader = new AirTableLoaderService();
  constructor(props: any) {
    super(props);
    this.state = {
      isLoading: true,
      isPropertiesLoadedSuccess: true,
      isRecipesLoadedSuccess: true,
      propertiesList: [],
      recipesList: []
    };
  }

  async componentDidMount() {
    var properties = await this.airtableLoader.loadPropertiesList();
    var recipes = await this.airtableLoader.loadRecipesList();
    this.setState({propertiesList: properties, isPropertiesLoadedSuccess: properties.length > 0,
                   recipesList: recipes, isRecipesLoadedSuccess: properties.length > 0 });
    this.setState({isLoading: false})
  }

  public render() {
    return (
      <div className="App">
        {this.state.isLoading &&
          <div className="load-indicator-parent">
            {this.state.isPropertiesLoadedSuccess &&
              <div className="alert alert-warning" id="properties-load-indicator">
                  Properties loading...
              </div>
            }
            {this.state.isRecipesLoadedSuccess &&
              <div className="alert alert-warning" id="recipes-load-indicator">
                  Recipes loading...
              </div>
            }
          </div>
        }
        <NavBar/>
        { !this.state.isLoading &&
          <div className="tab-content container" id="myTabContent">
            <NewRecipeTab propertiesList={this.state.propertiesList} recipesList={this.state.recipesList}/>
            <PropertiesTab/>
            <RecipesTab/>
            <PrintTab/>
          </div>
        }
        <NewRecipeModal/>
        <hr/>
      </div>
    );
  }
}

export default App;
