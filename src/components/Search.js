import React from 'react';
import axios from 'axios';

import ImageGrid from "./ImageGrid";

class Search extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            query: "",
            imageResults: [],
        };
    }

    handleChange = (e) => {
        e.preventDefault();
        this.setState({ query: e.target.value });
    };

    searchGiphy = (props) => {
        axios.get("https://api.giphy.com/v1/gifs/search?api_key=" + process.env.REACT_APP_GIPHY + "&q=" + this.state.query + "&limit=20&offset=20&rating=G&lang=en")
        .then(resp => {
            this.setState({ imageResults: resp.data.data });
        });
    }
    
    render() {
        return (
            <div>
                <form className="form-group">
                    <input 
                        className="form-control" 
                        type="text" 
                        onChange={this.handleChange} 
                        value={this.state.query} 
                        placeholder="Start searching for images!"
                    />
                    <input 
                        type="submit" 
                        style={{ display: "none" }}
                        onClick={this.searchGiphy} 
                        value="API_GET"
                    />
                </form>

                <ImageGrid handleImageClick={this.props.handleImageClick} imageResults={this.state.imageResults} />
            </div>
        );
    }
}

export default Search;