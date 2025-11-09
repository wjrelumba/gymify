import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import QrReader from 'react-qr-scanner'
import { useNavigate } from 'react-router-dom';
import supabase from '../../../Supabase/Supabase';

export default function ManageClients() {
    // Instantiate important variables
    const navigate = useNavigate();
    const [clientList, setClientList] = useState<any>(null);
    const [nonClientList, setNonClientList] = useState<any>(null);
    const [addMode, setAddMode] = useState(true);
    const [userId, setUserId] = useState<any>(null);
    const [qrMode, setQrMode] = useState(false);
    const [videoDevices, setVideoDevices] = useState<MediaDeviceInfo[]>([]);
    const [selectedDeviceId, setSelectedDeviceId] = useState('');

    // Change whether scan mode or not
    const qrStateChanger = () => {
        setQrMode(!qrMode);
    }

    // Handle scan
    const scanHandler = (e:any) => {
        if(e){
            // Add a client
            const addClientSubmit = async(userIdValue:string) => {
                await supabase.from('users').update({
                    non_client: false,
                    is_client: true,
                    is_admin: false,
                }).eq('id', userIdValue);
                navigate('/dashboard/admin');
            }
            addClientSubmit(e.text);
        }
    }

    // Handler error
    const errorReport = () => {
        toast.error('QR Reader not supported');
    }

    // Run only once on component render
    useEffect(() => {
        try {
            // Get clients and non clients list
            const getclients = async() => {
                const {data:clients} = await supabase.from('users').select().eq('is_client', true);
                setClientList(clients);
                const {data:nonClients} = await supabase.from('users').select().eq('non_client', true);
                setNonClientList(nonClients);
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
                    else{
                        navigate('/');
                    }
                }
            }
            const fetchVideoDevices = async () => {
                try {
                    const devices = await navigator.mediaDevices.enumerateDevices();
                    const videoDevices = devices.filter((device) => device.kind === 'videoinput');
                    setVideoDevices(videoDevices);
                    // Default to first video device (usually back camera)
                    setSelectedDeviceId(videoDevices[0]?.deviceId);
                } catch (error) {
                    console.error('Error fetching video devices:', error);
                }
                };
        
            fetchVideoDevices();
            getUserSession();
            getclients();
        } catch (error) {
        }
    },[])

    // Handle device ID change
    const handleDeviceChange = (deviceId:any) => {
        setSelectedDeviceId(deviceId);
      };

    // Check for User ID changes
    useEffect(() => {
        console.log(userId);
    },[userId])

    // Switch between removing and adding
    const switchMode = () => {
        setUserId(null);
        setAddMode(!addMode);
    }

    // Handle data inputs
    const optionHandler = (e:any) => {
        setUserId(e.target.value);
        console.log(e.target.value);
    }

    // Add a client
    const addClientSubmit = async(e:any) => {
        e.preventDefault();
        await supabase.from('users').update({
            non_client: false,
            is_client: true,
            is_admin: false,
        }).eq('id', userId);
        navigate('/dashboard/admin');
    }

    // Remove a client
    const removeClientSubmit = async(e:any) => {
        e.preventDefault();
        await supabase.from('users').update({
            non_client: true,
            is_client: false,
            is_admin: false,
        }).eq('id', userId);
        navigate('/dashboard/admin');
    }
  return (
    <div className='pb-[4.5rem]'>
        <div className='flex flex-col'>
            <div className='py-4 px-2'>
                <h1 className='text-3xl font-bold text-center'>Manage clients</h1>
            </div>
            <div className='p-2'>
                {addMode && (
                    <div className='flex flex-col items-center p-4 border-[2px] border-blue-400 bg-gray-800 text-white rounded-md w-full'>
                        <h1 className='text-2xl font-sans text-center'>Add a Client</h1>
                        {qrMode && (
                                <>
                                    <div className='flex flex-col items-center'>
                                        <QrReader constraints={{video: {deviceId: selectedDeviceId}}} className='h-[45%] w-[65%] max-h-[45%] min-h-[45%]' onError={errorReport} onScan={scanHandler}></QrReader>
                                        <div className='flex flex-col items-center justify-center p-2'>
                                            <h1 className='font-thin'>If the QR Scanner is not working, reclick Use username and switch back</h1>
                                            <h1 className='font-sans'>Note: Once scanned, User is automatically verified</h1>
                                        </div>
                                        <div className='flex justify-center w-full p-2'>
                                            <select className='border w-1/2 border-blue-700 rounded-md py-2 px-4 text-center text-gray-700' value={selectedDeviceId} onChange={(e) => handleDeviceChange(e.target.value)}>
                                                {videoDevices.map((device) => (
                                                <option key={device.deviceId} value={device.deviceId}>
                                                    {device.label || `Camera ${videoDevices.indexOf(device) + 1}`}
                                                </option>
                                                ))}
                                            </select>
                                        </div>
                                        <button type='button' onClick={qrStateChanger} className='bg-blue-600 rounded-md w-1/2 py-2 px-3 text-white hover:rounded-xl hover:text-black hover:bg-blue-500 transition-all duration-300 ease-out'>
                                            Use username
                                        </button>
                                    </div>
                                </>
                            )}
                        {!qrMode && (
                            <form className='flex flex-col items-center w-full' onSubmit={addClientSubmit}>
                                <div className='w-full flex justify-center py-3'>
                                <select onChange={optionHandler} className='border w-full border-blue-700 bg-gray-700 rounded-md py-2 px-4 text-center' name="" id="">
                                    <option key='default' value=''>Select a user</option>
                                        {nonClientList && (
                                            <>
                                            {nonClientList.map((clients:any) => (
                                                <option key={clients.id} value={clients.id}>{clients.username}</option>
                                            ))}
                                            </>
                                        )}
                                    </select>
                                </div>
                                <button type='submit' className='bg-gray-600 w-full rounded-md mt-10 py-2 px-3 text-white hover:rounded-xl hover:text-black hover:bg-blue-500 transition-all duration-300 ease-out'>
                                    Continue
                                </button>
                                {/* <div className='w-full flex flex-col items-center justify-center mt-3'>
                                    <button type='button' onClick={qrStateChanger} className='bg-gray-600 rounded-md w-full py-2 px-3 text-white hover:rounded-xl hover:text-black hover:bg-blue-500 transition-all duration-300 ease-out'>
                                        Scan QR Code
                                    </button>
                                </div> */}
                            </form>
                        )}
                    </div>
                )}
                {!addMode && (
                    <div className='flex flex-col items-center p-4 border border-red-600 bg-gray-800 text-white rounded-md w-full'>
                        <h1 className='text-2xl font-sans text-center mb-3'>Remove a Client</h1>
                        <form className='flex flex-col items-center w-full' onSubmit={removeClientSubmit}>
                            <select onChange={optionHandler} className='border border-red-700 bg-gray-600 rounded-md py-2 px-4 text-center w-full mb-1' name="" id="">
                                <option key='default' value=''>Select a user</option>
                                {clientList && (
                                    <>
                                    {clientList.map((clients:any) => (
                                        <option key={clients.id} value={clients.id}>{clients.username}</option>
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
        <div className='flex flex-col items-center w-full px-2'>
            <button className='bg-gray-600 px-3 py-2 rounded-md w-full mb-1 text-white' onClick={switchMode}>
                Switch
            </button>
        </div>
    </div>
  )
}