import { useEffect, useState } from 'react'
import { toast } from 'react-toastify';
import { navAudio, radioButtonAudio, trainerAcceptAudio } from '../../Functions/AudioFunctions/AudioFunctions';
import supabase from '../../Supabase/Supabase';
import { useLocation } from 'react-router-dom';

export default function TrainerDashboard() {
    const location = useLocation();

    const dataReceiver = location.state;
    const trainderData = dataReceiver.userData;

    const [clients, setClients] = useState<any>(null);
    const [listMode, setListMode] = useState<boolean>(true);
    const [userParams, setUserParams] = useState<any>(null);
    const [userDp, setUserDp] = useState<string|null>(null);
    const [userName, setUserName] = useState<string|null>(null);
    const [exercises, setExercises] = useState<any|null>(null);

    const [weightChecked, setWeightChecked] = useState<boolean>(false);
    const [BMIChecked, setBMIChecked] = useState<boolean>(false);
    const [mineralChecked, setMineralChecked] = useState<boolean>(false);
    const [slmChecked, setSlmChecked] = useState<boolean>(false);
    const [ffmiChecked, setFfmiChecked] = useState<boolean>(false);
    const [fatChecked, setFatChecked] = useState<boolean>(false);
    const [proteinChecked, setProteinChecked] = useState<boolean>(false);
    const [tbwChecked, setTbwChecked] = useState<boolean>(false);
    const [pbfChecked, setPbfChecked] = useState<boolean>(false);
    const [vfiChecked, setVfiChecked] = useState<boolean>(false);
    const [whrChecked, setWhrChecked] = useState<boolean>(false);
    const [smmChecked, setSmmChecked] = useState<boolean>(false);

    const [delMode, setDelMode] = useState<boolean>(false);
    
    const [dpLink, setDpLink] = useState<any>(null);

    const [showExercise, setShowExercise] = useState<boolean>(false);

    const getUserDp = async() => {
        const {data} = await supabase.from('profile_photos').select('link').eq('client_id', trainderData.id)
        if(data){
            if(data[0]){
                setDpLink(data[0].link);
            }
        }
    }

    // Get users bound on the trainer
    const getUsers = async() => {
        const {data} = await supabase.from('trainer_client').select('client, client_username').eq('trainer', trainderData.id);
        if(data){
            const promises = data.map(async(client:any) => {
                const {data} = await supabase.from('profile_photos').select('link').eq('client_id', client.client);
                if(data){
                    if(data[0]){
                        return {dpLink: data[0].link, client: client.client, client_username: client.client_username};
                    }
                    else{
                        return {dpLink: '/profileIcon.jpg', client: client.client, client_username: client.client_username};
                    }
                }
            });
            const clientsArray = await Promise.all(promises);
            console.log(clientsArray);
            setClients(clientsArray);
        }
    };

    const radioHandler = (e:any) => {
        const {name, checked} = e.target;
        switch(name){
            case 'weightTask':
                if(checked){
                    setWeightChecked(!weightChecked);
                }
                else{
                    setWeightChecked(!weightChecked);
                }
            break;
            case 'BMITask':
                if(checked){
                    setBMIChecked(!BMIChecked);
                }
                else{
                    setBMIChecked(!BMIChecked);
                }
            break;
            case 'mineralTask':
                if(checked){
                    setMineralChecked(!mineralChecked);
                }
                else{
                    setMineralChecked(!mineralChecked);
                }
            break;
            case 'slmTask':
                if(checked){
                    setSlmChecked(!slmChecked);
                }
                else{
                    setSlmChecked(!slmChecked);
                }
            break;
            case 'ffmiTask':
                if(checked){
                    setFfmiChecked(!ffmiChecked);
                }
                else{
                    setFfmiChecked(!ffmiChecked);
                }
            break;
            case 'fatTask':
                if(checked){
                    setFatChecked(!fatChecked);
                }
                else{
                    setFatChecked(!fatChecked);
                }
            break;
            case 'proteinTask':
                if(checked){
                    setProteinChecked(!proteinChecked);
                }
                else{
                    setProteinChecked(!proteinChecked);
                }
            break;
            case 'tbwTask':
                if(checked){
                    setTbwChecked(!tbwChecked);
                }
                else{
                    setTbwChecked(!tbwChecked);
                }
            break;
            case 'pbfTask':
                if(checked){
                    setPbfChecked(!pbfChecked);
                }
                else{
                    setPbfChecked(!pbfChecked);
                }
            break;
            case 'vfiTask':
                if(checked){
                    setVfiChecked(!vfiChecked);
                }
                else{
                    setVfiChecked(!vfiChecked);
                }
            break;
            case 'whrTask':
                if(checked){
                    setWhrChecked(!whrChecked);
                }
                else{
                    setWhrChecked(!whrChecked);
                }
            break;
            case 'smmTask':
                if(checked){
                    setSmmChecked(!smmChecked);
                }
                else{
                    setSmmChecked(!smmChecked);
                }
            break;
        }
    }

    // Approve exercise of chosen user
    const approveExercises = async(exercisesData:any) => {
        trainerAcceptAudio();
        console.log(exercisesData.exercisePlans);
        const expTotal: number = 
        (exercisesData?.exercisePlans?.BMITask?.exp ?? 0) +
        (exercisesData?.exercisePlans?.fatTask?.exp ?? 0) +
        (exercisesData?.exercisePlans?.ffmiTask?.exp ?? 0) +
        (exercisesData?.exercisePlans?.mineralTask?.exp ?? 0) +
        (exercisesData?.exercisePlans?.pbfTask?.exp ?? 0) +
        (exercisesData?.exercisePlans?.proteinTask?.exp ?? 0) +
        (exercisesData?.exercisePlans?.slmTask?.exp ?? 0) + 
        (exercisesData?.exercisePlans?.smmTask?.exp ?? 0) + 
        (exercisesData?.exercisePlans?.tbwTask?.exp ?? 0) + 
        (exercisesData?.exercisePlans?.vfiTask?.exp ?? 0) +
        (exercisesData?.exercisePlans?.weightTask?.exp ?? 0) + 
        (exercisesData?.exercisePlans?.whrTask?.exp ?? 0);

        const pointsTotal: number = 
        (exercisesData?.exercisePlans?.BMITask?.points ?? 0) +
        (exercisesData?.exercisePlans?.fatTask?.points ?? 0) +
        (exercisesData?.exercisePlans?.ffmiTask?.points ?? 0) +
        (exercisesData?.exercisePlans?.mineralTask?.points ?? 0) +
        (exercisesData?.exercisePlans?.pbfTask?.points ?? 0) +
        (exercisesData?.exercisePlans?.proteinTask?.points ?? 0) +
        (exercisesData?.exercisePlans?.slmTask?.points ?? 0) + 
        (exercisesData?.exercisePlans?.smmTask?.points ?? 0) + 
        (exercisesData?.exercisePlans?.tbwTask?.points ?? 0) + 
        (exercisesData?.exercisePlans?.vfiTask?.points ?? 0) +
        (exercisesData?.exercisePlans?.weightTask?.points ?? 0) + 
        (exercisesData?.exercisePlans?.whrTask?.points ?? 0);
        console.log(expTotal);
        console.log(pointsTotal);
        const objToUpload = {
            client_id: exercisesData.id,
            exp: expTotal,
            points: pointsTotal,
            exerciseData: exercisesData.exercisePlans,
            is_done: false,
            is_pending: false,
            extraExerciseData: exercisesData.extraExercisePlans,
        }
        const {error} = await supabase.from('user_exercises').insert(objToUpload);
        console.log(error);
        if(!error){
            await supabase.from('user_ranges').delete().eq('id', exercisesData.id);
            toast.success(`Exercises now sent to client ${userName}`)
            backToListBtn();
        }
        else{
            toast.error(error.message);
        }
    }

    // Function to handle hide and show exercises
    const showExerciseFunc = () => {
        navAudio();
        setShowExercise(!showExercise);
    };

    // Handle div click
    const clientClick = (clientId:string, dpLink:string, username:string) => {
        navAudio();
        setListMode(false);
        console.log(clientId);
        const getUserParam = async() => {
            const {data} = await supabase.from('user_parameters').select().eq('id', clientId);
            if(data){
                const index = data.length - 1;
                setUserParams(data[index]);
            };
        };
        // Get users exercise to approve
        const getUserExercise = async() => {
            const {data} = await supabase.from('user_ranges').select().eq('id',clientId);
            if(data){
                if(data[0]){
                    setExercises(data[0]);
                }
            }
        }
        setUserDp(dpLink);
        setUserName(username);
        getUserParam();
        getUserExercise();
    };

    // Back button to go back to list mode
    const backToListBtn = () => {
        navAudio();
        setListMode(true);
        setUserDp(null);
        setUserName(null);
        setUserParams(null);
        setShowExercise(false);
        setExercises(null);
    };

    // Create a dynamic renderer for exercise approval
    const exerciseRenderer = (exercises:any,name:string,rangeName:string,checked:boolean) => (
        <>
            {exercises?.exercisePlans?.[name] && (
                <div className='p-2 border-b-[2px] flex border-gray-400'>
                    <div className='w-[95%]'>
                        <h1 className='text-gray-200'>
                            {exercises.exercisePlans[name].name} - {(exercises[rangeName] === 0) ? 'Low' : (exercises[rangeName] === 1) ? 'Normal' : (exercises[rangeName] === 2) ? 'High' : ''}
                        </h1>
                        <h1 className='font-bold'>
                            {exercises.exercisePlans[name].exercise}
                        </h1>
                        <div className='grid grid-cols-2 w-full'>
                            <div className='flex items-center'>
                                <h1 className='text-lg mr-1'>{exercises.exercisePlans[name].exp}</h1>
                                <div className='w-[1rem] h-[1rem]'>
                                    <img src="/icons/xp.png" alt="" />
                                </div>
                            </div>
                            <div className='flex items-center'>
                                <h1 className='text-lg mr-1'>{exercises.exercisePlans[name].points}</h1>
                                <div className='w-[1rem] h-[1rem]'>
                                    <img src="/icons/star.png" alt="" />
                                </div>
                            </div>
                        </div>
                    </div>
                    {delMode && (
                        <div className='flex justify-center items-center w-[5%]'>
                            <input onClick={radioHandler} type="radio" name={name} checked={checked} readOnly/>
                        </div>
                    )}
                </div>
            )}
        </>
    );

    const delModeFunc = () => {
        radioButtonAudio();
        setDelMode(!delMode);
    }

    const deleteExercisesFunc = (exercisesValue: any) => {
        console.log("Before deleting:", exercisesValue);
    
        // Create a copy of exercisePlans to avoid direct mutation
        const exerciseVariable = { ...exercisesValue.exercisePlans };
    
        console.log("Copied exercisePlans:", exerciseVariable);
    
        // Conditional deletes based on checkboxes
        if (weightChecked) {
            console.log("Deleting weightTask...");
            delete exerciseVariable.weightTask;
        }
        if (BMIChecked) {
            console.log("Deleting BMITask...");
            delete exerciseVariable.BMITask;
        }
        if (mineralChecked) {
            console.log("Deleting mineralTask...");
            delete exerciseVariable.mineralTask;
        }
        if (slmChecked) {
            console.log("Deleting slmTask...");
            delete exerciseVariable.slmTask;
        }
        if (ffmiChecked) {
            console.log("Deleting ffmiTask...");
            delete exerciseVariable.ffmiTask;
        }
        if (fatChecked) {
            console.log("Deleting fatTask...");
            delete exerciseVariable.fatTask;
        }
        if (proteinChecked) {
            console.log("Deleting proteinTask...");
            delete exerciseVariable.proteinTask;
        }
        if (tbwChecked) {
            console.log("Deleting tbwTask...");
            delete exerciseVariable.tbwTask;
        }
        if (pbfChecked) {
            console.log("Deleting pbfTask...");
            delete exerciseVariable.pbfTask;
        }
        if (vfiChecked) {
            console.log("Deleting vfiTask...");
            delete exerciseVariable.vfiTask;
        }
        if (whrChecked) {
            console.log("Deleting whrTask...");
            delete exerciseVariable.whrTask;
        }
        if (smmChecked) {
            console.log("Deleting smmTask...");
            delete exerciseVariable.smmTask;
        }
    
        // After deletion, log to check if tasks are removed
        console.log("Updated exercisePlans after deletion:", exerciseVariable);
    
        // Create the new object with the updated exercisePlans
        const newExercises: any = {
            ...exercisesValue,
            exercisePlans: exerciseVariable
        };
    
        console.log("Final newExercises:", newExercises);

        setExercises(newExercises);
        delModeFunc();
    }
    

    // Create a dynamic renderer for exercise approval
    const extraExerciseRenderer = (exercises:any,name:string) => (
        <>
            {exercises.extraExercisePlans[name] && (
                <div className='p-2 border-b-[2px] border-gray-400'>
                    <h1 className='text-gray-200'>
                        {exercises.extraExercisePlans[name].name}
                    </h1>
                    <h1 className='font-bold'>
                        {exercises.extraExercisePlans[name].exercise}
                    </h1>
                </div>
            )}
        </>
    )

    // Create a dynamic renderer
    const renderer = (category:string, name:string) => (
        <div className='px-1 py-1 w-1/2'>
            <div className='flex flex-col items-center justify-start border-[2px] border-blue-400 bg-gray-900 shadow-xl h-[7rem] w-full p-2 rounded-md'>
                <div className='flex w-full items-center gap-1'>
                    <div className='w-[1rem] h-[1rem]'>
                        <img src={`/icons/parameters/${category}.png`} alt="" />
                    </div>
                    <h1 className='font-bold text-xs'>{name}</h1>
                </div>
                <h1 className='w-full'>
                    {userParams[category]}
                </h1>
            </div>
        </div>
    )

    // Run once on component load
    useEffect(() => {
        getUsers();
        getUserDp();
    },[])

  return (
    <>
        {trainderData && (
            <div>
                <div className='flex flex-col p-2'>
                    <div className='flex flex-col p-2 bg-blue-400 rounded-md shadow-xl mb-2'>
                        <div className='flex bg-gray-950 items-center p-2 rounded-md'>
                            <div className='p-[0.2rem] bg-gray-600 rounded-full'>
                            {dpLink && (
                                <img src={dpLink} className='h-[2rem] min-w-[2rem] w-[2rem] rounded-full' alt="" />
                            )}
                            </div>
                            <h1 className='w-full px-3 font-sans text-xl text-center mb-5 mt-5'>Welcome, {trainderData.username}!</h1>
                        </div>
                    </div>
                </div>
            </div>
        )}
        {clients && listMode ? (
            <>
            <div className='flex flex-col w-full rounded-md bg-gray-950 shadow-xl p-1'>
                <div className='flex'>
                    <h1 className='font-mono text-3xl px-3 py-2'>Clients</h1>
                </div>
                <div className='flex flex-wrap w-full'>
                    {clients.map((client:any) => (
                        <button onClick={() => clientClick(client.client, client.dpLink, client.client_username)} value={client.client} className='flex flex-wrap justify-center items-center w-1/2 hover:cursor-pointer' key={client.client}>
                            <div className='p-1 w-full'>
                                <div className='flex items-center h-[7rem] bg-gray-800 border border-blue-400 px-3 py-2 rounded-md w-full shadow-xl hover:border-[2px] transition-all duration-200 ease-out hover:border-white'>
                                    <div className='w-[3rem] h-[3rem] sm:w-[10%] p-[0.1rem] bg-black rounded-full'>
                                        <img
                                            className="w-[3rem] h-[3rem] rounded-full"
                                            src={client.dpLink ? client.dpLink : "/icons/defaultIcon.png"}
                                            alt=""
                                            onError={(e) => {
                                                e.currentTarget.src = "/icons/defaultIcon.png"; // Fallback to default image
                                            }}
                                        />
                                    </div>
                                    <h1 className='w-[10%] ml-1 text-sm'>
                                        {client.client_username}
                                    </h1>
                                </div>
                            </div>
                        </button>
                    ))}
                </div> 
            </div>
            </>
        ):(
            <>
            <div className='flex flex-col w-full border-[2px] border-blue-400 rounded-md p-1'>
                {userDp && userName && (
                    <div className='p-2 flex items-center'>
                        <div className='flex items-center w-[3rem] h-[3rem] sm:w-[10%] p-[0.1rem] bg-black rounded-full'>
                        <img
                            className="w-[3rem] h-[3rem] rounded-full"
                            src={userDp ? userDp : "/icons/defaultIcon.png"}
                            alt=""
                            onError={(e) => {
                                e.currentTarget.src = "/icons/defaultIcon.png"; // Fallback to default image
                            }}
                        />
                        </div>
                        <h1 className='text-xl px-2'>{userName}</h1>
                    </div>
                )}
                {userParams && (
                    <>
                        <div>
                            <div className='flex justify-center w-full p-2'>
                                <button onClick={backToListBtn} className='flex justify-center w-full bg-gray-800 border-[2px] border-red-400 rounded-md p-2'>
                                    <h1>Back</h1>
                                </button>
                            </div>
                            {showExercise && exercises ? (
                                <div className='px-2 mb-2'>
                                    <button onClick={showExerciseFunc} className='bg-gray-800 border-[2px] border-blue-400 py-1 px-2 rounded-md mb-1 w-full'>Hide</button>
                                    <div className='p-2 rounded-md bg-blue-950 border-[2px] border-gray-400 mt-1 shadow-xl'>
                                        <div className='w-full flex justify-between border-b-[2px] border-gray-700 py-1'>
                                            <h1 className='text-2xl font-bold'>Exercises Approval</h1>
                                            <button onClick={delModeFunc} className={`${delMode ? 'border-green-400' : 'border-red-400'} border-[2px] bg-gray-800 px-2 py-1 rounded-md`}>{delMode ? 'Cancel' : 'Delete'}</button>
                                        </div>
                                        {exerciseRenderer(exercises, 'weightTask', 'weightRange', weightChecked)}
                                        {exerciseRenderer(exercises, 'BMITask', 'BMIRange', BMIChecked)}
                                        {exerciseRenderer(exercises, 'mineralTask', 'mineralRange', mineralChecked)}
                                        {exerciseRenderer(exercises, 'slmTask', 'slmRange', slmChecked)}
                                        {exerciseRenderer(exercises, 'ffmiTask', 'ffmiRange', ffmiChecked)}
                                        {exerciseRenderer(exercises, 'fatTask', 'fatRange', fatChecked)}
                                        {exerciseRenderer(exercises, 'proteinTask', 'proteinRange', proteinChecked)}
                                        {exerciseRenderer(exercises, 'tbwTask', 'tbwRange', tbwChecked)}
                                        {exerciseRenderer(exercises, 'pbfTask', 'pbfRange', pbfChecked)}
                                        {exerciseRenderer(exercises, 'vfiTask', 'vfiRange', vfiChecked)}
                                        {exerciseRenderer(exercises, 'whrTask', 'whrRange', whrChecked)}
                                        {exerciseRenderer(exercises, 'smmTask', 'smmRange', smmChecked)}
                                        <h1 className='w-full text-center mt-4 pb-2 border-b-[2px] border-gray-500 text-xl'>Extra Exercises</h1>
                                        {extraExerciseRenderer(exercises, 'triceps')}
                                        {extraExerciseRenderer(exercises, 'biceps')}
                                        {extraExerciseRenderer(exercises, 'shoulders')}
                                        {extraExerciseRenderer(exercises, 'abs')}
                                        {extraExerciseRenderer(exercises, 'back')}
                                        {extraExerciseRenderer(exercises, 'chest')}
                                        {extraExerciseRenderer(exercises, 'forearms')}
                                        {extraExerciseRenderer(exercises, 'glutes')}
                                        {extraExerciseRenderer(exercises, 'hamstrings')}
                                        {extraExerciseRenderer(exercises, 'quadriceps')}
                                        {extraExerciseRenderer(exercises, 'rear deltoids')}
                                        {delMode ? (
                                            <div onClick={() => deleteExercisesFunc(exercises)} className='w-full mt-2'>
                                                <button className='w-full px-2 py-1 bg-red-400 rounded-md'>Delete Selected Exercises</button>
                                            </div>
                                        ) : (
                                            <div onClick={() => approveExercises(exercises)} className='w-full mt-2'>
                                                <button className='w-full px-2 py-1 bg-green-400 rounded-md'>Approve Exercises</button>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            ): exercises ? (
                                <div className='px-2'>
                                    <button onClick={showExerciseFunc} className='bg-gray-800 border-[2px] border-green-400 py-1 px-2 rounded-md w-full'>
                                        Show Exercises
                                    </button>
                                </div>
                            ):null}
                            <div className='flex flex-wrap p-2 w-full'>
                                {renderer('weight','Weight')}
                                {renderer('fat','Fat')}
                                {renderer('mineral','Mineral')}
                                {renderer('protein','Protein')}
                                {renderer('total_body_water','Total Body Water')}
                                {renderer('soft_lean_mass','Soft Lean Mass')}
                                {renderer('percent_body_fat','Percent Body Fat')}
                                {renderer('visceral_fat_index','Visceral Fat Index')}
                                {renderer('waist_hip_ratio','Waist Hip Ratio')}
                                {renderer('skeleton_muscle_mass','Skeleton Muscle Mass')}
                                {renderer('fat_free_mass_index','Fat Free Mass Index')}
                                {renderer('calcium','Calcium')}
                                {renderer('BMI','BMI')}
                                {renderer('basal_metabolic_rate','Basal Metabolic Rate')}
                                {renderer('total_energy_expenditure','Total Energy Expenditure')}
                                {renderer('physical_age','Physical Age')}
                            </div>
                        </div>
                    </>
                )}
            </div>
            </>
        )}
    </>
  )
}
