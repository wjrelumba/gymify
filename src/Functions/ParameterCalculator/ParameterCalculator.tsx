<>
<div className="flex flex-col justify-center items-center">
    <h1 className="text-orange-400 font-bold text-xl text-shadow-outline">Low</h1>
    <h1 className="font-sans text-xs">Normal Range</h1>
    <h1 className="font-sans text-xs">{} - {}</h1>
</div>

<div className="flex flex-col justify-center items-center">
    <h1 className="text-red-600 font-bold text-xl text-shadow-outline">High</h1>
    <h1 className="font-sans text-xs">Normal Range</h1>
    <h1 className="font-sans text-xs">{} - {}</h1>
</div>

<div className="flex flex-col justify-center items-center">
    <h1 className="text-green-700 font-bold text-xl text-shadow-outline">Normal</h1>
    <h1 className="font-sans text-xs">Normal Range</h1>
    <h1 className="font-sans text-xs">{} - {}</h1>
</div>
</>             

// Verify weight of the user
export const weightVerifier = (weight:number, impDataParam:any) => {
if(weight < impDataParam.lowRangeWeight){
return (
<>
<div className="flex flex-col justify-center items-center">
    <h1 className="text-orange-400 font-bold text-xl text-shadow-outline">Low</h1>
    <h1 className="font-sans text-xs">Normal Range</h1>
    <h1 className="font-sans text-xs">{impDataParam.lowRangeWeight} - {impDataParam.highRangeWeight}</h1>
</div>
</>
)
}
else if(weight > impDataParam.highRangeWeight){
return (
<>
<div className="flex flex-col justify-center items-center">
    <h1 className="text-red-600 font-bold text-xl text-shadow-outline">High</h1>
    <h1 className="font-sans text-xs">Normal Range</h1>
    <h1 className="font-sans text-xs">{impDataParam.lowRangeWeight} - {impDataParam.highRangeWeight}</h1>
</div>
</>
)
}
else{
return (
<>
<div className="flex flex-col justify-center items-center">
    <h1 className="text-green-700 font-bold text-xl text-shadow-outline">Normal</h1>
    <h1 className="font-sans text-xs">Normal Range</h1>
    <h1 className="font-sans text-xs">{impDataParam.lowRangeWeight} - {impDataParam.highRangeWeight}</h1>
</div>
</>
)
}
}

// Verify the fat of the user
export const fatVerifier = (fat:number, impDataParam:any) => {
if(fat < impDataParam.halfRangeFat){
return (
<>
<div className="flex flex-col justify-center items-center">
    <h1 className="text-orange-400 font-bold text-xl text-shadow-outline">Low</h1>
    <h1 className="font-sans text-xs">Normal Range</h1>
    <h1 className="font-sans text-xs">{impDataParam.halfRangeFat} - {impDataParam.highRangeFat}</h1>
</div>
</>
)
}
else if(fat > impDataParam.highRangeFat){
return (
<>
<div className="flex flex-col justify-center items-center">
    <h1 className="text-red-600 font-bold text-xl text-shadow-outline">High</h1>
    <h1 className="font-sans text-xs">Normal Range</h1>
    <h1 className="font-sans text-xs">{impDataParam.halfRangeFat} - {impDataParam.highRangeFat}</h1>
</div>
</>
)
}
else{
return (
<>
<div className="flex flex-col justify-center items-center">
    <h1 className="text-green-700 font-bold text-xl text-shadow-outline">Normal</h1>
    <h1 className="font-sans text-xs">Normal Range</h1>
    <h1 className="font-sans text-xs">{impDataParam.halfRangeFat} - {impDataParam.highRangeFat}</h1>
</div>
</>
)
}
}

// Verify the mineral of the user
export const mineralVerifier = (mineral:number, impDataParam:any) => {
if(mineral < impDataParam.lowRangeMineral){
return (
<>
<div className="flex flex-col justify-center items-center">
    <h1 className="text-orange-400 font-bold text-xl text-shadow-outline">Low</h1>
    <h1 className="font-sans text-xs">Normal Range</h1>
    <h1 className="font-sans text-xs">{impDataParam.lowRangeMineral} - {impDataParam.highRangeMineral}</h1>
</div>
</>
)
}
else if(mineral > impDataParam.highRangeMineral){
return (
<>
<div className="flex flex-col justify-center items-center">
    <h1 className="text-red-600 font-bold text-xl text-shadow-outline">High</h1>
    <h1 className="font-sans text-xs">Normal Range</h1>
    <h1 className="font-sans text-xs">{impDataParam.lowRangeMineral} - {impDataParam.highRangeMineral}</h1>
</div>
</>
)
}
else{
return (
<>
<div className="flex flex-col justify-center items-center">
    <h1 className="text-green-700 font-bold text-xl text-shadow-outline">Normal</h1>
    <h1 className="font-sans text-xs">Normal Range</h1>
    <h1 className="font-sans text-xs">{impDataParam.lowRangeMineral} - {impDataParam.highRangeMineral}</h1>
</div>
</>
)
}
}

// Verify the protein of the user
export const proteinVerifier = (protein:number, impDataParam:any) => {
if(protein < impDataParam.lowRangeProtein){
return (
<>
<div className="flex flex-col justify-center items-center">
    <h1 className="text-orange-400 font-bold text-xl text-shadow-outline">Low</h1>
    <h1 className="font-sans text-xs">Normal Range</h1>
    <h1 className="font-sans text-xs">{impDataParam.lowRangeProtein} - {impDataParam.highRangeProtein}</h1>
</div>
</>
)
}
else if(protein > impDataParam.highRangeProtein){
return (
<>
<div className="flex flex-col justify-center items-center">
    <h1 className="text-red-600 font-bold text-xl text-shadow-outline">High</h1>
    <h1 className="font-sans text-xs">Normal Range</h1>
    <h1 className="font-sans text-xs">{impDataParam.lowRangeProtein} - {impDataParam.highRangeProtein}</h1>
</div>
</>
)
}
else{
return (
<>
<div className="flex flex-col justify-center items-center">
    <h1 className="text-green-700 font-bold text-xl text-shadow-outline">Normal</h1>
    <h1 className="font-sans text-xs">Normal Range</h1>
    <h1 className="font-sans text-xs">{impDataParam.lowRangeProtein} - {impDataParam.highRangeProtein}</h1>
</div>
</>
)
}
}

// Verify the Total Body Water of the user
export const tbwVerifier = (tbw:number, impDataParam:any) => {
if(tbw < impDataParam.lowRangeTbw){
return (
<>
<div className="flex flex-col justify-center items-center">
    <h1 className="text-orange-400 font-bold text-xl text-shadow-outline">Low</h1>
    <h1 className="font-sans text-xs">Normal Range</h1>
    <h1 className="font-sans text-xs">{impDataParam.lowRangeTbw} - {impDataParam.highRangeTbw}</h1>
</div>
</>
)
}
else if(tbw > impDataParam.highRangeTbw){
return (
<>
<div className="flex flex-col justify-center items-center">
    <h1 className="text-red-600 font-bold text-xl text-shadow-outline">High</h1>
    <h1 className="font-sans text-xs">Normal Range</h1>
    <h1 className="font-sans text-xs">{impDataParam.lowRangeTbw} - {impDataParam.highRangeTbw}</h1>
</div>
</>
)
}
else{
return (
<>
<div className="flex flex-col justify-center items-center">
    <h1 className="text-green-700 font-bold text-xl text-shadow-outline">Normal</h1>
    <h1 className="font-sans text-xs">Normal Range</h1>
    <h1 className="font-sans text-xs">{impDataParam.lowRangeTbw} - {impDataParam.highRangeTbw}</h1>
</div>
</>
)
}
}

// Verify the Soft Lean Mass of the user
export const slmVerifier = (slm:number, impDataParam:any) => {
if(slm < impDataParam.lowRangeSlm){
return (
<>
<div className="flex flex-col justify-center items-center">
    <h1 className="text-orange-400 font-bold text-xl text-shadow-outline">Low</h1>
    <h1 className="font-sans text-xs">Normal Range</h1>
    <h1 className="font-sans text-xs">{impDataParam.lowRangeSlm} - {impDataParam.highRangeSlm}</h1>
</div>
</>
)
}
else if(slm > impDataParam.highRangeSlm){
return (
<>
<div className="flex flex-col justify-center items-center">
    <h1 className="text-red-600 font-bold text-xl text-shadow-outline">High</h1>
    <h1 className="font-sans text-xs">Normal Range</h1>
    <h1 className="font-sans text-xs">{impDataParam.lowRangeSlm} - {impDataParam.highRangeSlm}</h1>
</div>
</>
)
}
else{
return (
<>
<div className="flex flex-col justify-center items-center">
    <h1 className="text-green-700 font-bold text-xl text-shadow-outline">Normal</h1>
    <h1 className="font-sans text-xs">Normal Range</h1>
    <h1 className="font-sans text-xs">{impDataParam.lowRangeSlm} - {impDataParam.highRangeSlm}</h1>
</div>
</>
)
}
}

// Verify the Percent Body Fat
export const pbfVerifier = (pbf:number, impDataParam:any) => {
if(pbf < impDataParam.lowerRangePbf){
return (
<>
<div className="flex flex-col justify-center items-center">
    <h1 className="text-orange-400 font-bold text-xl text-shadow-outline">Low</h1>
    <h1 className="font-sans text-xs">Normal Range</h1>
    <h1 className="font-sans text-xs">{impDataParam.lowerRangePbf} - {impDataParam.higherRangePbf}</h1>
</div>
</>
)
}
else if(pbf > impDataParam.higerhRangePbf){
return (
<>
<div className="flex flex-col justify-center items-center">
    <h1 className="text-red-600 font-bold text-xl text-shadow-outline">High</h1>
    <h1 className="font-sans text-xs">Normal Range</h1>
    <h1 className="font-sans text-xs">{impDataParam.lowerRangePbf} - {impDataParam.higherRangePbf}</h1>
</div>
</>
)
}
else{
return (
<>
<div className="flex flex-col justify-center items-center">
    <h1 className="text-green-700 font-bold text-xl text-shadow-outline">Normal</h1>
    <h1 className="font-sans text-xs">Normal Range</h1>
    <h1 className="font-sans text-xs">{impDataParam.lowerRangePbf} - {impDataParam.higherRangePbf}</h1>
</div>
</>
)
}
}

// Verify the Visceral Fat Index of the user
export const vfiVerifier = (vfi:number) => {
if(vfi < 1.0){
return (
<>
<div className="flex flex-col justify-center items-center">
    <h1 className="text-orange-400 font-bold text-xl text-shadow-outline">Low</h1>
    <h1 className="font-sans text-xs">Normal Range</h1>
    <h1 className="font-sans text-xs">{1} - {9}</h1>
</div>
</>
)
}
else if(vfi > 9.0){
return (
<>
<div className="flex flex-col justify-center items-center">
    <h1 className="text-red-600 font-bold text-xl text-shadow-outline">High</h1>
    <h1 className="font-sans text-xs">Normal Range</h1>
    <h1 className="font-sans text-xs">{1} - {9}</h1>
</div>
</>
)
}
else{
return (
<>
<div className="flex flex-col justify-center items-center">
    <h1 className="text-green-700 font-bold text-xl text-shadow-outline">Normal</h1>
    <h1 className="font-sans text-xs">Normal Range</h1>
    <h1 className="font-sans text-xs">{1} - {9}</h1>
</div>
</>
)
}
}

// Verify the Waist Hip Ratio of the user
export const whrVerifier = (whr:number, impDataParam:any) => {
if(whr < impDataParam.lowerRangeWhr){
return (
<>
<div className="flex flex-col justify-center items-center">
    <h1 className="text-orange-400 font-bold text-xl text-shadow-outline">Low</h1>
    <h1 className="font-sans text-xs">Normal Range</h1>
    <h1 className="font-sans text-xs">{impDataParam.lowerRangeWhr} - {impDataParam.higherRangeWhr}</h1>
</div>
</>
)
}
else if(whr > impDataParam.higherRangeWhr){
return (
<>
<div className="flex flex-col justify-center items-center">
    <h1 className="text-red-600 font-bold text-xl text-shadow-outline">High</h1>
    <h1 className="font-sans text-xs">Normal Range</h1>
    <h1 className="font-sans text-xs">{impDataParam.lowerRangeWhr} - {impDataParam.higherRangeWhr}</h1>
</div>
</>
)
}
else{
return (
<>
<div className="flex flex-col justify-center items-center">
    <h1 className="text-green-700 font-bold text-xl text-shadow-outline">Normal</h1>
    <h1 className="font-sans text-xs">Normal Range</h1>
    <h1 className="font-sans text-xs">{impDataParam.lowerRangeWhr} - {impDataParam.higherRangeWhr}</h1>
</div>
</>
)
}
}

// Verify the Skeleton Muscle Mass of the user
export const smmVerifier = (smm:number, impDataParam:any) => {
if(smm < impDataParam.lowerRangeSmm){
return (
<>
<div className="flex flex-col justify-center items-center">
    <h1 className="text-orange-400 font-bold text-xl text-shadow-outline">Low</h1>
    <h1 className="font-sans text-xs">Normal Range</h1>
    <h1 className="font-sans text-xs">{impDataParam.lowerRangeSmm} - {impDataParam.higherRangeSmm}</h1>
</div>
</>
)
}
else if(smm > impDataParam.higherRangeSmm){
return (
<>
<div className="flex flex-col justify-center items-center">
    <h1 className="text-red-600 font-bold text-xl text-shadow-outline">High</h1>
    <h1 className="font-sans text-xs">Normal Range</h1>
    <h1 className="font-sans text-xs">{impDataParam.lowerRangeSmm} - {impDataParam.higherRangeSmm}</h1>
</div>
</>
)
}
else{
return (
<>
<div className="flex flex-col justify-center items-center">
    <h1 className="text-green-700 font-bold text-xl text-shadow-outline">Normal</h1>
    <h1 className="font-sans text-xs">Normal Range</h1>
    <h1 className="font-sans text-xs">{impDataParam.lowerRangeSmm} - {impDataParam.higherRangeSmm}</h1>
</div>
</>
)
}
}

// Verify the Fat Free Mass Index of the user
export const ffmiVerifier = (ffmi:number, impDataParam:any) => {
if(ffmi < impDataParam.lowerRangeFfmi){
return (
<>
<div className="flex flex-col justify-center items-center">
    <h1 className="text-orange-400 font-bold text-xl text-shadow-outline">Low</h1>
    <h1 className="font-sans text-xs">Normal Range</h1>
    <h1 className="font-sans text-xs">{impDataParam.lowerRangeFfmi} - {impDataParam.higherRangeFfmi}</h1>
</div>
</>
)
}
else if(ffmi > impDataParam.higherRangeFfmi){
return (
<>
<div className="flex flex-col justify-center items-center">
    <h1 className="text-red-600 font-bold text-xl text-shadow-outline">High</h1>
    <h1 className="font-sans text-xs">Normal Range</h1>
    <h1 className="font-sans text-xs">{impDataParam.lowerRangeFfmi} - {impDataParam.higherRangeFfmi}</h1>
</div>
</>
)
}
else{
return (
<>
<div className="flex flex-col justify-center items-center">
    <h1 className="text-green-700 font-bold text-xl text-shadow-outline">Normal</h1>
    <h1 className="font-sans text-xs">Normal Range</h1>
    <h1 className="font-sans text-xs">{impDataParam.lowerRangeFfmi} - {impDataParam.higherRangeFfmi}</h1>
</div>
</>
)
}
}

// Verify the Calcium of the user
export const calciumVerifier = (calcium:number) => {
if(calcium < 1.2){
return (
<>
<h1 className="text-orange-400 font-bold text-xl text-shadow-outline">Low</h1>
</>
)
}
else if(calcium > 1.4){
return (
<>
<h1 className="text-red-600 font-bold text-xl text-shadow-outline">High</h1>
</>
)
}
else{
return (
<>
<h1 className="text-green-700 font-bold text-xl text-shadow-outline">Normal</h1>
</>
)
}
}

// Verify the Body Mass Index of the user
export const bmiVerifier = (bmi:number, impDataParam:any) => {
if(bmi < impDataParam.lowBMI){
return (
<>
<div className="flex flex-col justify-center items-center">
    <h1 className="text-orange-400 font-bold text-xl text-shadow-outline">Low</h1>
    <h1 className="font-sans text-xs">Normal Range</h1>
    <h1 className="font-sans text-xs">{impDataParam.lowBMI} - {impDataParam.highBMI}</h1>
</div>
</>
)
}
else if(bmi > impDataParam.highBMI){
return (
<>
<div className="flex flex-col justify-center items-center">
    <h1 className="text-red-600 font-bold text-xl text-shadow-outline">High</h1>
    <h1 className="font-sans text-xs">Normal Range</h1>
    <h1 className="font-sans text-xs">{impDataParam.lowBMI} - {impDataParam.highBMI}</h1>
</div>
</>
)
}
else{
return (
<>
<div className="flex flex-col justify-center items-center">
    <h1 className="text-green-700 font-bold text-xl text-shadow-outline">Normal</h1>
    <h1 className="font-sans text-xs">Normal Range</h1>
    <h1 className="font-sans text-xs">{impDataParam.lowBMI} - {impDataParam.highBMI}</h1>
</div>
</>
)
}
}

// Verify the Basal Metabolic Rate of the user
export const bmrVerifier = (bmr:number) => {
if(bmr < 1392.0){
return (
<>
<h1 className="text-orange-400 font-bold text-xl text-shadow-outline">Low</h1>
</>
)
}
else if(bmr > 1520.0){
return (
<>
<h1 className="text-red-600 font-bold text-xl text-shadow-outline">High</h1>
</>
)
}
else{
return (
<>
<h1 className="text-green-700 font-bold text-xl text-shadow-outline">Normal</h1>
</>
)
}
}