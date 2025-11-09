import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import { navAudio, negativeAudio, radioButtonAudio } from '../../Functions/AudioFunctions/AudioFunctions'
import { useNavigate } from 'react-router-dom';
import supabase from '../../Supabase/Supabase';
import { calcuParam } from '../../Functions/ParamCalculator/ParamCalculator';
import Header from '../SharedComponents/Header/Header';

export default function UpdateData() {
    const navigate = useNavigate();
    const [weight, setWeight] = useState(0.0);
    const [fat, setFat] = useState(0.0);
    const [mineral, setMineral] = useState(0.0);
    const [protein, setProtein] = useState(0.0);
    const [tbw, setTbw] = useState(0.0);
    const [slm, setSlm] = useState(0.0);
    const [pbf, setPbf] = useState(0.0);
    const [vfi, setVfi] = useState(0.0);
    const [whr, setWhr] = useState(0.0);
    const [smm, setSmm] = useState(0.0);
    const [ffmi, setFfmi] = useState(0.0);
    const [calcium, setCalcium] = useState(0.0);
    const [BMI, setBMI] = useState(0.0);
    const [bmr, setBmr] = useState(0.0);
    const [tee, setTee] = useState(0.0);
    const [pa, setPa] = useState(0.0);
    const [difficulty, setDifficulty] = useState<string>("low");

    const [tricepChecked, setTricepChecked] = useState<boolean>(false);
    const [bicepChecked, setBicepChecked] = useState<boolean>(false);
    const [shoulderChecked, setShoulderChecked] = useState<boolean>(false);
    const [absChecked, setAbsChecked] = useState<boolean>(false);
    const [backChecked, setBackChecked] = useState<boolean>(false);
    const [chestChecked, setChestChecked] = useState<boolean>(false);
    const [forearmsChecked, setForearmsChecked] = useState<boolean>(false);
    const [glutesChecked, setGlutesChecked] = useState<boolean>(false);
    const [hamstringsChecked, setHamstringsChecked] = useState<boolean>(false);
    const [quadricepsChecked, setQuadricepsChecked] = useState<boolean>(false);
    const [rearDeltoidsChecked, setRearDeltoidsChecked] = useState<boolean>(false);

    const [sameAsBefore, setSameAsBefore] = useState<boolean>(false);

    const [isDone, setIsDone] = useState<boolean>(false);

    useEffect(() => {
      // Check if there is an existing user
      const getUserSession = async() => {
          const { data } = await supabase.auth.getSession();
          if(data.session){
            const {data:user_exercises} = await supabase.from('user_exercises').select().eq('client_id', data.session.user.id);
                if(user_exercises){
                  console.log(user_exercises)
                  if(user_exercises[0]){
                    setIsDone(false);
                  }else{
                    setIsDone(true);
                  }
                }
          }
          else{
              navigate('/');
          }
      }
      getUserSession();
  }, [])

    // Generalized input change handler
    const inputChangeHandler = (e:any) => {
    const { name, value } = e.target;
    switch (name) {
      case 'weight':
        console.log(value);
        setWeight(parseFloat(value));
        break;
      case 'fat':
        setFat(parseFloat(value));
        break;
      case 'mineral':
        setMineral(parseFloat(value));
        break;
      case 'protein':
        setProtein(parseFloat(value));
        break;
      case 'tbw':
        setTbw(parseFloat(value));
        break;
      case 'slm':
        setSlm(parseFloat(value));
        break;
      case 'pbf':
        setPbf(parseFloat(value));
        break;
      case 'vfi':
        setVfi(parseFloat(value));
        break;
      case 'whr':
        setWhr(parseFloat(value));
        break;
      case 'smm':
        setSmm(parseFloat(value));
        break;
      case 'ffmi':
        setFfmi(parseFloat(value));
        break;
      case 'calcium':
        setCalcium(parseFloat(value));
        break;
      case 'BMI':
        setBMI(parseFloat(value));
        break;
      case 'bmr':
        setBmr(parseFloat(value));
        break;
      case 'tee':
        setTee(parseFloat(value));
        break;
      case 'pa':
        setPa(parseFloat(value));
        break;
      case 'difficulty':
        console.log(value);
        setDifficulty(value);
        break;
      default:
        break;
    }
  };

  const extraExerciseFunc = () => {
    const extraExercisesObj = {
      triceps: tricepChecked ? tricepChecked : null,
      biceps: bicepChecked ? bicepChecked: null,
      shoulders: shoulderChecked ? shoulderChecked : null,
      abs: absChecked ? absChecked : null,
      back: backChecked ? backChecked : null,
      chest: chestChecked ? chestChecked : null,
      forearms: forearmsChecked ? forearmsChecked : null,
      glutes: glutesChecked ? glutesChecked : null,
      hamstrings: hamstringsChecked ? hamstringsChecked : null,
      quadriceps: quadricepsChecked ? quadricepsChecked : null,
      'rear deltoids': rearDeltoidsChecked? rearDeltoidsChecked : null,
    }

    return (extraExercisesObj);
  }

    const updateData = async() => {
      const {data:user_params} = await supabase.from('user_parameters').select();
      if(user_params){
        try {
          await supabase.from('user_parametersss').insert(user_params[user_params.length - 1]);
          const {data:exerUpdate} = await supabase.auth.getSession();
          if(exerUpdate){
            if(exerUpdate.session){
              if(exerUpdate.session.user){
                console.log(exerUpdate.session.user.id);
                const {data:user_exercises} = await supabase.from('user_exercises').select().eq('client_id', exerUpdate.session.user.id);

                if(user_exercises){
                  console.log(user_exercises)
                  if(user_exercises[0]){
                    navigate('/dashboard/client/tasks');
                  }else{
                    calcuParam(exerUpdate.session.user.id, difficulty, extraExerciseFunc());
                    navigate('/dashboard/client/tasks');
                  }
                }
                const {data} = await supabase.from('important_parameters').update({
                  need_update: false,
                  needs_exercise: true
              }).eq('client_id', exerUpdate.session.user.id).select('need_update, needs_exercise');
                console.log(data);
              };
            };
          };
        } catch (error) {
          negativeAudio();
          console.log(error)
        }
      }
    }

    // Handle data update
    const insertToParamTable = async(e:any) => {
        navAudio();
        e.preventDefault()
        if(weight > 0 && fat > 0 && mineral > 0 && protein > 0 && tbw > 0 && slm > 0 && pbf > 0 && vfi > 0 && whr > 0 && smm > 0 && ffmi > 0 && calcium > 0 && BMI > 0 && bmr > 0 && tee > 0 && pa > 0){
          const {error} = await supabase.from('user_parameters').insert({
            weight: weight,
            fat: fat,
            mineral: mineral,
            protein: protein,
            total_body_water: tbw,
            soft_lean_mass: slm,
            percent_body_fat: pbf,
            visceral_fat_index: vfi,
            waist_hip_ratio: whr,
            skeleton_muscle_mass: smm,
            fat_free_mass_index: ffmi,
            calcium: calcium,
            BMI: BMI,
            basal_metabolic_rate: bmr,
            total_energy_expenditure: tee,
            physical_age: pa
          })
          const {data:exerUpdate} = await supabase.auth.getSession();
          if(exerUpdate){
            if(exerUpdate.session){
              if(exerUpdate.session.user){
                console.log(exerUpdate.session.user.id);
                const {data:user_exercises} = await supabase.from('user_exercises').select().eq('client_id', exerUpdate.session.user.id);

                if(user_exercises){
                  console.log(user_exercises)
                  if(user_exercises[0]){
                    navigate('/dashboard/client/tasks');
                  }else{
                    calcuParam(exerUpdate.session.user.id, difficulty, extraExerciseFunc());
                    navigate('/dashboard/client/tasks');
                  }
                }
                const {data} = await supabase.from('important_parameters').update({
                  need_update: false,
                  needs_exercise: true
              }).eq('client_id', exerUpdate.session.user.id).select('need_update, needs_exercise');
                console.log(data);
                console.log(error);
              };
            };
          };
        }
        else{
          toast.error('Some data are missing');
        }
    };

    const sameAsBeforeFunction = (e:any) => {
      const {value} = e.target;
      setTricepChecked(false);
      setBicepChecked(false);
      setShoulderChecked(false);
      setAbsChecked(false);
      setBackChecked(false);
      setChestChecked(false);
      setForearmsChecked(false);
      setGlutesChecked(false);
      setHamstringsChecked(false);
      setQuadricepsChecked(false);
      setRearDeltoidsChecked(false);

      if(value == 'FALSE'){
        setDifficulty('low');
        setSameAsBefore(false);
      }
      if(value == 'TRUE'){
        setDifficulty('low');
        setSameAsBefore(true);
      }
      
    }

    // Cancel button to go back 1 page
    const cancelBtn = () => {
      navAudio();
      navigate(-1);
    };

    // Create a dynamic renderer
    const renderer = (category:string, categoryName:string, name:string) => (
      <>
        <div className='flex justify-center w-full p-2'>
          <div className='flex flex-col items-start mb-2 w-full'>
              <label className='w-full mb-1 text-sm' htmlFor={category}>{categoryName}</label>
              <input type="number" step='any' id={category} className='border w-full border-gray-400 bg-gray-800 px-3 py-2 rounded-lg' onChange={inputChangeHandler} name={name} required/>
          </div>
        </div> 
      </>
    )

    const rendererTwo = (_category:string, _categoryName:string, name:string) => (
      <>
        <div className='flex flex-col items-center mb-2 w-full'>
            <select defaultValue='Low' className='w-full border rounded-lg bg-gray-800 py-2 px-2' onChange={inputChangeHandler} name={name} id="">
              <option value="low">Select Difficulty</option>
              <option value="high">High Difficulty</option>
              <option value="medium">Medium Difficulty</option>
              <option value="low">Low Difficulty</option>
            </select>
            <div className='mt-2'>
              <h1 className='text-xs'>Note: This will determine the intensity of your workout and how much points can be earned. Default is Low difficulty.</h1>
            </div>
        </div>
      </>
    );

    const radioHandler = (e:any) => {
      const {name, checked} = e.target;
      radioButtonAudio();
      switch(name){
        case 'triceps':
          if(checked){
            setTricepChecked(!tricepChecked);
          }
          else{
            setTricepChecked(!tricepChecked);
          }
        break;
        case 'biceps':
          if(checked){
            setBicepChecked(!bicepChecked);
          }
          else{
            setBicepChecked(!bicepChecked);
          }
        break;
        case 'shoulders':
          if(checked){
            setShoulderChecked(!shoulderChecked);
          }
          else{
            setShoulderChecked(!shoulderChecked);
          }
        break;
        case 'abs':
          if(checked){
            setAbsChecked(!absChecked);
          }
          else{
            setAbsChecked(!absChecked);
          }
        break;
        case 'back':
          if(checked){
            setBackChecked(!backChecked);
          }
          else{
            setBackChecked(!backChecked);
          }
        break;
        case 'chest':
          if(checked){
            setChestChecked(!chestChecked);
          }
          else{
            setChestChecked(!chestChecked);
          }
        break;
        case 'forearms':
          if(checked){
            setForearmsChecked(!forearmsChecked);
          }
          else{
            setForearmsChecked(!forearmsChecked);
          }
        break;
        case 'glutes':
          if(checked){
            setGlutesChecked(!glutesChecked);
          }
          else{
            setGlutesChecked(!glutesChecked);
          }
        break;
        case 'hamstrings':
          if(checked){
            setHamstringsChecked(!hamstringsChecked);
          }
          else{
            setHamstringsChecked(!hamstringsChecked);
          }
        break;
        case 'quadriceps':
          if(checked){
            setQuadricepsChecked(!quadricepsChecked);
          }
          else{
            setQuadricepsChecked(!quadricepsChecked);
          }
        break;
        case 'rearDeltoids':
          if(checked){
            setRearDeltoidsChecked(!rearDeltoidsChecked);
          }
          else{
            setRearDeltoidsChecked(!rearDeltoidsChecked);
          }
        break;
      };
    }

    const radioRenderer = (name:string, checkedState:boolean, text:string) => (
      <div className='w-full flex gap-1 items-center'>
        <input onClick={radioHandler} type="radio" name={name} checked={checkedState} value={name} readOnly/>
        <label className='w-full' htmlFor="">{text}</label>
      </div>
    )

    useEffect(() => {
      console.log(difficulty);
    },[difficulty])

    useEffect(() => {},[tricepChecked])
  return (
    <>
        <Header buttonFunc={cancelBtn} headerTitle='Update Data' />
        <div className=''>
            <div className='flex flex-col items-center p-3'>
                <h1 className='font-bold text-2xl'>Insert Data</h1>
                {isDone && (
                  <div className='scale-up border-[2px] border-gray-400 rounded-lg flex flex-col items-center mb-3 p-2'>
                    <h1 className='text-center'>Choose if reading is the same on the current</h1>
                    <select onChange={sameAsBeforeFunction} className='border-[2px] bg-gray-800 w-full mt-2 border-gray-200 py-1 rounded-lg mb-2' name="" id="">
                      <option value='FALSE'>Not same as current reading</option>
                      <option value='TRUE'>Same as current reading</option>
                    </select>
                  </div>
                )}
                {!sameAsBefore ? (
                  <form className='w-full' action="" onSubmit={insertToParamTable}>
                    <div className='grid grid-cols-2'>
                      {renderer('weight','Weight','weight')}
                      {renderer('fat','Fat','fat')}
                      {renderer('mineral','Mineral','mineral')}
                      {renderer('protein','Protein','protein')}
                      {renderer('totalBodyWater','Total Body Water','tbw')}
                      {renderer('softLeanMass','Soft Lean Mass','slm')}
                      {renderer('percentBodyFat','Percent Body Fat','pbf')}
                      {renderer('visceralFatIndes','Visceral Fat Index','vfi')}
                      {renderer('waistHipRatio','Waist Hip Ratio','whr')}
                      {renderer('skeletonMuscleMass','Skeleton Muscle Mass','smm')}
                      {renderer('fatFreeMassIndex','Fat Free Mass Index','ffmi')}
                      {renderer('calcium','Calcium','calcium')}
                      {renderer('BMI','Body Mass Index (BMI)','BMI')}
                      {renderer('basalMetabolicRate','Basal Metabolic Rate (BMR)','bmr')}
                      {renderer('totalEnergyExpenditure','Total Energy Expenditure','tee')}
                      {renderer('physicalAge','Physical Age','pa')}
                    </div>
                    <div className='w-full px-5 flex justify-center flex-col items-center'>
                      {isDone && (
                        <>
                        <div className='w-full border-[2px] p-2 border-gray-400 rounded-lg flex flex-col items-start justify-center mb-5'>
                          <h1>Choose a specific body part related task</h1>
                          <div className='w-full grid grid-cols-2'>
                            {radioRenderer('triceps', tricepChecked, 'Triceps')}
                            {radioRenderer('biceps', bicepChecked, 'Biceps')}
                            {radioRenderer('shoulders', shoulderChecked, 'Shoulders')}
                            {radioRenderer('abs', absChecked, 'Abs')}
                            {radioRenderer('back', backChecked, 'Back')}
                            {radioRenderer('chest', chestChecked, 'Chest')}
                            {radioRenderer('forearms', forearmsChecked, 'Forearms')}
                            {radioRenderer('glutes', glutesChecked, 'Glutes')}
                            {radioRenderer('hamstrings', hamstringsChecked, 'Hamstrings')}
                            {radioRenderer('quadriceps', quadricepsChecked, 'Quadriceps')}
                            {radioRenderer('rearDeltoids', rearDeltoidsChecked, 'Rear Deltoids')}
                          </div>
                          <h1 className='text-xs mt-2 text-gray-600 w-full text-center pt-2 border-t border-gray-300'>Note: This is optional</h1>
                        </div>
                        <div className='w-full'>
                          {rendererTwo('difficulty','Difficulty','difficulty')}
                        </div>
                        </>
                      )}
                    </div>
                    <button className='py-2 px-4 border-[2px] w-full my-5 border-green-400 rounded-lg'>
                        Update Data
                    </button>
                </form>
                ):(
                  <>
                  {isDone ? (
                    <>
                    <div className='w-full px-5 flex justify-center flex-col items-center'>
                      <div className='w-full border-[2px] p-2 border-gray-400 rounded-lg flex flex-col items-start justify-center mb-5'>
                        <h1>Choose a specific body part related task</h1>
                        <div className='w-full grid grid-cols-2'>
                          {radioRenderer('triceps', tricepChecked, 'Triceps')}
                          {radioRenderer('biceps', bicepChecked, 'Biceps')}
                          {radioRenderer('shoulders', shoulderChecked, 'Shoulders')}
                          {radioRenderer('abs', absChecked, 'Abs')}
                          {radioRenderer('back', backChecked, 'Back')}
                          {radioRenderer('chest', chestChecked, 'Chest')}
                          {radioRenderer('forearms', forearmsChecked, 'Forearms')}
                          {radioRenderer('glutes', glutesChecked, 'Glutes')}
                          {radioRenderer('hamstrings', hamstringsChecked, 'Hamstrings')}
                          {radioRenderer('quadriceps', quadricepsChecked, 'Quadriceps')}
                          {radioRenderer('rearDeltoids', rearDeltoidsChecked, 'Rear Deltoids')}
                        </div>
                        <h1 className='text-xs mt-2 text-gray-600 w-full text-center pt-2 border-t border-gray-300'>Note: This is optional</h1>
                      </div>
                    </div>
                      {rendererTwo('difficulty','Difficulty','difficulty')}
                    </>
                ) : null}
                  <button onClick={updateData} className='py-2 px-4 border-[2px] w-[75%] border-green-400 rounded-lg mt-3'>
                      Update Data
                  </button>
                  </>
                )}
            </div>
        </div>
    </>
  )
}
