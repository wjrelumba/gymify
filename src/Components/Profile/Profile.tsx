import { useEffect, useState } from 'react'
import random from 'random';
import { useNavigate } from 'react-router-dom';
import supabase from '../../Supabase/Supabase';
import Header from '../SharedComponents/Header/Header';
import { navAudio } from '../../Functions/AudioFunctions/AudioFunctions';

export default function Profile() {
    const navigate = useNavigate();
    const [userDp, setUserDp] = useState<any>(null);
    const [username, setUsername] = useState<any>(null);
    const [_imageLink, setImageLink] = useState<any>(null);
    const [showNote, setShowNote] = useState<boolean>(false);
    const [showBackBtn, setShowBackBtn] = useState<boolean>(true);

    const [userId, setUserId] = useState<string|any>(null);

    // Handle images
    const imageHandler = async(e:any) => {
        setShowNote(true);
        setShowBackBtn(false);
        const {files} = e.target;
        console.log(files);
        // Create a function to upload and get url
        const uploadGetUrl = async() => {
            const randomValue = random.int(0,99999999999999);
            const {data:existing}:any = await supabase.storage.from('profile-photos').list(`${username}/`); // Check if there are existing photos on the folder
            if(existing){
                if(existing.length > 0){
                    for(var i = 0; i < existing.length; i++){
                        await supabase.storage.from('profile-photos').remove([`${username}/${existing[i].name}`])
                    };
                    uploadGetUrl();
                }
                else {
                    const {data}:any = await supabase.storage.from('profile-photos').upload(`${username}/${randomValue}`, files[0]);
                    console.log(data);
                    // if(error){
                    //     console.log(error.error);
                    //     if(error.error == "Duplicate"){
                    //         const randomValue = random.int(0,99999999999999);
                    //         const {data, error}:any = await supabase.storage.from('profile-photos').list(`${username}/`);
                    //         if(data){
                    //             for(var i=0; i < data.length; i++){
                    //                 const {data} = await supabase.storage.from('profile-photos').list(`${username}/`);
                    //         }
                    //     };
                    // };
                    if(data){
                        if(data.path){
                            const {data:url} = supabase.storage.from('profile-photos').getPublicUrl(data.path);
                            if(url){
                                console.log(url);
                                setImageLink(url.publicUrl);
                                setUserDp(url.publicUrl);
                                await supabase.from('profile_photos').update({
                                    link: url.publicUrl
                                }).eq('client_id', userId);
                                setShowBackBtn(true);
                            }
                        };
                    };
                };
            };
        };
        uploadGetUrl();
    };

    // Get user profile photo
    const getUserDp = async(userId:string) => {
        const {data} = await supabase.from('profile_photos').select('link').eq('client_id', userId);
        if(data){
            if(data[0]){
                setUserDp(data[0].link);
            }
        }
    }

    // Get username
    const getUsername = async(userId:string) => {
        const {data} = await supabase.from('users').select().eq('id', userId);
        if(data){
            if(data[0]){
                setUsername(data[0].username);
            };
        };
    };

    // Get user session
    const getUserSession = async() => {
        const {data} = await supabase.auth.getSession();
        if(data){
            if(data.session){
                if(data.session.user){
                    getUserDp(data.session.user.id);
                    getUsername(data.session.user.id);
                    setUserId(data.session.user.id);
                }
            }else{
                navigate('/');
            };
        };
    };

    // Back button function
    const goBackBtn = () => {
        navAudio();
        navigate(-1);
    }

    // Run only once on component load
    useEffect(() => {
        getUserSession();
    },[]);
  return (
    <>
        <Header showBackBtn={showBackBtn} buttonFunc={goBackBtn} headerTitle='Profile'/>
        <div className='flex justify-center items-center p-4 w-full h-full'>
            <div className='flex flex-col items-center justify-center p-2 border-[2px] border-blue-400 bg-gray-800 rounded-md w-[90%] max-h-[50%] h-[50%] text-white min-h-[50%]'>
                {username && (
                    <h1 className='text-4xl font-sans mb-1'>{username}</h1>                    
                )}
                <div className='w-[40%] p-1 rounded-full bg-gray-400'>
                    {userDp && (
                        <img className='w-full rounded-full' src={userDp} alt=''/>
                    )}
                </div>
                <div className='w-full flex justify-center py-2'>
                    <input onChange={imageHandler} accept='image/png, image/jpg, image/gif, image/jpeg, image/jfif' className='file:flex file:justify-center flex justify-center file:w-full' type="file" />
                </div>
                {showNote && (
                    <div className='w-full flex justify-center py-2'>
                        <h1 className='w-full text-center'>Note: Once the photo shows up, your profile photo has successfully changed.</h1>
                    </div>
                )}
            </div>
        </div>
    </>
  )
}
