import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import supabase from '../../../Supabase/Supabase';
import { acceptAudio, navAudio, negativeAudio } from '../../../Functions/AudioFunctions/AudioFunctions';

export default function ManageClients_() {
    // Initialize needed variables
    const navigate = useNavigate();
    const [emailValue, setEmailValue] = useState('');
    const [usernameValue, setUsernameValue] = useState('');
    const [sessionData, setSessionData] = useState<any>();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Get user session if there is any
        const getUserSession = async() => {
        const { data } = await supabase.auth.getSession();
        if(data.session?.user){
            setSessionData(data.session?.user);
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
                username: usernameValue,
                is_client: true,
                is_trainer: false,
                non_client: false,
            });
        };
        if (emailValue.length > 0 && usernameValue.length > 0) {
            const adminSession = JSON.parse(localStorage.getItem('sb-hcrlummukhfelwjzppef-auth-token') || '{}');
            
            // Step 1: Save admin session tokens
            const adminAccessToken = adminSession.access_token;
            const adminRefreshToken = adminSession.refresh_token;
          
            // Proceed to sign up the new user
            const { data, error } = await supabase.auth.signUp({
              email: emailValue,
              password: 'asdfasdf',
              options: {
                data: {
                  username: usernameValue,
                },
              },
            });
          
            if (data) {
              // Step 2: Insert to DB and handle other actions
              await insertToDB();
              acceptAudio();
          
              // Step 3: Restore admin session explicitly
              const { error: restoreError } = await supabase.auth.setSession({
                access_token: adminAccessToken,
                refresh_token: adminRefreshToken,
              });

              if (restoreError) {
                console.error('Failed to restore admin session:', restoreError.message);
              } else {
                console.log('Admin session restored successfully');
                setTimeout(() => { 
                    navigate('/clientQr', {state: {
                        email: emailValue,
                        password: 'asdfasdf',
                    }})
                 }, 500)
              }
            }
          
            if (error) {
              console.log(error);
              toast.error('Please retry account creation');
            }
          } else {
            negativeAudio();
            toast.error('Please complete the form.');
          }          
    };
    // Handle all input changes
    const emailHandler = (e:any) => {
        setEmailValue(e.target.value);
    };
    const unameHandler = (e:any) => {
        setUsernameValue(e.target.value);
    };
  return (
    <>
        {sessionData && loading && (
            <div className='flex justify-center p-4 lg:p-1 h-full w-full'>
                <div className='flex flex-col items-center justify-center sm:w-[70%]'>
                    <div className='p-3 w-full'>
                        <div className='flex flex-col sm:flex-row w-full items-center justify-center p-3'>
                            <div className='sm:w-[75%] flex flex-col items-center'>
                                <h1 className='font-bold text-2xl text-center'>Create New Client Account</h1>
                                {/* <h1 className='font-thin'>Start your Gymify journey</h1> */}
                                <form className='animate-in flex flex-col mt-5 items-center w-full' onSubmit={submission}>
                                    <div className='flex flex-col w-full items-start mb-1'>
                                        <label className='w-full' htmlFor="email">Email</label>
                                        <input type="email" onChange={emailHandler} className='text-center py-1 px-3 bg-gray-800 border border-gray-400 rounded-md w-full' required/>
                                    </div>
                                    <div className='flex flex-col w-full items-start mb-1'>
                                        <label className='w-full' htmlFor="username">Username</label>
                                        <input type="text" onChange={unameHandler} className='text-center py-1 px-3 bg-gray-800 border border-gray-400 rounded-md w-full' required/>
                                    </div>
                                    <div className='w-full flex'>
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
