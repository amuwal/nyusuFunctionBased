import React, { useState } from 'react'
import Navbar from './components/Navbar'
import News from './components/News'
import {Routes, Route, BrowserRouter} from "react-router-dom"
import LoadingBar from 'react-top-loading-bar'

// const key = process.env.REACT_APP_NEWS_API
// console.log(key)

const App = () => {
    const apiKey = process.env.REACT_APP_NEWS_API
    const [progress, setProgress] = useState(0)

    return (
        <>
        <BrowserRouter>
        <LoadingBar height={2} color="#f11946" progress={progress}/>
        <Navbar></Navbar>
        <Routes>
            <Route  exact path="/" element={<News setProgress={setProgress} apiKey={apiKey}   key="home" pageSize={9} country="in" category="general"/>}></Route>
            <Route  exact path="/business" element={<News setProgress={setProgress} apiKey={apiKey}   key="business" pageSize={9} country="in" category="business"/>}></Route>
            <Route  exact path="/technology" element={<News setProgress={setProgress} apiKey={apiKey}   key="tech" pageSize={9} country="in" category="technology"/>}></Route>
        </Routes>
        </BrowserRouter>
        </>
    )
}
export default App;