import React from "react";
import { IChemRecipe } from "../helpers/entities";
import { printToPdfConfig, typeLookup, fontConfig } from "./definitions";
import pdfMake, {createPdf} from 'pdfmake/build/pdfmake';
import pdf, { PDFColumn, PDFColumns, PDFDocument, PDFTable, PDFTableColumn, PDFTableRow, PDFText } from "react-pdfmake/lib";

import pdfFonts from "pdfmake/build/vfs_fonts"
pdfMake.vfs = pdfFonts.pdfMake.vfs;

export class PrintToPdfHandler {
  public makePdf = (printQueue: IChemRecipe[]): void => {
    pdfMake.fonts = fontConfig;

    const y = printQueue.map(recipe => recipe.mechanics)[0]
    pdf(
      <PDFDocument
        pageSize='LETTER'
        pageOrientation='landscape'
        pageBreakBefore={(currentNode, followingNodesOnPage) => {
          return (
            currentNode.headlineLevel === 1 && followingNodesOnPage.length === 0
          );
        }}
        styles={printToPdfConfig.styles}
        defaultStyle={printToPdfConfig.defaults}
      >
        <PDFText style='header'>
          {y}
        </PDFText>
      </PDFDocument>
    ).open();

    // let contentArray: any[] = [];
    // printQueue.forEach((recipe, index) => {
    //   contentArray = PrintToPdfHandler.makeTag(contentArray, recipe);
    //   contentArray = PrintToPdfHandler.makeSpacer(contentArray, (index + 1) % 3 === 0)
    // });
    // pdfMake.fonts = printToPdfConfig.fonts;
    // const docDefinition = {
    //   pageSize: 'LETTER' as any,
    //   pageOrientation: 'landscape' as any,
    //   content: contentArray,
    //   defaultStyle: printToPdfConfig.defaults,
    //   styles: printToPdfConfig.styles,
    //   images: printToPdfConfig.images
    // };
    //pdfMake.createPdf(docDefinition).open();//.download('test2.pdf')
    // const x = (
    //     <PDFDocument
    //       pageSize="LETTER"
    //       pageOrientation="landscape"
    //       styles={printToPdfConfig.styles}
    //       defaultStyle={printToPdfConfig.defaults}
    //     >
    //       <PDFTable>
    //         {printQueue.map((recipe, index) => {
    //           {this.makeTagReact(recipe)}
    //           {this.spacerReact((index + 1) % 3 === 0)}
    //         })}
    //       </PDFTable>
    //     </PDFDocument>
    // );
    //pdf(x).open();
  } 

  // // add each cell of the table composing a single tag, one at a time, then format
  public static makeTag = (contentArray: any[], recipe: IChemRecipe): any[] => {
    var tableBody = [[]];
    PrintToPdfHandler.addMakersMarkCell(tableBody, recipe);
    // PrintToPdfHandler.addLogoCell(tableBody, recipe);
    // PrintToPdfHandler.addRecipeCell(tableBody, recipe);
    // PrintToPdfHandler.addTypeCell(tableBody, recipe);
    // PrintToPdfHandler.addEffectCell(tableBody, recipe);
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
  };

  private makeTagReact = (recipe: IChemRecipe): JSX.Element => {
    //        widths: [18, 87, '6%', '15%', '*'],
    //heights: [112],
    return (
      <>
        <PDFTable style='tableBody'>
          {this.makersMarkCellReact(recipe)}
          {this.logoCellReact(recipe)}
          {this.recipeCellReact(recipe)}
          {this.typeCellReact(recipe)}
          {this.effectCellReact(recipe)}
        </PDFTable>
      </>
    )
  }

  private static addMakersMarkCell = (body: any[], recipe: IChemRecipe): any[] => {
    if (recipe.makerName && recipe.makerName.length > 0) {
      body[0].push([
        {
          image: recipe.makerName, 
          width: 18,
          alignment: 'center'
        }
      ]);
    } else {
      body[0].push([
        {text: "\n"}
      ]);
    }
    return body;
  };
  private makersMarkCellReact = (recipe: IChemRecipe): JSX.Element => {
    if (recipe.makerName && recipe.makerName.length > 0) {
      // {
      //   image: recipe.makerName, 
      //   width: 18,
      //   alignment: 'center'
      // }
      return (
        <PDFText>
          IMAGE HERE
        </PDFText>
      )
    }
    return (
      <PDFText>
        <br/>
      </PDFText>
    );
  }


  private static addLogoCell = (body: any[], recipe: IChemRecipe): any[] => {
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
  };
  private logoCellReact = (recipe: IChemRecipe): JSX.Element => {
    var sealColor = recipe.color.toUpperCase();
    // image: 'logo', 
    // width: 54,
    // alignment: 'center'
   return (
      <PDFTableColumn>
        <PDFColumns>
          <PDFColumn style="remainingWidth">
          </PDFColumn>
          <PDFColumn style="sealText">
            {`${sealColor} SEAL`}
          </PDFColumn>
          <PDFColumn style="remainingWidth">
          </PDFColumn>
        </PDFColumns>
        <PDFColumns>
          <PDFColumn>{'\n'}</PDFColumn>
        </PDFColumns>
        <PDFColumns>
          <PDFColumn>
            IMAGE HERE
          </PDFColumn>
        </PDFColumns>
      </PDFTableColumn>
    );
  }
  
  private static addTypeCell = (body: any[], recipe: IChemRecipe): any[] => {
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
  };
  private typeCellReact = (recipe: IChemRecipe): JSX.Element => {
    //          heights: ['*', 'auto', 'auto'],
    // layout=noBorders
    return (
      <PDFTable>
        <PDFTableColumn>
          {'\n\n\n\n'}
        </PDFTableColumn>
        <PDFTableColumn style='typeText'>
          {recipe.type}
        </PDFTableColumn>
        <PDFTableColumn style='sealText'>
          {typeLookup(recipe.type)}
        </PDFTableColumn>
      </PDFTable>
    )
      //border: [true, true, false, true]
  };

  private static addEffectCell = (body: any[], recipe: IChemRecipe): any[] => {
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
  };
  private effectCellReact = (recipe: IChemRecipe): JSX.Element => {
  //     border: [false, true, true, true]
    return (
      <>
        <PDFText>
          {'\n'}
        </PDFText>
        <PDFText style='name'>
          {recipe.name}
        </PDFText>
        <PDFText style='mechanics'>
          {recipe.mechanics}
        </PDFText>
      </>
    )
  }
  
  private static addRecipeCell = (body: any[], recipe: IChemRecipe): any[] => {
    let txt = ''
    let containsArcane = false;
    recipe.properties.forEach((property,index) => {
      const symbol = property.symbol
      if (!symbol && property.name === 'arcane') {
        containsArcane = true;
      } else {
        txt = txt.concat(`${symbol}\n`);
      }
    });
  
    let arcaneImg = {};
    if (containsArcane) {
      arcaneImg = {
        image: 'arcane', 
        width: 18,
        alignment: 'center'
      }
    }
  
    let verticalSpacer = {};
    const numSpaces = 8 - recipe.properties.length;
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
  };
  private recipeCellReact = (recipe: IChemRecipe): JSX.Element => {
    let txt = ''
    let containsArcane = false;
    recipe.properties.forEach((property,index) => {
      const symbol = property.symbol
      if (!symbol && property.name === 'arcane') {
        containsArcane = true;
      } else {
        txt = txt.concat(`${symbol}\n`);
      }
    });
  
    let arcaneImg = {};
    if (containsArcane) {
      // TODO
      arcaneImg = {
        image: 'arcane', 
        width: 18,
        alignment: 'center'
      }
    }
  
    let verticalSpacer = {};
    const numSpaces = 8 - recipe.properties.length;
    if (numSpaces > 0) {
      verticalSpacer = 
      <PDFText>
        {'\n'.repeat(numSpaces)}
      </PDFText>
    }
  
    return (
      <>
        <PDFText>
          {'\n'}
        </PDFText>
        {verticalSpacer}
        {arcaneImg}
        <PDFText style='alchemy'>
          {txt}
        </PDFText>
      </>
    );
  }
  
  public static makeSpacer = (contentArray: any[], isPageBreak: boolean): any[] => {
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
  private spacerReact = (isPageBreak: boolean): JSX.Element => {
    if (isPageBreak) {
      return <PDFText pageBreak='after'>{' '}</PDFText>
    }
    return <PDFText style='spacer'>{'\n\n\n\n'}</PDFText>
  }
}
