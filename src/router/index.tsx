import React, { useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "../views/Home";
import ContextJSX from "@/components/hooks/globalContent"

const AllBindBox = React.lazy(() => import("@/views/allBIndBox"));
const BindBoxDetailJsx = React.lazy(() => import("@/views/blindBoxDetails"));
const PersonAssetJsx = React.lazy(() => import("@/views/personalAssets"));
const OpenBindBoxJsx = React.lazy(() => import("@/views/openBIndBox"));
const NftDetailJsx = React.lazy(() => import("@/views/nftDetails"));


interface SuspenseComponentI {
    children: React.LazyExoticComponent<() => JSX.Element>
}

const SuspenseComponent = (props: any) => {
    return <React.Suspense fallback={<>...</>}>
        {props.children}
    </React.Suspense>
}


const RouterJsx = () => {
    useEffect(() => {
        // 监听账户发生变化
        if (window.ethereum) {
            window.ethereum.on("accountsChanged", (accounts: string[]) => {
                window.location.href = "/";
            });
        }

    }, []);
    return (
        <BrowserRouter>
            <ContextJSX>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/allBindBox" element={
                        <SuspenseComponent>
                            <AllBindBox />
                        </SuspenseComponent>
                    } />
                    <Route path="/bindBoxDetails" element={
                        <SuspenseComponent>
                            <BindBoxDetailJsx />
                        </SuspenseComponent>
                    } />
                    <Route path="/assets" element={
                        <SuspenseComponent>
                            <PersonAssetJsx />
                        </SuspenseComponent>
                    } />
                    <Route path="/openBindBox" element={
                        <SuspenseComponent>
                            <OpenBindBoxJsx />
                        </SuspenseComponent>
                    } />
                    <Route path="/nftDetailJsx" element={
                        <SuspenseComponent>
                            <NftDetailJsx />
                        </SuspenseComponent>
                    } />
                </Routes>
            </ContextJSX>

        </BrowserRouter >
    );
};

export default RouterJsx;
