import React, { useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "../views/Home";
import AllBindBox from "../views/allBIndBox";
import BindBoxDetailJsx from "../views/blindBoxDetails";
import PersonAssetJsx from "../views/personalAssets";
import OpenBindBoxJsx from "../views/openBIndBox";
const RouterJsx = () => {
    useEffect(() => {
        // 监听账户发生变化
        window.ethereum.on("accountsChanged", (accounts: string[]) => {
            if (window.location.pathname == "/assets") {
                return (window.location.href = "/");
            }
            window.location.reload();
        });
    }, []);
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/allBindBox" element={<AllBindBox />} />
                <Route path="/bindBoxDetails" element={<BindBoxDetailJsx />} />
                <Route path="/assets" element={<PersonAssetJsx />} />
                <Route path="/openBindBox" element={<OpenBindBoxJsx />} />
            </Routes>
        </BrowserRouter>
    );
};

export default RouterJsx;
