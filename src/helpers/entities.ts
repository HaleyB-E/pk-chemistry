export interface IChemRecipe {
  name: string;
  color: string;
  type: string;
  mechanics: string;
  properties: string[];
}

export interface IChemProperty {
  name: string;
  effect: string;
  defaultForm: string;
  symbol: string;
}
