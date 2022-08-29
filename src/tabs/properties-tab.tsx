import React, { Component } from 'react';
import { IChemProperty } from '../helpers/entities';

interface PropertiesTabProps {
  propertiesList: IChemProperty[];
}

export class PropertiesTab extends Component<PropertiesTabProps> {
  render() {
    const propertiesList = this.props.propertiesList;
    return (
      <div className="tab-pane fade show active" id="properties" role="tabpanel" aria-labelledby="properties-tab">
        <br/>
        {propertiesList.length === 0 &&
          <div>
            No properties loaded; something might be wrong
          </div>
        }
        {propertiesList.length > 0 &&
          <ul className="list-group" id="properties-list-display">
            {propertiesList.map((property, index) => {
              return (
              <li className='list-group-item property-item' key={index}>
                <b>{property.name}<span className='chem-symbol'> {property.symbol}</span>: </b>
                <br/>
                {property.effect}
                {property.defaultForm && `(${property.defaultForm})`}
              </li>
            )})}
          </ul>
        }
      </div>
    );
  }
}
