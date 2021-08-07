// TODO: move properties to its own file

// just show the properties list. later this will get nicer and sortable or something I guess
$(document).on('click', '#properties-tab', function() {
  if ($(".property-item").length == 0 ) {
      console.log(propertiesList)
      $.each(propertiesList, function(index, property) {
          var propertyHtmlElement = $("<li><b>" + property.name
              + " (<span class='chem-symbol'>" + property.symbol + "</span>): </b>"
              + property.effect
              + " (" + property.defaultForm + ")</li>")
                                     .addClass("list-group-item property-item");
          $("#properties-list-display").append(propertyHtmlElement);
      });
  }
});
