import React, { Component } from 'react';
import { RecipeTableRow } from '../components/recipe-table-row';
import { IChemRecipe } from '../helpers/entities';

interface RecipesTabProps {
  recipesList: IChemRecipe[];
  addToPrintQueue: (recipe: IChemRecipe) => void;
}

// just show the recipe list. later this will get nicer and sortable or something I guess
export class RecipesTab extends Component<RecipesTabProps> {
  render() {
    const recipesList = this.props.recipesList;
    const problemRecipes = this.props.recipesList.filter(recipe => !recipe.name);
    const usableRecipes = this.props.recipesList.filter(recipe => !!recipe.name);
    return (
      <div className="tab-pane fade show active" id="recipes" role="tabpanel" aria-labelledby="recipes-tab">
        <br/>
        {recipesList.length === 0 && 
          <div>
            No recipes loaded; something might be wrong
          </div>
        }
        {recipesList.length > 0 &&
          <table className="table table-striped border">
            <tbody id="recipes-list-display">
              {usableRecipes.map((recipe, index) => 
                this.getRecipeRow(index, recipe)
              )}
            </tbody>
          </table>
        }
      </div>
    );
  }

  private getRecipeRow = (index: number, recipe: IChemRecipe): JSX.Element => {
    return (
      <tr className='recipe-item' id={`recipes-list-${index}`} key={index}>
          <RecipeTableRow
            index={index}
            recipe={recipe}
            includeMakersMarkSelection={false}
          />
        <td>
          <button
            className='btn action-button add-recipe-to-print' 
            onClick={() => this.props.addToPrintQueue(recipe)}>
            Add to Print Queue
          </button>
        </td>
      </tr>
    );
  };
}
