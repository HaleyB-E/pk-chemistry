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
        {problemRecipes.length > 0 &&
          <div>There's a problem!</div>
        }
        {recipesList.length > 0 &&
          <table className="table table-striped border">
            <tbody id="recipes-list-display">
              {usableRecipes.map((recipe, index) => 
                <RecipeRow
                  key={index}
                  index={index}
                  recipe={recipe}
                  addToPrintQueue={this.props.addToPrintQueue} />
              )}
            </tbody>
          </table>
        }
      </div>
    );
  }
}

export interface IRecipeRowProps {
  index: number,
  recipe: IChemRecipe;
  addToPrintQueue: (recipe: IChemRecipe) => void;
}

export interface IRecipeRowState {
  isLoading: boolean;
}

export class RecipeRow extends Component<IRecipeRowProps, IRecipeRowState> {
  constructor(props: IRecipeRowProps) {
    super(props);
    this.state = {
      isLoading: false
    };
  }

  private addToPrintQueue = () => {
    this.setState({isLoading: true})
    setTimeout(() => {
      this.props.addToPrintQueue(this.props.recipe);
      this.setState({isLoading: false});
    }, 100)
  }

  render() {
    const {index, recipe} = this.props;
    const isLoading = this.state.isLoading;
    return (
      <tr className='recipe-item' id={`recipes-list-${index}`} key={index}>
        <RecipeTableRow
          index={index}
          recipe={recipe}
          includeMakersMarkSelection={false}
        />
      <td>
        <button
          disabled={isLoading}
          className={`btn action-button add-recipe-to-print`}
          onClick={this.addToPrintQueue}>
          Add to Print Queue
        </button>
      </td>
    </tr>
    )
  }
};