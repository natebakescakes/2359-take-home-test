import React from 'react';

const SearchBar = (props) => {
    return (
        <form className="form-group">
            <input className="form-control" type="text" onChange={props.handleChange} value={props.query} />
        </form>
    );
}

export default SearchBar;