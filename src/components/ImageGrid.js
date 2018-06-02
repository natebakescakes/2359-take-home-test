import React from 'react';

import {
    Row,
    Col,
    ProgressBar,
    Thumbnail,
} from 'react-bootstrap';
import Img from 'react-image';

import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import faHeart from '@fortawesome/fontawesome-free-solid/faHeart';

import '../index.css'; 
  
class ImageBox extends React.Component {
    render() {
        return (
            <Col sm={6} md={4} lg={3}>
                <Thumbnail> 
                    {!this.props.favourited &&
                        <div class="content-details"
                            onClick={this.props.handleImageClick}>
                            <h1><FontAwesomeIcon icon={faHeart} /></h1>
                        </div>
                    }
                    <Img
                        style={{
                            objectFit: 'cover',
                            width: "100%",
                            height: "200px",
                        }}
                        id={this.props.id} 
                        alt={this.props.title}
                        src={this.props.images.fixed_height_still.url}
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