import React, { Component } from 'react';
import { RecipeTableRow } from '../components/recipe-table-row';
import { IChemRecipe } from '../helpers/entities';
import { PrintToPdfHandler } from '../print-to-pdf/printToPdfHandler';

interface PrintTabProps {
  printQueue: IChemRecipe[];
  removeItemFromQueue: (index: number) => void;
}

interface PrintTabState {
  makersMarks: string[];
}

export class PrintTab extends Component<PrintTabProps, PrintTabState> {
  constructor(props: PrintTabProps){
    super(props);
    this.state = {
      // fill with empty list the same length as the print queue
      makersMarks: props.printQueue.map(() => '')
    }
  }
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
                    <tr
                      className='recipe-item'
                      id={`print-recipe-${index}`}
                      key={index}
                    >
                      <td>
                        <button className="btn action-button" onClick={() => this.removeItemFromQueue(index)}>Remove</button>
                      </td>
                      <RecipeTableRow
                        index={index}
                        recipe={recipe}
                        includeMakersMarkSelection={true}
                        updateMakersMarkCallback={this.setMakersMark}
                        makersMark={this.state.makersMarks[index]}
                      />
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

  private removeItemFromQueue = (index: number): void => {
    const markListCopy = [...this.state.makersMarks];
    markListCopy.splice(index, 1);
    this.setState({makersMarks: markListCopy});
    this.props.removeItemFromQueue(index);
  }

  private setMakersMark = (maker: string, index: number): void => {
    const markListCopy = [...this.state.makersMarks];
    markListCopy[index] = maker;
    this.setState({
      makersMarks: markListCopy
    });
  }

  private printToPdf = (): void => {
    // extract makers marks from mark list
    const printQueueWithMarks = this.props.printQueue.map((recipe, index) => {
      return {
        ...recipe,
        makerName: this.state.makersMarks[index]
      }
    })
    new PrintToPdfHandler().makePdf(printQueueWithMarks);
  }
}
