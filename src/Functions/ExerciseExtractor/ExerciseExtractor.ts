export const exerciseExtractor:any = (goalPredictionArray:any, targetExerPredictionArray:any, dataEncoder:any, bracket:any = null) => {
    // Find the index of the highest probability
    const goalMaxIndex = goalPredictionArray
    .map((value:any, index:any) => ({ value, index }))  // Create an array of objects with value and index
    .reduce((max:any, current:any) => (current.value > max.value ? current : max));  // Find the max value

    // Find the index of the highest probability for target exercise
    const targetExerMaxIndex = targetExerPredictionArray
    .map((value:any, index:any) => ({ value, index }))  // Create an array of objects with value and index
    .reduce((max:any, current:any) => (current.value > max.value ? current : max));  // Find the max value

    const goalValue = dataEncoder.goal[goalMaxIndex.index]
    const targetExerValue = dataEncoder.target_exercise[targetExerMaxIndex.index]

    console.log(`Goal Value: ${goalValue}`);
    console.log(`Target Exercise: ${targetExerValue}`);

    return {
        goalValue,
        targetExerValue,
        bracket,
    }
}