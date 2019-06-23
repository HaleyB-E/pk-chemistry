$(document).on('click', '#print-tab', function() {
  console.log('abcfebutts')
  var recipesToPrint = chemApp.getPrintQueue();
  $("#recipes-print-display").empty();
  $.each(recipesToPrint, function(index, recipe) {
    var recipeRow = chemApp.generateRecipeRow(recipe, true).attr("id", "print-recipe-" + index);

    $("#recipes-print-display").append(recipeRow);
  });
  if ($('#recipes-print-display').find('tr').length > 0) {
    $('.print-button').show();
  } else {
    $('.print-button').hide();
  }
});


$(document).on('click', '.print-button', function(event) {

  recipesToPrint = chemApp.getPrintQueue();
  contentArray = [];

  // add recipes to the print stack; skip to a new page after every third tag
  $.each(recipesToPrint, function(index, recipe) {
    contentArray = tableDefs.makeTag(contentArray, recipe, index);
    contentArray = tableDefs.makeSpacer(contentArray, (index + 1) % 3 === 0)
  });
  
  pdfMake.fonts = printConfig.fonts;
  var docDefinition = {
    pageSize: 'LETTER',
    pageOrientation: 'landscape',
    content: contentArray,
    defaultStyle: printConfig.defaults,
    styles: printConfig.styles,
    images: printConfig.images
  };
  pdfMake.createPdf(docDefinition).download('test2.pdf')
});

// define sections of each tag here
var tableDefs = tableDefs || (function() {
  // add each cell of the table composing a single tag, one at a time, then format
  function makeTag(contentArray, recipe, index) {
    var tableBody = [[]];
    addMakersMarkCell(tableBody, index)
    addLogoCell(tableBody, recipe);
    addRecipeCell(tableBody, recipe);
    addTypeCell(tableBody, recipe);
    addEffectCell(tableBody, recipe);
    contentArray.push({
      table: {
        widths: [18, 87, '6%', '15%', '*'],
        heights: [112],
        body: tableBody
      },
      layout: {
        defaultBorder: false
      }
    });
    return contentArray;
  }

  function addMakersMarkCell(body, index) {
    var makerName = $("#print-recipe-" + index).find(".makers-mark-dropdown")[0].value;
    if (makerName.length > 0) {
      body[0].push([
        {
          image: makerName, 
          width: 18,
          alignment: 'center'
        }
      ]);
    } else {
      body[0].push([
        {text: "\n"}
      ]);
    }
  }

  function addLogoCell(body, recipe) {
    var sealColor = recipe.color.toUpperCase();
    body[0].push([
      {
        columns: [
          { width: '*', text: '' },
            {
              width: 'auto',
              table: {
                body: [
                  [
                    {
                      text: `${sealColor} SEAL`,
                      fontSize: 9,
                      alignment: 'center'
                    }
                  ]
                ]
              },
            },
          { width: '*', text: '' },
        ]
      },
      {text: "\n"},
      {
        image: 'logo', 
        width: 54,
        alignment: 'center'
      },
    ]);
    return body;
  }

  function addRecipeCell(body, recipe) {
    var txt = ''
    var containsArcane = false;
    $.each(recipe.properties, function(index, prop) {
      var symbol = chemSymbols.getSymbolForProperty(prop);
      if (!symbol && prop === 'arcane') {
        containsArcane = true;
      } else {
        txt = txt.concat(`${symbol}\n`);
      }
    });
    var arcaneImg = {};
    if (containsArcane) {
      arcaneImg = {
        image: 'arcane', 
        width: 18,
        alignment: 'center'
      }
    }

    var verticalSpacer = {};
    var numSpaces = 8 - recipe.properties.length;
    if (numSpaces > 0) {
      verticalSpacer = {text: "\n".repeat(numSpaces)};
    }

    body[0].push([
      {text: "\n"},
      verticalSpacer,
      arcaneImg,
      {
        text: txt,
        font: 'Alchemy',
        alignment: 'center',
        fontSize: 15
      }
    ]);
    return body;
  }

  function addTypeCell(body, recipe) {
    body[0].push({
      stack: [
        {
          table: {
            heights: ['*', 'auto', 'auto'],
            body: [
              [{text: '\n\n\n\n'}],
              [{
                text: recipe.type,
                font: "Milonga",
                alignment: 'center'
              }],
              [{
                text: typeLookup(recipe.type),
                fontSize: 9,
                alignment: 'center'
              }]
            ]
          },
          layout: 'noBorders'
        }
      ],
      border: [true, true, false, true]
    });
    return body;
  }

  function addEffectCell(body, recipe) {
    body[0].push(
      {
        stack: [
          {text: '\n'},
          {
            text: recipe.name,
            font: 'Milonga',
            alignment: 'center',
            fontSize: '14'
          },
          {
            text:  recipe.mechanics,
            alignment: 'center',
            fontSize: '10'
          }
        ],
        border: [false, true, true, true]
      }
    );
    return body;
  }

  function typeLookup(type) {
    switch (type) {
      case 'Magic':
        return 'Can be resisted with a spellshield';
      case 'Active Magic':
        return 'Can be resisted with a spellshield';
      case 'Powder':
        return 'Cast as a packet. Expires in 5 minutes or when packet is set down';
      case 'Weapon Augment':
        return 'Applied as an augment to a weapon';
      case 'Poison':
        return 'Can be cured with a purify';
      case 'Drug':
        return 'Can be cured with a purify';
      case 'Malady':
        return 'Cannot be cured or resisted by any rulebook skills';
      case 'Curse':
        return 'Cannot be cured or resisted by any rulebook skills. Can be destroyed';
      case 'Active Curse':
        return 'Cannot be cured or resisted by any rulebook skills. Can be destroyed';
      case 'Remedy':
        return 'Cannot be resisted with rulebook skills';
      case 'Irresistable':
        return 'Cannot be resisted';
      default:
        return '';
    }
  }


  function makeSpacer(contentArray, isPageBreak) {
    if (isPageBreak) {
      contentArray.push({
        text: ' ',
        pageBreak: 'after'
      });
    } else {
      contentArray.push({
        text: '\n\n\n\n',
        fontSize: 12
    });
    }
    return contentArray;
  }

  return {
    makeTag: makeTag,
    makeSpacer: makeSpacer
  };
}());

// define styles and fonts for the elixir labels here
var printConfig = printConfig || (function() {
  
  var defaultDef = { font: 'Arial' };

  var styleDef = {
    symbol: { fontSize: 18, font: 'Alchemy' },
    header: { fontSize: 12, font: 'Milonga' }
  };

  var fontDef = {
    Milonga: {
      normal: 'Milonga-Regular.ttf',
      bold: 'Milonga-Regular.ttf',
      italics: 'Milonga-Regular.ttf',
      bolditalics: 'Milonga-Regular.ttf'
    },
    Alchemy: {
      normal: 'Alchemy-Regular.TTF',
      bold: 'Alchemy-Regular.TTF',
      italics: 'Alchemy-Regular.TTF',
      bolditalics: 'Alchemy-Regular.TTF'
    },
    Arial: {
      normal: 'arial.ttf',
      bold: 'arialb.ttf',
      italics: 'ariali.ttf',
      bolditalics: 'arialbi.ttf'
    }
  };

  var imgDef = {
    logo: 'ship.jpg',
    arcane: 'arcane.JPG',
    auntie: 'data:image/jpeg;base64,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',
    serelia: 'data:image/jpeg;base64,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',
    serendipity: 'data:image/jpeg;base64,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',
    ursula: 'data:image/jpeg;base64,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',
    melope: 'data:image/png;base64,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'
  };

  return {
    styles: styleDef,
    fonts: fontDef,
    defaults: defaultDef,
    images: imgDef
  };
}());