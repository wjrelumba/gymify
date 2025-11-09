import { useEffect, useState } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom"
import { navAudio, startPlayAudio, welcomeToPlayModeAudio } from "../../Functions/AudioFunctions/AudioFunctions";
import ModalComponent from "../SharedComponents/ModalComponent/ModalComponent";
import { App } from "@capacitor/app";

export default function PlayMode() {
    const location = useLocation();
    const navigate = useNavigate();

    const [showBackModal, setShowBackModal] = useState<boolean>(false);
    const [exerciseData, setExerciseData] = useState<any>(null);
    const [audioState, setAudioState] = useState<any>(null);

    const [playStarted, setPlayStarted] = useState<boolean>(false);

    const [welcomePlayer, setWelcomePlayer] = useState<boolean>(false);
    const [questionPlayer, setQuestionPlayer] = useState<boolean>(false);
    const [buttonStart, setButtonStart] = useState<boolean>(false);

    const acceptModal = () => {
        navigate('/dashboard');
    };

    const showModalFunc = () => {
        setShowBackModal(!showBackModal);
      }

    useEffect(() => {
        setExerciseData(location.state);
        const audio = welcomeToPlayModeAudio();
        setAudioState(audio);

        const stateUpdateArray = [setWelcomePlayer, setQuestionPlayer, setButtonStart]

        for(let i = 0; i < stateUpdateArray.length; i++){
            setTimeout(() => { 
                stateUpdateArray[i](true);
             }, (i + 1) * 500)
        }

        const setupBackButtonListener = async () => {
            const backButtonListener = await App.addListener('backButton', showModalFunc);
      
        // Cleanup function to remove the listener
        return () => {
                backButtonListener.remove();
            };
        };
      
          // Set up the listener and handle cleanup
          const cleanup = setupBackButtonListener();

        return () => {
            cleanup.then((remove) => {
                if (typeof remove === 'function') {
                  remove(); // Call the cleanup function
                }
              });
            setWelcomePlayer(false);
            setQuestionPlayer(false);
            setButtonStart(false);
            setPlayStarted(false);

            audio.pause();
        }
    },[]);

    const goBackBtn = () => {
        navAudio();
        navigate(-1);
    };

    const playStart = () => {
        startPlayAudio();
        navigate('/playMode/start', {state: exerciseData});
        audioState.pause();
        setPlayStarted(true);
    }

  return (
    <>
    <ModalComponent
    title={'Leaving Play Mode?'}
    message={'Are you sure you want to go back to dashboard?'}
    onClose={showModalFunc}
    acceptFunction={acceptModal}
    show={showBackModal}
    acceptMessage={'Yes'}
    color={'bg-gray-900'}
    acceptClassname={'bg-gray-900 border-[2px] border-blue-400 px-3 py-2 rounded-md'}
    closeButtonMessage={'Cancel'}
    />
    <div className="w-full h-screen">
        {location.state && (
            <>
                {!playStarted ? (
                    <div className="w-full h-full flex justify-center items-center">
                        <div className="w-[90%] h-[25%] grid grid-rows-4 gap-3 items-center justify-items-center">
                            {welcomePlayer && <h1 className="text-3xl text-center animate-in">{exerciseData.exercise}</h1>}
                            {/* Put an empty h1 to fill in 1 of the grid */}
                            <h1></h1> 
                            {questionPlayer && <h1 className="animate-in text-xl text-center w-full">Are you ready to begin?</h1>}
                            {buttonStart && (
                                <div className="w-full grid grid-cols-2 items-center justify-items-center gap-2 px-2">
                                    <button onClick={goBackBtn} className="animate-in bg-gray-900 border-[2px] border-red-400 text-red-400 rounded-md w-full flex justify-center py-2">
                                        Nah!
                                    </button>
                                    <button onClick={playStart} className="animate-in bg-gray-900 border-[2px] border-blue-400 text-blue-400 rounded-md w-full flex justify-center py-2">
                                        Heck Yeah!
                                    </button>
                                </div>
                                )}
                        </div>
                    </div>
                ) : (
                    <Outlet/>
                )}
            </>
        )}
    </div>
    </>
  )
}
