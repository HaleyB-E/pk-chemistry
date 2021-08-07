import React, { Component } from "react";

export class NewRecipeModal extends Component {
  render() {
    return (
      <div className="modal fade" id="addNewModal" role="dialog">
        <div className="modal-dialog">
          {/* <!-- Modal content--> */}
          <div className="modal-content">
            <div className="modal-header">
              <h4 className="modal-title milonga">Define New Recipe</h4>
              <button type="button" className="close" data-dismiss="modal">&times;</button>
            </div>
            <div className="modal-body">
              <div className="pb-3">
                The combination of properties you have entered has not been defined yet.
                Define a new recipe, or hit 'Cancel' to change your selection.
                <br/>
                <span className="new-recipe-properties"/>
              </div>
              <div className="input-group">
                  <div className="input-group-prepend">
                    <span className="input-group-text">Name</span>
                  </div>
                  <input className="form-control new-recipe-name" aria-label="Name"/>
                </div>
                <br/>
                <div className="input-group">
                  <div className="input-group-prepend">
                    <span className="input-group-text">Effect</span>
                  </div>
                  <textarea className="form-control new-recipe-effect" aria-label="Effect"></textarea>
                </div>
                <br/>
                {/* <!-- New recipe Form dropdown --> */}
                <div className="dropdown new-recipe-form">
                  {/* style="display: inline-block;"> */}
                    <button className="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                      Form
                    </button>
                    <div className="dropdown-menu"  aria-labelledby="dropdownMenuButton">
                      <a className="dropdown-item form-dropdown" id="form-potion">Potion</a>
                      <a className="dropdown-item form-dropdown" id="form-oil">Oil</a>
                      <a className="dropdown-item form-dropdown" id="form-powder">Powder</a>
                    </div>
                    <span className="selected-value form-selected-value"></span>
                  </div>
                  {/* <!-- New Recipe Type dropdown --> */}
                  <div className="dropdown new-recipe-type">
                  {/* style="float: right;"> */}
                    <button className="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton2" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                      Type
                    </button>
                    <div className="dropdown-menu"  aria-labelledby="dropdownMenuButton2">
                      <a className="dropdown-item type-dropdown" id="type-magic">Magic</a>
                      <a className="dropdown-item type-dropdown" id="type-active-magic">Active Magic</a>
                      <a className="dropdown-item type-dropdown" id="type-powder">Powder</a>
                      <a className="dropdown-item type-dropdown" id="type-weapon-augment">Weapon Augment</a>
                      <a className="dropdown-item type-dropdown" id="type-poison">Poison</a>
                      <a className="dropdown-item type-dropdown" id="type-malady">Malady</a>
                      <a className="dropdown-item type-dropdown" id="type-instant-curse">Instant Curse</a>
                      <a className="dropdown-item type-dropdown" id="type-active-curse">Active Curse</a>
                      <a className="dropdown-item type-dropdown" id="type-remedy">Remedy</a>
                      <a className="dropdown-item type-dropdown" id="type-irresistable">Irresistable</a>
                    </div>
                    <span className="selected-value type-selected-value"></span>
                  </div>
                </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" data-dismiss="modal">Cancel</button>
                <button type="button" className="btn action-button new-recipe-confirm" data-dismiss="modal">Save</button>
              </div>
          </div>
        </div>
      </div>
    );
  }
}