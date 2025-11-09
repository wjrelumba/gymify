import { useEffect, useState } from "react";
import supabase from "../../Supabase/Supabase";
import DataCalculator from "../../Functions/DataCalculator/DataCalculator";
import ModalComponent from "../SharedComponents/ModalComponent/ModalComponent";
import { radioButtonAudio } from "../../Functions/AudioFunctions/AudioFunctions";
import Loader from "../SharedComponents/Loader/Loader";

export default function Parameters() {
    const [userParameters, setUserParameters] = useState<any>(null);
    const [oldUserParameters, setOldUserParameter] = useState<any>(null);
    const [impDataParam, setImpDataParam] = useState<any>(null);

    const [showModal, setShowModal] = useState<boolean>(false);

    const [dataValue, setDataValue] = useState<any>(null);

    const [renderedIndices, setRenderedIndices] = useState<number[]>([]); // Store rendered indices

    // Fetch important ranges
    const getImpDataParam = async(userIdValue:any) => {
        const {data} = await supabase.from('important_data_parameters').select().eq('client_id', userIdValue);
        if(data){
            if(data[0]){
                setImpDataParam(data[0]);
            }
            if(!data[0]){
                getImpDataParam(userIdValue);
            }
        }
    }

    const getUserParameters = async(userIdValue:any) => {
        const {data} = await supabase.from('user_parameters').select().eq('id', userIdValue);
        if(data){
            if(data.length >= 2){
                setOldUserParameter(data[data.length - 2]);
                setUserParameters(data[data.length - 1]);
                DataCalculator(data[data.length - 1]);
            }
            if(data.length < 2){
                setOldUserParameter(data[0]);
                setUserParameters(data[0]);
                DataCalculator(data[0]);
            }
        };
    };

    const showParam = (parameter:string, title:string, unit:string|null) => {
        radioButtonAudio();
        if(dataValue){
            setShowModal(!showModal);
            setDataValue(null);
        }
        else
        {
            setShowModal(!showModal);
            if(userParameters && oldUserParameters && impDataParam){
                const dataObj = {
                    userParameters: userParameters[parameter],
                    oldUserParameters: oldUserParameters[parameter],
                    title,
                    unit,
                    impDataParam
                }
                setDataValue(dataObj);
            };
        }
    };

    const getUserSession = async() => {
        const {data:{session}} = await supabase.auth.getSession();
        if(session){
            getUserParameters(session.user.id);
            getImpDataParam(session.user.id);
        };
    };

    const renderer = (parameter:string, title:string, unit:string|null, index:number) => (
        <div key={index} onClick={() => showParam(parameter, title, unit)} className="w-full animate-in flex flex-col justify-center border-[2px] border-gray-600 rounded-xl p-3">
            <div className="w-full flex border-b-[2px] items-center gap-1 border-gray-300 mb-2">
                <div className="w-[1.5rem] h-[1.5rem]">
                    <img src={`/icons/parameters/${parameter}.png`} alt="" />
                </div>
                <h1 className="text-[0.6rem] w-full">{title}</h1>
            </div>
            {userParameters ? (
                <h1>{userParameters[parameter]} {unit}</h1>
            ) : (
                <h1>Loading...</h1> // Or some fallback content
            )}
        </div>
    );

    const rendererArray: any = [
        renderer('weight', 'Weight', 'kg', 0),
        renderer('fat', 'Fat', 'kg', 1),
        renderer('mineral', 'Mineral', 'kg', 2),
        renderer('protein', 'Protein', 'kg', 3),
        renderer('total_body_water', 'Total Body Water', 'kg', 4),
        renderer('soft_lean_mass', 'Soft Lean Mass', 'kg', 5),
        renderer('percent_body_fat', 'Percent Body Fat', 'kg', 6),
        renderer('visceral_fat_index', 'Visceral Fat Index', 'kg', 7),
        renderer('waist_hip_ratio', 'Waist Hip Ratio', 'kg', 8),
        renderer('skeleton_muscle_mass', 'Skeleton Muscle Mass', 'kg', 9),
        renderer('fat_free_mass_index', 'Fat Free Mass Index', 'kg', 10),
        renderer('calcium', 'Calcium', 'kg', 11),
        renderer('BMI', 'BMI', null, 12),
        renderer('basal_metabolic_rate', 'Basal Metabolic Rate', 'kg', 13),
        renderer('total_energy_expenditure', 'Total Energy Expenditure', 'kg', 14),
        renderer('physical_age', 'Physical Age', null, 15),
    ];

    // Function to delay rendering of each item one by one
    const delayRendering = () => {
        rendererArray.forEach((_:any, index:any) => {
            setTimeout(() => {
                setRenderedIndices(prevIndices => [...prevIndices, index]);
            }, index * 50); // 500ms delay between each render
        });
    };

    useEffect(() => {
        getUserSession();
    }, []);

    useEffect(() => {
        if (userParameters && oldUserParameters && impDataParam) {
            delayRendering();
        }
    }, [userParameters, oldUserParameters, impDataParam]);

    return (
        <>
            <ModalComponent
                onClose={showParam}
                parameterData={dataValue}
                show={showModal}
                title={'Parameter Information'}
                acceptMessage='Okay'
                acceptClassname={'bg-gray-900 border-[2px] border-blue-400 px-3 py-2 rounded-md'}
                closeButtonShow={false}
                color={'bg-gray-900'}
                borderColor={'border-blue-400'}
            />
            <div className="p-2">
                <h1 className="text-3xl mb-2">Parameters</h1>
                {userParameters && oldUserParameters ? (
                    <div className="grid grid-cols-2 gap-1 z-0">
                        {rendererArray.map((data: any, index: number) => (
                            // Only render if the index has been added to the renderedIndices state
                            renderedIndices.includes(index) && <div key={index}>{data}</div>
                        ))}
                    </div>
                ) : (
                    <Loader/>
                )}
            </div>
        </>
    );
}
