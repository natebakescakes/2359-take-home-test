import React from 'react';
import axios from 'axios';

import {
    Route,
    HashRouter,
} from "react-router-dom";

import Nav from "./components/Nav";
import Search from "./components/Search";
import Favourites from "./components/Favourites";

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            query: "",
            imageResults: [],
            favouriteImages: [],
        };
    }

    handleTextChange = (e) => {
        e.preventDefault();
        this.setState({ query: e.target.value });

        return;
    };

    searchGiphy = (props) => {
        axios.get("https://api.giphy.com/v1/gifs/search?api_key=" + process.env.REACT_APP_GIPHY + "&q=" + this.state.query + "&limit=20&offset=20&rating=G&lang=en")
        .then(resp => {
            this.setState({ imageResults: resp.data.data });
        });
    }

    handleImageClick = (e) => {
        let imageId = e.target.id;
        
        e.preventDefault();
        this.setState((prevState) => ({
            favouriteImages: prevState.favouriteImages.concat(prevState.imageResults.filter(image => image.id === imageId)),
        }));
    };

    render() {
        return (
            <div>
                <Nav />
                <HashRouter>
                    <div className="content col-lg-5">
                        <Route exact path="/" render={() => <Search
                            query={this.state.query} 
                            handleImageClick={this.handleImageClick} 
                            handleTextChange={this.handleTextChange}
                            handleQuerySubmit={this.searchGiphy}
                            imageResults={this.state.imageResults} />} />
                        <Route path="/search" render={() => <Search 
                            query={this.state.query} 
                            handleImageClick={this.handleImageClick} 
                            handleTextChange={this.handleTextChange}
                            handleQuerySubmit={this.searchGiphy}
                            imageResults={this.state.imageResults} />} />
                        <Route path="/favourites" render={() => <Favourites favouriteImages={this.state.favouriteImages} />} />
                    </div>
                </HashRouter>

                <div className="container footer">
                    <span className="text-muted text-left">Gallereasy POC web app</span>
                    <span className="text-muted text-right">2359 Media</span>
                </div>
            </div>
        );
    }
}

export default App;