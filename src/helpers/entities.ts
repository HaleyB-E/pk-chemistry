export interface IChemRecipe {
  name: string;
  color: string;
  type: string;
  mechanics: string;
  properties: string[];
  makerName?: string;
}

export interface IChemProperty {
  id: string;
  name: string;
  effect: string;
  defaultForm: string;
  symbol: string;
}

export interface IPrintConfig {
  styles: any;
  fonts: any;
  defaults: any;
  images: any;
}

export type TabType = 'NewRecipe' | 'PropertiesList' | 'RecipesList' | 'PrintList';
