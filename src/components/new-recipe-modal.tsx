import React, { Component } from "react";
import { Dropdown, DropdownButton } from "react-bootstrap";
import Modal from "react-bootstrap/esm/Modal";
import ModalHeader from "react-bootstrap/esm/ModalHeader";

interface NewRecipeModalState {
  isOpen: boolean;
}

interface NewRecipeModalProps {
  isOpen: boolean;
  setVisible: (isVisible: boolean) => void;
}

export class NewRecipeModal extends Component<NewRecipeModalProps, NewRecipeModalState> {
  constructor(props: NewRecipeModalProps) {
    super(props);
    this.state = {
      isOpen: this.props.isOpen
    };
  }

  public componentDidUpdate(prevProps: NewRecipeModalProps) {
    if (prevProps.isOpen != this.props.isOpen) {
      this.setState({isOpen: this.props.isOpen});
    }
  }

  private getRecipeFormDropdown(): JSX.Element {
    const formNameList = ['Potion', 'Oil', 'Powder'];
    const nameItems = formNameList.map(name => {
      return (
        <Dropdown.Item className='dropdown-item form-dropdown'
          id={`form-${name}`}
          key={name}>{name}</Dropdown.Item>
      );
    });
    return (
      <div className="dropdown new-recipe-form"> {/*style="display: inline-block;">*/}
        <DropdownButton id='dropdownMenuButton' title='Form' className='btn btn-secondary'>
          {nameItems}
        </DropdownButton>
        <span className="selected-value form-selected-value"></span>
      </div>
    )
  }

  private getRecipeTypeDropdown(): JSX.Element {
    const typeNameList = ['Magic', 'Active Magic', 'Powder', 'Weapon Augment', 'Poison',
                          'Malady', 'Instant Curse', 'Active Curse', 'Remedy', 'Irresistable'];
    const typeItems = typeNameList.map(name => {
      const compressedName = name.replace(' ','-').toLocaleLowerCase;
      return (
        <Dropdown.Item className='dropdown-item type-dropdown'
          id={`form-${compressedName}`}
          key={name}>
          {name}
        </Dropdown.Item>
      );
    });
    return (
      <div className="dropdown new-recipe-type"> {/* style="float: right;">*/}
        <DropdownButton id='dropdownMenuButton2' title='Type' className='btn btn-secondary dropdown-toggle'>
          {typeItems}
        </DropdownButton>
        <span className="selected-value type-selected-value"/>
      </div>
    );
  }

  public render() {
    return (
      <Modal show={this.state.isOpen} onHide={() => this.props.setVisible(false)} animation={false}>
        <ModalHeader closeButton>
          <Modal.Title className='modal-title milonga'>Define New Recipe</Modal.Title>          
        </ModalHeader>
        <Modal.Body>
          <div className='pb-3'>
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
          {/* New recipe Form dropdown */}
          {this.getRecipeFormDropdown()}
          {/* New Recipe Type dropdown */}
          {this.getRecipeTypeDropdown()}
        </Modal.Body>
        <Modal.Footer>
        </Modal.Footer>
      </Modal>
    );
  }
}