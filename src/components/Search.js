import React from 'react';

import {
    FormGroup,
    FormControl,
    Grid,
} from 'react-bootstrap';

import ImageGrid from "./ImageGrid";

class Search extends React.Component {
    render() {
        return (
            <div>
                <Grid className="search">
                    <FormGroup>
                        <form>
                            <FormControl
                                style={{
                                    width: "75%",
                                    margin: "auto",
                                }}
                                type="text" 
                                onChange={this.props.handleTextChange}
                                value={this.props.query}
                                placeholder="Start searching for images!"
                            />
                            <FormControl
                                type="submit" 
                                style={{ display: "none" }}
                                onClick={this.props.handleQuerySubmit} 
                                value="API_GET"
                            />
                        </form>
                    </FormGroup>

                    <ImageGrid handleImageClick={this.props.handleImageClick} imageResults={this.props.imageResults} />

                    {this.props.imageResults.length > 0 &&
                        <FormGroup>
                            <FormControl
                                style={{
                                    width: "50%",
                                    margin: "auto",
                                }}
                                type="submit"
                                onClick={this.props.handleFetchMore} 
                                value="Fetch More" 
                            />
                        </FormGroup>
                    }
                </Grid>
            </div>
        );
    }
}

export default Search;