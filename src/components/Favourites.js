import React from 'react';
import axios from 'axios';

import ImageGrid from './ImageGrid';

class Favourites extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            favouriteImages: [],
        };
    }

    imageResults = axios.get("https://api.giphy.com/v1/gifs?api_key=" + process.env.REACT_APP_GIPHY + "&ids=" + this.props.favouriteImageIds.join(','))
        .then(resp => {
            this.setState({ favouriteImages: resp.data.data, });
        });
    
    render() {
        return (
            <ImageGrid handleImageClick={() => { return }} imageResults={this.state.favouriteImages}/>
        );
    }
}

export default Favourites;