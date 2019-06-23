var chemLoader = chemLoader || (function() {
  ///////// START SHEETS API BOILERPLATE

  // Array of API discovery doc URLs for APIs used by the quickstart
  var DISCOVERY_DOCS = ["https://sheets.googleapis.com/$discovery/rest?version=v4"];

  // Authorization scopes required by the API; multiple scopes can be
  // included, separated by spaces.
  var SCOPES = "https://www.googleapis.com/auth/spreadsheets";

  var authorizeButton = document.getElementById('authorize_button');
  var signoutButton = document.getElementById('signout_button');

  /**
   *  On load, called to load the auth2 library and API client library.
   * the functionName.bind(this, callback) syntax is a thing to allow passing a parameter into a callback. yo dawg.
   */
  function handleClientLoad(callback) {
    gapi.load('client:auth2', initClient.bind(this, callback));
  }

  /**
   *  Initializes the API client library and sets up sign-in state
   *  listeners.
   */
  function initClient(callback) {
    console.log('INIT')
    $.getScript('./authinfo.js', function() {
      gapi.client.init({
        apiKey: chemLoaderAuthInfo.API_KEY,
        clientId: chemLoaderAuthInfo.CLIENT_ID,
        discoveryDocs: DISCOVERY_DOCS,
        scope: SCOPES
      }).then(function () {
        // Listen for sign-in state changes.
        gapi.auth2.getAuthInstance().isSignedIn.listen(updateSigninStatus);
  
        // Handle the initial sign-in state.
        updateSigninStatus(gapi.auth2.getAuthInstance().isSignedIn.get());
        authorizeButton.onclick = handleAuthClick;
        signoutButton.onclick = handleSignoutClick;
        if (callback) {
          callback();
        }
        _isLoading = false;
      }, function(error) {
        console.log(error);
      });
    });
  }

  /**
   *  Called when the signed in status changes, to update the UI
   *  appropriately. After a sign-in, the API is called.
   */
  function updateSigninStatus(isSignedIn) {
    if (isSignedIn) {
      authorizeButton.style.display = 'none';
      signoutButton.style.display = 'block';
    } else {
      authorizeButton.style.display = 'block';
      signoutButton.style.display = 'none';
    }
  }

  /**
   *  Sign in the user upon button click.
   */
  function handleAuthClick(event) {
    gapi.auth2.getAuthInstance().signIn();
  }

  /**
   *  Sign out the user upon button click.
   */
  function handleSignoutClick(event) {
    gapi.auth2.getAuthInstance().signOut();
  }

  ///////// END SHEETS API BOILERPLATE
  var chemistrySpreadsheetId = '1htwy54gaxwUOCK8q8O1z17ITuk54JwcvzVgGfFdgmOQ';

  function postNewRecipe(recipe) {
    var body = {
      values: [[recipe.name, recipe.color, recipe.type, recipe.mechanics].concat(recipe.properties)]
    }
    gapi.client.sheets.spreadsheets.values.append({
      spreadsheetId: chemistrySpreadsheetId,
      range: 'recipes!A2:E',
      insertDataOption: 'INSERT_ROWS',
      valueInputOption: 'RAW',
      resource: body
    }).then(function(response) {
    }, function (response) {
      console.log(response.result.error);
    });
  }

  // load properties: each has a name, symbol, effect, default form
  function loadPropsList() {
    return gapi.client.sheets.spreadsheets.values.get({
      spreadsheetId: chemistrySpreadsheetId,
      range: 'properties!A2:E',
    }).then(function(response) {
      var range = response.result;
      if (range.values.length > 0) {
        // add each property from the spreadsheet to the list of properties
        for (i = 0; i < range.values.length; i++) {
          var row = range.values[i];
          var formattedProperty = {
            name: row[0],
            effect: row[1],
            defaultForm: row[2],
            symbol: chemSymbols.getSymbolForProperty(row[0])
          };
          _chemPropertiesList.push(formattedProperty);
        }
        // alphabetize!
        _chemPropertiesList.sort(function(a,b) {return a.name.localeCompare(b.name);});
      }
    }, function(response) {
      console.log(response.result.error);
    });
  }

  // load previously-defined recipes: each has a form, effect, and up to 8 properties
  function loadExistingRecipes() {
    return gapi.client.sheets.spreadsheets.values.get({
      spreadsheetId: '1htwy54gaxwUOCK8q8O1z17ITuk54JwcvzVgGfFdgmOQ',
      range: 'recipes!A2:L',
    }).then(function(response) {
      var range = response.result;
      if (range.values.length > 0) {
        // add each recipe from the spreadsheet to the list of recipes
        for (i = 0; i < range.values.length; i++) {
          var row = range.values[i];
          var formattedRecipe = {
            name: row[0],
            color: row[1],
            type: row[2],
            mechanics: row[3],
            properties: row.slice(4).sort()
          }
          _recipesList.push(formattedRecipe);
        }
        // alphabetize!
        _recipesList.sort(function(a,b) {return a.name.localeCompare(b.name);});
      }
    }, function(response) {
      console.log(response.result.error);
    });
  }

  var _chemPropertiesList = [];
  var _recipesList = [];
  var _isLoading = true;

  return {
    handleClientLoad: handleClientLoad,
    isLoading: _isLoading,
    loadProperties: loadPropsList,
    chemProperties: _chemPropertiesList,
    loadRecipes: loadExistingRecipes,
    recipes: _recipesList,
    postNewRecipe: postNewRecipe
  }
}());