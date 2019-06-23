// clear out old values and display selected properties on modal for reference
$(document).on('show.bs.modal','#addNewModal', function(event) {
  // clear out old values
  var displaySpan = $('.new-recipe-properties');
  displaySpan.empty();
  $('.new-recipe-effect').val('');
  $('.new-recipe-name').val('');
  $('.form-selected-value').empty();
  
  // show the names of the currently selected properties
  displaySpan.append("Selected properties are: ");
  var selected = getSelectedProperties();
  $.each(selected, function(index, property) {
      displaySpan.append(property);
      if (index !== selected.length - 1) {
          displaySpan.append(", ");
      }
  });
});

// display new selected value in modal
$(document).on('click', ".dropdown-item", function(event) {
  var selectedVal = $(event.target.parentElement.parentElement).find('.selected-value');
  selectedVal.empty();
  selectedVal.append(event.target.innerHTML);
});

// confirm creation of new recipe (from modal)
$(document).on('click', ".new-recipe-confirm", function(event) {
  var newName = $('.new-recipe-name').val();
  var newEffect = $('.new-recipe-effect').val();
  var newForm = $('.form-selected-value').html();
  var newType = $('.type-selected-value').html();

  // 
  var chosenProperties = [];
  $('.selected-property').each(function(index, property) {
      chosenProperties.push(property.textContent);
  });
  chosenProperties.sort();
  
  // get color from form - move somewhere later
  var newColor = '';
  if (newForm === 'Oil' ) {
      newColor = 'blue';
  } else if (newForm === 'Potion') {
      newColor = 'red';
  } else if (newForm === 'Powder') {
      newColor = 'yellow';
  }

  var newRecipe = {
      name: newName,
      color: newColor,
      type: newType,
      mechanics: newEffect,
      properties: chosenProperties
  }

  chemApp.addNewRecipeToList(newRecipe);
  
  // clear RHS display
  $.each($('.selected-property'), function(i,p) {p.click();});
  $('.recipe-check-results').empty();
});