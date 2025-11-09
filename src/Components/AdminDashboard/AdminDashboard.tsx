import { Outlet, useLocation } from 'react-router-dom'
import NavLinksBar from '../SharedComponents/Navbar/NavLinksBar';
import { useEffect, useState } from 'react';

export default function AdminDashboard() {
    const location = useLocation();
    
    const dataReceiver = location.state;
    console.log(dataReceiver);
    const [adminDataParameter, setAdminDataParameter] = useState<any>(null);  

    // Create navigation links
    const navLinks:any = [{ // Sample data for navlink
        path: '/dashboard/admin', // Function that the button will do
        icon:   <div className='w-[1.5rem] h-[1.5rem]'>
                    <img src="/icons/house.png" alt="" />
                </div>,
        text: 'Home', // The text on the navbar
    },{
        path: '/dashboard/admin/trainers',
        icon:   <div className='w-[1.5rem] h-[1.5rem]'>
                    <img src="/icons/personal-trainer.png" alt="" />
                </div>,
        text: 'Trainers',
    },{
        path: '/dashboard/admin/clients',
        icon:   <div className='w-[1.5rem] h-[1.5rem]'>
                    <img src="/icons/clients.png" alt="" />
                </div>,
        text: 'Clients',
    },{
        path: '/dashboard/admin/businesses',
        icon:   <div className='w-[1.5rem] h-[1.5rem]'>
                    <img src="/icons/business.png" alt="" />
                </div>,
        text: 'Businesses',
    }];

    useEffect(() => {
        if(dataReceiver){
            setAdminDataParameter(dataReceiver.userData);
        }
    },[dataReceiver])

  return (
    <>
    <div className=''>
        {adminDataParameter && (
            <div className='p-2 pb-[4.5rem]'>
                <div className='p-3 bg-gray-900 border-[2px] border-blue-400 rounded-md mb-5 flex justify-center items-center w-full gap-2'>
                    <h1 className='text-3xl font-bold'>Welcome!</h1>
                    <h1 className='text-3xl'> {adminDataParameter.username}</h1>
                </div>
                <Outlet/>
            </div>
        )}
        <NavLinksBar dataValues={navLinks}/>
    </div>
    </>
  )
}
