import { useState } from 'react'
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'
import Home from "../views/Home"
import AllBindBox from '../views/AllBIndBox'
const RouterJsx = () => {
    return <BrowserRouter>
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/allBindBox" element={<AllBindBox />} />
        </Routes>
    </BrowserRouter>
}
export default RouterJsx