'use client'
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { navAudio, negativeAudio, welcomeAudio } from '../../Functions/AudioFunctions/AudioFunctions.ts';
import { Link, useNavigate } from 'react-router-dom';
import supabase from '../../Supabase/Supabase.ts';

export default function Login() {
    const navigate = useNavigate();
    const [emailValue, setEmailValue] = useState('');
    const [passwordValue, setPasswordValue] = useState('');
    const [sessionData, setSessionData] = useState<any>();
    const [loading, setLoading] = useState(true);
    
    useEffect(() => {
        // Get user session if there is any
        const getUserSession = async() => {
        const { data } = await supabase.auth.getSession();
        if(data.session?.user){
            setSessionData(data.session?.user);
            navigate('/dashboard');
        }
        else{
            setSessionData(null);
            setLoading(false);
        }
    }
    getUserSession()
    }, [])

    // Login function
    const logIn = async() => {
        const {data, error} = await supabase.auth.signInWithPassword({
            email: emailValue,
            password: passwordValue
        });
        if(data.user){
            welcomeAudio();
            navigate('/dashboard');
        };
        if(error){
            negativeAudio();
            toast.error(error.message);
        };
    };

    // Handle form submission
    const submission = (e:any) => {
        e.preventDefault();
        logIn();
    };

    // Handle Data changes
    const emailHandler = (e:any) => {
        setEmailValue(e.target.value);
    };
    const passHandler = (e:any) => {
        setPasswordValue(e.target.value);
    };

    // Button to go back to home page
    const goBackBtn = () => {
        navAudio();
        navigate('/');
    };
  return (
    <>
        {!sessionData && !loading && (
            <>
                <div className='flex flex-col items-center mt-10'>
                    <h1 className='text-4xl font-bold'>Gymify</h1>
                    <h1 className='text-md font-sans'>Gamify your Gym Life</h1>
                </div>
                <div className={`flex justify-center px-5 lg:mt-1 transition-all ease-out duration-500`}>
                    <div className='flex flex-col sm:flex-row items-center justify-center sm:h-[33rem] py-10 lg:w-[60%]'>
                        <div className='flex items-center justify-center flex-col sm:w-1/2 sm:border-r-[2px] sm:border-white h-full'>
                            <img className='w-[50%] sm:w-[80%]' src="/Login.png" alt="Gym_man" />
                        </div>
                        <div className='flex flex-col items-center sm:w-1/2 w-full'>
                            <h1 className='font-bold text-2xl'>Login!</h1>
                            <h1 className='font-sans'>Login now to access your progress</h1>
                            <form onSubmit={submission} className='animate-in flex flex-col mt-5 w-full items-center' action="">
                                <div className='flex flex-col items-center w-[70%]'>
                                    <label htmlFor="email" className='flex justify-start text-sm w-full'>Email: </label>
                                    <input type="email" onChange={emailHandler} className='border text-gray-700 border-gray-400 bg-gray-200 py-1 px-3 rounded-md w-full' placeholder='you@example.com' required/>
                                </div>
                                <div className='flex flex-col items-center w-[70%]'>
                                    <label htmlFor="email" className='flex justify-start text-sm w-full'>Password: </label>
                                    <input type="password" onChange={passHandler} className='border text-gray-700 border-gray-400 bg-gray-200 py-1 px-3 rounded-md w-full' placeholder='•••••' required/>
                                </div>
                                {/* <div className='flex w-[70%] justify-start mt-1'>
                                    <Link href={'/forgetPassword'} className='font-sans text-sm underline'>Forget Password?</Link>
                                </div> */}
                                <div className='flex w-[70%] justify-start'>
                                    <Link to={'/clientQrScanner'} className='font-sans text-sm underline mt-2'>No account? Scan QR Now!</Link>
                                </div>
                                <div className='flex justify-between w-[70%]'>
                                    <div className='py-2 px-1 w-full'>
                                        <button type='button' onClick={goBackBtn} className='flex justify-center text-red-500 py-2 px-3 w-full border-[2px] border-red-500 mt-2 rounded-md hover:bg-red-600 hover:rounded-xl hover transition-all duration-200 ease-out'>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className="feather feather-arrow-left"><line x1="19" y1="12" x2="5" y2="12"></line><polyline points="12 19 5 12 12 5"></polyline></svg>
                                        </button>
                                    </div>
                                    <div className='py-2 px-1 w-full'>
                                        <button className='flex justify-center px-3 py-2 w-full text-green-500 border-[2px] border-green-500 rounded-md mt-2 hover:bg-green-600 hover hover:rounded-xl  transition-all duration-200 ease-out'>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className="feather feather-log-in"><path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4"></path><polyline points="10 17 15 12 10 7"></polyline><line x1="15" y1="12" x2="3" y2="12"></line></svg>
                                        </button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </>
        )}
    </>
  )
}
