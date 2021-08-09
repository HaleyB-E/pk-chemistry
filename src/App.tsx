import React, { Component } from 'react';
import { NewRecipeTab } from './tabs/new-recipe-tab';
import { PropertiesTab } from './tabs/properties-tab';
import { RecipesTab } from './tabs/recipes-tab';
import { PrintTab } from './tabs/print-tab';
import { NavBar } from './nav-bar';
import './stylesheets/App.css';
import { IChemProperty, IChemRecipe } from './helpers/entities';
import { AirTableLoaderService } from './loader/airtable-loader';
import * as _ from 'lodash';
import { NewRecipeModal } from './components/new-recipe-modal';

interface AppState {
  isLoading: boolean;
  isPropertiesLoadedSuccess: boolean;
  isRecipesLoadedSuccess: boolean;
  propertiesList: IChemProperty[];
  recipesList: IChemRecipe[];
  printQueue: IChemRecipe[];
  newRecipeModalVisible: boolean;
}

interface AppProps {
}

class App extends Component<AppProps, AppState> {

  private airtableLoader = new AirTableLoaderService();
  constructor(props: AppProps) {
    super(props);
    this.state = {
      isLoading: true,
      isPropertiesLoadedSuccess: true,
      isRecipesLoadedSuccess: true,
      propertiesList: [],
      recipesList: [],
      printQueue: [],
      newRecipeModalVisible: false
    };
    this.addToPrintQueue = this.addToPrintQueue.bind(this);
    this.setModalVisibility = this.setModalVisibility.bind(this);
  }

  async componentDidMount() {
    var properties = await this.airtableLoader.loadPropertiesList();
    var recipes = await this.airtableLoader.loadRecipesList();
    this.setState({propertiesList: properties, isPropertiesLoadedSuccess: properties.length > 0,
                   recipesList: recipes, isRecipesLoadedSuccess: properties.length > 0 });
    this.setState({isLoading: false});
  }

  public addToPrintQueue(recipe: IChemRecipe) {
    this.setState({
      printQueue: _.concat(this.state.printQueue, recipe)
    });
  }

  public setModalVisibility(isVisible: boolean) {
    this.setState({
      newRecipeModalVisible: isVisible
    });
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
            <NewRecipeTab propertiesList={this.state.propertiesList}
                          recipesList={this.state.recipesList}
                          addToPrintQueue={this.addToPrintQueue}
                          setModalVisibility={this.setModalVisibility}/>
            <PropertiesTab/>
            <RecipesTab/>
            <PrintTab/>
            <NewRecipeModal isOpen={this.state.newRecipeModalVisible} setVisible={this.setModalVisibility}/>
          </div>
        }
        <hr/>
      </div>
    );
  }
}

export default App;
