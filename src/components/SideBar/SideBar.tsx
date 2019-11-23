import React from "react";
import {NavLink} from "react-router-dom";
import "./SideBar.css";
import icons from "../../Assets/svg/svg";

const Qmark = icons.ui.question;
const EMail = icons.ui.mail;
const Githb = icons.brands.github;
const Twitt = icons.brands.twitter;

const SideBar = () => {
    return (
        <>
            <div id="sideHead">
                <h1>
                    Seel<span id="dot">.</span>
                    <span id="moh">mohfunk</span>
                </h1>
            </div>
            <div id="sideCont"></div>
            <div id="sideFoot">
                <div id="links">
                    <div className={"lnk"}>
                        <NavLink to={`/`} exact activeClassName="is-active">
                            <EMail />
                        </NavLink>
                    </div>
                    <div className={"lnk"}>
                        <NavLink to={`/about`} activeClassName="is-active">
                            <Qmark />
                        </NavLink>
                    </div>
                    <div className={"lnk"}>
                        <NavLink to={`/about`} activeClassName="is-active">
                            <Githb />
                        </NavLink>
                    </div>
                </div>
                <div id="cpr">
                    <h6>Copyrights © 2019 Alhaytham</h6>
                </div>
            </div>
        </>
    );
};

export default SideBar;
