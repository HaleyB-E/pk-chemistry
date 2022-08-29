import { IChemRecipe } from "./entities";
import React from 'react';

// a list of all makers marks (and the filename for them)
export const MakersMarkList = [
    'auntie',
    'serelia',
    'serendipity',
    'ursula',
    'melope'
  ];

export function generateRecipeTableRow (recipe: IChemRecipe, includeMakersMarkSelection: boolean): JSX.Element {
  return (
    <>
      {includeMakersMarkSelection && (
        <td>
          <select className='makers-mark-dropdown'>
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
        Contains: {recipe.properties.join(', ')}
      </td>
      <td className='recipe-description'>
        {recipe.mechanics}
      </td>
    </>
  );
};


              