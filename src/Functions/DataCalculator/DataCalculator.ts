import supabase from "../../Supabase/Supabase";

const DataCalculator = async(userParameter:any) => {
    const highBMI = 24.0
    const lowBMI = 18.5

    // Check if the client alreaDy has a place on the DB
    const checkDbExist = async(userId:string) => {
        const {data,error} = await supabase.from('important_data_parameters').select().eq('client_id', userId);
        if(data){
            if(data.length < 1){
                const {data, error} = await supabase.from('important_data_parameters').insert({
                }).select();
                if(data){
                    console.log(data);
                }
                if(error){
                    console.log(error);
                }
            }
        }
        if(error){
            console.log(error);
        }
    }

    // Fetch important parameters
    const impParams = async(userId:string) => {
        const {data} = await supabase.from('important_parameters').select('height, gender, client_id').eq('client_id', userId)
        if(data){
            if(data[0]){

                // Get the ranges for fat free mass index
                ffmiRange(data[0].gender, data[0].client_id);
                // Get the ranges for waist to hip ratio
                whrRange(data[0].gender, data[0].client_id);
                // Calculate Weight Ranges to upload to DB
                weightRange(data[0].height, data[0].client_id);
                smmRange(data[0].client_id, data[0].gender);
            };
        };
    };

    // Get user session
    const getUserSession = async() => {
        const {data} = await supabase.auth.getSession();
        if(data){
            if(data.session){
                if(data.session.user){
                    await checkDbExist(data.session.user.id);
                    impParams(data.session.user.id);
                };
            };
        };
    };

    // Calculate fat ranges
    const fatRange = (highRangeWeight:number, lowRangeWeight:number, userId:string) => {
        var highRangeFat = Math.round((highRangeWeight - lowRangeWeight)*100)/100;
        var halfRangeFat = Math.round((highRangeFat*100)/2)/100;
        const updateDb = async(userIdValue:string) => {
            await supabase.from('important_data_parameters').update({
                highRangeFat: highRangeFat,
                halfRangeFat: halfRangeFat,
            }).eq('client_id', userIdValue);
        }
        updateDb(userId);
        ffmRange(highRangeWeight, halfRangeFat, userId);
        pbfRange(highRangeWeight, highRangeFat, userId);
    };

    // Calculate weight ranges
    const weightRange = (height:number, userId:string) => {
        var highRangeWeight:number = Math.round(highBMI * ((height/10)**2))/100;
        var lowRangeWeight:number = Math.round(lowBMI * ((height/10)**2))/100  ;
        fatRange(highRangeWeight, lowRangeWeight, userId);
        const updateDb = async(userIdValue:string) => {
            await supabase.from('important_data_parameters').update({
                highRangeWeight: highRangeWeight,
                lowRangeWeight: lowRangeWeight,
                weightValue: userParameter.weight,
                height: height
            }).eq('client_id', userIdValue);
        };
        updateDb(userId);
    };

    // Calculate slm ranges
    const slmRange = (highRangeFfmi:number, lowRangeFfmi:number, userId:string) => {
        var highRangeSlm = Math.round((highRangeFfmi*0.93)*100)/100;
        var lowRangeSlm = Math.round((lowRangeFfmi*0.93)*100)/100;
        const updateDb = async(userIdValue:string) => {
            await supabase.from('important_data_parameters').update({
                highRangeSlm: highRangeSlm,
                lowRangeSlm: lowRangeSlm,
            }).eq('client_id', userIdValue);
        }
        proteinRange(highRangeSlm, lowRangeSlm, userId);
        tbwRange(highRangeSlm, lowRangeSlm, userId);
        updateDb(userId);
    };

    // Calculate Mineral ranges
    const mineralRange = (highRangeFfmi:number, lowRangeFfmi:number, userId:string) => {
        var highRangeMineral = Math.round((highRangeFfmi*0.07)*100)/100;
        var lowRangeMineral = Math.round((lowRangeFfmi*0.07)*100)/100;
        const updateDb = async(userIdValue:string) => {
            await supabase.from('important_data_parameters').update({
                highRangeMineral: highRangeMineral,
                lowRangeMineral: lowRangeMineral,
            }).eq('client_id', userIdValue);
        };
        updateDb(userId);
    };

    // Calculate Fat Free Mass index ranges
    const ffmRange = (highRangeWeight:number, halfRangeFat:number, userId:string) => {
        var lowRangeFfmi = Math.round((highRangeWeight - halfRangeFat)*100)/100;
        var highRangeFfmi = highRangeWeight;
        const updateDb = async(userIdValue:string) => {
            await supabase.from('important_data_parameters').update({
                lowRangeFfmi: lowRangeFfmi,
                highRangeFfmi: highRangeFfmi
            }).eq('client_id', userIdValue);
        };
        slmRange(highRangeFfmi, lowRangeFfmi, userId);
        mineralRange(highRangeFfmi, lowRangeFfmi, userId);
        updateDb(userId);
    }

    // Calculate protein ranges
    const proteinRange = (highRangeSlm:number, lowRangeSlm:number, userId:string) => {
        var lowRangeProtein = Math.round((lowRangeSlm*0.22)*100)/100;
        var highRangeProtein = Math.round((highRangeSlm*0.22)*100)/100;
        const updateDb = async(userIdValue:string) => {
            await supabase.from('important_data_parameters').update({
                lowRangeProtein: lowRangeProtein,
                highRangeProtein: highRangeProtein
            }).eq('client_id', userIdValue);
        };
        updateDb(userId);
    };

    // Calculate Total Body Water ranges
    const tbwRange = (highRangeSlm:number, lowRangeSlm:number, userId:string) => {
        var lowRangeTbw = Math.round((lowRangeSlm*0.78)*100)/100;
        var highRangeTbw = Math.round((highRangeSlm*0.78)*100)/100;
        const updateDb = async(userIdValue:string) => {
            await supabase.from('important_data_parameters').update({
                lowRangeTbw: lowRangeTbw,
                highRangeTbw: highRangeTbw
            }).eq('client_id', userIdValue);
        };
        updateDb(userId);
    };

    // Calculate Percent Body Fat Ranges
    const pbfRange = (highRangeWeight:number, highRangeFat:number, userId:string) => {
        var higher = highRangeFat/highRangeWeight;
        if(higher < 20){
            var higherRangePbf = 20.0;
            var lowerRangePbf = 10.0;
            const updateDb = async(userIdValue:string) => {
                await supabase.from('important_data_parameters').update({
                    higherRangePbf: higherRangePbf,
                    lowerRangePbf: lowerRangePbf
                }).eq('client_id', userIdValue);
            };
            updateDb(userId);
        }
        else if(higher > 20){
            var higherRangePbf = 28.0;
            var lowerRangePbf = 18.0;
            const updateDb = async(userIdValue:string) => {
                await supabase.from('important_data_parameters').update({
                    higherRangePbf: higherRangePbf,
                    lowerRangePbf: lowerRangePbf
                }).eq('client_id', userIdValue);
            }
            updateDb(userId);
        }
    }

    // Get the Waist to Hip Ratio Ranges
    const whrRange = (gender:string, userId:string) => {
        if(gender == 'Male'){
            const higherRangeWhr = 0.9;
            const lowerRangeWhr = 0.8;
            const updateDb = async(userIdValue:string) => {
                await supabase.from('important_data_parameters').update({
                    higherRangeWhr: higherRangeWhr,
                    lowerRangeWhr: lowerRangeWhr
                }).eq('client_id', userIdValue);
            }
            updateDb(userId);
        }
        else if(gender == 'Female'){
            const higherRangeWhr = 0.85;
            const lowerRangeWhr = 0.75;
            const updateDb = async(userIdValue:string) => {
                await supabase.from('important_data_parameters').update({
                    higherRangeWhr: higherRangeWhr,
                    lowerRangeWhr: lowerRangeWhr
                }).eq('client_id', userIdValue);
            };
            updateDb(userId);
        };
    };

    // Get Fat free mass index ranges
    const ffmiRange = (gender:string, userId:string) => {
        if(gender == 'Male'){
            const higherRangeFfmi = 21.5;
            const lowerRangeFfmi = 19.5;
            const updateDb = async(userIdValue:string) => {
                await supabase.from('important_data_parameters').update({
                    higherRangeFfmi: higherRangeFfmi,
                    lowerRangeFfmi: lowerRangeFfmi
                }).eq('client_id', userIdValue);
            }
            updateDb(userId);
        }
        else if(gender == 'Female'){
            const higherRangeFfmi = 18.0;
            const lowerRangeFfmi = 16.0;
            const updateDb = async(userIdValue:string) => {
                await supabase.from('important_data_parameters').update({
                    higherRangeFfmi: higherRangeFfmi,
                    lowerRangeFfmi: lowerRangeFfmi
                }).eq('client_id', userIdValue);
            };
            updateDb(userId);
        };
    };

    // Get Skeletal muscle mass ranges
    const smmRange = (userId:string, gender:string) => {
        if(gender == 'Male'){
            var higherRangeSmm = Math.round((userParameter.weight * 0.54)*100)/100;
            var lowerRangeSmm = Math.round((userParameter.weight * 0.38)*100)/100;
            const updateDb = async(userIdValue:string) => {
                await supabase.from('important_data_parameters').update({
                    higherRangeSmm: higherRangeSmm,
                    lowerRangeSmm: lowerRangeSmm
                }).eq('client_id', userIdValue);
            };
            updateDb(userId);
        }
        else if(gender == 'Female'){
            var higherRangeSmm = Math.round((userParameter.weight * 0.39)*100)/100;
            var lowerRangeSmm = Math.round((userParameter.weight * 0.28)*100)/100;
            const updateDb = async(userIdValue:string) => {
                await supabase.from('important_data_parameters').update({
                    higherRangeSmm: higherRangeSmm,
                    lowerRangeSmm: lowerRangeSmm
                }).eq('client_id', userIdValue);
            };
            updateDb(userId);
        };
    };

    await getUserSession();
}

export default DataCalculator;