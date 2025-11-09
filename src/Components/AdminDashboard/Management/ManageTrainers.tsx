import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import supabase from '../../../Supabase/Supabase';

export default function ManageTrainers() {
    // Instantiate important variables
    const navigate = useNavigate();
    const [trainerList, setTrainerList] = useState<any>(null);
    const [clientList, setClientList] = useState<any>(null);
    const [addMode, setAddMode] = useState(true);
    const [userId, setUserId] = useState<any>(null);

    // Run only once on component render
    useEffect(() => {
        try {
            // Get trainers list
            const getTrainers = async() => {
                const {data:trainers} = await supabase.from('users').select().eq('is_trainer', true);
                setTrainerList(trainers);
                const {data:clients} = await supabase.from('users').select().eq('is_client', true);
                setClientList(clients);
            }

            // Check user session and check whether they are an admin or not
            const getUserSession = async() => {
                const {data} = await supabase.auth.getSession();
                console.log(data);
                if(data){
                    if(data.session){
                        const checkIfAdmin = async(userId:any) => {
                            const {data} = await supabase.from('users').select().eq('id', userId);
                            if(data){
                                if(data[0]){
                                    if(data[0].is_admin == false){
                                        navigate('/');
                                    }
                                }
                            }
                        }
                        checkIfAdmin(data.session.user.id);
                    }
                    else(
                        navigate('/')
                    );
                }
            }
            getUserSession();
            getTrainers();
        } catch (error) {
        }
    },[])

    // Check for User ID changes
    useEffect(() => {
        console.log(userId);
    },[userId]);

    // Switch between removing and adding
    const switchMode = () => {
        setUserId(null);
        setAddMode(!addMode);
    };

    // Handle data inputs
    const optionHandler = (e:any) => {
        setUserId(e.target.value);
        console.log(e.target.value);
    };

    // Add a trainer
    const addTrainerSubmit = async(e:any) => {
        e.preventDefault();
        await supabase.from('users').update({
            is_client: false,
            is_trainer: true,
            is_admin: false,
        }).eq('id', userId);
        navigate('/dashboard/trainer');
    };

    // Remove a trainer
    const removeTrainerSubmit = async(e:any) => {
        e.preventDefault();
        await supabase.from('users').update({
            is_client: true,
            is_trainer: false,
            is_admin: false,
        }).eq('id', userId);
        navigate('/dashboard/trainer');
    }
  return (
    <div className='pb-[4.5rem]'>
        <div className='flex flex-col text-black'>
            <div className='py-4 px-2'>
                <h1 className='text-3xl font-bold text-center'>Manage Trainers</h1>
            </div>
            <div className='p-2'>
                {addMode && (
                    <div className='flex flex-col items-center p-4 bg-gray-800 text-white rounded-md w-full'>
                        <h1 className='text-2xl text-center mb-3'>Add a Trainer</h1>
                        <form className='flex flex-col items-center w-full' onSubmit={addTrainerSubmit}>
                            <select onChange={optionHandler} className='border border-green-400 bg-gray-600 rounded-md w-full mb-1 py-2 px-4 text-center' name="" id="">
                                <option key='default' value=''>Select a user</option>
                                {clientList && (
                                    <>
                                    {clientList.map((clients:any) => (
                                        <option key={clients.id} value={clients.id}>{clients.username}</option>
                                    ))}
                                    </>
                                )}
                            </select>
                            <button type='submit' className='bg-gray-600 mt-10 rounded-md w-full py-2 px-3 text-white hover:rounded-xl hover:text-black hover:bg-green-500 transition-all duration-300 ease-out'>
                                Continue
                            </button>
                        </form>
                    </div>
                )}
                {!addMode && (
                    <div className='flex flex-col items-center p-4 bg-gray-800 border border-red-600 text-white rounded-md w-full'>
                        <h1 className='text-2xl text-center mb-3'>Remove a Trainer</h1>
                        <form className='flex flex-col items-center w-full' onSubmit={removeTrainerSubmit}>
                            <select onChange={optionHandler} className='border border-red-700 bg-gray-600 w-full mb-1 rounded-md py-2 px-4 text-center' name="" id="">
                                <option key='default' value=''>Select a user</option>
                                {trainerList && (
                                    <>
                                    {trainerList.map((trainers:any) => (
                                        <option key={trainers.id} value={trainers.id}>{trainers.username}</option>
                                    ))}
                                    </>
                                )}
                            </select>
                            <button type='submit' className='bg-gray-600 mt-10 rounded-md w-full py-2 px-3 text-white hover:rounded-xl hover:text-black hover:bg-red-500 transition-all duration-300 ease-out'>
                                Continue
                            </button>
                        </form>
                    </div>
                )}
            </div>
        </div>
        <div className='text-black'>
            <div className='flex flex-col items-center w-full px-2'>
                <button className='w-full py-2 px-3 bg-gray-600 border border-gray-800 rounded-md mb-1' onClick={switchMode}>
                    Switch
                </button>
            </div>
        </div>
    </div>
  )
}
