import Airtable, { Base } from "airtable";
import { IChemProperty, IChemRecipe } from "../helpers/entities";
import { compact } from "lodash";

export interface AirtableProperty {
  Name: string,
  SinglePropertyEffect: string,
  DefaultForm: string,
  Symbol: string
}

export interface AirtableRecipe {
  Name: string,
  Color: string,
  Type: string,
  Effect: string,
  Properties: string[]
}

export class AirTableLoaderService {
  private chemDataBase: Base;
  constructor() {
    const airTable = new Airtable({
      endpointUrl: 'https://api.airtable.com',
      apiKey: process.env.REACT_APP_AIRTABLE_API_KEY //TODO update auth before deploying
    });
    this.chemDataBase = airTable.base('appLPEJZn6oL7TfDQ');
  }

    // load properties: each has a name, symbol, effect, default form
  async loadPropertiesList(): Promise<IChemProperty[]> {
    return new Promise((resolve, reject) => {
      const propsTable = this.chemDataBase.table('Properties');
      let list: IChemProperty[] = [];
      propsTable.select({
        view: "All columns and values"
      }).eachPage(function page(records, fetchNextPage) {
        records.forEach(function(record) {
          // yes this is terrible. fight me.
          const fields = record.fields as any as AirtableProperty
          list.push({
            id: record.id,
            name: fields.Name,
            effect: fields.SinglePropertyEffect,
            defaultForm: fields.DefaultForm,
            symbol: fields.Symbol
          });
        });
        fetchNextPage();
      }, function done(err) {
        if (err) { 
          console.error(err);
          reject(err);
        } else {
          // alphabetize!
          list.sort(function(a,b) {return a.name.localeCompare(b.name)});
          resolve(list);
        }
      });
    });
  }

  // load previously-defined recipes: each has a form, effect, and up to 8 properties
  async loadRecipesList(propertiesList: IChemProperty[]): Promise<IChemRecipe[]> {
    return new Promise((resolve, reject) => {
      const recipesTable = this.chemDataBase.table('Recipes');
      let list: IChemRecipe[] = [];
      recipesTable.select({
        view: "All columns and values"
      }).eachPage(function page(records, fetchNextPage) {
        records.forEach(function(record) {
          // this is fine, trust me
          const fields = record.fields as any as AirtableRecipe

          const recipeProps = fields.Properties.map(prop => (propertiesList.find(p => p.name === prop)));

          list.push({
            name: fields.Name,
            color: fields.Color,
            mechanics: fields.Effect,
            type: fields.Type,
            properties: compact(recipeProps)
          });
        });
        fetchNextPage();
        }, function done(err) {
          if (err) { 
            console.error(err);
            reject(err)
          } else {
            // alphabetize
            list.sort(function(a,b) {
              return (a.name + '').localeCompare(b.name + '')
            });
            resolve(list);
          }
        });
    });
  }

  // save new recipe definition to airtable
  saveNewRecipe(newRecipe: IChemRecipe): void {
    const recipesTable = this.chemDataBase.table('Recipes');
    recipesTable.create([
      {
        "fields": {
          "Name": newRecipe.name,
          "Color": newRecipe.color,
          "Type": newRecipe.type,
          "Effect": newRecipe.mechanics,
          "propertiesLinked": newRecipe.properties.map(prop => prop.name)
        }
      }
    ]);
    console.log(newRecipe);
  }
}
