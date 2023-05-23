import React, { Component } from 'react';
import { NewRecipeTab } from './tabs/new-recipe-tab';
import { PropertiesTab } from './tabs/properties-tab';
import { RecipesTab } from './tabs/recipes-tab';
import { PrintTab } from './tabs/print-tab';
import { NavBar } from './nav-bar';
import './stylesheets/App.css';
import { IChemProperty, IChemRecipe, TabType } from './helpers/entities';
import { AirTableLoaderService } from './loader/airtable-loader';
import * as _ from 'lodash';

interface AppState {
  isLoading: boolean;
  isPropertiesLoadedSuccess: boolean;
  isRecipesLoadedSuccess: boolean;
  propertiesList: IChemProperty[];
  recipesList: IChemRecipe[];
  printQueue: IChemRecipe[];
  currentTab: TabType;
}

interface AppProps {
}

class App extends Component<AppProps, AppState> {
  private airtableLoader = new AirTableLoaderService();
  constructor(props: AppProps) {
    super(props);
    this.state = {
      isLoading: true,
      isPropertiesLoadedSuccess: false,
      isRecipesLoadedSuccess: false,
      propertiesList: [],
      recipesList: [],
      printQueue: [],
      currentTab: 'NewRecipe'
    };
    this.addToPrintQueue = this.addToPrintQueue.bind(this);
  }

  async componentDidMount() {
    var properties = await this.airtableLoader.loadPropertiesList();
    var recipes = await this.airtableLoader.loadRecipesList(properties);
    this.setState({propertiesList: properties, isPropertiesLoadedSuccess: properties.length > 0,
                   recipesList: recipes, isRecipesLoadedSuccess: recipes.length > 0 });
    this.setState({isLoading: !(properties.length > 0 && recipes.length > 0) });
  }

  private setActiveTab = (tab: TabType): void => {
    this.setState({currentTab: tab});
  }

  public addToPrintQueue = (recipe: IChemRecipe) => {
    this.setState({printQueue: [...this.state.printQueue, recipe] })
  }

  public render() {
    return (
      <div className="App">
        {this.state.isLoading &&
          <div className="load-indicator-parent">
            {!this.state.isPropertiesLoadedSuccess &&
              <div className="alert alert-warning" id="properties-load-indicator">
                  Properties loading...
              </div>
            }
            {!this.state.isRecipesLoadedSuccess &&
              <div className="alert alert-warning" id="recipes-load-indicator">
                  Recipes loading...
              </div>
            }
          </div>
        }
        <NavBar
          currentTab={this.state.currentTab}
          setActiveTab={this.setActiveTab}
          printQueueCount={this.state.printQueue.length}
        />
        {!this.state.isLoading &&
          <div className="tab-content container" id="myTabContent">
            {this.state.currentTab === 'NewRecipe' &&
              <>
                <NewRecipeTab propertiesList={this.state.propertiesList}
                  recipesList={this.state.recipesList}
                  addToPrintQueue={this.addToPrintQueue}
                  airtableLoader={this.airtableLoader}
                />
              </>
            }
            {this.state.currentTab === 'PropertiesList' &&
              <PropertiesTab propertiesList={this.state.propertiesList}/>
            }
            {this.state.currentTab === 'RecipesList' &&
              <RecipesTab
                recipesList={this.state.recipesList}
                addToPrintQueue={this.addToPrintQueue}
              />
            }
            {this.state.currentTab === 'PrintList' &&
              <PrintTab
                printQueue={this.state.printQueue}
              />
            }
          </div>
        }
        <hr/>
      </div>
    );
  }
}

export default App;
