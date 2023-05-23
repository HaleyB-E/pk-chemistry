import React, { Component } from "react";
import { IChemRecipe } from "../helpers/entities";

// a list of all makers marks (and the filename for them)
export const MakersMarkList = [
  'auntie',
  'serelia',
  'serendipity',
  'ursula',
  'melope',
  'morrigan',
  'kovatch'
];

interface IRecipeTableRowProps {
  index: number;
  recipe: IChemRecipe;
  includeMakersMarkSelection: boolean;
  updateMakersMarkCallback?: (name: string, index: number) => void;
}

export class RecipeTableRow extends Component<IRecipeTableRowProps> {
  private updateMark = (ev: any) => {
    if (this.props.updateMakersMarkCallback) {
      this.props.updateMakersMarkCallback(ev.target.value, this.props.index);
    }
  }

  render() {
    const recipe = this.props.recipe;
    return (
      <>
        {this.props.includeMakersMarkSelection && (
          <td>
            <select className='makers-mark-dropdown' onChange={this.updateMark}>
              <option value=''>None</option>
              {MakersMarkList.map((markName, index) =>
                <option key={index} value={markName}>
                  {markName}
                </option>
              )}
            </select>
          </td>
        )}
        <td className='recipe-name'>
          <b>{recipe.name}</b>
          <br/>
          <i>{`(${recipe.color.toUpperCase()})`}</i>
        </td>
        <td className='recipe-type'>
          {recipe.type}
        </td>
        <td className='recipe-properties'>
          Contains: {recipe.properties.map(prop => prop.name).join(', ')}
        </td>
        <td className='recipe-description'>
          {recipe.mechanics}
        </td>
      </>
    );
  }
}