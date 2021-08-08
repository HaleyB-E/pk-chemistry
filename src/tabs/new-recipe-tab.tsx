import { IChemProperty, IChemRecipe } from '../helpers/entities';
import React, { ChangeEvent, Component, SyntheticEvent } from 'react';
import * as _ from 'lodash';

var $ = require('jquery');

export interface NewRecipeTabProps {
  propertiesList: IChemProperty[];
  recipesList: IChemRecipe[];
}

export interface NewRecipeTabState {
  selectedProperties: IChemProperty[];
  unselectedProperties: IChemProperty[];
}

export class NewRecipeTab extends Component<NewRecipeTabProps, NewRecipeTabState> {
  constructor(props: NewRecipeTabProps) {
    super(props);
    this.filterSearch = this.filterSearch.bind(this);
    this.handlePropertyClick = this.handlePropertyClick.bind(this);
    this.handleRecipeCheck = this.handleRecipeCheck.bind(this);
    this.state = {
      selectedProperties: [],
      unselectedProperties: this.props.propertiesList
    };
  }

  private filterSearch(event: ChangeEvent<HTMLInputElement>) {
    const filterText = event.target.value;
    $.each($('.unselected-property'), function(index: number, property: any) {
      if (property.value.includes(filterText)){
        $(property).show();
      }
      else {
        $(property).hide();
      }
    })
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
      this.setState({
        selectedProperties: _.concat(this.state.selectedProperties, property),
        unselectedProperties: _.filter(this.state.unselectedProperties, p => p.name !== property.name)
      });
    // if previously selected, remove property from selected list
    } else if (clickedButton.className.includes('selected-property')) {
      var unselected = _.concat(this.state.unselectedProperties, property);
      unselected.sort((a,b) => a.name.localeCompare(b.name)) // re-alphabetize
      this.setState({
        selectedProperties: _.filter(this.state.selectedProperties, p => p.name !== property.name),
        unselectedProperties: unselected
      });
    } else {
      console.log('fuck')
    }
  }

  // check if selected properties form an existing recipe - if not, allow new one to be created
  private handleRecipeCheck() {
    var chosenProperties = this.state.selectedProperties;

  }
// $(document).on('click', ".check-recipes-button", function(event) {
//   var chosenProperties = getSelectedProperties();
//   var resultsSpan = $('.recipe-check-results');
//   // clear out previous display
//   resultsSpan.empty();
//   // display 
//   var matchedRecipe = checkForRecipeMatch(chosenProperties);
//   if (matchedRecipe) {
//       // clear out selected properties
//       $.each($('.selected-property'), function(i,p) {p.click();});
//       // show info about selected recipe in results span
//       resultsSpan.append("Name: " + matchedRecipe.name);
//       resultsSpan.append("<br>");
//       resultsSpan.append("Effect: " + matchedRecipe.mechanics);
//       resultsSpan.append("<br>");
//       resultsSpan.append("Recipe added to print queue.")
      
//       chemApp.addRecipeToPrintQueue(matchedRecipe);
//   } else {
//       // if the Recipe is not defined yet, show modal to define a new one
//       $('#addNewModal').modal('show');
//   }
// });


  // // check if selected properties form an existing recipe - if not, allow new one to be created
  //TODO: make reacty
  public checkIfRecipeExists(event: Event) {
    var chosenProperties = this.state.selectedProperties;
    var resultsSpan = $('.recipe-check-results');
    // clear out previous display
    resultsSpan.empty();
    // display 
    var matchedRecipe = this.checkForRecipeMatch(chosenProperties);
    if (matchedRecipe) {
        // clear out selected properties
        $.each($('.selected-property'), function(i: number,p: any) {p.click();});
        // show info about selected recipe in results span
        resultsSpan.append("Name: " + matchedRecipe.name);
        resultsSpan.append("<br>");
        resultsSpan.append("Effect: " + matchedRecipe.mechanics);
        resultsSpan.append("<br>");
        resultsSpan.append("Recipe added to print queue.")
        
        //chemApp.addRecipeToPrintQueue(matchedRecipe);
    } else {
        // if the Recipe is not defined yet, show modal to define a new one
        $('#addNewModal').modal('show');
    }
  }

  // helper method for recipe check
  // TODO: FIX TYPING
  public checkForRecipeMatch(propsToCheck: IChemProperty[]): IChemRecipe | undefined {
    let matchedRecipe: IChemRecipe | null = null;
    this.props.recipesList.forEach((recipe: IChemRecipe) => {
      // only a possible match if the number of properties input match the number of properties in the recipe
      if (propsToCheck.length === recipe.properties.length) {  
        var matches = true;
        propsToCheck.forEach((prop: IChemProperty, index) => {
          if ((recipe.properties[index] !== prop.name)) {
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
    return matchedRecipe || undefined;
  }

  private getSearchBox(): JSX.Element {
    return (
      <div className='input-group-text search-box'>
        <input type='text' 
               className='form-control properties-list-filter' 
               placeholder='Filter properties...'
               onChange={this.filterSearch}
               />
      </div>
    )
  }

  private getUnselectedPropertyButtons(): JSX.Element[] {
    return this.state.unselectedProperties.map((property: IChemProperty) => 
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
                  <span className="recipe-check-results"></span>
                </div>
              </div>
            </div>
          </div>
        </div>  
      </div> 
    );
  }
}












       