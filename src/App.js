import React from 'react';

import {
    Route,
    HashRouter,
} from "react-router-dom";

import Nav from "./components/Nav";
import Search from "./components/Search";
import Favourites from "./components/Favourites";

class App extends React.Component {
    render() {
        return (
            
            <div>
                <Nav />
                <HashRouter>
                    <div className="content col-lg-5">
                        <Route exact path="/" component={Search} />
                        <Route path="/search" component={Search} />
                        <Route path="/favourites" component={Favourites} />
                    </div>
                </HashRouter>
            </div>
        );
    }
}

export default App;