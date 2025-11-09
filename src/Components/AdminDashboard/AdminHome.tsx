import { useEffect, useState } from "react";
import supabase from "../../Supabase/Supabase";
import Loader from "../SharedComponents/Loader/Loader";
import { Link } from "react-router-dom";

export default function AdminHome() {
    const [trainerList, setTrainerList] = useState<any>(null);
    const [clientList, setClientList] = useState<any>(null);
    const [nonClientList, setNonClientList] = useState<any>(null);
    const [isLoading, setIsLoading] = useState(true);

    // Get user data
    const getUsers = async() => {
        console.log('This function ran');
        const {data:trainers} = await supabase.from('users').select().eq('is_trainer', true);
        setTrainerList(trainers);
        const {data:clients} = await supabase.from('users').select().eq('is_client', true);
        setClientList(clients);
        const {data:nonClients} = await supabase.from('users').select().eq('non_client', true);
        setNonClientList(nonClients);
        setIsLoading(false);
    };

    useEffect(() => {
        // Listen to database changes
        const changes = supabase.channel('users').on('postgres_changes',{
            event: 'INSERT',
            schema: 'public',
            table: 'users',
        }, () => {getUsers()}).on('postgres_changes',{
            event: 'UPDATE',
            schema: 'public',
            table: 'users',
        }, () => {getUsers()}).subscribe();

        getUsers()

        return () => {
            supabase.removeChannel(changes);
        }
    },[])

  return (
    <div className='p-1 h-[20rem] bg-gray-900 rounded-md'>
        {isLoading && (
            <>
                <Loader/>
            </>
        )}
        {clientList && trainerList && !isLoading && (
            <>
            <div className='h-full w-full grid grid-cols-2'>
                <div className='w-full p-1 h-full lg:h-full'>
                    <Link to={'/dashboard/admin/trainers'} className='px-4 py-2 rounded-md border-[2px] transition-all duration-200 ease-out border-green-600 h-full flex flex-col justify-between'>
                        <h1 className='font-sans text-xl'>Trainers</h1>
                        <div className='flex flex-col'>
                            <h1 className='font-bold text-2xl  mb-1'>{trainerList.length}</h1>
                            {/* <button className=' text-sm rounded-lg text-start'>
                                Manage Trainers
                            </button> */}
                        </div>
                    </Link>
                </div>
                <div className='w-full p-1 h-full lg:h-full'>
                    <Link to={'/dashboard/admin/clients'} className='px-4 py-2 rounded-md border-[2px] transition-all duration-200 ease-out border-blue-600 h-full flex flex-col justify-between'>
                    <h1 className='font-sans text-xl '>Clients</h1>
                        <div className='flex flex-col'>
                            <h1 className='font-bold text-2xl  mb-1'>{clientList.length}</h1>
                            {/* <button className=' text-sm rounded-lg text-start'>
                                Manage Clients
                            </button> */}
                        </div>
                    </Link>
                </div>
                <div className='w-full p-1 h-full lg:h-full'>
                    <Link to={'/dashboard/admin/businesses'} className='px-4 py-2 rounded-md border-[2px] border-gray-600 h-full flex flex-col justify-between'>
                    <h1 className='font-sans text-xl '>Businesses</h1>
                        <div className='flex flex-col'>
                            <h1 className='font-bold text-2xl  mb-1'>0</h1>
                            {/* <button className=' text-sm rounded-lg text-start'>
                                Manage Businesses
                            </button> */}
                        </div>
                    </Link>
                </div>
                <div className='w-full p-1 h-full lg:h-full'>
                    <div className='px-4 py-2 rounded-md border-[2px] border-red-600 h-full flex flex-col justify-between'>
                    <h1 className='font-sans text-xl '>Non-Clients</h1>
                        <div className='flex flex-col'>
                            <h1 className='font-bold text-2xl  mb-1'>{nonClientList.length}</h1>
                            {/* <h1 className=' text-sm rounded-lg text-start'>
                                Non-Clients
                            </h1> */}
                        </div>
                    </div>
                </div>
            </div>
            </>
        )}
    </div>
  )
}
