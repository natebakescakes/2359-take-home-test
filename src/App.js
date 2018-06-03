import React from 'react';
import axios from 'axios';

import {
    Route,
    HashRouter,
    NavLink,
    Switch,
} from "react-router-dom";

import {
    Grid,
    Navbar,
    Nav,
    NavItem,
    Row,
} from 'react-bootstrap';

import Search from "./components/Search";
import Favourites from "./components/Favourites";

import './index.css';
import { ErrorApi, ErrorPage } from './components/Error';

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            query: "",
            imageResults: [],
            favouriteImages: [],
            resultSet: 0,
            fetchingData: false,
            hasError: false,
        };
    }

    // To use a different API, replace segments of the new api url with the 4 defined variables
    apiConstructor = () => {
        const API_KEY = () => { return process.env.REACT_APP_GIPHY; }
        const QUERY = () => { return this.state.query; }
        const RESULT_SIZE = 8;
        const OFFSET = () => { return this.state.resultSet * RESULT_SIZE; }

        return `https://api.giphy.com/v1/gifs/search?api_key=${API_KEY()}&q=${QUERY()}&limit=${RESULT_SIZE}&offset=${OFFSET()}&rating=G&lang=en`;
    }

    handleQuerySubmit = (e) => {
        e.preventDefault();

        axios.get(this.apiConstructor())
            .then(resp => {
                this.setState((prevState) => ({ 
                    // Add favourited boolean to all image objects
                    imageResults: resp.data.data.map(image => {
                        image.favourited = false;
                        return image;
                    }),
                    resultSet: 1,  
                }));
            })
            .catch(error => {
                this.setState({ hasError: true });

                if (error.response) {
                    // The request was made and the server responded with a status code
                    // that falls out of the range of 2xx
                    console.log(error.response.data);
                    console.log(error.response.status);
                    console.log(error.response.headers);
                } else if (error.request) {
                    // The request was made but no response was received
                    // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
                    // http.ClientRequest in node.js
                    console.log(error.request);
                } else {
                    // Something happened in setting up the request that triggered an Error
                    console.log('Error', error.message);
                }
                console.log(error.config);
            });
    }

    handleFetchMore = (e) => {
        e.preventDefault();

        this.setState({ fetchingData: true });
        
        return axios({
            url: this.apiConstructor(),
            // onDownloadProgress: (progressEvent) => { this.setState({ fetchingData: true })}
        }).then(resp => {
                this.setState((prevState) => ({ 
                    imageResults: prevState.imageResults.concat(resp.data.data.map(image => {
                        image.favourited = false;
                        return image;
                    })),
                    resultSet: prevState.resultSet + 1,  
                    fetchingData: false,
                }));
            })
        
    }
    
    handleTextChange = (e) => {
        e.preventDefault();
        this.setState({ query: e.target.value });
    };

    // Handles both Like and Unlike
    handleImageClick = (e) => {
        let imageId = e.target.id;
        
        e.preventDefault();

        // If selected image is found in favouriteImages, remove that image, else add it to favouriteImages
        this.setState((prevState) => ({
            imageResults: prevState.imageResults.map(image => {
                if (image.id === imageId) image.favourited = !image.favourited;
                return image;
            }),
            favouriteImages: prevState.favouriteImages.filter(image => image.id === imageId).length > 0 ?
                prevState.favouriteImages.filter(image => image.id !== imageId) :
                prevState.favouriteImages.concat(prevState.imageResults.filter(image => image.id === imageId)),
        }));

        return;
    };

    render() {
        if (this.state.hasError) return ( <ErrorApi /> )

        return (
            <div>
                <HashRouter>
                    <Navbar>
                        <Navbar.Header><Navbar.Brand>Galler<b>easy</b></Navbar.Brand></Navbar.Header>
                        <Nav bsStyle="pills">
                            <NavItem><NavLink to="/search">Search</NavLink></NavItem>
                            <NavItem><NavLink to="/favourites">Favourites ({this.state.favouriteImages.length})</NavLink></NavItem>
                        </Nav>
                    </Navbar>
                </HashRouter>

                <HashRouter>
                    <div className="content">
                        <Switch>
                            <Route exact path="/" render={() => <Search
                                query={this.state.query} 
                                handleImageClick={this.handleImageClick} 
                                handleTextChange={this.handleTextChange}
                                handleFetchMore={this.handleFetchMore}
                                handleQuerySubmit={this.handleQuerySubmit}
                                imageResults={this.state.imageResults} />} />
                            <Route path="/search" render={() => <Search 
                                query={this.state.query} 
                                handleImageClick={this.handleImageClick} 
                                handleTextChange={this.handleTextChange}
                                handleFetchMore={this.handleFetchMore}
                                handleQuerySubmit={this.handleQuerySubmit}
                                imageResults={this.state.imageResults} />} />
                            <Route path="/favourites" render={() => <Favourites 
                                favouriteImages={this.state.favouriteImages}
                                handleImageClick={this.handleImageClick} />} />
                            <Route component={() => <ErrorPage />} />
                        </Switch>
                    </div>
                </HashRouter>

                <Grid fluid style={{
                    backgroundColor: '#DDDDDD',
                    verticalAlign: 'middle',
                    lineHeight: '50px',
                }}>
                    <Row style={{
                        width: '75%',
                        margin: 'auto',
                    }}>
                        <span className="text-muted">Gallereasy POC web app</span>
                        <span className="pull-right text-muted">2359 Media</span>
                    </Row>
                </Grid>
            </div>
        );
    }
}

export default App;