import { useNavigate } from "react-router-dom";
import { navAudio } from "../../Functions/AudioFunctions/AudioFunctions";
import { useEffect, useState } from "react";
import { App } from "@capacitor/app";
import ModalComponent from "../SharedComponents/ModalComponent/ModalComponent";

export default function HomePage() {
    const navigate = useNavigate()

    const [showModal, setShowModal] = useState<boolean>(false);

    // Login page button
    const loginPage = () => {
      navAudio();
      navigate('/login');
    }

    // // Sign up page button
    // const signUpPage = () => {
    //   navAudio();
    //   navigate('/signup');
    // };

    // Function to show or not show modal
    const showModalFunc = () => {
      setShowModal(!showModal);
    }

    // Confirm leaving app
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
    },[]);
    
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
        
        <div className='w-full h-screen flex justify-center items-center sm:justify-center'>
          <div className='scale-bigger flex justify-center p-3 w-full'>
            <div className='flex flex-col sm:w-[85%] w-full items-center py-9 h-full sm:py-10 rounded-lg'>
                <img src="/Gym_man-removebg-preview.png" alt="Gym_man" />
                <h1 className='text-3xl mt-5 mb-1'>❚█══ GYMIFY ══█❚</h1>
                <h1 className='font-sans mb-20 sm:mb-5'>Ready to level up your game?</h1>
                  <button onClick={loginPage} className='px-4 py-2 w-[75%] sm:w-[25%] border-[2px] border-blue-800 hover:text-black rounded-md mt-2 hover:bg-blue-400 transition-all duration-200 ease-out'>
                    Log In
                  </button>
                  {/* <button onClick={signUpPage} className='px-4 py-2 w-[75%] sm:w-[25%] rounded-md border-[2px] border-green-600 mt-2 hover:bg-green-500 hover:text-white transition-all duration-200 ease-out'>
                    Sign Up
                  </button> */}
                  {/* <Link className="py-2 border-gray-900 rounded-md border w-[75%] mt-2 text-center" to={'/sample'}>Model Prediction Sample</Link> */}
            </div>
          </div>
        </div>
    </>
  )
}
