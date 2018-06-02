import React from 'react';

import {
    Row,
    Col,
    ProgressBar,
} from 'react-bootstrap';
import Img from 'react-image';

import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import faHeart from '@fortawesome/fontawesome-free-solid/faHeart';
import faTimes from '@fortawesome/fontawesome-free-solid/faTimes';

class ImageBox extends React.Component {
    render() {
        return (
            <Col sm={6} md={4} lg={3}>
                <div className="thumbnail"> 
                    <div className="caption" style= {{ padding: '0px' }}>
                        {/* Hover overlay to favourite */}
                        {!this.props.favourited &&
                            <div class="thumbnail__overlay"
                                style={{ color: "#e75a70" }}
                                onClick={this.props.handleImageClick}
                                id={this.props.id}>
                                <h1><FontAwesomeIcon icon={faHeart} /></h1>
                            </div>
                        }
                        {/* Icon for favourited */}
                        {this.props.favourited && 
                            <div class="thumbnail__overlay--favourited"
                                style={{ color: "#e75a70" }}>
                                <h1><FontAwesomeIcon icon={faHeart} /></h1>
                            </div>
                        }

                        {/* Hover overlay to unfavourite */}
                        {this.props.favourited &&
                            <div class="thumbnail__overlay"
                                style={{ color: 'white'}}
                                onClick={this.props.handleImageClick}
                                id={this.props.id}>
                            <h1><FontAwesomeIcon icon={faTimes} /></h1>
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
                            src={this.props.images.fixed_height.url}
                            // TODO: Bind progress to axios onDownloadProgress config
                            loader={<ProgressBar now={Math.random() * 100} active/>}
                            thumbnail="true"
                        />
                    </div>
                </div>
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