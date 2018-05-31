import React from 'react';

import ImageGrid from './ImageGrid';

const Favourites = (props) => {
    return (
        <ImageGrid handleImageClick={() => { return }} imageResults={props.favouriteImages}/>
    );
}

export default Favourites;