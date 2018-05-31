import React from 'react';

import ImageGrid from "./ImageGrid";

class Search extends React.Component {
    render() {
        return (
            <div>
                <form className="form-group">
                    <input 
                        className="form-control" 
                        type="text" 
                        onChange={this.props.handleTextChange}
                        value={this.props.query}
                        placeholder="Start searching for images!"
                    />
                    <input 
                        type="submit" 
                        style={{ display: "none" }}
                        onClick={this.props.handleQuerySubmit} 
                        value="API_GET"
                    />
                </form>

                <ImageGrid handleImageClick={this.props.handleImageClick} imageResults={this.props.imageResults} />

                {this.props.imageResults.length > 0 &&
                    <form className="form-group">
                        <input 
                            type="submit"
                            className="btn btn-primary"
                            onClick={this.props.handleFetchMore} 
                            value="Fetch More" />
                    </form>
                }
            </div>
        );
    }
}

export default Search;