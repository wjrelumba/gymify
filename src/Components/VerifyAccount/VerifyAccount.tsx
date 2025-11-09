import { useEffect, useState } from 'react'
import { QRCodeSVG } from 'qrcode.react'
import { useNavigate } from 'react-router-dom';
import supabase from '../../Supabase/Supabase';
import Header from '../SharedComponents/Header/Header';
import { navAudio } from '../../Functions/AudioFunctions/AudioFunctions';

export default function Page() {
  const navigate = useNavigate();
  const [userId, setUserId] = useState<string>('');

  // Check whether verified or not
  const checkVerify = async(userIdValue:string) => {
    const {data} = await supabase.from('users').select('is_client, firstTimeUser').eq('id', userIdValue);
    console.log(data);
    if(data){
      if(data[0]){
        if(data[0].is_client == true){
          if(data[0].firstTimeUser == true){
            navigate('/firstTimeUser');
          }else {
            navigate('/dashboard');
          };
        };
      };
    };
  };

  // Get user session
  const getUserSession = async() => {
    const {data:userSession} = await supabase.auth.getSession();
    if(userSession){
      if(userSession.session){
        if(userSession.session.user){
          console.log(userSession.session.user.id);
          checkVerify(userSession.session.user.id);
          setUserId(userSession.session.user.id);
          return userSession.session.user.id;
        }
      }
    }
   }

   // Log out button

   const logOutBtn = async() => {
    navAudio();
    await supabase.auth.signOut();
    navigate('/');
   }

   // Run on component load
   useEffect(() => {
    // Listen to realtime changes on users table
    const changes = supabase.channel('users').on('postgres_changes',{
            event: 'INSERT',
            schema: 'public',
            table: 'users',
        }, async() => {
          const userIdValue:any = await getUserSession();
          checkVerify(userIdValue);
        }).on('postgres_changes',{
            event: 'UPDATE',
            schema: 'public',
            table: 'users',
        }, async() => {
          const userIdValue:any = await getUserSession();
          checkVerify(userIdValue);
        }).subscribe();
    
    getUserSession();

    return () => {
        supabase.removeChannel(changes);
    }
   },[]);

  return (
    <>
        <Header buttonFunc={logOutBtn} headerTitle='Verify Account'/>
      <div className='flex justify-center items-center h-full text-black'>
        <div className='flex flex-col items-center'>
          <div className='p-3'>
            <h1 className='text-xl text-center font-bold'>Verify your account, ask an admin.</h1>
          </div>
          {userId && (
            <QRCodeSVG value={userId}/>
          )}
        </div>
      </div>
    </>
  )
}