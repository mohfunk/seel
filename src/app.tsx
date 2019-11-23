import React from "React";
import SideBar from "./components/SideBar/SideBar";
import {BrowserRouter as Router, Route} from "react-router-dom";

import "./Assets/style/main.css";
import "./skt/render";

const Home = () => (
    <>
        <div id="mainHead"></div>
        <div id="mainCont"></div>
        <div id="mainFoot"></div>
    </>
);

const App = () => (
    <>
        <div id="app">
            {}
            <Router>
                <aside id="sideBar">
                    <SideBar></SideBar>
                </aside>
                <main id="mainContent">
                    <Route exact path="/" component={Home} />
                    <Route path="/about" component={Home} />
                </main>
            </Router>
        </div>
    </>
);

export default App;
