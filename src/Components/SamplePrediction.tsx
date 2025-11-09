import { useState } from 'react'
import { Link } from 'react-router-dom';
import multiOutputFunc from '../Functions/MachineLearningModels/PredictionFunction/PredictionFunction';

export default function ONNXModelComponent() {
    const [output, setOutput] = useState<any>(null);

    const [weight, setWeight] = useState<any>(null);
    const [weightBracket, setWeightBracket] = useState<any>(1);

    const [fat, setFat] = useState<any>(null);
    const [fatBracket, setFatBracket] = useState<any>(1);

    const [mineral, setMineral] = useState<any>(null);
    const [mineralBracket, setMineralBracket] = useState<any>(1);

    const [protein, setProtein] = useState<any>(null);
    const [proteinBracket, setProteinBracket] = useState<any>(1);

    const [tbw, setTbw] = useState<any>(null);
    const [tbwBracket, setTbwBracket] = useState<any>(1);

    const [slm, setSlm] = useState<any>(null);
    const [slmBracket, setSlmBracket] = useState<any>(1);

    const [pbf, setPbf] = useState<any>(null);
    const [pbfBracket, setPbfBracket] = useState<any>(1);

    const [vfi, setVfi] = useState<any>(null);
    const [vfiBracket, setVfiBracket] = useState<any>(1);
    
    const [whr, setWhr] = useState<any>(null);
    const [whrBracket, setWhrBracket] = useState<any>(1);

    const [smm, setSmm] = useState<any>(null);
    const [smmBracket, setSmmBracket] = useState<any>(1);

    const [ffmi, setFfmi] = useState<any>(null);
    const [ffmiBracket, setFfmiBracket] = useState<any>(1);

    const [BMI, setBMI] = useState<any>(null);
    const [BMIBracket, setBMIBracket] = useState<any>(1);

    const [age, setAge] = useState<any>(null);
    const [difficulty, setDifficulty] = useState<any>(null);

    const predictData = () => {
        const result = multiOutputFunc(
            weight, 
            weightBracket, 
            fat, 
            fatBracket, 
            mineral, 
            mineralBracket, 
            protein,
            proteinBracket,
            tbw,
            tbwBracket,
            slm,
            slmBracket,
            pbf,
            pbfBracket,
            vfi,
            vfiBracket,
            whr,
            whrBracket,
            smm,
            smmBracket,
            ffmi,
            ffmiBracket,
            BMI,
            BMIBracket,
            age, 
            difficulty ,
        );
        setOutput(result);
    }

    const inputHandler = (e:any) => {
        const {value, name} = e.target;

        switch(name){
            case 'weight':
                setWeight(value);
                break;
            case 'weightBracket':
                setWeightBracket(value);
                break;
            case 'fat':
                setFat(value);
                break;
            case 'fatBracket':
                setFatBracket(value);
                break;
            case 'mineral':
                setMineral(value);
                break;
            case 'mineralBracket':
                setMineralBracket(value);
                break;
            case 'protein':
                setProtein(value);
                break;
            case 'proteinBracket':
                setProteinBracket(value);
                break;
            case 'tbw':
                setTbw(value);
                break;
            case 'tbwBracket':
                setTbwBracket(value);
                break;
            case 'slm':
                setSlm(value);
                break;
            case 'slmBracket':
                setSlmBracket(value);
                break;
            case 'pbf':
                setPbf(value);
                break;
            case 'pbfBracket':
                setPbfBracket(value);
                break;
            case 'vfi':
                setVfi(value);
                break;
            case 'vfiBracket':
                setVfiBracket(value);
                break;
            case 'whr':
                setWhr(value);
                break;
            case 'whrBracket':
                setWhrBracket(value);
                break;
            case 'smm':
                setSmm(value);
                break;
            case 'smmBracket':
                setSmmBracket(value);
                break;
            case 'ffmi':
                setFfmi(value);
                break;
            case 'ffmiBracket':
                setFfmiBracket(value);
                break;
            case 'BMI':
                setBMI(value);
                break;
            case 'BMIBracket':
                setBMIBracket(value);
                break;
            case 'age':
                setAge(value);
                break;
            case 'difficulty':
                setDifficulty(value);
                break;
        }
    }
  return (
    <>
        <div className='w-full'>
            <Link className='w-full border border-gray-900 rounded-md py-2 px-1 mt-2' to={'/'}>Back</Link>
        </div>
        <h1 className='text-3xl p-2'>Model Prediction Sample</h1>
        <div>
            {output && (
                <>
                    <div>
                        <h1 className='w-full border-t-[2px] border-black pb-2 text-3xl'>Weight: </h1>
                        <h1>Goal Value: {output.weightPrediction.goalValue}</h1>
                        <h1>Exercise: {output.weightPrediction.targetExerValue}</h1>
                        <h1>Bracket: {output.weightPrediction.bracket}</h1>
                    </div>
                    <div>
                        <h1 className='w-full border-t-[2px] border-black pb-2 text-3xl'>Fat: </h1>
                        <h1>Goal Value: {output.fatPrediction.goalValue}</h1>
                        <h1>Exercise: {output.fatPrediction.targetExerValue}</h1>
                        <h1>Bracket: {output.fatPrediction.bracket}</h1>
                    </div>
                    <div>
                        <h1 className='w-full border-t-[2px] border-black pb-2 text-3xl'>Mineral: </h1>
                        <h1>Goal Value: {output.mineralPrediction.goalValue}</h1>
                        <h1>Exercise: {output.mineralPrediction.targetExerValue}</h1>
                        <h1>Bracket: {output.mineralPrediction.bracket}</h1>
                    </div>
                    <div>
                        <h1 className='w-full border-t-[2px] border-black pb-2 text-3xl'>Protein: </h1>
                        <h1>Goal Value: {output.proteinPrediction.goalValue}</h1>
                        <h1>Exercise: {output.proteinPrediction.targetExerValue}</h1>
                        <h1>Bracket: {output.proteinPrediction.bracket}</h1>
                    </div>
                    <div>
                        <h1 className='w-full border-t-[2px] border-black pb-2 text-3xl'>Total Body Water: </h1>
                        <h1>Goal Value: {output.tbwPrediction.goalValue}</h1>
                        <h1>Exercise: {output.tbwPrediction.targetExerValue}</h1>
                        <h1>Bracket: {output.tbwPrediction.bracket}</h1>
                    </div>
                    <div>
                        <h1 className='w-full border-t-[2px] border-black pb-2 text-3xl'>Soft Lean Mass: </h1>
                        <h1>Goal Value: {output.slmPrediction.goalValue}</h1>
                        <h1>Exercise: {output.slmPrediction.targetExerValue}</h1>
                        <h1>Bracket: {output.slmPrediction.bracket}</h1>
                    </div>
                    <div>
                        <h1 className='w-full border-t-[2px] border-black pb-2 text-3xl'>Percent Body Fat: </h1>
                        <h1>Goal Value: {output.pbfPrediction.goalValue}</h1>
                        <h1>Exercise: {output.pbfPrediction.targetExerValue}</h1>
                        <h1>Bracket: {output.pbfPrediction.bracket}</h1>
                    </div>
                    <div>
                        <h1 className='w-full border-t-[2px] border-black pb-2 text-3xl'>Visceral Fat Index: </h1>
                        <h1>Goal Value: {output.vfiPrediction.goalValue}</h1>
                        <h1>Exercise: {output.vfiPrediction.targetExerValue}</h1>
                        <h1>Bracket: {output.vfiPrediction.bracket}</h1>
                    </div>
                    <div>
                        <h1 className='w-full border-t-[2px] border-black pb-2 text-3xl'>Waist Hip Ratio: </h1>
                        <h1>Goal Value: {output.whrPrediction.goalValue}</h1>
                        <h1>Exercise: {output.whrPrediction.targetExerValue}</h1>
                        <h1>Bracket: {output.whrPrediction.bracket}</h1>
                    </div>
                    <div>
                        <h1 className='w-full border-t-[2px] border-black pb-2 text-3xl'>Skeleton Muscle Mass: </h1>
                        <h1>Goal Value: {output.smmPrediction.goalValue}</h1>
                        <h1>Exercise: {output.smmPrediction.targetExerValue}</h1>
                        <h1>Bracket: {output.smmPrediction.bracket}</h1>
                    </div>
                    <div>
                        <h1 className='w-full border-t-[2px] border-black pb-2 text-3xl'>Fat Free Mass Index: </h1>
                        <h1>Goal Value: {output.ffmiPrediction.goalValue}</h1>
                        <h1>Exercise: {output.ffmiPrediction.targetExerValue}</h1>
                        <h1>Bracket: {output.ffmiPrediction.bracket}</h1>
                    </div>
                    <div>
                        <h1 className='w-full border-t-[2px] border-black pb-2 text-3xl'>Body Mass Index: </h1>
                        <h1>Goal Value: {output.BMIPrediction.goalValue}</h1>
                        <h1>Exercise: {output.BMIPrediction.targetExerValue}</h1>
                        <h1>Bracket: {output.BMIPrediction.bracket}</h1>
                    </div>
                </>
            )}
        </div>
        <div className='w-full border-t-[2px] border-gray-900 mt-3 flex flex-col gap-2 p-2'>
            <div className='w-full grid grid-cols-2'>
                <label htmlFor="">Weight: </label>
                <input onChange={inputHandler} className='w-full border border-gray-900 rounded-md' type="text" name='weight'/>
                <select onChange={inputHandler} name="weightBracket" id="" defaultValue={1}>
                    <option value={0}>Low Bracket</option>
                    <option value={1}>Normal Bracket</option>
                    <option value={2}>High Bracket</option>
                </select>
            </div>
            <div className='w-full grid grid-cols-2'>
                <label htmlFor="">Fat: </label>
                <input onChange={inputHandler} className='w-full border border-gray-900 rounded-md' type="text" name='fat'/>
                <select onChange={inputHandler} name="fatBracket" id="" defaultValue={1}>
                    <option value={0}>Low Bracket</option>
                    <option value={1}>Normal Bracket</option>
                    <option value={2}>High Bracket</option>
                </select>
            </div>
            <div className='w-full grid grid-cols-2'>
                <label htmlFor="">Mineral: </label>
                <input onChange={inputHandler} className='w-full border border-gray-900 rounded-md' type="text" name='mineral'/>
                <select onChange={inputHandler} name="mineralBracket" id="" defaultValue={1}>
                    <option value={0}>Low Bracket</option>
                    <option value={1}>Normal Bracket</option>
                    <option value={2}>High Bracket</option>
                </select>
            </div>
            <div className='w-full grid grid-cols-2'>
                <label htmlFor="">Protein: </label>
                <input onChange={inputHandler} className='w-full border border-gray-900 rounded-md' type="text" name='protein'/>
                <select onChange={inputHandler} name="proteinBracket" id="" defaultValue={1}>
                    <option value={0}>Low Bracket</option>
                    <option value={1}>Normal Bracket</option>
                    <option value={2}>High Bracket</option>
                </select>
            </div>
            <div className='w-full grid grid-cols-2'>
                <label htmlFor="">Total Body Water: </label>
                <input onChange={inputHandler} className='w-full border border-gray-900 rounded-md' type="text" name='tbw'/>
                <select onChange={inputHandler} name="tbwBracket" id="" defaultValue={1}>
                    <option value={0}>Low Bracket</option>
                    <option value={1}>Normal Bracket</option>
                    <option value={2}>High Bracket</option>
                </select>
            </div>
            <div className='w-full grid grid-cols-2'>
                <label htmlFor="">Soft Lean Mass: </label>
                <input onChange={inputHandler} className='w-full border border-gray-900 rounded-md' type="text" name='slm'/>
                <select onChange={inputHandler} name="slmBracket" id="" defaultValue={1}>
                    <option value={0}>Low Bracket</option>
                    <option value={1}>Normal Bracket</option>
                    <option value={2}>High Bracket</option>
                </select>
            </div>
            <div className='w-full grid grid-cols-2'>
                <label htmlFor="">Percent Body Fat: </label>
                <input onChange={inputHandler} className='w-full border border-gray-900 rounded-md' type="text" name='pbf'/>
                <select onChange={inputHandler} name="pbfBracket" id="" defaultValue={1}>
                    <option value={0}>Low Bracket</option>
                    <option value={1}>Normal Bracket</option>
                    <option value={2}>High Bracket</option>
                </select>
            </div>
            <div className='w-full grid grid-cols-2'>
                <label htmlFor="">Visceral Fat Index: </label>
                <input onChange={inputHandler} className='w-full border border-gray-900 rounded-md' type="text" name='vfi'/>
                <select onChange={inputHandler} name="vfiBracket" id="" defaultValue={1}>
                    <option value={0}>Low Bracket</option>
                    <option value={1}>Normal Bracket</option>
                    <option value={2}>High Bracket</option>
                </select>
            </div>
            <div className='w-full grid grid-cols-2'>
                <label htmlFor="">Waist Hip Ratio: </label>
                <input onChange={inputHandler} className='w-full border border-gray-900 rounded-md' type="text" name='whr'/>
                <select onChange={inputHandler} name="whrBracket" id="" defaultValue={1}>
                    <option value={0}>Low Bracket</option>
                    <option value={1}>Normal Bracket</option>
                    <option value={2}>High Bracket</option>
                </select>
            </div>
            <div className='w-full grid grid-cols-2'>
                <label htmlFor="">Skeleton Muscle Mass: </label>
                <input onChange={inputHandler} className='w-full border border-gray-900 rounded-md' type="text" name='smm'/>
                <select onChange={inputHandler} name="smmBracket" id="" defaultValue={1}>
                    <option value={0}>Low Bracket</option>
                    <option value={1}>Normal Bracket</option>
                    <option value={2}>High Bracket</option>
                </select>
            </div>
            <div className='w-full grid grid-cols-2'>
                <label htmlFor="">Fat Free Mass Index: </label>
                <input onChange={inputHandler} className='w-full border border-gray-900 rounded-md' type="text" name='ffmi'/>
                <select onChange={inputHandler} name="ffmiBracket" id="" defaultValue={1}>
                    <option value={0}>Low Bracket</option>
                    <option value={1}>Normal Bracket</option>
                    <option value={2}>High Bracket</option>
                </select>
            </div>
            <div className='w-full grid grid-cols-2'>
                <label htmlFor="">Body Mass Index: </label>
                <input onChange={inputHandler} className='w-full border border-gray-900 rounded-md' type="text" name='BMI'/>
                <select onChange={inputHandler} name="BMIBracket" id="" defaultValue={1}>
                    <option value={0}>Low Bracket</option>
                    <option value={1}>Normal Bracket</option>
                    <option value={2}>High Bracket</option>
                </select>
            </div>
            <div className='w-full grid grid-cols-2'>
                <label htmlFor="">Age: </label>
                <input onChange={inputHandler} className='w-full border border-gray-900 rounded-md' type="text" name='age'/>
            </div>
            <div className='w-full grid grid-cols-2'>
                <select onChange={inputHandler} name="difficulty" id="">
                    <option value={1}>Low Difficulty</option>
                    <option value={2}>Medium Difficulty</option>
                    <option value={0}>High Difficulty</option>
                </select>
            </div>
            <button className='w-full border border-gray-900 p-2 rounded-md' onClick={predictData}>Predict</button>
        </div>
    </>
  )
}
