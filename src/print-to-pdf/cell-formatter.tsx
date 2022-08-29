import React from "react";
import { PDFTable } from "react-pdfmake/lib";
import PDFDocument from "react-pdfmake/lib/document";
import { getSymbolForProperty } from "../helpers/chemistry-symbol-getter";
import { IChemRecipe } from "../helpers/entities";
import { printToPdfConfig, typeLookup } from "./definitions";

export class PrintToPdfHandler {
  public static makePdf = (printQueue: IChemRecipe[]): void => {
  //   // const printFile = pdf(this.getDocumentDefinition(printQueue));
  //   // printFile.print();
  //   // //printFile.download();
  //   // printFile.open();


  //   // let contentArray: any[] = [];
  //   // printQueue.forEach((recipe, index) => {
  //   //   contentArray = this.makeTag(contentArray, recipe);
  //   //   contentArray = this.makeSpacer(contentArray, (index + 1) % 3 === 0)
  //   // });
  //   //PDFMake.fonts = printToPdfConfig.fonts;
  //   // const docDefinition = {
  //   //   pageSize: 'LETTER',
  //   //   pageOrientation: 'landscape',
  //   //   content: contentArray,
  //   //   defaultStyle: printToPdfConfig.defaults,
  //   //   styles: printToPdfConfig.styles,
  //   //   images: printToPdfConfig.images
  //   // };
  //   // pdfMake.createPdf(docDefinition).download('test2.pdf')
  }

  // private static getDocumentDefinition = (printQueue: IChemRecipe[]): JSX.Element => {
  //   // let contentArray: any[] = [];
  //   // printQueue.forEach((recipe, index) => {
  //   //   contentArray = this.makeTag(contentArray, recipe);
  //   //   contentArray = this.makeSpacer(contentArray, (index + 1) % 3 === 0)
  //   // });

  //   // content: contentArray,
  //   // images: printToPdfConfig.images
  //   return (
  //       <PDFDocument
  //         pageSize="LETTER"
  //         pageOrientation="landscape"
  //         styles={printToPdfConfig.styles}
  //         defaultStyle={printToPdfConfig.defaults}
  //       >
  //         <PDFTable>
  //         </PDFTable>
  //       </PDFDocument>
  //   );
  // } 

  // // add each cell of the table composing a single tag, one at a time, then format
  // public static makeTag = (contentArray: any[], recipe: IChemRecipe): any[] => {
  //   var tableBody = [[]];
  //   this.addMakersMarkCell(tableBody, recipe)
  //   this.addLogoCell(tableBody, recipe);
  //   this.addRecipeCell(tableBody, recipe);
  //   this.addTypeCell(tableBody, recipe);
  //   this.addEffectCell(tableBody, recipe);
  //   contentArray.push({
  //     table: {
  //       widths: [18, 87, '6%', '15%', '*'],
  //       heights: [112],
  //       body: tableBody
  //     },
  //     layout: {
  //       defaultBorder: false
  //     }
  //   });
  //   return contentArray;
  // };

  // private static addMakersMarkCell = (body: any[], recipe: IChemRecipe): any[] => {
  //   if (recipe.makerName && recipe.makerName.length > 0) {
  //     body[0].push([
  //       {
  //         image: recipe.makerName, 
  //         width: 18,
  //         alignment: 'center'
  //       }
  //     ]);
  //   } else {
  //     body[0].push([
  //       {text: "\n"}
  //     ]);
  //   }
  //   return body;
  // };

  // private static addLogoCell = (body: any[], recipe: IChemRecipe): any[] => {
  //   var sealColor = recipe.color.toUpperCase();
  //   // const x = (
  //   //   <PDFTableColumn>
  //   //     <PDFColumns>
  //   //       <PDFColumn style="remainingWidth">
  //   //       </PDFColumn>
  //   //       <PDFColumn style="sealText">
  //   //         {`${sealColor} SEAL`}
  //   //       </PDFColumn>
  //   //       <PDFColumn style="remainingWidth">
  //   //       </PDFColumn>
  //   //     </PDFColumns>
  //   //     <PDFColumns>
  //   //       <PDFColumn>{'\n'}</PDFColumn>
  //   //     </PDFColumns>
  //   //     <PDFColumns>
  //   //       <PDFColumn>
            
  //   //       </PDFColumn>
  //   //     </PDFColumns>
  //   //   </PDFTableColumn>
  //   // );
  //   body[0].push([
  //     {
  //       columns: [
  //         { width: '*', text: '' },
  //         {
  //           width: 'auto',
  //           table: {
  //             body: [
  //               [
  //                 {
  //                   text: `${sealColor} SEAL`,
  //                   fontSize: 9,
  //                   alignment: 'center'
  //                 }
  //               ]
  //             ]
  //           },
  //         },
  //         { width: '*', text: '' },
  //       ]
  //     },
  //     {text: "\n"},
  //     {
  //       image: 'logo', 
  //       width: 54,
  //       alignment: 'center'
  //     },
  //   ]);
  //   return body;
  // };
  
  // private static addTypeCell = (body: any[], recipe: IChemRecipe): any[] => {
  //   body[0].push({
  //     stack: [
  //       {
  //         table: {
  //           heights: ['*', 'auto', 'auto'],
  //           body: [
  //             [{text: '\n\n\n\n'}],
  //             [{
  //               text: recipe.type,
  //               font: "Milonga",
  //               alignment: 'center'
  //             }],
  //             [{
  //               text: typeLookup(recipe.type),
  //               fontSize: 9,
  //               alignment: 'center'
  //             }]
  //           ]
  //         },
  //         layout: 'noBorders'
  //       }
  //     ],
  //     border: [true, true, false, true]
  //   });
  //   return body;
  // };

  // private static addEffectCell = (body: any[], recipe: IChemRecipe): any[] => {
  //   body[0].push(
  //     {
  //       stack: [
  //         {text: '\n'},
  //         {
  //           text: recipe.name,
  //           font: 'Milonga',
  //           alignment: 'center',
  //           fontSize: '14'
  //         },
  //         {
  //           text:  recipe.mechanics,
  //           alignment: 'center',
  //           fontSize: '10'
  //         }
  //       ],
  //       border: [false, true, true, true]
  //     }
  //   );
  //   return body;
  // };
  
  // private static addRecipeCell = (body: any[], recipe: IChemRecipe): any[] => {
  //   let txt = ''
  //   let containsArcane = false;
  //   recipe.properties.forEach((property,index) => {
  //     const symbol = getSymbolForProperty(property);
  //     if (!symbol && property === 'arcane') {
  //       containsArcane = true;
  //     } else {
  //       txt = txt.concat(`${symbol}\n`);
  //     }
  //   });
  
  //   let arcaneImg = {};
  //   if (containsArcane) {
  //     arcaneImg = {
  //       image: 'arcane', 
  //       width: 18,
  //       alignment: 'center'
  //     }
  //   }
  
  //   let verticalSpacer = {};
  //   const numSpaces = 8 - recipe.properties.length;
  //   if (numSpaces > 0) {
  //     verticalSpacer = {text: "\n".repeat(numSpaces)};
  //   }
  
  //   body[0].push([
  //     {text: "\n"},
  //     verticalSpacer,
  //     arcaneImg,
  //     {
  //       text: txt,
  //       font: 'Alchemy',
  //       alignment: 'center',
  //       fontSize: 15
  //     }
  //   ]);
  //   return body;
  // };
  
  // public static makeSpacer = (contentArray: any[], isPageBreak: boolean): any[] => {
  //   if (isPageBreak) {
  //     contentArray.push({
  //       text: ' ',
  //       pageBreak: 'after'
  //     });
  //   } else {
  //     contentArray.push({
  //       text: '\n\n\n\n',
  //       fontSize: 12
  //   });
  //   }
  //   return contentArray;
  // }
}
