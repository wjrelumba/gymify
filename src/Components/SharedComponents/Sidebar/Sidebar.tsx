import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import supabase from '../../../Supabase/Supabase';

export default function Sidebar({
    shown,
    toggleSideBar,
    navLinks = null,
}:any) {
    const [hasLoaded, setHasLoaded] = useState(false);

    const navigate = useNavigate();

    const logOutBtn = async() => {
        await supabase.auth.signOut();
        localStorage.clear();
        navigate('/');
    }

    useEffect(() => {
        if(shown){
            console.log(shown);
            setHasLoaded(true);
        };
    },[shown]);

  return (
    <div className={`w-[50%] h-full top-0 bottom-0 bg-gray-200 fixed border-r-[2px] z-50 ${shown === false ? (hasLoaded ? 'slide-left-out' : 'ml-[-100%]') : 'slide-right'} p-2 flex flex-col`}>
        <div className='w-full flex justify-end items-center h-[3.5rem] px-2 mb-2 text-gray-600'>
            <svg onClick={toggleSideBar} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-menu"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>
        </div>
        {navLinks && (
            <>
                {navLinks.map((link:any, index:number) => (
                    <Link to={link.value} key={index}>{link.text}</Link>
                ))}
            </>
        )}
        <div className='flex border-b-[2px] border-gray-400'>
            <button onClick={logOutBtn} className=''>Log Out</button>
        </div>
        <div className='fixed bottom-0 mb-2'>
            <h1 className='text-xs text-gray-600'>&copy; GFHW, Gymify 2024</h1>
        </div>
    </div>
  )
}
