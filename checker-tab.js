//click handlers for checker tab

// filter list of properties by search box
$(document).on('keyup', ".properties-list-filter", function(event) {
    var filterText = event.target.value;
    $.each($('.unselected-property'), function(index, property) {
        if (property.value.includes(filterText)){
            $(property).show();
        }
        else {
            $(property).hide();
        }
    })
});

// add property to right-hand-side if clicked on left
$(document).on('click', ".unselected-property", function(event) {
    // max recipe size is 8
    if ($('.selected-property').length === 8) {
        return;
    }

    // first item in this list is the name, last element is the symbol
    var splitProperty = getPropertyArrayFromClick(event);

    var propertyButton = $("<button>").attr({
        type: 'button',
        class: 'btn btn-secondary btn-lg btn-block selected-property',
        id: splitProperty[0] + '-selected',
        value: splitProperty[0]
    });

    var nameSpan = $("<span class='property-name'>").text(splitProperty[0] + "   ");
    nameSpan.append($("<span>").text(splitProperty[3]).addClass('chem-symbol'))
    propertyButton.append(nameSpan)
    $(".selected-properties").append(propertyButton);
    
    // there's at least one property on the RHS now, so user should be able to click "add"
    $('.check-recipes-button').prop('disabled',false);
    // reset filter and helptext
    $('.recipe-check-results').empty();
    $('.properties-list-filter').val('');
    $('.properties-list-filter').keyup();
});

// remove property from right-hand-side if clicked
$(document).on('click', ".selected-property", function(event) {
    var splitProperty = getPropertyArrayFromClick(event);
    var propertyToRemove = $('#' + splitProperty[0] + '-selected');
    $(propertyToRemove).remove()
    
    // reset helptext
    $('.recipe-check-results').empty();
    
    // don't let user save an empty recipe
    if ($('.selected-property').length === 0) {
        $('.check-recipes-button').prop('disabled',true);
    }
});

// check if selected properties form an existing recipe - if not, allow new one to be created
$(document).on('click', ".check-recipes-button", function(event) {
    var chosenProperties = getSelectedProperties();
    var resultsSpan = $('.recipe-check-results');
    // clear out previous display
    resultsSpan.empty();
    // display 
    var matchedRecipe = checkForRecipeMatch(chosenProperties);
    if (matchedRecipe) {
        // clear out selected properties
        $.each($('.selected-property'), function(i,p) {p.click();});
        // show info about selected recipe in results span
        resultsSpan.append("Name: " + matchedRecipe.name);
        resultsSpan.append("<br>");
        resultsSpan.append("Effect: " + matchedRecipe.mechanics);
        resultsSpan.append("<br>");
        resultsSpan.append("Recipe added to print queue.")
        
        chemApp.addRecipeToPrintQueue(matchedRecipe);
    } else {
        // if the Recipe is not defined yet, show modal to define a new one
        $('#addNewModal').modal('show');
    }
});


function getPropertyArrayFromClick(event) {
    var selectedProperty = event.target.textContent
    // account for a click directly on the property symbol
    if (selectedProperty.length === 1) {
        selectedProperty = $(event.target)[0].parentNode.textContent
    }
    // first item in this list is the name, last element is the symbol
    return selectedProperty.split(' ');
}


// helper method for recipe check
var checkForRecipeMatch = function checkForRecipeMatch(propsToCheck) {
    var matchedRecipe;
    $.each(chemApp.getRecipesList(), function(index, recipe) {
        // only a possible match if the number of properties input match the number of properties in the recipe
        if (propsToCheck.length === recipe.properties.length) {  
            var matches = true;
            $.each(propsToCheck, function(index, prop) {
                if ((recipe.properties[index] !== prop)) {
                    matches = false;
                    return false;
                }
            });
            if (matches) {
                matchedRecipe = recipe;
                return false;
            }
        }
    });
    return matchedRecipe;
}

// get all currently-selected properties as list of string property names
var getSelectedProperties = function getSelectedProperties() {
    var chosenProperties = [];
    $('.selected-property').find('.property-name').each(function(index, property) {
        chosenProperties.push(property.textContent.split(' ')[0]);
    });
    chosenProperties.sort();
    return chosenProperties;
}
