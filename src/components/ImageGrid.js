import React from 'react';

import {
    Row,
    Col,
    ProgressBar,
    Thumbnail,
} from 'react-bootstrap';

import Img from 'react-image';

class ImageBox extends React.Component {
    render() {
        return (
            <Col sm={6} md={4} lg={3}>
                <Thumbnail> 
                    <Img
                        style={{
                            objectFit: 'cover',
                            width: "100%",
                            height: "200px",
                        }}
                        className="img" 
                        id={this.props.id} 
                        alt={this.props.title}
                        src={this.props.images.fixed_height_still.url}
                        onClick={this.props.handleImageClick}
                        // TODO: Bind progress to axios onDownloadProgress config
                        loader={<ProgressBar now={Math.random() * 100} active/>}
                        thumbnail="true"
                    />
                </Thumbnail>
            </Col>
        );
    }
}

const ImageGrid = (props) => {
    return (
        <Row>
            {props.imageResults.map(image => <ImageBox 
                handleImageClick={props.handleImageClick} 
                key={image.id} 
                {...image} 
            />)}
        </Row>
    );
}

export default ImageGrid;