import React from 'react';
import PropTypes from 'prop-types';

const Guest = (props) => {
    return (        
        <li>
        <span>{props.name}</span>
        <label>
            <input type="checkbox" checked={props.isConfirmed}/> Confirmed
        </label>
        <button>edit</button>
        <button>remove</button>
        </li>
    );
}

Guest.PropTypes = {
    name: PropTypes.string.isRequired,
    isConfirmed: PropTypes.bool.isRequired
};

export default Guest;