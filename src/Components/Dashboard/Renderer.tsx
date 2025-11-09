import { Circle } from "rc-progress"
import { bmiVerifier, fatVerifier, ffmiVerifier, mineralVerifier, pbfVerifier, proteinVerifier, slmVerifier, smmVerifier, tbwVerifier, vfiVerifier, weightVerifier, whrVerifier } from '../../Functions/ParameterCalculator/ParameterCalculator'

// Calculate percentage difference for progress checking
export const getPercent = (latestData:any, oldData:any) => {
    const difference = oldData - latestData;
    const average = (oldData + latestData) / 2;
    const percentage = (difference/average) * 100; 
    const value:any = parseFloat(percentage.toString()).toFixed(2);
    if(value >= 0){
        return value;  
    }
    else if(value < 0){
        return -value;
    };
};

// Change color || If new data is less than old data, blue percentage
export const getPercentColorLess = (latestData:any, oldData:any) => {
    const difference = latestData - oldData;
    const average = (latestData + oldData) / 2;
    const percentage = (difference/average) * 100;
    const value:any = parseFloat(percentage.toString()).toFixed(2);
    if(value > 0){
        return '#1D9300';
    }
    else if(value < 0){
        return '#008A23';
    };
};

// Change color || If new data is greater than old data, blue percentage
export const getPercentColorMore = (latestData:any, oldData:any) => {
    const difference = oldData - latestData;
    const average = (oldData + latestData) / 2;
    const percentage = (difference/average) * 100;
    const value:any = parseFloat(percentage.toString()).toFixed(2);
    if(value > 0){
        return '#1D9300';
    }
    else if(value < 0){
        return '#FF0000';
    };
};

// Render into client if the data needs to be lower to achieve blue percentage
export const rendererOne = (userData:any, oldUserData:any, title:any, unit:any, impDataParam:any) => (
    <>
        <div className='flex flex-col w-full h-full bg-gray-900 mb-2 p-2 rounded-xl'>
            <h1 className='font-bold text-2xl px-2'>{title}</h1>
            <h1 className='text-sm font-sans px-2 mb-2 py-1 border-b-[2px] border-black'>{oldUserData}{unit} {'>>'} {userData}{unit} || {getPercent(userData, oldUserData)}% difference</h1>
            <div className='flex justify-center sm:h-full mt-2'>
                <div className='flex items-center sm:h-[75%] w-1/2 sm:w-[75%]'>
                    <div className='flex flex-col items-center sm:h-full w-full sm:items-start'>
                        <Circle className='w-[75%] h-[75%] sm:h-full' trailColor='#AAAAAA' percent={getPercent(userData, oldUserData)} strokeWidth={5} trailWidth={3} strokeColor={getPercentColorLess(userData, oldUserData)}></Circle>
                    </div>
                </div>
                <div className='flex flex-col items-center justify-center w-[50%] sm:w-[25%] sm:h-[75%]'>
                    <h1 className='text-2xl'>{userData}{unit}</h1>
                    {(title == 'Weight') && (
                        <>
                            {weightVerifier(userData, impDataParam)}
                        </>
                    ) || (title == 'Fat') && (
                        <>
                            {fatVerifier(userData, impDataParam)}
                        </>
                    ) || (title == 'Mineral') && (
                        <>
                            {mineralVerifier(userData, impDataParam)}
                        </>
                    ) || (title == 'Protein') && (
                        <>
                            {proteinVerifier(userData, impDataParam)}
                        </>
                    ) || (title == 'Total Body Water') && (
                        <>
                            {tbwVerifier(userData, impDataParam)}
                        </>
                    ) || (title == 'Soft Lean Mass') && (
                        <>
                            {slmVerifier(userData, impDataParam)}
                        </>
                    ) || (title == 'Percent Body Fat') && (
                        <>
                            {pbfVerifier(userData, impDataParam)}
                        </>
                    ) || (title == 'Visceral Fat Index') && (
                        <>
                            {vfiVerifier(userData,)}
                        </>
                    ) || (title == 'Waist Hip Ratio') && (
                        <>
                            {whrVerifier(userData, impDataParam)}
                        </>
                    ) || (title == 'Skeleton Muscle Mass') && (
                        <>
                            {smmVerifier(userData, impDataParam)}
                        </>
                    ) || (title == 'Fat Free Mass Index') && (
                        <>
                            {ffmiVerifier(userData, impDataParam)}
                        </>
                    ) || (title == 'Calcium') && (
                        <>
                            {/* {calciumVerifier(userData,)} */}
                        </>
                    ) || (title == 'BMI') && (
                        <>
                            {bmiVerifier(userData, impDataParam)}
                        </>
                    ) || (title == 'Basal Metabolic Rate') && (
                        <>
                            {/* {bmrVerifier(userData,)} */}
                        </>
                    ) || (title == 'Total Energy Expenditure') && (
                        <>
                            
                        </>
                    ) || (title == 'Physical Age') && (
                        <>
                            
                        </>
                    )}
                </div>
            </div>
        </div>
    </>
)
export const rendererTwo = (userData:any, oldUserData:any, title:any, unit:any, impDataParam:any) => (
    <>
        <div className='flex flex-col w-full h-full bg-gray-900 mb-2 p-2'>
            <h1 className='font-bold text-2xl px-2'>{title}</h1>
            <h1 className='text-sm font-sans px-2 mb-2 py-1 border-b-[2px] border-black'>{oldUserData}{unit} {'>>'} {userData}{unit} || {getPercent(userData, oldUserData)}% difference</h1>
            <div className='flex justify-center sm:h-full mt-2'>
                <div className='flex items-center sm:h-[75%] w-1/2 sm:w-[75%]'>
                    <div className='flex flex-col items-center sm:h-full w-full sm:items-start'>
                        <Circle className='w-[75%] h-[75%] sm:h-full' trailColor='#AAAAAA' percent={getPercent(userData, oldUserData)} strokeWidth={5} trailWidth={3} strokeColor={getPercentColorLess(userData, oldUserData)}></Circle>
                    </div>
                </div>
                <div className='flex flex-col items-center justify-center w-[50%] sm:w-[25%] sm:h-[75%]'>
                    <h1 className='text-2xl'>{userData}{unit}</h1>
                {(title == 'Weight') && (
                        <>
                            {weightVerifier(userData, impDataParam)}
                        </>
                    ) || (title == 'Fat') && (
                        <>
                            {fatVerifier(userData, impDataParam)}
                        </>
                    ) || (title == 'Mineral') && (
                        <>
                            {mineralVerifier(userData, impDataParam)}
                        </>
                    ) || (title == 'Protein') && (
                        <>
                            {proteinVerifier(userData, impDataParam)}
                        </>
                    ) || (title == 'Total Body Water') && (
                        <>
                            {tbwVerifier(userData, impDataParam)}
                        </>
                    ) || (title == 'Soft Lean Mass') && (
                        <>
                            {slmVerifier(userData, impDataParam)}
                        </>
                    ) || (title == 'Percent Body Fat') && (
                        <>
                            {pbfVerifier(userData, impDataParam)}
                        </>
                    ) || (title == 'Visceral Fat Index') && (
                        <>
                            {vfiVerifier(userData,)}
                        </>
                    ) || (title == 'Waist Hip Ratio') && (
                        <>
                            {whrVerifier(userData, impDataParam)}
                        </>
                    ) || (title == 'Skeleton Muscle Mass') && (
                        <>
                            {smmVerifier(userData, impDataParam)}
                        </>
                    ) || (title == 'Fat Free Mass Index') && (
                        <>
                            {ffmiVerifier(userData, impDataParam)}
                        </>
                    ) || (title == 'Calcium') && (
                        <>
                            {/* {calciumVerifier(userData,)} */}
                        </>
                    ) || (title == 'BMI') && (
                        <>
                            {bmiVerifier(userData, impDataParam)}
                        </>
                    ) || (title == 'Basal Metabolic Rate') && (
                        <>
                            {/* {bmrVerifier(userData,)} */}
                        </>
                    ) || (title == 'Total Energy Expenditure') && (
                        <>
                            
                        </>
                    ) || (title == 'Physical Age') && (
                        <>
                            
                        </>
                    )}
                </div>
            </div>
        </div>
    </>
)
// // Render into client if data needs to be higher to achieve blue percentage
// export const rendererThree = (userData:any, oldUserData:any, title:any, unit:any) => (
//     <>
//         <div className='flex flex-col w-full h-[35vh] bg-green-300 mb-2 rounded-lg p-2'>
//             <h1 className='font-bold text-2xl px-2'>{title}</h1>
//             <h1 className='text-sm font-thin px-2'>{oldUserData}{unit} {'>>'} {userData}{unit} || {getPercent(userData, oldUserData)}% difference</h1>
//             <div className='flex justify-center mt-2'>
//                 <div className='flex items-center w-1/2'>
//                     <div className='flex flex-col items-center w-full'>
//                         <Circle className='w-[75%] h-[75%]' trailColor='#FFFFFF' percent={getPercent(userData, oldUserData)} strokeWidth={5} trailWidth={3} strokeColor={getPercentColorLess(userData, oldUserData)}></Circle>
//                     </div>
//                 </div>
//                 <div className='flex flex-col items-center justify-center w-[50%]'>
//                     <h1 className='text-2xl'>{userData}{unit}</h1>
//                 {(title == 'Weight') && (
//                         <>
//                             {weightVerifier(userData)}
//                         </>
//                     ) || (title == 'Fat') && (
//                         <>
//                             {fatVerifier(userData)}
//                         </>
//                     ) || (title == 'Mineral') && (
//                         <>
//                             {mineralVerifier(userData)}
//                         </>
//                     ) || (title == 'Protein') && (
//                         <>
//                             {proteinVerifier(userData)}
//                         </>
//                     ) || (title == 'Total Body Water') && (
//                         <>
//                             {tbwVerifier(userData)}
//                         </>
//                     ) || (title == 'Soft Lean Mass') && (
//                         <>
//                             {slmVerifier(userData)}
//                         </>
//                     ) || (title == 'Percent Body Fat') && (
//                         <>
//                             {pbfVerifier(userData)}
//                         </>
//                     ) || (title == 'Visceral Fat Index') && (
//                         <>
//                             {vfiVerifier(userData)}
//                         </>
//                     ) || (title == 'Waist Hip Ratio') && (
//                         <>
//                             {vfiVerifier(userData)}
//                         </>
//                     ) || (title == 'Skeleton Muscle Mass') && (
//                         <>
//                             {smmVerifier(userData)}
//                         </>
//                     ) || (title == 'Fat Free Mass Index') && (
//                         <>
//                             {ffmiVerifier(userData)}
//                         </>
//                     ) || (title == 'Calcium') && (
//                         <>
//                             {calciumVerifier(userData)}
//                         </>
//                     ) || (title == 'BMI') && (
//                         <>
//                             {bmiVerifier(userData)}
//                         </>
//                     ) || (title == 'Basal Metabolic Rate') && (
//                         <>
//                             {bmrVerifier(userData)}
//                         </>
//                     ) || (title == 'Total Energy Expenditure') && (
//                         <>
                            
//                         </>
//                     ) || (title == 'Physical Age') && (
//                         <>
                            
//                         </>
//                     )}
//                 </div>
//             </div>
//         </div>
//     </>
// )
// export const rendererFour = (userData:any, oldUserData:any, title:any, unit:any) => (
//     <>
//         <div className='flex flex-col w-full h-[35vh] bg-green-200 mb-2 rounded-lg p-2'>
//             <h1 className='font-bold text-2xl px-2'>{title}</h1>
//             <h1 className='text-sm font-thin px-2'>{oldUserData}{unit} {'>>'} {userData}{unit} || {getPercent(userData, oldUserData)}% difference</h1>
//             <div className='flex justify-center mt-2'>
//                 <div className='flex items-center w-1/2'>
//                     <div className='flex flex-col items-center w-full'>
//                         <Circle className='w-[75%] h-[75%]' trailColor='#FFFFFF' percent={getPercent(userData, oldUserData)} strokeWidth={5} trailWidth={3} strokeColor={getPercentColorLess(userData, oldUserData)}></Circle>
//                     </div>
//                 </div> 
//                 <div className='flex flex-col items-center justify-center w-[50%]'>
//                     <h1 className='text-2xl'>{userData}{unit}</h1>
//                 {(title == 'Weight') && (
//                         <>
//                             {weightVerifier(userData)}
//                         </>
//                     ) || (title == 'Fat') && (
//                         <>
//                             {fatVerifier(userData)}
//                         </>
//                     ) || (title == 'Mineral') && (
//                         <>
//                             {mineralVerifier(userData)}
//                         </>
//                     ) || (title == 'Protein') && (
//                         <>
//                             {proteinVerifier(userData)}
//                         </>
//                     ) || (title == 'Total Body Water') && (
//                         <>
//                             {tbwVerifier(userData)}
//                         </>
//                     ) || (title == 'Soft Lean Mass') && (
//                         <>
//                             {slmVerifier(userData)}
//                         </>
//                     ) || (title == 'Percent Body Fat') && (
//                         <>
//                             {pbfVerifier(userData)}
//                         </>
//                     ) || (title == 'Visceral Fat Index') && (
//                         <>
//                             {vfiVerifier(userData)}
//                         </>
//                     ) || (title == 'Waist Hip Ratio') && (
//                         <>
//                             {vfiVerifier(userData)}
//                         </>
//                     ) || (title == 'Skeleton Muscle Mass') && (
//                         <>
//                             {smmVerifier(userData)}
//                         </>
//                     ) || (title == 'Fat Free Mass Index') && (
//                         <>
//                             {ffmiVerifier(userData)}
//                         </>
//                     ) || (title == 'Calcium') && (
//                         <>
//                             {calciumVerifier(userData)}
//                         </>
//                     ) || (title == 'BMI') && (
//                         <>
//                             {bmiVerifier(userData)}
//                         </>
//                     ) || (title == 'Basal Metabolic Rate') && (
//                         <>
//                             {bmrVerifier(userData)}
//                         </>
//                     ) || (title == 'Total Energy Expenditure') && (
//                         <>
                            
//                         </>
//                     ) || (title == 'Physical Age') && (
//                         <>
                            
//                         </>
//                     )}
//                 </div>
//             </div>
//         </div>
//     </>
// )

// // Render into client neutrally
// export const rendererFive = (userData:any, oldUserData:any, title:any, unit:any) => (
//     <>
//         <div className='flex flex-col w-full h-[35vh] bg-green-300 mb-2 rounded-lg p-2'>
//             <h1 className='font-bold text-2xl px-2'>{title}</h1>
//             <h1 className='text-sm font-thin px-2'>{oldUserData}{unit} {'>>'} {userData}{unit} || {getPercent(userData, oldUserData)}% difference</h1>
//             <div className='flex justify-center mt-2'>
//                 <div className='flex items-center w-1/2'>
//                     <div className='flex flex-col items-center w-full'>
//                         <Circle className='w-[75%] h-[75%]' trailColor='#FFFFFF' percent={getPercent(userData, oldUserData)} strokeWidth={5} trailWidth={3} strokeColor={getPercentColorLess(userData, oldUserData)}></Circle>
//                     </div>
//                 </div>
//                 <div className='flex flex-col items-center justify-center w-[50%]'>
//                     <h1 className='text-2xl'>{userData}{unit}</h1>
//                 {(title == 'Weight') && (
//                         <>
//                             {weightVerifier(userData)}
//                         </>
//                     ) || (title == 'Fat') && (
//                         <>
//                             {fatVerifier(userData)}
//                         </>
//                     ) || (title == 'Mineral') && (
//                         <>
//                             {mineralVerifier(userData)}
//                         </>
//                     ) || (title == 'Protein') && (
//                         <>
//                             {proteinVerifier(userData)}
//                         </>
//                     ) || (title == 'Total Body Water') && (
//                         <>
//                             {tbwVerifier(userData)}
//                         </>
//                     ) || (title == 'Soft Lean Mass') && (
//                         <>
//                             {slmVerifier(userData)}
//                         </>
//                     ) || (title == 'Percent Body Fat') && (
//                         <>
//                             {pbfVerifier(userData)}
//                         </>
//                     ) || (title == 'Visceral Fat Index') && (
//                         <>
//                             {vfiVerifier(userData)}
//                         </>
//                     ) || (title == 'Waist Hip Ratio') && (
//                         <>
//                             {vfiVerifier(userData)}
//                         </>
//                     ) || (title == 'Skeleton Muscle Mass') && (
//                         <>
//                             {smmVerifier(userData)}
//                         </>
//                     ) || (title == 'Fat Free Mass Index') && (
//                         <>
//                             {ffmiVerifier(userData)}
//                         </>
//                     ) || (title == 'Calcium') && (
//                         <>
//                             {calciumVerifier(userData)}
//                         </>
//                     ) || (title == 'BMI') && (
//                         <>
//                             {bmiVerifier(userData)}
//                         </>
//                     ) || (title == 'Basal Metabolic Rate') && (
//                         <>
//                             {bmrVerifier(userData)}
//                         </>
//                     ) || (title == 'Total Energy Expenditure') && (
//                         <>
                            
//                         </>
//                     ) || (title == 'Physical Age') && (
//                         <>
                            
//                         </>
//                     )}
//                 </div>
//             </div>
//         </div>
//     </>
// )
// export const rendererSix = (userData:any, oldUserData:any, title:any, unit:any) => (
//     <>
//         <div className='flex flex-col w-full h-[35vh] bg-green-200 mb-2 rounded-lg p-2'>
//             <h1 className='font-bold text-2xl px-2'>{title}</h1>
//             <h1 className='text-sm font-thin px-2'>{oldUserData}{unit} {'>>'} {userData}{unit} || {getPercent(userData, oldUserData)}% difference</h1>
//             <div className='flex justify-center mt-2'>
//                 <div className='flex items-center w-1/2'>
//                     <div className='flex flex-col items-center w-full'>
//                         <Circle className='w-[75%] h-[75%]' trailColor='#FFFFFF' percent={getPercent(userData, oldUserData)} strokeWidth={5} trailWidth={3} strokeColor={getPercentColorLess(userData, oldUserData)}></Circle>
//                     </div>
//                 </div>  
//                 <div className='flex flex-col items-center justify-center w-[50%]'>
//                 <h1 className='text-2xl'>{userData}{unit}</h1>
//                 {(title == 'Weight') && (
//                         <>
//                             {weightVerifier(userData)}
//                         </>
//                     ) || (title == 'Fat') && (
//                         <>
//                             {fatVerifier(userData)}
//                         </>
//                     ) || (title == 'Mineral') && (
//                         <>
//                             {mineralVerifier(userData)}
//                         </>
//                     ) || (title == 'Protein') && (
//                         <>
//                             {proteinVerifier(userData)}
//                         </>
//                     ) || (title == 'Total Body Water') && (
//                         <>
//                             {tbwVerifier(userData)}
//                         </>
//                     ) || (title == 'Soft Lean Mass') && (
//                         <>
//                             {slmVerifier(userData)}
//                         </>
//                     ) || (title == 'Percent Body Fat') && (
//                         <>
//                             {pbfVerifier(userData)}
//                         </>
//                     ) || (title == 'Visceral Fat Index') && (
//                         <>
//                             {vfiVerifier(userData)}
//                         </>
//                     ) || (title == 'Waist Hip Ratio') && (
//                         <>
//                             {vfiVerifier(userData)}
//                         </>
//                     ) || (title == 'Skeleton Muscle Mass') && (
//                         <>
//                             {smmVerifier(userData)}
//                         </>
//                     ) || (title == 'Fat Free Mass Index') && (
//                         <>
//                             {ffmiVerifier(userData)}
//                         </>
//                     ) || (title == 'Calcium') && (
//                         <>
//                             {calciumVerifier(userData)}
//                         </>
//                     ) || (title == 'BMI') && (
//                         <>
//                             {bmiVerifier(userData)}
//                         </>
//                     ) || (title == 'Basal Metabolic Rate') && (
//                         <>
//                             {bmrVerifier(userData)}
//                         </>
//                     ) || (title == 'Total Energy Expenditure') && (
//                         <>
                            
//                         </>
//                     ) || (title == 'Physical Age') && (
//                         <>
                            
//                         </>
//                     )}
//                 </div>
//             </div>
//         </div>
//     </>
// )