import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom'
import { gamePlayEncode } from '../../../DataEncoder/DataEncoder';
import { acceptRewardAudio, gameplayAudio1, navAudio } from '../../../Functions/AudioFunctions/AudioFunctions';
import ModalComponent from '../../SharedComponents/ModalComponent/ModalComponent';

export default function StartPlay() {
    const location = useLocation();
    const navigate = useNavigate();

    const [playData] = useState<any>(gamePlayEncode[location.state.exercise]);
    const [exerciseData] = useState<any>(location.state);
    const [count, setCount] = useState<number>(0);

    const [showCancelModal, setShowCancelModal] = useState<boolean>(false);
    const [showNextModal, setShowNextModal] = useState<boolean>(false);
    const [showFinishModal, setShowFinishModal] = useState<boolean>(false);

    const [seconds, setSeconds] = useState<number>(0);

    const [taskFinished, setTaskFinished] = useState<boolean>(false);

    const [nextButton, setNextButton] = useState<boolean>(false);

    const [currentSet, setCurrentSet] = useState<any>(1);
    const [gameplayAudio] = useState<any>(gameplayAudio1());

    const [countDown, setCountDown] = useState<any>(null);

    const nextBtn = () => {
        setShowNextModal(!showNextModal);
        setCurrentSet(currentSet + 1);
        setNextButton(false);
        countdownFunc();
    }

    // The function that will count for minutes
    const minuteCount = () => {
        setCount(0);

        var countValue = 0;
        var secondsValue = 0;

        const intervalRef = setInterval(() => {
            countValue++
            secondsValue++
            if(secondsValue == 60){
                secondsValue = 0
                setSeconds(secondsValue)
            }

            setSeconds(secondsValue);
            setCount(countValue);

            if(countValue == playData.count){
                clearInterval(intervalRef);
                setNextButton(true);
            }

        }, 1000);
    }

    // The function that will increment reps
    const repCount = () => {
        setCount(0);

        var countValue = 0;

        const intervalRef = setInterval(() => {
            countValue++
            setCount(countValue);

            if(countValue == playData.count){
                clearInterval(intervalRef);
                setNextButton(true);
            }

        }, 3000);
    };

    // Countdown to start
    const countdownFunc = () => {
        gameplayAudio.pause();
        setCountDown(3);
        var countDownValue = 3;

        for(let i = 0; i < 4; i++){
            setTimeout(() => { 
                navAudio();
                setCountDown(countDownValue - (i));
             }, i * 1000)
        }

        setTimeout(() => { 
            gameplayAudio.play();
            if(playData.mode == 'reps'){ // It will check which function to run whether the exercise mode is reps or minutes
                repCount();
            }
            else {
                minuteCount();
            }
        }, 3000);
    };

    const finishModalActivate = () => {
        setShowFinishModal(!showFinishModal);
    };

    const nextModalActivate = () => {
        setShowNextModal(!showNextModal);
    };

    const cancelModalActivate = () => {
        setShowCancelModal(!showCancelModal);
    };

    // Function to go back to dashboard after finishing task
    const finishBtn = () => {
        gameplayAudio.pause();
        acceptRewardAudio();
        setShowFinishModal(false);
        setTaskFinished(true);
    };

    // Function to go back to dashboard
    const goBackBtn = () => {
        navAudio();
        navigate('/dashboard');
    };

    // Run once on component load
    useEffect(() => {
        setCurrentSet(1);

        setTimeout(() => { 
            countdownFunc(); 
        }, 1000); // Create a delay for the countdown function

        return () => {
            gameplayAudio.pause();
        }
    }, []);

  return (
    <>
    <ModalComponent
        show={showCancelModal}
        onClose={cancelModalActivate}
        closeButtonMessage='Cancel'
        acceptMessage='Okay'
        acceptFunction={goBackBtn}
        title='Quit Play Mode?'
        message='Are you sure you want to quit? You will have to start over if you want to play again.'
        acceptClassname='bg-gray-800 border-red-400 rounded-md w-1/2 border-[2px]'
        closeButtonClass='bg-gray-800 border-blue-400 rounded-md w-1/2 border-[2px]'
        color='bg-gray-950'
    />

    <ModalComponent
        show={showNextModal}
        onClose={nextModalActivate}
        acceptMessage='Play!'
        closeButtonMessage='Cancel'
        acceptFunction={nextBtn}
        title='Next Set?'
        message={((currentSet / playData.sets) <= 0.5) ? 'Do you want to proceed to the next set?' : 
            ((currentSet / playData.sets) <= 0.75) ? 'You are almost there! Keep going! Proceed?' : 'You are very close! Proceed to finish!'}
        acceptClassname='bg-gray-800 border-blue-400 rounded-md w-1/2 border-[2px]'
        closeButtonClass='bg-gray-800 border-red-400 rounded-md w-1/2 border-[2px]'
        color='bg-gray-950'
    />

    <ModalComponent
        show={showFinishModal}
        onClose={finishModalActivate}
        acceptMessage='Finish!'
        closeButtonShow={false}
        acceptFunction={finishBtn}
        title='Task Finished!'
        message={`You have successfully completed this task! Congratulations!`}
        acceptClassname='bg-gray-800 border-blue-400 rounded-md w-1/2 border-[2px]'
        color='bg-gray-950'
    />
    {taskFinished ? (
        <div className='animate-in w-full h-screen flex flex-col gap-2 justify-center items-center p-2'>
            <h1 className='w-full text-center text-5xl'>Congratulations!</h1>
            <h1 className='w-full text-xl text-center'>You have successfully completed the task!</h1>
            <h1 className='w-full text-center text-xs font-thin'>Note: The progress will still depend on your parameter result</h1>
            <button onClick={goBackBtn} className='w-full bg-gray-950 rounded-md py-2 px-3 border-[2px] border-blue-400'>Dashboard</button>
        </div>
    ):(
        <>
            {(countDown == 0) ? (
                <div className='animate-in w-full h-screen flex flex-col justify-center items-center p-2'>
                    {location.state && playData.gifLink && (
                        <div>
                            <div className='w-full flex justify-center'>
                                <h1 className='text-3xl text-center'>{exerciseData.exercise}</h1>
                            </div>
                            <div className='w-full flex justify-center'>
                                <img className='rounded-full w-[15rem] h-[15rem]' src={playData.gifLink} alt="" />
                            </div>
                            <div className='w-full flex justify-center items-center'>
                                <h1 className='text-xl'>{`${currentSet}/${playData.sets}`}</h1>
                            </div>
                            <div className='w-full flex justify-center items-center my-10'>
                                {playData.mode == 'reps' ? (<h1 className='text-9xl'>{count}</h1>) : (<h1 className='text-6xl'>{Math.floor(count/60)}:{seconds}</h1>)}
                            </div>
                            <div className='w-full grid grid-rows-2'>
                                {nextButton ? (
                                    <div className='animate-in w-full flex justify-center mb-1'>
                                        <button className='w-[9rem] px-3 py-2 border-[2px] border-blue-400 rounded-md' onClick={
                                            currentSet == playData.sets ? finishModalActivate : nextModalActivate
                                            }>
                                            {currentSet == playData.sets ? 'Finish' : 'Next'}
                                        </button>
                                    </div>
                                ) : <h1></h1>}
                                <div className='w-full flex justify-center mt-1'>
                                    <button className='w-[9rem] px-3 py-2 border-[2px] border-red-400 rounded-md' onClick={cancelModalActivate}>Cancel</button>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            ) : (
                <div className='w-full h-screen flex justify-center items-center'>
                    <div className='w-full h-full flex justify-center items-center'>
                        {countDown && <h1 className='animate-in text-9xl'>{countDown}</h1>}
                    </div>
                </div>
            )}
        </>
    )}
    </>
  )
}
