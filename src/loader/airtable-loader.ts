import Airtable, { Base, Table } from "airtable";
import { IChemProperty, IChemRecipe } from "../helpers/entities";

export interface AirtableProperty {
    Name: string,
    SinglePropertyEffect: string,
    DefaultForm: string,
}

export interface AirtableRecipe {
    Name: string,
    Color: string,
    Type: string,
    Effect: string,
    Properties: string[]
}

export class AirTableLoader {
    private chemDataBase: Base;

    private _propertiesList: IChemProperty[] = [];
    public getPropertiesList(): IChemProperty[] {
        if (this._propertiesList.length === 0) {
            this.loadPropertiesList();
        }
        return this._propertiesList;
    }

    private _recipesList: IChemRecipe[] = [];
    public getRecipesList(): IChemRecipe[] {
        if (this._recipesList.length === 0) {
            this.loadRecipesList();
        }
        return this._recipesList;
    }

    public isLoadingProperties: boolean;
    public isLoadingRecipes: boolean;
    public isLoading = () => this.isLoadingProperties && this.isLoadingRecipes;

    constructor() {
        this.isLoadingProperties = true;
        this.isLoadingRecipes = true;
        const airTable = new Airtable({
            endpointUrl: 'https://api.airtable.com',
            apiKey: process.env.REACT_APP_AIRTABLE_API_KEY //TODO update auth before deploying
        });
        this.chemDataBase = airTable.base('appLPEJZn6oL7TfDQ');
    }

     // load properties: each has a name, symbol, effect, default form
     public loadPropertiesList() {
        const propsTable = this.chemDataBase.table('Properties');
        let list: IChemProperty[] = [];
        propsTable.select({
            view: "All columns and values"
        }).eachPage(function page(records, fetchNextPage) {
            records.forEach(function(record) {
                // yes this is terrible. fight me.
                const fields = record.fields as any as AirtableProperty
                list.push({
                    name: fields.Name,
                    effect: fields.SinglePropertyEffect,
                    defaultForm: fields.DefaultForm,
                    symbol: 'x' //TODO: load symbols into airtable
                });
            });
            fetchNextPage();
        }, function done(err) {
            if (err) { console.error(err); return; }
        });
        // alphabetize!
        list.sort(function(a,b) {return a.name.localeCompare(b.name)});
        this._propertiesList = list;
        this.isLoadingProperties = false;
    }

    // load previously-defined recipes: each has a form, effect, and up to 8 properties
     public loadRecipesList() {
        const recipesTable = this.chemDataBase.table('Recipes');
        let list: IChemRecipe[] = [];
        recipesTable.select({
            view: "All columns and values"
        }).eachPage(function page(records, fetchNextPage) {
            records.forEach(function(record) {
                // this is fine, trust me
                const fields = record.fields as any as AirtableRecipe
                list.push({
                    name: fields.Name,
                    color: fields.Color,
                    mechanics: fields.Effect,
                    type: fields.Type,
                    properties: fields.Properties
                });
            });
            fetchNextPage();
        }, function done(err) {
            if (err) { console.error(err); return; }
        });
        // alphabetize!
        list.sort(function(a,b) {return a.name.localeCompare(b.name)});
        this._recipesList = list;
        this.isLoadingRecipes = false;
        console.log('beep')
    }
}
