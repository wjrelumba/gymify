import { useEffect, useState } from 'react'
import { Line } from 'rc-progress'
import { navAudio } from '../../Functions/AudioFunctions/AudioFunctions'
import ModalComponent from '../SharedComponents/ModalComponent/ModalComponent'
import supabase from '../../Supabase/Supabase'
import { Link, Outlet, useNavigate } from 'react-router-dom'
import DataCalculator from '../../Functions/DataCalculator/DataCalculator'
import NavLinksBar from '../SharedComponents/Navbar/NavLinksBar'

export default function ClientDashboard() {
    const navigate = useNavigate();

    const [session, setSession] = useState<any>();
    const [userId, setUserId] = useState<any>(null);
    const [userParameters, setUserParameters] = useState<any>(null);
    const [oldUserParameters, setOldUserParameter] = useState<any>(null);
    const [userMetaData, setUserMetaData] = useState<any>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [dpLink, setDpLink] = useState<any>(null);
    const [impUserParam, setImpUserParam] = useState<any>(null);
    const [impDataParam, setImpDataParam] = useState<any>(null);
    const [_userLevel, setUserLevel] = useState<number>();
    const [_userExp, setUserExp] = useState<number>();

    const [showModal, setShowModal] = useState<boolean>(false);

    const [levelCap, setLevelCap] = useState<any>(null);

    const [mobileMode, setMobileMode] = useState<boolean>(true);
    var [paramState] = useState<number>(0);

    // Create navigation links
    const navLinks:any = [{
        path: '/dashboard/client/tasks',
        icon: <img className='w-[1.5rem] h-[1.5rem]' src="/icons/goal.png" alt="" />,
        text: 'Tasks',
    },{
        path: '/dashboard/client/parameters',
        icon: <img className='w-[1.5rem] h-[1.5rem]' src="/icons/admin-panel.png" alt="" />,
        text: 'Parameters',
    },{ // Sample data for navlink
        path: '/dashboard/client', // Function that the button will do
        icon: <img className='w-[1.5rem] h-[1.5rem]' src="/icons/podium.png" alt="" />,
        text: 'Leaderboard', // The text on the navbar
    }];


    // Get level capping
    const getLevels = async(userExp:number|undefined,userLevel:number|undefined,userId:string) => {
        const {data} = await supabase.from('level_capping').select().lte('lowerRange', userExp);
        if(data){
            const index = data.length - 1 
            setLevelCap(data[index]);
            if(data[index].level != userLevel){
                const levelUp = async(newLevel:number) => {
                    await supabase.from('important_parameters').update({level: newLevel}).eq('client_id', userId).select();
                }
                levelUp(data[index].level);
            }
        }
    }

    // Fetch important ranges
    const getImpDataParam = async() => {
        const {data} = await supabase.from('important_data_parameters').select().eq('client_id', userId);
        if(data){
            if(data[0]){
                setImpDataParam(data[0]);
            }
            if(!data[0]){
                getImpDataParam();
            }
        }
    }

    // Calculate exp to range level percent
    const levelCalculator = (userExp:number, userLevelCap:number) => {
        const percentage = ((userExp / userLevelCap)*100);
        return(percentage);
    };

    // Function to show modal on Trainer Approval
    const showModalFunc = () => {
        navAudio();
        setShowModal(!showModal);
    }

    // Listen to mode change
    useEffect(() => {},[mobileMode]);
    
    // Fetch important user parameters
    const getImpUserParam = async(userId:any) => {
        const {data} = await supabase.from('important_parameters').select('gender, height, level, points, exp, need_update, needs_exercise').eq('client_id', userId);
        if(data){
            const index = data.length - 1;
            if(data[index]){
                setImpUserParam(data[index]);
                getLevels(data[index].exp, data[index].level, userId);
                setUserLevel(data[index].level);
                setUserExp(data[index].exp);
            }
        }
    }

    // Fetch user parameters
    const getUserParameters = async() => {
        const {data} = await supabase.from('user_parameters').select().eq('id', userId);
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
            setIsLoading(false);
        };
    };

    // Get user profile picture
    const getUserDp = async(currentUserId:any) => {
        const {data} = await supabase.from('profile_photos').select('link').eq('client_id', currentUserId)
        if(data){
            if(data[0]){
                setDpLink(data[0].link);
            }
        }
    }

    // Check if there is an existing user
    const getUserSession = async() => {
        const { data } = await supabase.auth.getSession();
        if(data.session){
            setUserMetaData(data.session.user.user_metadata);
            setUserId(data.session.user.id);
            setSession(data);
            getUserDp(data.session.user.id);
            getImpUserParam(data.session.user.id);
        }
        else{
            navigate('/');
        }
    }
    
    // Handle media changes
    const mediaChange = (event: MediaQueryListEvent) => {
        if(event.matches){
            setMobileMode(true);
        }
        else{
            setMobileMode(false);
        };
    };

    const getUserId = async() => {
        const {data:{session}} = await supabase.auth.getSession();
        if(session){
            return session.user.id;
        }
    }

    useEffect(() => {
        // Create a media watcher
        const mediaQuery = window.matchMedia('(max-width: 460px)'); 
        getUserSession();
        mediaQuery.addEventListener('change', mediaChange);
        if(mediaQuery.matches){
            setMobileMode(true);
        }
        else{
            setMobileMode(false);
        };

        // Listen to database changes
        const changes = supabase.channel('important_data_parameters').on('postgres_changes',{
            event: 'INSERT',
            schema: 'public',
            table: 'important_data_parameters',
        }, () => {getImpDataParam()}).on('postgres_changes',{
            event: 'UPDATE',
            schema: 'public',
            table: 'important_data_parameters',
        }, () => {getImpDataParam()}).subscribe()

        // Listen to database changes
        const changesLevel = supabase.channel('client_dashboard_important_parameters').on('postgres_changes',{
            event: 'INSERT',
            schema: 'public',
            table: 'important_parameters',
        }, async(_payload) => {
            const userIdValue = await getUserId();
            getImpUserParam(userIdValue);
        }).on('postgres_changes',{
            event: 'UPDATE',
            schema: 'public',
            table: 'important_parameters',
        }, async(_payload) => {
            const userIdValue = await getUserId();
            getImpUserParam(userIdValue);
        }).subscribe();

        return () => {
            supabase.removeChannel(changes);
            supabase.removeChannel(changesLevel);
        };
    }, []);

    useEffect(() => {},[userId]);

    // Use Effects for checking changes on States
    useEffect(() => {
    }, [userMetaData]);

    useEffect(() => {}, [paramState]);

    useEffect(() => {
        getUserParameters();
        getImpDataParam();
    }, [userId]);

    useEffect(() => {
    }, [userParameters]);

    useEffect(() => {
    }, [oldUserParameters]);

    useEffect(() => {
    },[impUserParam]);
    
    useEffect(() => {
    },[impDataParam]);

  return (
    <>
    {session?.session && userParameters && !isLoading && (
        <>
        <ModalComponent title={'Pending Approval'} closeButtonShow={false} message={'Ask your trainer to approve your exercises to continue.'} onClose={showModalFunc} show={showModal} acceptMessage={'Okay'}/>
        <div className=''>
            <div className='p-2 z-10 sticky top-[2.5rem]'>
                <div className='flex flex-col justify-center rounded-xl'>
                    <div className='flex flex-col px-2 border border-blue-600 rounded-md bg-gray-900 shadow-xl'>
                        <div className='flex items-center mb-2'>
                            <div className='flex flex-col items-center py-2'>
                                <div className='bg-blue-950 p-[0.2rem] rounded-full'>
                                    {dpLink && (
                                        <img src={dpLink} className='h-[5rem] min-w-[5rem] w-[5rem] rounded-full' alt="" />
                                    )}
                                </div>
                                <div className='flex items-center w-full mt-2'>
                                    <Link to={'/profile'} className='flex text-xs text-center hover:bg-gray-400 hover:text-black transition-all duration-200 ease-out justify-center px-3 py-1 rounded-md border border-green-400 w-full'>
                                        Edit Profile
                                    </Link>
                                </div>
                            </div>
                            <div className='flex flex-col sm:w-full py-2'>
                                {impUserParam && (
                                    <>
                                        <div className='flex w-full justify-between'>
                                            <div className='flex flex-col w-[60%] sm:w-[82%] lg:w-[93%]'>
                                                <h1 className='px-2 font-mono text-2xl w-[75%]'>{userMetaData.username}</h1>
                                                <div className='flex px-2 items-center w-full'>
                                                    <div className='w-[1.2rem] h-[1.2rem]'>
                                                        <img src="/icons/star.png" alt="" />
                                                    </div>
                                                    {/* <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-zap"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon></svg> */}
                                                    <h1 className='px-2 font-mono'>{impUserParam.points}</h1>
                                                </div>
                                                <div className='flex px-2 items-center w-full'>
                                                    <div className='w-[1rem] h-[1rem]'>
                                                        <img src="/icons/start.png" alt="" />
                                                    </div>
                                                    {/* <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-bar-chart"><line x1="12" y1="20" x2="12" y2="10"></line><line x1="18" y1="20" x2="18" y2="4"></line><line x1="6" y1="20" x2="6" y2="16"></line></svg> */}
                                                    <h1 className='px-2 font-mono'>{impUserParam.level}</h1>
                                                </div>
                                            </div>
                                            <div className='flex flex-col w-[40%] sm:w-[18%] lg:w-[7%]'>
                                                <div className='flex px-2 justify-end items-center w-full'>
                                                    <div className='w-[1rem] h-[1rem]'>
                                                        <img src="/icons/height.png" alt="" />
                                                    </div>
                                                    {/* <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-chevrons-up"><polyline points="17 11 12 6 7 11"></polyline><polyline points="17 18 12 13 7 18"></polyline></svg> */}
                                                    <h1 className='px-2 font-mono text-sm'>{impUserParam.height}cm</h1>
                                                </div>
                                                <div className='flex px-2 mt-1 items-center w-full'>
                                                    {(impUserParam.gender == 'Male') ? (
                                                        <div className='w-full flex justify-end px-2'>
                                                            <img className='w-[3rem] h-[3-rem]' src="/icons/man.png" alt="" />
                                                        </div>
                                                    ):(
                                                        <div className='w-full flex justify-end px-2'>
                                                            <img className='w-[3rem] h-[3-rem]' src="/icons/woman.png" alt="" />
                                                        </div>
                                                    )}
                                                    {/* <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-user"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
                                                    <h1 className='px-2 font-mono text-sm'>{impUserParam.gender}</h1> */}
                                                </div>
                                            </div>
                                        </div>
                                        <div className='flex flex-col px-2 mb-2'>
                                            {levelCap && (
                                                <>
                                                    <Line className='w-full min-h-[0.5rem]' trailColor='#AAAAAA' percent={levelCalculator(impUserParam.exp, levelCap.highRange)} strokeColor='#008A23'/>
                                                    <div className='w-full mt-1 flex justify-end'>
                                                        <div className='w-[1rem] h-[1rem] mr-[0.1rem]'>
                                                            <img src="/icons/xp.png" alt="" />
                                                        </div>
                                                        {/* <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className="feather feather-trending-up"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"></polyline><polyline points="17 6 23 6 23 12"></polyline></svg> */}
                                                        <h1 className='text-xs'>{impUserParam.exp}/{levelCap.highRange}</h1>
                                                    </div>  
                                                </>
                                            )}
                                        </div>
                                    </>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className='pb-[4.5rem]'>
                <Outlet/>
            </div>
            <NavLinksBar dataValues={navLinks}/>
        </div>
        </>
    )}
    </>
  )
}