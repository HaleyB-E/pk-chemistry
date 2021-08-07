import { IChemProperty, IChemRecipe } from '../helpers/entities';
import React, { Component } from 'react';

var $ = require('jquery');

export interface NewRecipeTabProps {
  allProperties: IChemProperty[];
}

export class NewRecipeTab extends Component<NewRecipeTabProps> {
  constructor(props: NewRecipeTabProps) {
    super(props);
    this.propertiesList = props.allProperties;
  }
//click handlers for checker tab

// // filter list of properties by search box
// $(document).on('keyup', ".properties-list-filter", function(event) {
//   var filterText = event.target.value;
//   $.each($('.unselected-property'), function(index, property) {
//       if (property.value.includes(filterText)){
//           $(property).show();
//       }
//       else {
//           $(property).hide();
//       }
//   })
// });

// // add property to right-hand-side if clicked on left
// $(document).on('click', ".unselected-property", function(event) {
//   // max recipe size is 8
//   if ($('.selected-property').length === 8) {
//       return;
//   }

//   // first item in this list is the name, last element is the symbol
//   var splitProperty = getPropertyArrayFromClick(event);

//   var propertyButton = $("<button>").attr({
//       type: 'button',
//       class: 'btn btn-secondary btn-lg btn-block selected-property',
//       id: splitProperty[0] + '-selected',
//       value: splitProperty[0]
//   });

//   var nameSpan = $("<span class='property-name'>").text(splitProperty[0] + "   ");
//   nameSpan.append($("<span>").text(splitProperty[3]).addClass('chem-symbol'))
//   propertyButton.append(nameSpan)
//   $(".selected-properties").append(propertyButton);
  
//   // there's at least one property on the RHS now, so user should be able to click "add"
//   $('.check-recipes-button').prop('disabled',false);
//   // reset filter and helptext
//   $('.recipe-check-results').empty();
//   $('.properties-list-filter').val('');
//   $('.properties-list-filter').keyup();
// });

// // remove property from right-hand-side if clicked
// $(document).on('click', ".selected-property", function(event) {
//   var splitProperty = getPropertyArrayFromClick(event);
//   var propertyToRemove = $('#' + splitProperty[0] + '-selected');
//   $(propertyToRemove).remove()
  
//   // reset helptext
//   $('.recipe-check-results').empty();
  
//   // don't let user save an empty recipe
//   if ($('.selected-property').length === 0) {
//       $('.check-recipes-button').prop('disabled',true);
//   }
// });

  // // check if selected properties form an existing recipe - if not, allow new one to be created
  //TODO: make reacty
  public checkIfRecipeExists(event: Event) {
    var chosenProperties = this.getSelectedProperties();
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

  //TODO UPDATE TPYINGS
  public getPropertyArrayFromClick(event: any) {
    var selectedProperty = event.target.textContent
    // account for a click directly on the property symbol
    if (selectedProperty.length === 1) {
        selectedProperty = $(event.target)[0].parentNode.textContent
    }
    // first item in this list is the name, last element is the symbol
    return selectedProperty.split(' ');
  }


  // helper method for recipe check
  // TODO: FIX TYPING
  public checkForRecipeMatch(propsToCheck: IChemProperty[]): IChemRecipe | undefined {
    let matchedRecipe: IChemRecipe | null = null;
    this.recipesList.forEach((recipe: IChemRecipe) => {
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

  // get all currently-selected properties as list of string property names
  //TODO UPDATE TYPINGS
  public getSelectedProperties() {
    let chosenProperties: IChemProperty[] = [];
    $('.selected-property').find('.property-name').each(function(index: number, property: any) {
        chosenProperties.push(property.textContent.split(' ')[0]);
    });
    chosenProperties.sort();
    return chosenProperties;
  }



  private recipesList: IChemRecipe[] = [];
  private propertiesList: IChemProperty[] = [];

  private getSearchBox(): JSX.Element {
    return (
      <div className='input-group-text search-box'>
        <input type='text' className='form-control properties-list-filter' placeholder='Filter properties...'/>
      </div>
    )
  }

  private getPropertyButtons(): JSX.Element[] {
    return this.propertiesList.map((property: IChemProperty) =>
      <button type='button' className='btn btn-secondary btn-lg btn-block unselected-property'
              id={property.name} value={property.name}>
        <span className='property-name'>{property.name + '   '}
          <span className='chem-symbol'>{property.symbol}</span>
        </span>
      </button>
    );
  }

  render() {
    return (
      <div className="tab-pane fade show active" id="checker" role="tabpanel" aria-labelledby="checker-tab">
        <div className="container">
        {/* style="margin-top:10px;"> */}
          <div className="row">
            <div className="col">
              <div className="milonga checker-tab-header-text">Select properties for the recipe:</div>
                <div className="unselected-properties property-column">
                  {this.getSearchBox()}
                  {this.getPropertyButtons()}
                </div>
            </div>
            <div className="col">
              <div className="milonga checker-tab-header-text">Selected properties:</div>
              <div className="selected-properties property-column">
                <div>
                  <button className="btn btn-lg btn-block check-recipes-button action-button milonga" disabled>
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












       