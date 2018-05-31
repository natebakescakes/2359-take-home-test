import React from 'react';
import axios from 'axios';

const ImageBox = (props) => {
    return (
        <img className="img" alt={props.title} src={props.images.fixed_height_still.url} />
    );
};

class ImageGrid extends React.Component {
    state = {
        imageData: [],
    };
    
    searchGiphy = (props) => {
        axios.get("https://api.giphy.com/v1/gifs/search?api_key=" + process.env.REACT_APP_GIPHY + "&q=cats&limit=20&offset=0&rating=G&lang=en")
        .then(resp => 
            this.setState({imageData: resp.data.data,})
        );
    }
    
    render() {
        return (
            <div>
                <input type="submit" onClick={this.searchGiphy} value="API_GET"/>
                {this.state.imageData.map(image => <ImageBox key={image.id} {...image} />)}
            </div>
        );
    }
}

export default ImageGrid;