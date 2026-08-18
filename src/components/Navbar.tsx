import logoMovies from '../assets/icons/LOGO-MOVIES.svg'
import homeOutlined from '../assets/icons/home-outline-rounded.svg'
import homeFilled from '../assets/icons/home-rounded.svg'
import exploreOutlined from '../assets/icons/explore-outline-rounded.svg'
import exploreFilled from '../assets/icons/explore-rounded.svg'
import starOutlined from '../assets/icons/star-outline.svg'
import starFilled from '../assets/icons/star-solid.svg'
import userOutlined from '../assets/icons/user-outline.svg'
import userFilled from '../assets/icons/user-filled.svg'
import { Link } from 'react-router-dom'

import { useState } from 'react'

type NavPages = 'home' | 'explore' | 'favourites' | 'profile'

export default function NavBar(){

    const [activeBtn, setActiveBtn] = useState<NavPages>('home')

    return (
        <>
        <section className="hidden md:flex fixed left-6 top-1/2 -translate-y-1/2 z-50 flex-col items-center w-20 h-85 justify-center gap-10 px-6 py-15 rounded-full bg-[#1B1D2E]/30 backdrop-blur-md border border-white/20 shadow-xl shadow-black/30">
            <img src={logoMovies} alt="Logotipo de la app" className="absolute -top-15 left-1/2 -translate-x-1/2 z-10 w-30 h-30 pointer-events-none drop-shadow-md"/>

            <Link to='/' >
                <button onClick={() => setActiveBtn('home')}>
                {activeBtn === 'home' ? (
                    <img src={homeFilled} alt="Home icon filled" className="w-6 h-6" />
                ) : (
                    <img src={homeOutlined} alt="Home icon outlined" className="w-6 h-6" />
                )}
                </button>
            </Link>
           
            <Link to='/explore' >
                <button onClick={() => setActiveBtn('explore')}>
                {activeBtn === 'explore' ? (
                    <img src={exploreFilled} alt="Explore icon filled" className="w-6 h-6" />
                ) : (
                    <img src={exploreOutlined} alt="Explore icon outlined" className="w-6 h-6" />
                )}
                </button>
            </Link>
            

            <button onClick={() => setActiveBtn('favourites')}>
            {activeBtn === 'favourites' ? (
                <img src={starFilled} alt="Star icon filled" className="w-6 h-6" />
            ) : (
                <img src={starOutlined} alt="Star icon outlined" className="w-6 h-6" />
            )}
            </button>

            <button onClick={() => setActiveBtn('profile')}>
            {activeBtn === 'profile' ? (
                <img src={userFilled} alt="Profile icon filled" className="w-6 h-6" />
            ) : (
                <img src={userOutlined} alt="Profile icon outlined" className="w-6 h-6" />
            )}
            </button>
        </section>

        <section className="md:hidden fixed bottom-6 left-1/2 -translate-x-1/2 z-50">
            <img
            src={logoMovies}
            alt="Logotipo de la app"
            className="absolute -top-11 left-1/2 -translate-x-1/2 z-10 w-22 h-22 p-2 pointer-events-none drop-shadow-[0_10px_15px_rgba(0,0,0,0.5)]"
            />

            <div className="relative flex items-center w-70 justify-between gap-2 px-6 py-2.5 rounded-full bg-linear-to-b from-white/20 via-white/5 to-black/20 backdrop-blur-2xl border border-white/30 shadow-[0_8px_32px_0_rgba(0,0,0,0.5)] ring-1 ring-white/20 overflow-hidden">

            <div className="absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-white/60 to-transparent pointer-events-none"/>

            <Link to='/'>
                <button onClick={() => setActiveBtn('home')}>
                    {activeBtn === 'home' ? (
                    <img src={homeFilled} alt="Home icon filled" className="w-6 h-6" />
                    ) : (
                    <img src={homeOutlined} alt="Home icon outlined" className="w-6 h-6" />
                    )}
                </button>
            </Link>
            
            <Link to='/explore'>
                <button onClick={() => setActiveBtn('explore')}>
                    {activeBtn === 'explore' ? (
                    <img src={exploreFilled} alt="Explore icon filled" className="w-6 h-6" />
                    ) : (
                    <img src={exploreOutlined} alt="Explore icon outlined" className="w-6 h-6" />
                    )}
                </button>
            </Link>
            
            <span className="w-8 shrink-0" />

            <button onClick={() => setActiveBtn('favourites')}>
                {activeBtn === 'favourites' ? (
                <img src={starFilled} alt="Star icon filled" className="w-6 h-6" />
                ) : (
                <img src={starOutlined} alt="Star icon outlined" className="w-6 h-6" />
                )}
            </button>

            <button onClick={() => setActiveBtn('profile')}>
                {activeBtn === 'profile' ? (
                <img src={userFilled} alt="Profile icon filled" className="w-6 h-6" />
                ) : (
                <img src={userOutlined} alt="Profile icon outlined" className="w-6 h-6" />
                )}
            </button>
            </div>
        </section>
      </>
        
    )
}