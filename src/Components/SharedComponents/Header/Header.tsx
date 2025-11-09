import { useNavigate } from "react-router-dom";
import supabase from "../../../Supabase/Supabase"
import { navAudio } from "../../../Functions/AudioFunctions/AudioFunctions";

export default function Header({
    headerTitle,
    buttonFunc,
    showBackBtn = true,
    sideBarMode = false,
    logOutMode = false,
}:any) {
    const navigate = useNavigate();

    const logOutBtn = async() => {
        navAudio();
        await supabase.auth.signOut();
        localStorage.clear()
        navigate('/');
    };

  return (
    <div className='sticky top-0 grid grid-cols-3 py-2 border-b-[2px] border-blue-400 bg-blue-950 z-30'>
        <div className="flex px-1 py-2 w-full justify-start items-center">
            {showBackBtn && (
                <>
                    {!sideBarMode ? (
                        <button onClick={buttonFunc} className='w-1/4 flex justify-center bg-gray-400 rounded-md py-1'>
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-arrow-left"><line x1="19" y1="12" x2="5" y2="12"></line><polyline points="12 19 5 12 12 5"></polyline></svg>
                        </button>
                    ):(
                        <button onClick={buttonFunc} className='w-1/4 flex justify-center py-1'>
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-menu"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>
                        </button>
                    )}
                </>
                
            )}
        </div>
        <div className='w-full flex justify-center items-center'>
            <h1 className='text-xl text-center'>{headerTitle}</h1>
        </div>
        {logOutMode && (
            <div onClick={logOutBtn} className="w-full flex justify-end items-center px-4">
                <div className="w-[2rem] h-[2rem]">
                    <img src="/icons/logout.png" alt="" />
                </div>
            </div>
        )}
    </div>
  )
}
