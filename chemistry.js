
var propertiesList = [];
var isLoadingProperties = true;
var isLoadingRecipes = true;

var chemApp = chemApp || (function() {
    function generateRecipeTableRow(recipe, includeMakersMarkSelection) {
        var recipeRow = $("<tr>").addClass("recipe-item");
        if (includeMakersMarkSelection) {
            var makersMarkDropdownContainer = $("<td>");
            // create maker mark dropdown with all defined makers marks
            var makersMarkDropdown = $("<select>").addClass("makers-mark-dropdown");
            makersMarkDropdown.append("<option value=''>None</option>");
            $.each(makersMarks.getMakersMarkList(), function(index, name) {
                makersMarkDropdown.append("<option value='" + name + "'>" + name + "</option>");
            })
            makersMarkDropdownContainer.append(makersMarkDropdown);
            recipeRow.append(makersMarkDropdownContainer);
        }

        var recipeName = $("<td>");
        // add recipe name
        recipeName.append($("<b>" + recipe.name + "</b>"));
        recipeName.append($("<br/>"));
        // add recipe color
        recipeName.append($("<i> (" + recipe.color.toUpperCase() + " SEAL)</i>"))
        recipeRow.append(recipeName)

        // add recipe type
        recipeRow.append($("<td>" + recipe.type + "</td>"))

        // add recipe properties
        var recipeProps = $("<td> Contains: " + recipe.properties.join(", ") + ".</td>");
        recipeRow.append(recipeProps);

        // add description of what happens!
        var recipeEffect = $("<td>"+ recipe.mechanics +"</td>").addClass("recipe-description");
        recipeRow.append(recipeEffect)

        return recipeRow;
    }

    var _recipesList = [];
    function getRecipesList() {
        return _recipesList;
    }

    function loadRecipesList(recipeList) {
        _recipesList = recipeList;
    }

    // add to list Recipe tab, add to print queue, and post to spreadsheet
    function addNewRecipeToList(recipe) {
        _recipesList.push(recipe);
        this.addRecipeToPrintQueue(recipe);
        chemLoader.postNewRecipe(recipe);
    }

    var _printQueue = [];
    function getPrintQueue() {
        return _printQueue;
    }
    // add recipe to list to be printed AND update the badge on the print tab to reflect new list size
    function addRecipeToPrintQueue(recipe) {
        _printQueue.push(recipe);
        var numToPrint = _printQueue.length
        $('#print-recipes-count').empty();
        $('#print-recipes-count').append(numToPrint)
    }

    return {
        generateRecipeRow: generateRecipeTableRow,
        getPrintQueue: getPrintQueue,
        addRecipeToPrintQueue: addRecipeToPrintQueue,
        getRecipesList: getRecipesList,
        loadRecipesList: loadRecipesList,
        addNewRecipeToList: addNewRecipeToList
    }
}());

$(document).ready(function() {
    // check font install - if Alchemy isn't there, show a warning
    if (!fontCheck.doesFontExist('Alchemy')) {
        var fontNotLoadedAlert = $("<div>").addClass("alert alert-danger")
        fontNotLoadedText = $("<span>");
        fontNotLoadedText.text("Alchemy font not detected - download ");
        fontNotLoadedText.append("<a class='warning-link' href=https://www.alchemylab.com/fonts.htm>here</a>")
        fontNotLoadedAlert.append(fontNotLoadedText)
        $('.load-indicator-parent').append(fontNotLoadedAlert)
    }

    // if we haven't gotten the sheets API stuff working yet, we need to do that - pass loadLists as a callback
    if (chemLoader.isLoading) {
        chemLoader.handleClientLoad(loadLists)
    } else {
        // if sheets API is already set up, just load the lists
        this.loadLists();
    }
});

// load the properties and recipes, and hide the loading indicator for each when they're done
var loadLists = function() {
    chemLoader.loadProperties().then(function() {
        this.propertiesList = chemLoader.chemProperties;
        $('#properties-load-indicator').remove();
        this.isLoadingProperties = false;
        this.tryLoadValuesUp();
    });
    chemLoader.loadRecipes().then(function() {
        chemApp.loadRecipesList(chemLoader.recipes);
        $('#recipes-load-indicator').remove();
        this.isLoadingRecipes = false;
        this.tryLoadValuesUp();
    });
}

// wait until the loading indicators are removed, then DO A THING
// some day we'll be using a real framework and we won't need this horseshit with variables
// but I'm lazy and don't know how to set up typescript
var tryLoadValuesUp = function() {
    if (this.isLoadingProperties || this.isLoadingRecipes) {
        return false;
    }
    console.log(`${this.propertiesList.length} properties`)
    console.log(`${chemApp.getRecipesList().length} recipes`)
    console.log('were loaded')
    this.loadChecker();
}


// load vial checker tab, where user can select properties, see predefined vials, and define new vials
var loadChecker = function loadChecker() {
    if ($(".search-box").length == 0) {
        var searchBoxDiv = $("<div class='input-group-text search-box' style='margin-bottom: 8px;'></div>");
        var searchHtmlElement = $("<input>").attr({
            type: 'text',
            class: 'form-control properties-list-filter',
            placeholder: 'Filter properties...'
        });        
        searchBoxDiv.append(searchHtmlElement);
        $(".unselected-properties").append(searchBoxDiv);
        
        $.each(propertiesList, function(index, property) {
            var propertyButton = $("<button>").attr({
                type: 'button',
                class: 'btn btn-secondary btn-lg btn-block unselected-property',
                id: property.name,
                value: property.name
            });
            var nameSpan = $("<span class='property-name'>").text(property.name + "   ");
            nameSpan.append($("<span>").text(property.symbol).addClass('chem-symbol'))
            propertyButton.append(nameSpan)
            $(".unselected-properties").append(propertyButton);
        });
    }
}
