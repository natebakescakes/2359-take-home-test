import React from 'react';

import {
    Grid,
    Row,
    Col,
    Thumbnail,
} from 'react-bootstrap';

const ImageBox = (props) => {
    return (
        <Col sm={6} md={4} lg={3}>
            <Thumbnail 
                className="img" 
                id={props.id} 
                alt={props.id} 
                src={props.images.fixed_height_still.url} 
                onClick={props.handleImageClick}
            />
        </Col>
    );
}

const ImageGrid = (props) => {
    return (
        <Grid>
            <Row>
                {props.imageResults.map(image => <ImageBox handleImageClick={props.handleImageClick} key={image.id} {...image} />)}
            </Row>
        </Grid>
    );
}

export default ImageGrid;