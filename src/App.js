import React from 'react';

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
            favouriteImageIds: [],
        };
    }

    handleImageClick = (e) => {
        let imageId = e.target.id;
        
        e.preventDefault();
        this.setState((prevState) => ({
            favouriteImageIds: prevState.favouriteImageIds.concat(imageId),
        }));
    };

    render() {
        return (
            <div>
                <Nav />

                <HashRouter>
                    <div className="content col-lg-5">
                        <Route exact path="/" component={() => <Search handleImageClick={this.handleImageClick}/>} />
                        <Route path="/search" component={() => <Search handleImageClick={this.handleImageClick}/>} />
                        <Route path="/favourites" component={() => <Favourites favouriteImageIds={this.state.favouriteImageIds} />} />
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