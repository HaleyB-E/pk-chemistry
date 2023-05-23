import React, { Component } from "react";
import { Button, Dropdown, DropdownButton } from "react-bootstrap";
import Modal from "react-bootstrap/esm/Modal";
import ModalHeader from "react-bootstrap/esm/ModalHeader";
import { IChemProperty, IChemRecipe } from "../helpers/entities";
import { AirTableLoaderService } from "../loader/airtable-loader";

interface NewRecipeModalState {
  isOpen: boolean;
  name: string;
  effect: string;
  form: string;
  type: string;
}

interface NewRecipeModalProps {
  isOpen: boolean;
  setVisible: (isVisible: boolean) => void;
  airtableLoader: AirTableLoaderService;
  selectedProperties: IChemProperty[];
}

export class NewRecipeModal extends Component<NewRecipeModalProps, NewRecipeModalState> {
  constructor(props: NewRecipeModalProps) {
    super(props);
    this.state = {
      isOpen: this.props.isOpen,
      name: '',
      effect: '',
      form: '',
      type: ''
    };
  }

  public componentDidUpdate = (prevProps: NewRecipeModalProps) => {
    if (prevProps.isOpen != this.props.isOpen) {
      this.setState({isOpen: this.props.isOpen});
    }
  }

  private getRecipeFormDropdown = (): JSX.Element => {
    const formNameList = ['Potion', 'Oil', 'Powder', 'Perfume'];
    const nameItems = formNameList.map(name => {
      return (
        <Dropdown.Item
          className='dropdown-item form-dropdown'
          id={`form-${name}`}
          key={name}
          eventKey={name}
          onSelect={this.getRecipeFormOnSelect}>
            {name}
        </Dropdown.Item>
      );
    });
    return (
      <div className="dropdown new-recipe-form" style={{display: 'inline-block'}}>
        <DropdownButton id='dropdownRecipeForm' title='Form' className='btn'>
          {nameItems}
        </DropdownButton>
        <span className="selected-value form-selected-value">
          {this.state.form}
        </span>
      </div>
    )
  }
  private getRecipeFormOnSelect = (eventKey: any) => {
    this.setState({form: eventKey})
  }


  private getRecipeTypeDropdown = (): JSX.Element => {
    const typeNameList = ['Magic', 'Active Magic', 'Powder', 'Weapon Augment', 'Poison',
                          'Malady', 'Instant Curse', 'Active Curse', 'Remedy', 'Irresistable'];
    const typeItems = typeNameList.map(name => {
      const compressedName = name.replace(' ','-').toLocaleLowerCase;
      return (
        <Dropdown.Item
          className='dropdown-item type-dropdown'
          id={`form-${compressedName}`}
          key={name}
          eventKey={name}
          onSelect={this.getRecipeTypeOnSelect}>
          {name}
        </Dropdown.Item>
      );
    });
    return (
      <div className="dropdown new-recipe-type" style={{float: 'right'}}>
        <DropdownButton id='dropdownRecipeType' title='Type' className='btn'>
          {typeItems}
        </DropdownButton>
        <span className="selected-value type-selected-value">
          {this.state.type}
        </span>
      </div>
    );
  }
  private getRecipeTypeOnSelect = (eventKey: any) => {
    this.setState({type: eventKey})
  }

  private onHide = () => {
    this.props.setVisible(false)
  }

  private nameOnKeyUp = (ev: any) => {
    this.setState({name: ev.target.value});
  }
  private effectOnKeyUp = (ev: any) => {
    this.setState({effect: ev.target.value});
  }

  // todo: move out to helper
  private getColorFromForm = (form: string): string => {
    switch(form) {
      case 'Potion':
        return 'Red';
      case 'Oil':
        return 'Blue';
      case 'Powder':
        return 'Yellow';
      case 'Perfume':
        return 'Pink'
      default:
        return 'unknown';
    }
  }

  private onSave = () => {
    const recipeToSave: IChemRecipe = {
      name: this.state.name,
      color: this.getColorFromForm(this.state.form),
      type: this.state.type,
      mechanics: this.state.effect,
      properties: this.props.selectedProperties
    }
    this.props.airtableLoader.saveNewRecipe(recipeToSave)
  }

  public render() {
    const {name, effect, form, type} = this.state;
    return (
      <Modal show={this.state.isOpen} onHide={this.onHide} animation={false}>
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
            <input
              className="form-control new-recipe-name"
              aria-label="Name"
              value={this.state.name}
              onChange={this.nameOnKeyUp}
            />
          </div>
          <br/>
            <div className="input-group">
              <div className="input-group-prepend">
                <span className="input-group-text">Effect</span>
              </div>
              <textarea
                className="form-control new-recipe-effect"
                aria-label="Effect"
                value={this.state.effect}
                onChange={this.effectOnKeyUp}
              />
            </div>
          <br/>
          {this.getRecipeFormDropdown()}
          {this.getRecipeTypeDropdown()}
        </Modal.Body>
        <Modal.Footer>
          <Button
            className='action-button'
            onClick={this.onHide}
          >
            Cancel
          </Button>
          <Button
            className='action-button' 
            disabled={name.length === 0 || effect.length === 0 || type.length === 0 || form.length === 0}
            onClick={this.onSave}
          >
            Save
          </Button>
        </Modal.Footer>
      </Modal>
    );
  }
}