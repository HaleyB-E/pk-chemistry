// Click handlers for the "List of All Recipes" tab

// just show the recipe list. later this will get nicer and sortable or something I guess
$(document).on('click', '#recipes-tab', function() {
    if ($(".recipes-list-item").length == 0 ) {
        var recipesList = chemApp.getRecipesList();
        $.each(recipesList, function(index, recipe) {
            // skip recipes with no name but shame-print in the console so someone will update them
            if (!recipe.name) {
                console.log(recipe)
                return true;
            }
            var recipeRow = chemApp.generateRecipeRow(recipe, false).attr("id", index).addClass('recipes-list-item');

            // add button in recipe row to add recipe to print queue
            var recipeAddToPrint = $("<td><button class='btn action-button add-recipe-to-print'>Add to Print Queue</button></td>");
            recipeRow.append(recipeAddToPrint);

            $("#recipes-list-display").append(recipeRow);
        });   
    }
});

$(document).on('click', '.add-recipe-to-print', function(event) {
    var selectedRecipeDefinition = $(event.target.parentElement.parentElement).find('.recipe-description');
    var selectedRecipeIndex = $(event.target.parentElement.parentElement).attr("id")
    chemApp.addRecipeToPrintQueue(chemApp.getRecipesList()[selectedRecipeIndex])
});
