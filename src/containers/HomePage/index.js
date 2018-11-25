import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import CityLocationSelector from '../CityLocationSelector';
import RestroList from '../RestroList';
import { getUserLocationRestro, setSelectedCity } from '../../reducer/ActionCreator';
import PropTypes from 'prop-types';

class HomePage extends React.Component {
    componentWillMount() {
        this.props.getUserLocationRestro();
    }

    setSelectedCity(city) {
        this.props.setSelectedCity(city);
    }

    render() {
        const { city } = this.props;
        return (
            <div>
                <CityLocationSelector selectedCity={city} onCitySelection={(city) => this.setSelectedCity(city)} />
                <RestroList />
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        city: state.Restaurant.city
    };
};

const mapDispatchToProps = dispatch =>
    bindActionCreators(
        {
            getUserLocationRestro,
            setSelectedCity
        },
        dispatch
    );

HomePage.propTypes = {
    city: PropTypes.string,
    getUserLocationRestro: PropTypes.func,
    setSelectedCity: PropTypes.func,
};
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(HomePage);
