import NavBar from '../components/Navbar'
import HomePage from '../features/movies/pages/HomePage'
import { Routes, Route } from 'react-router-dom'
import ExplorePage from '../features/movies/pages/ExplorePage'
import MovieDetailPage from '../features/movies/pages/MovieDetailPage'
import ActorDetailPage from '../features/movies/pages/ActorDetailPage'
import DirectorDetailPage from '../features/movies/pages/DirectorDetailPage'
import ProfilePage from '../features/auth/pages/ProfilePage'
import RegisterPage from '../features/auth/pages/RegisterPage'

export default function App(){

    return (
        <>
        <NavBar/>
        <Routes>
            <Route path='/' element={<HomePage/>}/>
            <Route path='/explore' element={<ExplorePage/>}/>
            <Route path='/profile' element={<ProfilePage/>}/>
            <Route path='/register' element={<RegisterPage/>}/>
            <Route path='/movie/:id' element={<MovieDetailPage/>}/>
            <Route path='/actor/:id' element={<ActorDetailPage/>}/>
            <Route path='/director/:id' element={<DirectorDetailPage/>}/>
        </Routes>
        </>
    )
}