import { useEffect, useState } from 'react';
import { Line } from 'rc-progress';
import { acceptRewardAudio, claimRewardModalAudio, navAudio } from '../../Functions/AudioFunctions/AudioFunctions';
import ModalComponent from '../SharedComponents/ModalComponent/ModalComponent';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import supabase from '../../Supabase/Supabase';
import Loader from '../SharedComponents/Loader/Loader';
import TrainerApprovalLoader from '../SharedComponents/TrainerApprovalLoader/TrainerApprovalLoader';

export default function Page() {
    const navigate = useNavigate();

    const [userId, setUserId] = useState<any>(null);
    const [exerciseData, setExerciseData] = useState<any>(null);
    const [userParam, setUserParam] = useState<any>(null);
    const [statusReport, setStatusReport] = useState<any>('');

    const [taskAvailable, setTaskAvailable] = useState<any>(null);

    const [trainerApproveModal, setTrainerApproveModal] = useState<boolean>(false);

    const [showModal, setShowModal] = useState<boolean>(false);
    const [needUpdate, setNeedUpdate] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(true);

    const [allDone, setAllDone] = useState<boolean>(false);

    const taskNames:any[] = ['BMITask', 'weightTask', 'fatTask', 'proteinTask', 'mineralTask', 'slmTask', 'smmTask', 'whrTask', 'vfiTask', 'ffmiTask', 'tbwTask', 'pbfTask'];
    const paramNames:any[] = ['BMI', 'weight', 'fat', 'protein', 'mineral', 'soft_lean_mass', 'skeleton_muscle_mass', 'waist_hip_ratio', 'visceral_fat_index', 'fat_free_mass_index', 'total_body_water', 'percent_body_fat'];

    const getParameters = async(clientId:string) => {
        const {data} = await supabase.from('user_parameters').select().eq('id', clientId)
        if(data){
            const index = data.length - 1;
            setUserParam(data[index]);
            return data[index];
        }
    }

    const getUserExercises = async(clientId:string) => {
        const {data} = await supabase.from('user_exercises').select().eq('client_id',clientId);
        if(data){
            setExerciseData(data[0]);
            return data[0];
        };
    };

    // Check if user has existing tasks or not
    const checkUserExercises = async(userIdValue:string) => {
        const {data} = await supabase.from('user_exercises').select().eq('client_id', userIdValue);
        if(data){
            if(data.length > 0){
                setTaskAvailable(true) // Set the Tasks selection notification off
                setLoading(false);
            }
            else{
                setTaskAvailable(false);
                setLoading(false);
            };
        };
    };

    const getUserSession = async() => {
        const {data:{session}} = await supabase.auth.getSession();
        if(session){
            const userExerTemp = await getUserExercises(session.user.id);
            const paramTemp = await getParameters(session.user.id);
            checkUserExercises(session.user.id);
            checkIfDoneFunction(userExerTemp, paramTemp);
            getImpUserParam(session.user.id);
            setUserId(session.user.id);
        }
        else{
            navigate('/');
        };
    };

    // Fetch important user parameters
    const getImpUserParam = async(userId:any) => {
        const {data} = await supabase.from('important_parameters').select('gender, height, level, points, exp, need_update, needs_exercise').eq('client_id', userId);
        if(data){
            const index = data.length - 1;
            if(data[index]){
                setNeedUpdate(data[index].need_update);
            }
        }
    }

    // Set the status for tasks
    const checkIfDoneFunction = (exerciseDataValue: any, userParamValue: any) => {
        const arrayChecker: any = taskNames.map((value: string, index: number) => {
            if (exerciseDataValue && userParamValue) {
                // Check if 'range' exists and matches the correct range condition
                const taskData = exerciseDataValue.exerciseData[value];
                const userValue = userParamValue[paramNames[index]];
                
                // If the task data or user value is missing, return undefined (skip this task)
                if (!taskData || userValue === undefined) return undefined;
                
                // Compare based on range values
                if (taskData.range === 2) {
                    return userValue <= taskData.goal ? 1 : 0;
                }
                if (taskData.range === 1 || taskData.range === 0) {
                    return userValue >= taskData.goal ? 1 : 0;
                }
            }
            return undefined; // Return undefined if no valid conditions are met
        });
    
        // Remove any undefined values from the array before proceeding
        const filteredArrayChecker = arrayChecker.filter((value: any) => value !== undefined);
    
        // Check if any task is not done (value of 0)
        const isDoneSetterArray = filteredArrayChecker.filter((value: any) => value === 0);
    
        // Set the "All Done" state based on whether there are any tasks left to do
        setAllDone(isDoneSetterArray.length < 1);
    
        // Calculate how many tasks are completed
        const arrayVerifier = filteredArrayChecker.filter((value: any) => value !== 0);
    
        // Update the status report
        setStatusReport(`${arrayVerifier.length}/${filteredArrayChecker.length} Tasks Completed`);
    }
      

    const checkIfDone = (exerciseDataValue:any, paramObj:any) => {
        if(exerciseDataValue.range == 2){
            if(paramObj <= exerciseDataValue.goal){
                return <h1 className='text-green-600 font-bold'>Done</h1>;
            }
            else{
                return <h1 className='text-orange-400 font-bold'>In Progress</h1>;
            }
        }
        else if(exerciseDataValue.range == 1){
            if(paramObj >= exerciseDataValue.goal){
                return <h1 className='text-green-600 font-bold'>Done</h1>;
            }
            else{
                return <h1 className='text-orange-400 font-bold'>In Progress</h1>;
            }
        }
        else if(exerciseDataValue.range == 0){
            if(paramObj >= exerciseDataValue.goal){
                return <h1 className='text-green-600 font-bold'>Done</h1>;
            }
            else{
                return <h1 className='text-orange-400 font-bold'>In Progress</h1>;
            }
        }
    }

    const percentRenderer = (variant:number, paramObj:any, exerciseDataValue:any) => {
        if(variant == 1){
            return ( // This is the finished percent for high bracket
                <div className='w-full grid grid-cols-2 justify-items-center items-center gap-4'>
                    <div className='flex flex-col items-start justify-center gap-2 w-full'>
                        <Line className='h-[30%]' percent={100} strokeWidth={3} trailWidth={2}/>
                        <h1 className='font-bold'>100%</h1>
                    </div>
                    <div className='w-full p-2 bg-blue-950 border-[2px] border-white text-white rounded-md'>
                        <h1>{`Current: ${paramObj}`}</h1>
                        <h1>{`Goal: (${exerciseDataValue.goal} or less)`}</h1>
                    </div>
                </div>
            )
        }
        if(variant == 2){
            return ( // This is the finished percent for low bracket
                <div className='w-full grid grid-cols-2 justify-items-center items-center gap-4'>
                    <div className='flex flex-col items-start justify-center gap-2 w-full'>
                        <Line className='h-[30%]' percent={100} strokeWidth={3} trailWidth={2}/>
                        <h1 className='font-bold'>100%</h1>
                    </div>
                    <div className='w-full p-2 bg-blue-950 border-[2px] border-white text-white rounded-md'>
                        <h1>{`Current: ${paramObj}`}</h1>
                        <h1>{`Goal: (${exerciseDataValue.goal} or more)`}</h1>
                    </div>
                </div>
            )
        }
        if(variant == 3){
            return ( // Variant for High bracket
                <div className='w-full grid grid-cols-2 justify-items-center items-center gap-4'>
                    <div className='flex flex-col items-start justify-center gap-2 w-full'>
                        <Line className='h-[30%]' percent={parseFloat(((exerciseDataValue.goal/paramObj)*100).toFixed(2))} strokeWidth={3} trailWidth={2}/>
                        <h1 className='font-bold'>{parseFloat(((exerciseDataValue.goal/paramObj)*100).toFixed(2))}%</h1>
                    </div>
                    <div className='w-full p-2 bg-blue-950 border-[2px] border-white text-white rounded-md'>
                        <h1>{`Current: ${paramObj}`}</h1>
                        <h1>{`Goal: (${exerciseDataValue.goal} or less)`}</h1>
                    </div>
                </div>
            );
        }
        if(variant == 4){ // Variant for both normal and low bracket
            return (
                <div className='w-full grid grid-cols-2 justify-items-center items-center gap-4'>
                    <div className='flex flex-col items-start justify-center gap-2 w-full'>
                        <Line className='h-[30%]' percent={parseFloat(((paramObj/exerciseDataValue.goal)*100).toFixed(2))} strokeWidth={3} trailWidth={2}/>
                        <h1 className='font-bold'>{parseFloat(((paramObj/exerciseDataValue.goal)*100).toFixed(2))}%</h1>
                    </div>
                    <div className='w-full p-2 bg-blue-950 border-[2px] border-white text-white rounded-md'>
                        <h1>{`Current: ${paramObj}`}</h1>
                        <h1>{`Goal: (${exerciseDataValue.goal} or more)`}</h1>
                    </div>
                </div>
            );
        }
    }

    // Get progress bar difference
    const getPercent = (exerciseDataValue:any, paramObj:any) => {
        if(exerciseDataValue.range === 2){
            if(paramObj <= exerciseDataValue.goal){
                return percentRenderer(1, paramObj, exerciseDataValue);
            }
            else{
                return percentRenderer(3, paramObj, exerciseDataValue)
            }
        }
        if(exerciseDataValue.range === 1){
            if(paramObj >= exerciseDataValue.goal){
                return percentRenderer(2, paramObj, exerciseDataValue);
            }
            else{
                return percentRenderer(4, paramObj, exerciseDataValue);
            }
        }
        if(exerciseDataValue.range === 0){
            if(paramObj >= exerciseDataValue.goal){
                return percentRenderer(2, paramObj, exerciseDataValue);
            }
            else{
                return percentRenderer(4, paramObj, exerciseDataValue);
            }
        }
    };

    const showClaimRewardModal = () => {
        if(!showModal){
            claimRewardModalAudio();
        }
        else{
            navAudio();
        }
        setShowModal(!showModal);
    }

    // Claim reward function
    const claimReward = async() => {
        const {data:important_parameters} = await supabase.from('important_parameters').select().eq('client_id',userId);
        if(important_parameters){
            if(important_parameters[0]){
                const object = {...important_parameters[0]};
                object.need_update = true;
                object.needs_exercise = false;
                (object.points ? object.points += exerciseData.points : object.points = exerciseData.points);
                (object.exp ? object.exp += exerciseData.exp : object.exp = exerciseData.exp);

                await supabase.from('important_parameters').update({
                    ...object,
                }).eq('client_id', userId);

                await supabase.from('user_exercises').delete().eq('client_id', userId);
                
                acceptRewardAudio();
                toast.success('You claimed your rewards!');
                navigate('/dashboard/client');
            }
        }
    }

    // Go insert new parameters
    const goToNewData = () => {
        navAudio();
        navigate('/updateData')
    }

    // Go to play mode
    const goToPlayMode = (exerciseData:any) => {
        navAudio();
        navigate('/playMode', {state: exerciseData});
    };

    // Create a reusable renderer
    const renderer = (taskName:string, paramName:string) => (
        <>
            {exerciseData?.exerciseData?.[taskName] && (
                <div className='flex flex-col p-2 border-b-[2px] border-gray-400'>
                    <div className='border-b-[2px] border-gray-300 py-1 flex justify-between items-center'>
                        <h1 className='text-xl reddit-sans-condensed-text'>
                            {exerciseData.exerciseData[taskName].name}
                        </h1>
                        <h1 className={`font-bold ${exerciseData.exerciseData[taskName].range == 2 ? 'text-red-600' : exerciseData.exerciseData[taskName].range == 1 ? 'text-green-600' : exerciseData.exerciseData[taskName].range == 0 ? 'text-orange-600' : ''}`}>
                            {exerciseData.exerciseData[taskName].range == 2 ? 'High' : exerciseData.exerciseData[taskName].range == 1 ? 'Normal' : exerciseData.exerciseData[taskName].range == 0 ? 'Low' : ''}
                        </h1>
                    </div>
                    <div className='flex mt-1 items-center'>
                        {/* <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-[10%] feather feather-play"><polygon points="5 3 19 12 5 21 5 3"></polygon></svg> */}
                        <h1 className='font-bold w-[90%]'>
                            {exerciseData.exerciseData[taskName].exercise}
                        </h1>
                    </div>
                    <div className='grid grid-cols-3 w-full'>
                        <div className='flex items-center'>
                            <h1 className='text-lg mr-1'>{exerciseData.exerciseData[taskName].exp}</h1>
                            <div className='w-[1rem] h-[1rem]'>
                                <img src="/icons/xp.png" alt="" />
                            </div>
                        </div>
                        <div className='flex items-center'>
                            <h1 className='text-lg mr-1'>{exerciseData.exerciseData[taskName].points}</h1>
                            <div className='w-[1rem] h-[1rem]'>
                                <img src="/icons/star.png" alt="" />
                            </div>
                        </div>
                        <div>
                            {checkIfDone(exerciseData.exerciseData[taskName], userParam[paramName])}
                        </div>
                    </div>
                    <div className='flex flex-col w-full border-t-[2px] border-gray-400 py-2'>
                        {getPercent(exerciseData.exerciseData[taskName], userParam[paramName])}
                        <button onClick={() => goToPlayMode(exerciseData.exerciseData[taskName])} className='flex justify-center w-full bg-gray-950 mt-5 px-3 py-2 rounded-lg border-[2px] border-blue-400 text-blue-400'>
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-play"><polygon points="5 3 19 12 5 21 5 3"></polygon></svg>
                        </button>   
                    </div>
                </div>
            )}
        </>
    );

    // Create a reusable renderer
    const extraRenderer = (taskName:string) => (
        <>
        {exerciseData.extraExerciseData[taskName] && (
            <div className='flex flex-col p-2 border-b-[2px] border-gray-400'>
                <div className='border-b-[2px] border-gray-300 py-1 flex justify-between items-center'>
                    <h1 className='text-xl reddit-sans-condensed-text'>
                        {exerciseData.extraExerciseData[taskName].name}
                    </h1>
                </div>
                <div className='flex mt-1 items-center'>
                    {/* <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-[10%] feather feather-play"><polygon points="5 3 19 12 5 21 5 3"></polygon></svg> */}
                    <h1 className='font-bold w-[90%]'>
                        {exerciseData.extraExerciseData[taskName].exercise}
                    </h1>
                </div>
                <div className='w-full'>
                    <h1 className='text-xs mt-5'>Note: Task progress is monitored on the parameter affected</h1>
                </div>
            </div>
        )}
        </>
    );

    // Show approve trainer modal
    const showTrainerModal = () => {
        navAudio();
        setTrainerApproveModal(!trainerApproveModal);
    };

    const getUserId = async() => {
        const {data:{session}} = await supabase.auth.getSession();
        if(session){
            return session.user.id;
        };
    };

    useEffect(() => {
        const exercisesChannel = supabase.channel('schema-db-changes').on('postgres_changes',{
            event: 'INSERT',
            schema: 'public',
            table: 'user_exercises',
        }, async() => {
            const userIdValue:any = await getUserId();
            const userExerTemp = await getUserExercises(userIdValue);
            const paramTemp = await getParameters(userIdValue);

            checkIfDoneFunction(userExerTemp, paramTemp);
            getUserExercises(userIdValue)
            checkUserExercises(userIdValue);
            getImpUserParam(userIdValue);
        }).on('postgres_changes',{
            event: 'UPDATE',
            schema: 'public',
            table: 'user_exercises',
        }, async() => {
            const userIdValue:any = await getUserId();
            const userExerTemp = await getUserExercises(userIdValue);
            const paramTemp = await getParameters(userIdValue);

            checkIfDoneFunction(userExerTemp, paramTemp);
            getUserExercises(userIdValue)
            checkUserExercises(userIdValue);
            getImpUserParam(userIdValue);
        }).subscribe();
        
        getUserSession();

        return () => {
            supabase.removeChannel(exercisesChannel);
        }
    },[]);

  return (
    <>
    <ModalComponent 
    title={'CONGRATULATIONS!'} 
    message={'You have successfully completed all your tasks'} 
    acceptClassname={"bg-gray-900 border-[2px] border-green-400 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"}
    closeButtonClass={"bg-gray-900 border-[2px] border-red-400 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"}
    acceptMessage={'Claim Reward'} 
    rewardData={exerciseData && (exerciseData)} 
    onClose={showClaimRewardModal} 
    acceptFunction={claimReward} 
    show={showModal}
    borderColor={'border-green-400'}
    color={'bg-gray-900'}
    />
    <ModalComponent 
    title={'Pending Approval'} 
    closeButtonShow={false} 
    message={'Ask your trainer to approve your exercises to continue.'} 
    onClose={showTrainerModal} 
    show={trainerApproveModal} 
    acceptMessage={'Okay'}
    color={'bg-gray-900'}
    acceptClassname={'bg-gray-900 border-[2px] border-blue-400 px-3 py-2 rounded-md'}
    />

    {taskAvailable ? (
        <div className='p-1'>
            {/* <Header buttonFunc={goBackBtn} headerTitle='Tasks'/> */}
            <div className='w-full flex flex-col items-center'>
                {allDone ? (
                    <button onClick={showClaimRewardModal} className='w-full border-[2px] border-green-300 bg-gray-900 rounded-md py-2 mt-2'>
                        Claim Reward
                    </button>
                ):(
                    <button onClick={goToNewData} className='w-full border-[2px] border-green-300 bg-gray-900 rounded-md py-2 mt-2'>
                        Check if Done
                    </button>
                )}
                <h1 className='w-full border-[2px] border-gray-400 rounded-md text-center mt-2 py-1'>
                    {statusReport}
                </h1>
                <div className='flex flex-col items-center justify-center p-2 border-[2px] border-gray-400 rounded-md w-full mt-2'>
                    <div className='border-b-[2px] border-gray-400 w-full flex justify-center py-1'>
                        <h1 className='text-lg reddit-sans-condensed-text'>
                            Possible Reward
                        </h1>
                    </div>
                    <div className='w-full justify-items-center grid grid-cols-2 gap-2 py-2 h-full'>
                        <h1 className='flex items-center gap-1 border-r-[2px] border-gray-400 w-full h-full justify-center'>
                            {exerciseData ? `${exerciseData.exp}` : null}
                            <div className='w-[1rem] h-[1rem]'>
                                <img src="/icons/xp.png" alt="" />
                            </div>
                        </h1>
                        <h1 className='flex items-center gap-1 border-l-[2px] border-gray-400 w-full h-full justify-center'>
                            {exerciseData ? `${exerciseData.points}` : null}
                            <div className='w-[1rem] h-[1rem]'>
                                <img src="/icons/star.png" alt="" />
                            </div>
                        </h1>
                    </div>
                </div>
            </div>
            {exerciseData && userParam ? (
                <div className='bg-gray-900 rounded-md mt-2 p-2'>
                    {renderer('BMITask', 'BMI')}
                    {renderer('weightTask', 'weight')}
                    {renderer('fatTask', 'fat')}
                    {renderer('mineralTask', 'mineral')}
                    {renderer('smmTask', 'skeleton_muscle_mass')}
                    {renderer('slmTask', 'soft_lean_mass')}
                    {renderer('ffmiTask', 'fat_free_mass_index')}
                    {renderer('whrTask', 'waist_hip_ratio')}
                    {renderer('tbwTask', 'total_body_water')}
                    {renderer('pbfTask', 'percent_body_fat')}
                    {renderer('proteinTask', 'protein')}
                    {renderer('vfiTask', 'visceral_fat_index')}
                    <div className='w-full border-b-[2px] py-5 border-gray-800 px-1'>
                        <h1 className='w-full text-2xl mt-2 font-bold'>
                            Body Part Specific Tasks
                        </h1>
                    </div>
                    {extraRenderer('triceps')}
                    {extraRenderer('biceps')}
                    {extraRenderer('shoulders')}
                    {extraRenderer('abs')}
                    {extraRenderer('chest')}
                    {extraRenderer('quadriceps')}
                    {extraRenderer('glutes')}
                    {extraRenderer('hamstrings')}
                    {extraRenderer('back')}
                    {extraRenderer('rear deltoids')}
                    {extraRenderer('forearms')}
                </div>
            ):null}
        </div>
    ) : needUpdate ? (
        <div className='w-full scale-up h-[5rem] flex flex-col mt-20 justify-center items-center p-6'>
            <div className=' w-full flex flex-col justify-center items-center p-3'>
                <h1 className='text-4xl'>Update your data</h1>
                <h1 className='text-center text-sm mt-5'>You have no tasks as of the moment... You should update your data</h1>
                <div className='px-1 py-1 w-full mt-4'>
                    <button onClick={goToNewData} className='flex justify-center border-[3px] border-blue-400 text-blue-400 rounded-md w-full py-3 px-1 hover:bg-blue-400 hover:text-black transition-all duration-300 ease-out'>
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-file-text"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>
                    </button>
                </div>
            </div>
        </div>
    ) : loading ? (
        <Loader/>
    ) : (
        <div onClick={showTrainerModal} className='w-full h-[5rem] mt-[9rem] flex flex-col justify-center items-center p-5'>
            <div className='p-4 w-full flex flex-col items-center gap-2 justify-center'>
                <div className='w-[8rem] h-[8rem]'>
                    <img src="/icons/personal-trainer.png" alt="" />
                </div>
                <h1 className='text-3xl'>Trainer Approval</h1>
            </div>
            <div className='w-full'>
                <TrainerApprovalLoader/>
            </div>
        </div>
    )}
    </>
  )
}
