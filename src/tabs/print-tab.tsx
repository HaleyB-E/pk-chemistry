import React, { Component } from 'react';
import { IChemRecipe } from '../helpers/entities';
import { generateRecipeTableRow } from '../helpers/helpers';
import { PrintToPdfHandler } from '../print-to-pdf/printToPdfHandler';

interface PrintTabProps {
  printQueue: IChemRecipe[];
}

export class PrintTab extends Component<PrintTabProps> {
  render() {
    const printQueue = this.props.printQueue;
    return (
      <div className="tab-pane fade show active" id="print" role="tabpanel" aria-labelledby="print-tab">
        <br/>
        {printQueue.length === 0 &&
          <div>
            No tags to print
          </div>
        }
        {printQueue.length > 0 &&
          <>
            <div className="print-button-container">
                <button className="print-button btn btn-lg action-button" onClick={this.printToPdf}>
                  Print All
                </button>
            </div>
            <br/>
            <div>
              <table className="table table-striped border">
                <tbody id="recipes-print-display">
                  {printQueue.map((recipe,index) => 
                    <tr className='recipe-item' id={`print-recipe-${index}`} key={index}>
                        {generateRecipeTableRow(recipe, true)}
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </>
        }
      </div>
    );
  }

  private printToPdf = (): void => {
    PrintToPdfHandler.makePdf(this.props.printQueue);
  }
}
