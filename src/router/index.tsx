import React, { useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "../views/Home";
import AllBindBox from "../views/allBIndBox";
import BindBoxDetailJsx from "../views/blindBoxDetails";
import PersonAssetJsx from "../views/personalAssets";
import OpenBindBoxJsx from "../views/openBIndBox";
import NftDetailJsx from "@/views/nftDetails";
import ContextJSX from "@/components/hooks/globalContent"
const RouterJsx = () => {
    useEffect(() => {
        // 监听账户发生变化
        window.ethereum.on("accountsChanged", (accounts: string[]) => {
            window.location.href = "/";
        });

    }, []);
    return (
        <BrowserRouter>
            <ContextJSX>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/allBindBox" element={<AllBindBox />} />
                    <Route path="/bindBoxDetails" element={<BindBoxDetailJsx />} />
                    <Route path="/assets" element={<PersonAssetJsx />} />
                    <Route path="/openBindBox" element={<OpenBindBoxJsx />} />
                    <Route path="/nftDetailJsx" element={<NftDetailJsx />} />
                </Routes>
            </ContextJSX>

        </BrowserRouter >
    );
};

export default RouterJsx;
