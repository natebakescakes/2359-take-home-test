import React from 'react';

import ImageGrid from "./ImageGrid";
import SearchBar from "./SearchBar";

class Search extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            query: null,
        };
    }

    handleChange = (e) => {
        this.setState({ value: e.target.value })
    };
    
    render() {
        return (
            <div>
                <SearchBar 
                    handleChange={this.handleChange} 
                    query={this.state.query} 
                />
                <ImageGrid query={this.state.query} />
            </div>
        );
    }
}

export default Search;