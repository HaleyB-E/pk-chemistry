import { IChemProperty, IChemRecipe } from '../helpers/entities';
import React, { ChangeEvent, Component, SyntheticEvent } from 'react';
import * as _ from 'lodash';
import { NewRecipeModal } from '../components/new-recipe-modal';
import { AirTableLoaderService } from '../loader/airtable-loader';

export interface NewRecipeTabProps {
  propertiesList: IChemProperty[];
  recipesList: IChemRecipe[];
  addToPrintQueue: (recipe: IChemRecipe) => void;
  airtableLoader: AirTableLoaderService;
}

export interface NewRecipeTabState {
  selectedProperties: IChemProperty[];
  unselectedProperties: IChemProperty[];
  currentlyViewableUnselectedProperties: IChemProperty[];
  recipeCheckResults?: JSX.Element;
  filterText: string;
  newRecipeModalVisible: boolean;
}

export class NewRecipeTab extends Component<NewRecipeTabProps, NewRecipeTabState> {
  constructor(props: NewRecipeTabProps) {
    super(props);
    this.filterSearch = this.filterSearch.bind(this);
    this.handlePropertyClick = this.handlePropertyClick.bind(this);
    this.handleRecipeCheck = this.handleRecipeCheck.bind(this);
    this.state = {
      selectedProperties: [],
      unselectedProperties: _.cloneDeep(this.props.propertiesList),
      currentlyViewableUnselectedProperties: _.cloneDeep(this.props.propertiesList),
      recipeCheckResults: undefined,
      filterText: '',
      newRecipeModalVisible: false
    };
  }

  private filterSearch(event: ChangeEvent<HTMLInputElement>) {
    this.setState({
      filterText: event.target.value,
      currentlyViewableUnselectedProperties: _.filter(this.state.unselectedProperties, p => {
        return p.name.includes(this.state.filterText)
      })
    });
  }

  private handlePropertyClick(event: SyntheticEvent) {
    const clickedButton = event.currentTarget;
    const propertyText = clickedButton.getAttribute('value') || '';
    const property = _.find(this.props.propertiesList, p => p.name == propertyText);
    // something went wrong and there's no matching property, yeet
    if (!property) {
      return;
    }

    // if previously unselected, add property to selected list
    if (clickedButton.className.includes('unselected-property')) {
      // max recipe size is 8
      if (this.state.selectedProperties.length === 8) {
        return;
      }
      const unselected = _.filter(this.state.unselectedProperties, p => p.name !== property.name);
      this.setState({
        filterText: '',
        selectedProperties: _.concat(this.state.selectedProperties, property),
        unselectedProperties: unselected,
        currentlyViewableUnselectedProperties: unselected
      });
    // if previously selected, remove property from selected list
    } else if (clickedButton.className.includes('selected-property')) {
      var unselected = _.concat(this.state.unselectedProperties, property);
      unselected.sort((a,b) => a.name.localeCompare(b.name)) // re-alphabetize
      this.setState({
        filterText: '',
        selectedProperties: _.filter(this.state.selectedProperties, p => p.name !== property.name),
        unselectedProperties: unselected,
        currentlyViewableUnselectedProperties: unselected
      });
    } else {
      console.log('something is wrong - button neither selected nor unselected???')
    }
  }

  // check if selected properties form an existing recipe - if not, allow new one to be created
  private handleRecipeCheck() {
    this.setState({recipeCheckResults: undefined})
    let matchedRecipe = this.checkForRecipeMatch(this.state.selectedProperties);
    if (matchedRecipe) {
      this.props.addToPrintQueue(matchedRecipe);
      this.setState({
        selectedProperties: [],
        unselectedProperties: this.props.propertiesList,
        recipeCheckResults: this.getRecipeSpan(matchedRecipe)
      });
    } else {
      this.setModalVisibility(true);
    }
  }

  private getRecipeSpan(matchedRecipe: IChemRecipe) {
    return (
      <span>
        Name: {matchedRecipe.name}
        <br/>
        Effect: {matchedRecipe.mechanics}
        <br/>
        Recipe added to print queue.
      </span>
    )
  }

  public checkForRecipeMatch(propsToCheck: IChemProperty[]): IChemRecipe | null {
    // alphabetize properties to check
    propsToCheck.sort((a,b) => a.name.localeCompare(b.name))

    let matchedRecipe: IChemRecipe | null = null;
    this.props.recipesList.forEach((recipe: IChemRecipe) => {
      // only a possible match if the number of properties input match the number of properties in the recipe
      if (propsToCheck.length === recipe.properties.length) {  
        var matches = true;
        // make sure recipe properties are alphabetized
        recipe.properties.sort((a,b) => a.name.localeCompare(b.name))

        propsToCheck.forEach((prop: IChemProperty, index) => {
          if ((recipe.properties[index].name !== prop.name)) {
            matches = false;
            return false;
          }
        });
        if (matches) {
          matchedRecipe = recipe;
          return false;
        }
      }
    });
    return matchedRecipe;
  }

  private getSearchBox(): JSX.Element {
    return (
      <div className='input-group-text search-box'>
        <input type='text' 
               className='form-control properties-list-filter' 
               placeholder='Filter properties...'
               onChange={this.filterSearch}
               value={this.state.filterText}
               />
      </div>
    )
  }

  private getUnselectedPropertyButtons(): JSX.Element[] {
    return this.state.currentlyViewableUnselectedProperties.map((property: IChemProperty) => 
      this.getPropertyButton(property, false));
  }
  private getSelectedPropertyButtons(): JSX.Element[] {
    return this.state.selectedProperties.map((property: IChemProperty) => 
      this.getPropertyButton(property, true));
  }
  private getPropertyButton(property: IChemProperty, isSelected: boolean) {
    const isSelectedClass = isSelected ? 'selected-property' : 'unselected-property';
    return (
    <button type='button'
      className={'btn btn-secondary btn-lg btn-block '+ isSelectedClass}
      id={property.name}
      value={property.name}
      key={property.name}
      onClick={this.handlePropertyClick}>
      <span className='property-name'>{property.name + '   '}
        <span className='chem-symbol'>{property.symbol}</span>
      </span>
    </button>
    );
  }

  public setModalVisibility = (isVisible: boolean) => {
    this.setState({
      newRecipeModalVisible: isVisible
    });
  }

  render() {
    const canAddToPrintQueue = this.state.selectedProperties.length > 0;
    return (
      <div className="tab-pane fade show active" id="checker" role="tabpanel" aria-labelledby="checker-tab">
        <div className="container">
          <div className="row">
            <div className="col">
              <div className="milonga checker-tab-header-text">Select properties for the recipe:</div>
                <div className="unselected-properties property-column">
                  {this.getSearchBox()}
                  <br/>
                  {this.getUnselectedPropertyButtons()}
                </div>
            </div>
            <div className="col">
              <div className="milonga checker-tab-header-text">Selected properties:</div>
              <div className="selected-properties property-column">
                <div>
                  {this.getSelectedPropertyButtons()}
                  <button className="btn btn-lg btn-block check-recipes-button action-button milonga"
                          disabled={!canAddToPrintQueue}
                          onClick={this.handleRecipeCheck}>
                    Add to Print Queue
                  </button>
                  <span className="recipe-check-results">
                    {this.state.recipeCheckResults &&
                      this.state.recipeCheckResults
                    }
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <NewRecipeModal
          isOpen={this.state.newRecipeModalVisible} 
          setVisible={this.setModalVisibility}
          airtableLoader={this.props.airtableLoader}
          selectedProperties={this.state.selectedProperties}
        />  
      </div> 
    );
  }
}












       