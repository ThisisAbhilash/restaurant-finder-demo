import React from 'react';
import { listOfCitiesServing } from '../../utilities/Constants';
import Button from '../../components/ButtonComponent';
import PropTypes from 'prop-types';
import './citysel.css';

const CityLocationSelector = ({ selectedCity, onCitySelection }) => {

    let optionCitiesButton = listOfCitiesServing.map(eachCity => {
        let classToApply = (selectedCity && selectedCity.toUpperCase() === eachCity.city.toUpperCase()) ? "btn btn-primary active" : "btn btn-primary";
        return (
            <div key={eachCity.city_id} className="button-container">
                <Button type="button" className={classToApply} text={eachCity.city} onClick={() => onCitySelection(eachCity.city)} />
            </div>
        );
    });
    return (
        <div className="flex-button-container">
            {optionCitiesButton}
        </div>
    )
}

CityLocationSelector.propTypes = {
    selectedCity: PropTypes.string,
    onCitySelection: PropTypes.func
};

export default CityLocationSelector;