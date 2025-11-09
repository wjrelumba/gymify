import { weightExerciseEncode, fatExerciseEncode, mineralExerciseEncode, proteinExerciseEncode, tbwExerciseEncode, slmExerciseEncode, pbfExerciseEncode, vfiExerciseEncode, whrExerciseEncode, smmExerciseEncode, ffmiExerciseEncode, BMIExerciseEncode, extraExerciseEncode } from "../../../DataEncoder/DataEncoder";
import { exerciseExtractor } from "../../ExerciseExtractor/ExerciseExtractor";
import BMI_goal_model from "../BMIModel/BMI_goal_model";
import BMI_target_exercise_model from "../BMIModel/BMI_target_exercise_model";
import fat_goal_model from "../FatModel/fat_goal_model";
import fat_target_exercise_model from "../FatModel/fat_target_exercise_model";
import ffmi_goal_model from "../ffmiModel/ffmi_goal_model";
import ffmi_target_exercise_model from "../ffmiModel/ffmi_target_exercise_model";
import mineral_goal_model from "../MineralModel/mineral_goal_model";
import mineral_target_exercise_model from "../MineralModel/mineral_target_exercise_model";
import pbf_goal_model from "../pbfModel/pbf_goal_model";
import pbf_target_exercise_model from "../pbfModel/pbf_target_exercise_model";
import protein_goal_model from "../ProteinModel/protein_goal_model";
import protein_target_exercise_model from "../ProteinModel/protein_target_exercise_model";
import slm_goal_model from "../slmModel/slm_goal_model";
import slm_target_exercise_model from "../slmModel/slm_target_exercise_model";
import smm_goal_model from "../smmModel/smm_goal_model";
import smm_target_exercise_model from "../smmModel/smm_target_exercise_model";
import tbw_goal_model from "../tbwModel/tbw_goal_model";
import vfi_goal_model from "../vfiModel/vfi_goal_model";
import vfi_target_exercise_model from "../vfiModel/vfi_target_exercise_model";
import weight_goal_model from "../WeightModel/weight_goal_model";
import weight_target_exercise_model from "../WeightModel/weight_target_exercise_model";
import whr_goal_model from "../whrModel/whr_goal_model";
import whr_target_exercise_model from "../whrModel/whr_target_exercise_model";

import extraExercise_goal_model from "../extraExerModel/extraExercises_goal_model"
import extraExercise_target_exercise_model from "../extraExerModel/extraExercises_target_exercise_model"

const multiOutputFunc = ( 
    weight:any, // User weight value
    weightBracket:any,

    fat:any, // User fat value
    fatBracket:any,

    mineral:any, // User mineral value
    mineralBracket:any,

    protein:any, // User protein value
    proteinBracket:any,

    tbw:any, // User total body water value
    tbwBracket:any,

    slm:any, // User soft lean mass value
    slmBracket:any,

    pbf:any, // User percent body fat value
    pbfBracket:any,

    vfi:any, // User visceral fat index value
    vfiBracket:any,

    whr:any, // User waist hip ratio value
    whrBracket:any,

    smm:any, // User skeleton muscle mass value
    smmBracket:any,

    ffmi:any, // User fat free mass index value
    ffmiBracket:any,

    BMI:any, // User Body Mass Index value
    BMIBracket:any,

    age:any, // User physical age
    difficulty:any, // Chosen difficulty 0: high, 1: low, 2: medium to check difficulty, see DataEncoder.ts
) => {

    // Get the weight predictions
    const weightGoalPredict = weight_goal_model([weight, age, difficulty, weightBracket]);
    const weightTargetExerPredict = weight_target_exercise_model([weight, age, difficulty, weightBracket]);

    // Get the fat predictions
    const fatGoalPredict = fat_goal_model([fat, age, difficulty, fatBracket]);
    const fatTargetExerPredict = fat_target_exercise_model([fat, age,difficulty, fatBracket]);

    // Get the mineral predictions
    const mineralGoalPredict = mineral_goal_model([mineral, age, difficulty, mineralBracket]);
    const mineralTargetExerPredict = mineral_target_exercise_model([mineral, age, difficulty, mineralBracket]);

    // Get the protein predictions
    const proteinGoalPredict = protein_goal_model([protein, age, difficulty, proteinBracket]);
    const proteinTargetExerPredict = protein_target_exercise_model([protein, age, difficulty, proteinBracket]);

    // Get the total body water predictions
    const tbwGoalPredict = tbw_goal_model([tbw, age, difficulty, tbwBracket]);
    const tbwTargetExerPredict = tbw_goal_model([tbw, age, difficulty, tbwBracket]);

    // Get the soft lean mass predictions
    const slmGoalPredict = slm_goal_model([slm, age, difficulty, slmBracket]);
    const slmTargetExerPredict = slm_target_exercise_model([slm, age, difficulty, slmBracket])

    // Get the percent body fat predictions
    const pbfGoalPredict = pbf_goal_model([pbf, age, difficulty, pbfBracket]);
    const pbfTargetExerPredict = pbf_target_exercise_model([pbf, age, difficulty, pbfBracket]);

    // Get the visceral fat index predictions
    const vfiGoalPredict = vfi_goal_model([vfi, age, difficulty, vfiBracket]);
    const vfiTargetExerPredict = vfi_target_exercise_model([vfi, age, difficulty, vfiBracket]);

    // Get the waist hip ratio predictions
    const whrGoalPredict = whr_goal_model([whr, age, difficulty, whrBracket]);
    const whrTargetExerPredict = whr_target_exercise_model([whr, age, difficulty, whrBracket]);

    // Get the skeleton muscle mass predictions
    const smmGoalPredict = smm_goal_model([smm, age, difficulty, smmBracket]);
    const smmTargetExerPredict = smm_target_exercise_model([smm, age, difficulty, smmBracket]);

    // Get the fat free mass index predictions
    const ffmiGoalPredict = ffmi_goal_model([ffmi, age, difficulty, ffmiBracket]);
    const ffmiTargetExerPredict = ffmi_target_exercise_model([ffmi, age, difficulty, ffmiBracket]);

    // Get the Body Mass Index predictions
    const BMIGoalPredict = BMI_goal_model([BMI, age, difficulty, BMIBracket]);
    const BMITargetExerPredict = BMI_target_exercise_model([BMI, age, difficulty, BMIBracket]);

    // Get goals and target exercises from given predictions
    const weightPrediction = exerciseExtractor(weightGoalPredict, weightTargetExerPredict, weightExerciseEncode, weightBracket);
    const fatPrediction = exerciseExtractor(fatGoalPredict, fatTargetExerPredict, fatExerciseEncode, fatBracket);
    const mineralPrediction = exerciseExtractor(mineralGoalPredict, mineralTargetExerPredict, mineralExerciseEncode, mineralBracket);
    const proteinPrediction = exerciseExtractor(proteinGoalPredict, proteinTargetExerPredict, proteinExerciseEncode, proteinBracket);
    const tbwPrediction = exerciseExtractor(tbwGoalPredict, tbwTargetExerPredict, tbwExerciseEncode, tbwBracket);
    const slmPrediction = exerciseExtractor(slmGoalPredict, slmTargetExerPredict, slmExerciseEncode, slmBracket);
    const pbfPrediction = exerciseExtractor(pbfGoalPredict, pbfTargetExerPredict, pbfExerciseEncode, pbfBracket);
    const vfiPrediction = exerciseExtractor(vfiGoalPredict, vfiTargetExerPredict, vfiExerciseEncode, vfiBracket);
    const whrPrediction = exerciseExtractor(whrGoalPredict, whrTargetExerPredict, whrExerciseEncode, whrBracket);
    const smmPrediction = exerciseExtractor(smmGoalPredict, smmTargetExerPredict, smmExerciseEncode, smmBracket);
    const ffmiPrediction = exerciseExtractor(ffmiGoalPredict, ffmiTargetExerPredict, ffmiExerciseEncode, ffmiBracket);
    const BMIPrediction = exerciseExtractor(BMIGoalPredict, BMITargetExerPredict, BMIExerciseEncode, BMIBracket);

    return {
        weightPrediction,
        fatPrediction,
        mineralPrediction,
        proteinPrediction,
        tbwPrediction,
        slmPrediction,
        pbfPrediction,
        vfiPrediction,
        whrPrediction,
        smmPrediction,
        ffmiPrediction,
        BMIPrediction,
    }
};

export default multiOutputFunc;

export const multiOutputExtraFunc = (
    age:any,
    difficulty:any,
    targetMuscle:any,
) => {
    const goalPrediction = extraExercise_goal_model([age, difficulty, targetMuscle]);
    const targetExerPrediction = extraExercise_target_exercise_model([age, difficulty, targetMuscle]);

    const extraExerPrediction = exerciseExtractor(goalPrediction, targetExerPrediction, extraExerciseEncode)

    return {
        goalValue: extraExerPrediction.goalValue,
        targetExerValue: extraExerPrediction.targetExerValue,
    }
}