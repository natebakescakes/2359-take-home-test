import React from 'react';
import axios from 'axios';

import {
    Route,
    HashRouter,
    NavLink,
} from "react-router-dom";

import {
    Container,
    Navbar,
    Nav,
    NavItem,
    PageHeader,
} from 'react-bootstrap';

import Search from "./components/Search";
import Favourites from "./components/Favourites";

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            query: "",
            imageResults: [],
            favouriteImages: [],
            resultSet: 0,
        };
    }

    // Change this to modify number of images returned
    static resultSize = 8;

    handleQuerySubmit = (e) => {
        let apiUrl = `https://api.giphy.com/v1/gifs/search?api_key=${process.env.REACT_APP_GIPHY}&q=${this.state.query}&limit=${App.resultSize}&offset=${this.state.resultSet * App.resultSize}&rating=G&lang=en`;

        axios.get(apiUrl)
        .then(resp => {
            this.setState((prevState) => ({ 
                // Add favourited boolean to all image objects
                imageResults: resp.data.data.map(image => {
                    image.favourited = false;
                    return image;
                }),
                resultSet: prevState.resultSet + 1,  
            }));
        });
    }

    handleFetchMore = (e) => {
        let apiUrl = `https://api.giphy.com/v1/gifs/search?api_key=${process.env.REACT_APP_GIPHY}&q=${this.state.query}&limit=${App.resultSize}&offset=${this.state.resultSet * App.resultSize}&rating=G&lang=en`;

        axios.get(apiUrl)
        .then(resp => {
            this.setState((prevState) => ({ 
                imageResults: prevState.imageResults.concat(resp.data.data.map(image => {
                    image.favourited = false;
                    return image;
                })),
                resultSet: prevState.resultSet + 1,  
            }));
        });
    }
    
    handleTextChange = (e) => {
        e.preventDefault();
        this.setState({ query: e.target.value });
    };

    // Handles both Like and Unlike
    handleImageClick = (e) => {
        let imageId = e.target.alt;
        
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
        return (
            <div>
                <HashRouter>
                    <Navbar>
                        <Navbar.Header><Navbar.Brand>Gallereasy</Navbar.Brand></Navbar.Header>
                        <Nav bsStyle="pills">
                            <NavItem><NavLink to="/search">Search</NavLink></NavItem>
                            <NavItem><NavLink to="/favourites">Favourites</NavLink></NavItem>
                        </Nav>
                    </Navbar>
                </HashRouter>

                <HashRouter>
                    <div className="content">
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
                    </div>
                </HashRouter>

                <div className="container-fluid footer">
                    <span className="text-muted text-left">Gallereasy POC web app</span>
                    <span className="text-muted text-right">2359 Media</span>
                </div>
            </div>
        );
    }
}

export default App;