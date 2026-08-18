import NavBar from '../components/Navbar'
import HomePage from '../features/movies/pages/HomePage'
import { Routes, Route } from 'react-router-dom'
import ExplorePage from '../features/movies/pages/ExplorePage'

export default function App(){

    return (
        <>
        <NavBar/>
        <Routes>
            <Route path='/' element={<HomePage/>}/>
            <Route path='/explore' element={<ExplorePage/>}/>
        </Routes>
        </>
    )
}