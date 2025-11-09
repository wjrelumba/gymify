import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { acceptAudio, navAudio, negativeAudio } from '../../Functions/AudioFunctions/AudioFunctions';
import { Link, useNavigate } from 'react-router-dom';
import supabase from '../../Supabase/Supabase';

export default function Signup() {
    // Initialize needed variables
    const navigate = useNavigate();
    const [emailValue, setEmailValue] = useState('');
    const [usernameValue, setUsernameValue] = useState('');
    const [passwordValue, setPasswordValue] = useState('');
    const [confirmPasswordValue, setConfirmPasswordValue] = useState('');
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
        };
    }
    getUserSession();
    }, [])
    // Button to go back to home page
    const goBackBtn = () => {
        navAudio();
        navigate('/');
    };
    // Handle submission
    const submission = async(e:any) => {
        navAudio();
        e.preventDefault();
        const insertToDB = async() => {
            await supabase.from('users').insert({
                username: usernameValue
            });
        };
        if(emailValue.length > 0 && usernameValue.length > 0){
            if(passwordValue == confirmPasswordValue){
                const {data, error} = await supabase.auth.signUp(
                    {
                        email: emailValue,
                        password: passwordValue,
                        options: {
                            data: {
                                username: usernameValue,
                            }
                        }
                    }
                );
                if(data){
                    await insertToDB();
                    acceptAudio();
                    navigate('/dashboard');
                }
                if(error){
                    console.log(error);
                    toast.error('Please retry account creation');
                };
                // navigate('/')
            }
            else{
                negativeAudio();
                toast.error('Passwords do not match');
            }
        }
        else{
            negativeAudio();
            toast.error('Please complete the form.');
        };
    };
    // Handle all input changes
    const emailHandler = (e:any) => {
        setEmailValue(e.target.value);
    };
    const unameHandler = (e:any) => {
        setUsernameValue(e.target.value);
    };
    const passHandler = (e:any) => {
        setPasswordValue(e.target.value);
    };
    const confPassHandler = (e:any) => {
        setConfirmPasswordValue(e.target.value);
    };
  return (
    <>
        {!sessionData && !loading && (
            <div className='flex justify-center p-4 lg:p-1 sm:mt-[5rem] h-full w-full'>
                <div className='flex flex-col items-center justify-center sm:w-[70%]'>
                    <div className='p-3 w-full'>
                        <div className='flex flex-col sm:flex-row w-full items-center sm:h-[33rem] justify-center p-3'>
                            <div className='sm:w-1/2'>
                                <img src="/signupImage.png" alt="" />
                            </div>
                            <div className='sm:w-1/2 flex flex-col items-center'>
                                <h1 className='font-bold text-2xl'>Sign Up!</h1>
                                <h1 className='font-thin'>Start your Gymify journey</h1>
                                <form className='animate-in flex flex-col mt-5 items-center w-full' onSubmit={submission}>
                                    <div className='flex flex-col w-full sm:w-[75%] items-start mb-1'>
                                        <label className='w-full' htmlFor="email">Email</label>
                                        <input type="email" onChange={emailHandler} className='text-center py-1 px-3 bg-gray-200 border border-gray-400 rounded-md w-full' required/>
                                    </div>
                                    <div className='flex flex-col w-full sm:w-[75%] items-start mb-1'>
                                        <label className='w-full' htmlFor="username">Username</label>
                                        <input type="text" onChange={unameHandler} className='text-center py-1 px-3 bg-gray-200 border border-gray-400 rounded-md w-full' required/>
                                    </div>
                                    <div className='flex flex-col w-full sm:w-[75%] items-start mb-1'>
                                        <label className='w-full' htmlFor="password">Password</label>
                                        <input type="password" onChange={passHandler} className='text-center py-1 px-3 bg-gray-200 border border-gray-400 rounded-md w-full' required/>
                                    </div>
                                    <div className='flex flex-col w-full sm:w-[75%] items-start mb-1'>
                                        <label className='w-full' htmlFor="confirmPass">Confirm Password</label>
                                        <input type="password" onChange={confPassHandler} className='text-center py-1 px-3 bg-gray-200 border border-gray-400 rounded-md w-full' required/>
                                    </div>
                                    <div className='flex w-full sm:w-[75%] mb-2'>
                                        <Link to={'/login'} className='font-sans text-sm underline'>Already have an account? Log in!</Link>
                                    </div>
                                    <div className='w-full sm:w-[75%] flex'>
                                        <div className='w-1/2 px-1'>
                                            <button type='button' onClick={goBackBtn} className='py-1 px-3 border border-red-500 h-[4rem] mt-2 w-full rounded-md hover:bg-red-500 hover transition-all duration-200 ease-out'>Go back</button>
                                        </div>
                                        <div className='w-1/2 px-1'>
                                            <button type='submit' className='py-1 px-3 border border-green-500 h-[4rem] mt-2 w-full rounded-md hover:bg-green-500 hover transition-all duration-200 ease-out'>Create Account</button>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )}
    </>
  )
}
