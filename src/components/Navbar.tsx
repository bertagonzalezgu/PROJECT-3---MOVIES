import logoMovies from '../assets/icons/LOGO-MOVIES.svg'
import homeOutlined from '../assets/icons/home-outline-rounded.svg'
import homeFilled from '../assets/icons/home-rounded.svg'
import exploreOutlined from '../assets/icons/explore-outline-rounded.svg'
import exploreFilled from '../assets/icons/explore-rounded.svg'
import starOutlined from '../assets/icons/star-outline.svg'
import starFilled from '../assets/icons/star-solid.svg'
import userOutlined from '../assets/icons/user-outline.svg'
import userFilled from '../assets/icons/user-filled.svg'

import { useState } from 'react'

type NavPages = 'home' | 'explore' | 'favourites' | 'profile'

export default function NavBar(){

    const [activeBtn, setActiveBtn] = useState<NavPages>('home')

    return (
        <div className="min-h-screen bg-[#0E0F1A] md:flex md:items-center md:px-8">
            <section className="hidden md:flex md:flex-col relative items-center w-20 h-85 justify-center gap-10 px-6 py-15 rounded-full bg-[#1B1D2E]/60 backdrop-blur-xl border border-white/10 shadow-lg shadow-black/40">
            <img src={logoMovies} alt="Logotipo de la app" className="absolute -top-15 left-1/2 -translate-x-1/2 z-10 w-30 h-30"/>

            <button onClick={() => setActiveBtn('home')}>
                {activeBtn === 'home'? 
                <img src={homeFilled} alt="Home icon filled" className="w-6 h-6"/>   : <img src={homeOutlined} alt="Home icon outlined" className="w-6 h-6"/>  
                }
            </button>

            <button onClick={() => setActiveBtn('explore')}>
                {activeBtn === 'explore'? 
                <img src={exploreFilled} alt="Explore icon filled" className="w-6 h-6"/>   : <img src={exploreOutlined} alt="Explore icon outlined" className="w-6 h-6"/>  
                }
            </button>

            <button onClick={() => setActiveBtn('favourites')}>
                {activeBtn === 'favourites'? 
                <img src={starFilled} alt="Star icon filled" className="w-6 h-6"/>   : <img src={starOutlined} alt="Star icon outlined" className="w-6 h-6"/>  
                }
            </button>

            <button onClick={() => setActiveBtn('profile')}>
                {activeBtn === 'profile'? 
                <img src={userFilled} alt="Profile icon filled" className="w-6 h-6"/>   : <img src={userOutlined} alt="Profile icon outlined" className="w-6 h-6"/>  
                }
            </button>
        </section>

        <section className="md:hidden fixed bottom-4 left-1/2 -translate-x-1/2 z-50">

        <img src={logoMovies} alt="Logotipo de la app" className="absolute -top-11 left-1/2 -translate-x-1/2 z-10 w-22 h-22 p-2"/>

        <div className="flex items-center w-70 justify-between gap-2 px-6 py-2 rounded-full bg-[#1B1D2E]/60 backdrop-blur-xl border border-white/10 shadow-lg shadow-black/40">
            <button onClick={() => setActiveBtn('home')}>
                {activeBtn === 'home'? 
                <img src={homeFilled} alt="Home icon filled" className="w-6 h-6"/>   : <img src={homeOutlined} alt="Home icon outlined" className="w-6 h-6"/>  
                }
            </button>

            <button onClick={() => setActiveBtn('explore')}>
                {activeBtn === 'explore'? 
                <img src={exploreFilled} alt="Explore icon filled" className="w-6 h-6"/>   : <img src={exploreOutlined} alt="Explore icon outlined" className="w-6 h-6"/>  
                }
            </button>

            <span className="w-8 shrink-0" />

            <button onClick={() => setActiveBtn('favourites')}>
                {activeBtn === 'favourites'? 
                <img src={starFilled} alt="Star icon filled" className="w-6 h-6"/>   : <img src={starOutlined} alt="Star icon outlined" className="w-6 h-6"/>  
                }
            </button>

            <button onClick={() => setActiveBtn('profile')}>
                {activeBtn === 'profile'? 
                <img src={userFilled} alt="Profile icon filled" className="w-6 h-6"/>   : <img src={userOutlined} alt="Profile icon outlined" className="w-6 h-6"/>  
                }
            </button>
        </div>

            
        </section>
        </div>
        
    )
}