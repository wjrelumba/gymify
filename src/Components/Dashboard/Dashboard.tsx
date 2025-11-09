import { navAudio } from '../../Functions/AudioFunctions/AudioFunctions'
import { Outlet, useLocation } from 'react-router-dom'
import Header from '../SharedComponents/Header/Header'
import { useEffect, useState } from 'react';
import Sidebar from '../SharedComponents/Sidebar/Sidebar';
import { App } from '@capacitor/app';
import ModalComponent from '../SharedComponents/ModalComponent/ModalComponent';

export default function Dashboard() {
    const location = useLocation();

    const [showModal, setShowModal] = useState<boolean>(false);

    const [showSideBar, setShowSideBar] = useState<boolean>(false);

    const getHeaderTitle = () => {
        if(location.pathname == '/dashboard/client'){
            return 'Dashboard'
        }
        else if(location.pathname == '/dashboard/client/parameters'){
            return 'Parameters'
        }
        else if(location.pathname == '/dashboard/client/tasks'){
            return 'Tasks'
        }
        else if(location.pathname == '/dashboard/admin'){
            return 'Admin Dashboard'
        }
        else if(location.pathname == '/dashboard/trainer'){
            return 'Trainer Dashboard'
        }
        else if(location.pathname == '/dashboard/admin/trainers'){
            return 'Trainers'
        }
        else if(location.pathname == '/dashboard/admin/clients'){
            return 'Clients'
        }
        else if(location.pathname == '/dashboard/admin/businesses'){
            return 'Businesses'
        }
    }

    // Function to show or not show modal
    const showModalFunc = () => {
        setShowModal(!showModal);
    }

    const toggleSideBar = () => {
        navAudio();
        setShowSideBar(!showSideBar);
    };

    const appConfirmLeave = async() => {
        App.exitApp(); // Exit the app if confirmed
    }

    useEffect(() => {
        const setupBackButtonListener = async () => {
          const backButtonListener = await App.addListener('backButton', showModalFunc);
    
          // Cleanup function to remove the listener
          return () => {
            backButtonListener.remove();
          };
        };
    
        // Set up the listener and handle cleanup
        const cleanup = setupBackButtonListener();

    
        // Return the cleanup function
        return () => {
          cleanup.then((remove) => {
            if (typeof remove === 'function') {
              remove(); // Call the cleanup function
            }
          });
        };
      }, []);

  return (
    <>
        <ModalComponent
        title={'Leaving Gymify'}
        message={'Are you sure you want to leave the app?'}
        onClose={showModalFunc}
        acceptFunction={appConfirmLeave}
        show={showModal}
        acceptMessage={'Yes'}
        color={'bg-gray-900'}
        acceptClassname={'bg-gray-900 border-[2px] border-blue-400 px-3 py-2 rounded-md'}
        closeButtonMessage={'Cancel'}
        />

        <Header 
        showBackBtn={false} 
        sideBarMode={true} 
        buttonFunc={toggleSideBar} 
        headerTitle={getHeaderTitle()}
        logOutMode={true}
        />
        <Sidebar 
        shown={showSideBar}
        toggleSideBar={toggleSideBar}
        />
        <Outlet />
    </>
  )
}