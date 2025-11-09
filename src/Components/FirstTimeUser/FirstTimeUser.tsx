import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import supabase from "../../Supabase/Supabase";
import { toast } from "react-toastify";


export default function FirstTimeUser() {
    const navigate = useNavigate();

    const [userId, setUserId] = useState<any>(null);
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
    const [trainers, setTrainers] = useState<any>(null);
    const [trainerId, setTrainerId] = useState<any>(null);
    const [username, setUsername] = useState<any>(null);

    const [password, setPassword] = useState<any>(null);
    const [confPassword, setConfPassword] = useState<any>(null);

    const [height, setHeight] = useState<any>(null);
    const [gender, setGender] = useState<any>(null);
    const [age, setAge] = useState<any>(null);

    const getTrainers = async() => {
      const {data:trainer} = await supabase.from('users').select().eq('is_trainer', true);
      console.log(trainer);
      setTrainers(trainer);
    };

    const getUsername = async(userID:any) => {
      const {data} = await supabase.from('users').select().eq('id', userID).single();
      if(data){
        setUsername(data.username);
      };
    };
    
    // Update the user mode to no longer first time
    const updateUserMode = async(userID:any) => {
        await supabase.from('users').update({firstTimeUser: false}).eq('id', userID);
        window.location.reload();
    };

    const getUserSession = async() => {
        const {data} = await supabase.auth.getSession();
        if(data.session){
            setUserId(data.session.user.id);
            getUsername(data.session.user.id);
        };
    };

    useEffect(() => {
        getUserSession();
        getTrainers();
    }, []);

    // Check for trainer changes
    useEffect(() => {
    }, [trainers]);

    const passwordHandler = (e:any) => {
      const {name, value} = e.target;
      switch(name){
        case 'password':
          setPassword(value);
          break;
        case 'confPassword':
          setConfPassword(value);
          break;
      }
    }

    // Generalized input change handler
    const inputChangeHandler = (e:any) => {
    const { name, value } = e.target;
    switch (name) {
      case 'weight':
        setWeight(parseFloat(value));
        break;
      case 'fat':
        setFat(parseFloat(value));
        break;
      case 'mineral':
        setMineral(parseFloat(value));
        break;
      case 'protein':
        console.log(value)
        setProtein(parseFloat(value));
        break;
      case 'tbw':
        console.log(value)
        setTbw(parseFloat(value));
        break;
      case 'slm':
        console.log(value)
        setSlm(parseFloat(value));
        break;
      case 'pbf':
        console.log(value)
        setPbf(parseFloat(value));
        break;
      case 'vfi':
        console.log(value)
        setVfi(parseFloat(value));
        break;
      case 'whr':
        console.log(value)
        setWhr(parseFloat(value));
        break;
      case 'smm':
        console.log(value)
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
        console.log(value)
        setBmr(parseFloat(value));
        break;
      case 'tee':
        console.log(value)
        setTee(parseFloat(value));
        break;
      case 'pa':
        console.log(value)
        setPa(parseFloat(value));
        break;
      case 'height':
        console.log(value)
        setHeight(parseFloat(value));
        break;
      case 'age':
        console.log(value);
        setAge(parseFloat(value));
        break;
      default:
        break;
    }
  };

    const cancelBtn = async() => {
        await supabase.auth.signOut()
        navigate('/')
    }

    // Handle data update
    const insertToParamTable = async(e:any) => {
        e.preventDefault();
        
        if(password.length > 0 && confPassword.length > 0){
          if(confPassword == password){
            const {error} = await supabase.auth.updateUser({
              password: password,
            })
            if(error){
              console.error(error);
            }
            await supabase.from('user_parameters').insert({
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
            });
            await supabase.from('trainer_client').insert({
              trainer: trainerId,
              client_username: username
            });
            await supabase.from('important_parameters').insert({
              height: height,
              gender: gender,
              age: age,
            });
            await supabase.from('profile_photos').insert({});
            await updateUserMode(userId);
          }
          else{
            toast.error('Passwords do not match');
          }
        }
        else{
          toast.error('You must change your password')
        }
    };
    // Check input changes on select for trainer
    const optionHandler = async(e:any) => {
      const {name,value} = e.target;
      switch (name) {
        case 'trainer':
          console.log('Trainer: ',value);
          setTrainerId(value);
          break;
        case 'gender':
          console.log('Gender: ',value);
          setGender(value);
          break;
      };
    };
  return (
    <>
        <div>
            <div className='flex flex-col items-center p-3'>
                <h1 className='font-bold text-2xl'>Insert Data</h1>
                <form className='flex flex-col' action="" onSubmit={insertToParamTable}>
                    <div className='flex flex-col items-center mb-2'>
                        <label htmlFor="weight">Weight (kg)</label>
                        <input required type="number" step='any' id="weight" className='border border-gray-400 bg-gray-800 px-3 py-2 text-center rounded-lg' onChange={inputChangeHandler} name="weight" />
                    </div>
                    <div className='flex flex-col items-center mb-2'>
                        <label htmlFor="fat">Fat (%)</label>
                        <input required type="number" step='any' id="fat" className='border border-gray-400 bg-gray-800 px-3 py-2 text-center rounded-lg' onChange={inputChangeHandler} name="fat" />
                    </div>
                    <div className='flex flex-col items-center mb-2'>
                        <label htmlFor="mineral">Mineral Content</label>
                        <input required type="number" step='any' id="mineral" className='border border-gray-400 bg-gray-800 px-3 py-2 text-center rounded-lg' onChange={inputChangeHandler} name="mineral" />
                    </div>
                    <div className='flex flex-col items-center mb-2'>
                        <label htmlFor="protein">Protein Content</label>
                        <input required type="number" step='any' id="protein" className='border border-gray-400 bg-gray-800 px-3 py-2 text-center rounded-lg' onChange={inputChangeHandler} name="protein" />
                    </div>
                    <div className='flex flex-col items-center mb-2'>
                        <label htmlFor="totalBodyWater">Total Body Water (%)</label>
                        <input required type="number" step='any' id="totalBodyWater" className='border border-gray-400 bg-gray-800 px-3 py-2 text-center rounded-lg' onChange={inputChangeHandler} name="tbw" />
                    </div>
                    <div className='flex flex-col items-center mb-2'>
                        <label htmlFor="softLeanMass">Soft Lean Mass (kg)</label>
                        <input required type="number" step='any' id="softLeanMass" className='border border-gray-400 bg-gray-800 px-3 py-2 text-center rounded-lg' onChange={inputChangeHandler} name="slm" />
                    </div>
                    <div className='flex flex-col items-center mb-2'>
                        <label htmlFor="percentBodyFat">Percent Body Fat (%)</label>
                        <input required type="number" step='any' id="percentBodyFat" className='border border-gray-400 bg-gray-800 px-3 py-2 text-center rounded-lg' onChange={inputChangeHandler} name="pbf" />
                    </div>
                    <div className='flex flex-col items-center mb-2'>
                        <label htmlFor="visceralFatIndex">Visceral Fat Index</label>
                        <input required type="number" step='any' id="visceralFatIndex" className='border border-gray-400 bg-gray-800 px-3 py-2 text-center rounded-lg' onChange={inputChangeHandler} name="vfi" />
                    </div>
                    <div className='flex flex-col items-center mb-2'>
                        <label htmlFor="waistHipRatio">Waist-Hip Ratio</label>
                        <input required type="number" step='any' id="waistHipRatio" className='border border-gray-400 bg-gray-800 px-3 py-2 text-center rounded-lg' onChange={inputChangeHandler} name="whr" />
                    </div>
                    <div className='flex flex-col items-center'>
                        <label htmlFor="skeletonMuscleMass">Skeleton Muscle Mass (kg)</label>
                        <input required type="number" step='any' id="skeletonMuscleMass" className='border border-gray-400 bg-gray-800 px-3 py-2 text-center rounded-lg' onChange={inputChangeHandler} name="smm" />
                    </div>
                    <div className='flex flex-col items-center mb-2'>
                        <label htmlFor="fatFreeMassIndex">Fat Free Mass Index</label>
                        <input required type="number" step='any' id="fatFreeMassIndex" className='border border-gray-400 bg-gray-800 px-3 py-2 text-center rounded-lg' onChange={inputChangeHandler} name="ffmi" />
                    </div>
                    <div className='flex flex-col items-center mb-2'>
                        <label htmlFor="calcium">Calcium Content</label>
                        <input required type="number" step='any' id="calcium" className='border border-gray-400 bg-gray-800 px-3 py-2 text-center rounded-lg' onChange={inputChangeHandler} name="calcium" />
                    </div>
                    <div className='flex flex-col items-center mb-2'>
                        <label htmlFor="BMI">Body Mass Index (BMI)</label>
                        <input required type="number" step='any' id="BMI" className='border border-gray-400 bg-gray-800 px-3 py-2 text-center rounded-lg' onChange={inputChangeHandler} name="BMI" />
                    </div>
                    <div className='flex flex-col items-center mb-2'>
                        <label htmlFor="basalMetabolicRate">Basal Metabolic Rate (BMR)</label>
                        <input required type="number" step='any' id="basalMetabolicRate" className='border border-gray-400 bg-gray-800 px-3 py-2 text-center rounded-lg' onChange={inputChangeHandler} name="bmr" />
                    </div>
                    <div className='flex flex-col items-center mb-2'>
                        <label htmlFor="totalEnergyExpenditure">Total Energy Expenditure</label>
                        <input required type="number" step='any' id="totalEnergyExpenditure" className='border border-gray-400 bg-gray-800 px-3 py-2 text-center rounded-lg' onChange={inputChangeHandler} name="tee" />
                    </div>
                    <div className='flex flex-col items-center mb-2'>
                        <label htmlFor="physicalAge">Physical Age</label>
                        <input required type="number" step='any' id="physicalAge" className='border border-gray-400 bg-gray-800 px-3 py-2 text-center rounded-lg' onChange={inputChangeHandler} name="pa" />
                    </div>
                    <div className='flex flex-col items-center mb-2'>
                        {trainers && (
                        <select className='border border-gray-400 bg-gray-800 px-3 py-2 text-center rounded-lg w-[61%]' onChange={optionHandler} name="trainer" id="trainer" required>
                          <option key={'Choose a trainer'} value={''}>Choose your trainer</option>
                          {trainers.map((trainerData:any) => (
                            <option key={trainerData.id} value={trainerData.id}>{trainerData.username}</option>
                          ))}
                        </select>)}
                    </div>
                    <div className='flex flex-col items-center mb-2'>
                        <label htmlFor="height">Height (cm)</label>
                        <input type="number" step='any' id="height" className='border border-gray-400 bg-gray-800 px-3 py-2 text-center rounded-lg' onChange={inputChangeHandler} name="height" required/>
                    </div>
                    <div className='flex flex-col items-center mb-2'>
                        <label htmlFor="age">Age</label>
                        <input type="number" step='any' id="age" className='border border-gray-400 bg-gray-800 px-3 py-2 text-center rounded-lg' onChange={inputChangeHandler} name="age" required/>
                    </div>
                    <div className='flex flex-col items-center mb-2'>
                          <select className='border border-gray-400 bg-gray-800 px-3 py-2 text-center rounded-lg w-[61%]' onChange={optionHandler} name="gender" id="gender" required>
                            <option value="">Select Gender</option>
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                          </select>
                    </div>
                    <div className="flex flex-col gap-2 justify-center items-center mt-2 border-[2px] border-gray-400 rounded-lg p-2 mb-2">
                      <h1 className="w-full text-center py-2 border-b-[2px] border-gray-400 mb-2">Change Password</h1>
                      <div className="grid grid-cols-2 items-center">
                        <label htmlFor="">Password</label>
                        <input className="bg-gray-800 border-[2px] border-blue-400 rounded-lg py-2 px-1" onChange={passwordHandler} name="password" type="password" required/>
                      </div>
                      <div className="grid grid-cols-2 items-center">
                        <label htmlFor="">Confirm Password</label>
                        <input className="bg-gray-800 border-[2px] border-blue-400 rounded-lg py-2 px-1" onChange={passwordHandler} name="confPassword" type="password" required/>
                      </div>
                      <h1 className="text-xs mt-2 w-full text-center border-t-[2px] border-gray-400 py-2">You are required to change your password</h1>
                    </div>
                    <button type='submit' className='py-2 px-4 bg-gray-800 border-[2px] border-green-400 rounded-lg mb-2'>
                        Insert Data
                    </button>
                    <button type='button' onClick={cancelBtn} className='py-2 px-4 bg-gray-800 border-[2px] border-red-400 rounded-lg'>
                        Cancel
                    </button>
                </form>
            </div>
        </div>
    </>
  )
}
