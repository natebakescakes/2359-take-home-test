import React from 'react';

import {
    Grid,
} from 'react-bootstrap';

import ImageGrid from './ImageGrid';

const Favourites = (props) => {
    return (
        <Grid className="favourites">
            <ImageGrid handleImageClick={props.handleImageClick} imageResults={props.favouriteImages}/>
        </Grid>
    );
}

export default Favourites;