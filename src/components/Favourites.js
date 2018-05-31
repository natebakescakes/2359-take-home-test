import React from 'react';
import axios from 'axios';

import ImageGrid from './ImageGrid';

const Favourites = (props) => {
    return (
        <ImageGrid handleImageClick={() => { return }} imageResults={props.favouriteImages}/>
    );
}

export default Favourites;