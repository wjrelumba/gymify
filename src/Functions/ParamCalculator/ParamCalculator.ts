import { extraExerciseEncode } from "../../DataEncoder/DataEncoder";
import supabase from "../../Supabase/Supabase";
import multiOutputFunc, { multiOutputExtraFunc } from "../MachineLearningModels/PredictionFunction/PredictionFunction";

// Notes:
// Triceps affect = Skeleton muscle mass and soft lean mass
// 

// Get important data parameters
const getImpData = async (userId: string) => {
    const { data: impData } = await supabase.from('important_data_parameters').select().eq('client_id', userId);
    if (impData) {
        return (impData[0]);
    }
};

// Get user parameters
const getParamData = async (userId: string) => {
    console.log(userId);
    const { data: userParam } = await supabase.from('user_parameters').select().eq('id', userId);
    if (userParam) {
        console.log('User parameters: ', userParam);
        return (userParam[userParam.length - 1]);
    }
};

// Calculate range
const getRange = (impDataObjHigh: number, impDataObjLow: number, paramObj: number) => {
    console.log(`High: ${impDataObjHigh} - Low: ${impDataObjLow} - Parameter: ${paramObj}`);
    if (paramObj > impDataObjHigh) {
        return {
            range: 2,
            parameter: paramObj
        }; // High
    } else if (paramObj <= impDataObjHigh && paramObj >= impDataObjLow) {
        return {
            range: 1,
            parameter: paramObj
        }; // Normal
    } else {
        return {
            range: 0,
            parameter: paramObj
        }; // Low
    }
};

const getExtraExercises = (extraExercisesValue:any) => {
    const valueDictionary:any = {};
    
    for(let key in extraExercisesValue){ // Create a value dictionary to put in the body part name and exercises
        if(!valueDictionary[key]){
            valueDictionary[key] = {};
        };
        
        console.log(key);
        valueDictionary[key].name = key[0].toUpperCase() + key.slice(1);
        valueDictionary[key].exercise = extraExercisesValue[key].targetExerValue
    };

    return valueDictionary;
}

interface ImportantData {
    highRangeWeight: number;
    lowRangeWeight: number;
    highRangeFat: number;
    lowRangeFat: number;
    highRangeSlm: number;
    lowRangeSlm: number;
    highRangeFfmi: number;
    lowRangeFfmi: number;
    highRangeMineral: number;
    lowRangeMineral: number;
    highRangeProtein: number;
    lowRangeProtein: number;
    highRangeTbw: number;
    lowRangeTbw: number;
    highBMI: number;
    lowBMI: number;
    higherRangePbf: number;
    lowerRangePbf: number;
    higherRangeWhr: number;
    lowerRangeWhr: number;
    higherRangeFfmi: number;
    lowerRangeFfmi: number;
    higherRangeSmm: number;
    lowerRangeSmm: number;
    highRangeVfi: number;
    lowRangeVfi: number;
}

interface Parameters {
    weight: number;
    fat: number;
    mineral: number;
    protein: number;
    total_body_water: number;
    soft_lean_mass: number;
    percent_body_fat: number;
    visceral_fat_index: number;
    waist_hip_ratio: number;
    skeleton_muscle_mass: number;
    fat_free_mass_index: number;
    calcium: number;
    BMI: number;
    basal_metabolic_rate: number;
    total_energy_expenditure: number;
    physical_age: number;
}

const getExercise = (resultValue:any, parameterValue:number, paramRange:number, taskName:string, parameterType:string, difficulty:string) => {
    return {
        name: taskName,
        exercise: resultValue[`${parameterType}Prediction`].targetExerValue,
        points: ((difficulty == 'high') ? 30 : (difficulty == 'medium') ? 20 : 10),
        exp: ((difficulty == 'high') ? 50 : (difficulty == 'medium') ? 30 : 20),
        goal: parameterValue + resultValue[`${parameterType}Prediction`].goalValue,
        range: paramRange,
    }
}

export const calcuParam = async (userId: string, difficulty: string, extraExercises: any) => {
    // Create an important data object
    const impDataObj: ImportantData = await getImpData(userId);
    // Create an object for parameters
    const paramObj: Parameters = await getParamData(userId);

    console.log(extraExercises);

    const weightRange = getRange(impDataObj.highRangeWeight, impDataObj.lowRangeWeight, paramObj.weight);
    const fatRange = getRange(impDataObj.highRangeFat, impDataObj.lowRangeFat, paramObj.fat);
    const mineralRange = getRange(impDataObj.highRangeMineral, impDataObj.lowRangeMineral, paramObj.mineral);
    const proteinRange = getRange(impDataObj.highRangeProtein, impDataObj.lowRangeProtein, paramObj.protein);
    const tbwRange = getRange(impDataObj.highRangeTbw, impDataObj.lowRangeTbw, paramObj.total_body_water);
    const slmRange = getRange(impDataObj.highRangeSlm, impDataObj.lowRangeSlm, paramObj.soft_lean_mass);
    const pbfRange = getRange(impDataObj.higherRangePbf, impDataObj.lowerRangePbf, paramObj.percent_body_fat);
    const vfiRange = getRange(impDataObj.highRangeVfi, impDataObj.lowRangeVfi, paramObj.visceral_fat_index);
    const whrRange = getRange(impDataObj.higherRangeWhr, impDataObj.lowerRangeWhr, paramObj.waist_hip_ratio);
    const smmRange = getRange(impDataObj.higherRangeSmm, impDataObj.lowerRangeSmm, paramObj.skeleton_muscle_mass);
    const ffmiRange = getRange(impDataObj.highRangeFfmi, impDataObj.lowRangeFfmi, paramObj.fat_free_mass_index);
    const BMIRange = getRange(impDataObj.highBMI, impDataObj.lowBMI, paramObj.BMI);


    // Function to predict the data
    const predictData = () => {
        const result = multiOutputFunc(
            paramObj.weight, 
            weightRange.range, 
            paramObj.fat, 
            fatRange.range, 
            paramObj.mineral, 
            mineralRange.range, 
            paramObj.protein,
            proteinRange.range,
            paramObj.total_body_water,
            tbwRange.range,
            paramObj.soft_lean_mass,
            slmRange.range,
            paramObj.percent_body_fat,
            pbfRange.range,
            paramObj.visceral_fat_index,
            vfiRange.range,
            paramObj.waist_hip_ratio,
            whrRange.range,
            paramObj.skeleton_muscle_mass,
            smmRange.range,
            paramObj.fat_free_mass_index,
            ffmiRange.range,
            paramObj.BMI,
            BMIRange.range,
            paramObj.physical_age, 
            difficulty,
        );

        return result;
    };

    const predictExtraExercises = (extraExercisesValue:any) => {
        // Delete null exercises
        for(let key in extraExercisesValue){
            if(extraExercisesValue[key] == null){
                delete extraExercisesValue[key]
            }
        }

        const valueDictionary:any = {};

        // Get the encoded value then predict the exercises and goal
        for(let key in extraExercisesValue){
            for(let keyValue in extraExerciseEncode.target_muscle){
                if(extraExerciseEncode.target_muscle[keyValue] == key){
                    valueDictionary[key] = multiOutputExtraFunc(paramObj.physical_age, difficulty, keyValue)
                }
            }
        }

        return valueDictionary;
    }

    const resultValue = predictData();
    const extraExercisesResultValue = predictExtraExercises(extraExercises);

    console.log(extraExercisesResultValue);

    // Generate exercise plans based on the ranges for each parameter
    const exerciseTasks = {
        weightTask: getExercise(resultValue, paramObj.weight, weightRange.range, 'Weight Task', 'weight', difficulty),
        fatTask: getExercise(resultValue, paramObj.fat, fatRange.range, 'Fat Task', 'fat', difficulty),
        mineralTask: getExercise(resultValue, paramObj.mineral, mineralRange.range, 'Mineral Task', 'mineral', difficulty),
        proteinTask: getExercise(resultValue, paramObj.protein, proteinRange.range, 'Protein Task', 'protein', difficulty),
        tbwTask: getExercise(resultValue, paramObj.total_body_water, tbwRange.range, 'Total Body Water Task', 'tbw', difficulty),
        slmTask: getExercise(resultValue, paramObj.soft_lean_mass, slmRange.range, 'Soft Lean Mass Task', 'slm', difficulty),
        pbfTask: getExercise(resultValue, paramObj.percent_body_fat, pbfRange.range, 'Percent Body Fat Task', 'pbf', difficulty),
        vfiTask: getExercise(resultValue, paramObj.visceral_fat_index, vfiRange.range, 'Visceral Fat Index Task', 'vfi', difficulty),
        whrTask: getExercise(resultValue, paramObj.waist_hip_ratio, whrRange.range, 'Waist Hip Ratio Task', 'whr', difficulty),
        smmTask: getExercise(resultValue, paramObj.skeleton_muscle_mass, smmRange.range, 'Skeleton Muscle Mass Task', 'smm', difficulty),
        ffmiTask: getExercise(resultValue, paramObj.fat_free_mass_index, ffmiRange.range, 'Fat Free Mass Index Task', 'ffmi', difficulty),
        BMITask: getExercise(resultValue, paramObj.BMI, BMIRange.range, 'Body Mass Index Task', 'BMI', difficulty),
    };

    const extraExerciseTasks = getExtraExercises(extraExercisesResultValue);

    const dataObj = {
        weightRange: weightRange.range,
        fatRange: fatRange.range,
        mineralRange: mineralRange.range,
        proteinRange: proteinRange.range,
        tbwRange: tbwRange.range,
        slmRange: slmRange.range,
        pbfRange: pbfRange.range,
        vfiRange: vfiRange.range,
        whrRange: whrRange.range,
        smmRange: smmRange.range,
        ffmiRange: ffmiRange.range,
        BMIRange: BMIRange.range,
        exercisePlans: exerciseTasks, // Include the specific exercise plans in the data object
        extraExercisePlans: extraExerciseTasks
    };

    const sendData = async (dataObj: any) => {
        const { data: user_range } = await supabase.from('user_ranges').select().eq('id', userId);
        console.log(user_range);
        if (user_range && (user_range.length > 0)) {
            await supabase.from('user_ranges').delete().eq('id', userId);
            sendData(dataObj);
        } else {
            const { data, error } = await supabase.from('user_ranges').insert(dataObj).eq('id', userId).select();
            console.log(data);
            console.log(error);
        }
    };

    sendData(dataObj);
};
