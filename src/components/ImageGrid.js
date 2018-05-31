import React from 'react';

const ImageBox = (props) => {
    return (
        <img className="img" id={props.id} alt={props.title} src={props.images.fixed_height_still.url} onClick={props.handleImageClick} />
    );
}

const ImageGrid = (props) => {
    return (
        <div>
            {props.imageResults.map(image => <ImageBox handleImageClick={props.handleImageClick} key={image.id} {...image} />)}
        </div>
    );
}

export default ImageGrid;