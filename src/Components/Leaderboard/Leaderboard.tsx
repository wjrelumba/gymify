import { useEffect, useState } from 'react';
import supabase from '../../Supabase/Supabase';
import Loader from '../SharedComponents/Loader/Loader';

export default function Leaderboard() {
  const [leaders, setLeaders] = useState<any[]>([]);
  const [_userRanking, setUserRanking] = useState<any>(0);
  const [userId, setUserId] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(false);

  // Get leaders function with gradual rendering
  const getLeaders = async () => {
    setLoading(true);
    const { data } = await supabase.from('important_parameters').select('client_id, level, exp, points, gender');

    if (data) {
      data.sort((a, b) => b.exp - a.exp);

      // Get user session
      const { data: { session } } = await supabase.auth.getSession();
      if (session) {
        const userIndex = data.findIndex(item => item.client_id === session.user.id);
        if (userIndex !== -1) {
          setUserId(data[userIndex].client_id);
          setUserRanking(userIndex + 1);
        }
      }

      // Fetch all usernames and photos in parallel
      const usernamesPromises = data.map(item =>
        supabase.from('users').select('username').eq('id', item.client_id).single()
      );

      const photosPromises = data.map(item =>
        supabase.from('profile_photos').select('link').eq('client_id', item.client_id).single()
      );

      const usernames = await Promise.all(usernamesPromises);
      const photos = await Promise.all(photosPromises);

      // Create an array of leader objects
      const leadersArray:any = [];

      for (let i = 0; i < (data.length < 10 ? data.length : 10); i++) {
        const username = usernames[i]?.data?.username || 'Unknown';
        const dpLink = photos[i]?.data?.link || '/profileIcon.jpg'; // Default image if no photo

        leadersArray.push({
          position: i + 1,
          client_id: data[i].client_id,
          exp: data[i].exp,
          level: data[i].level,
          points: data[i].points,
          gender: data[i].gender,
          username: username,
          dpLink: dpLink,
        });
      };

      for(let i=0; i < leadersArray.length; i++){
        setTimeout(() => {
          setLeaders(prevLeaders => [...prevLeaders, leadersArray[i]])
         }, i * 50);
      };
    }

    setLoading(false);
  };

  // Run once on component load
  useEffect(() => {
    getLeaders();
  }, []);

  useEffect(() => {},[leaders])

  return (
    <>
      {leaders.length > 0 && !loading ? (
        <div className="flex w-full h-full">
          <div className="flex w-full h-full flex-col p-2">
            <h1 className="w-full text-center text-3xl mb-4">Leaderboard</h1>
            <div className="flex">
              <div className="flex flex-col gap-1 border mr-1 bg-blue-950 border-gray-500 w-full h-full p-1 rounded-md">
                {leaders.map((leader: any, index:number) => (
                  <div className="animate-in flex w-full max-w-full py-[0.1rem] items-center" key={index}>
                    <div
                      className={`flex justify-center w-[10%] mr-2 ${leader.client_id === userId ? 'text-green-600' : 'text-white'}`}
                    >
                      <h1 className="text-2xl">{leader.position}</h1>
                    </div>
                    <div
                      className={`flex w-full h-[4rem] items-center px-2 py-1 border-[2px] ${
                        leader.client_id === userId ? 'border-green-600 bg-gray-900' : 'border-gray-500'
                      } rounded-md`}
                    >
                      <div className="w-[3.5rem] h-[3rem] p-[0.1rem] rounded-full bg-black">
                        <img className="w-full max-h-full min-h-full rounded-full" src={leader.dpLink} alt="" />
                      </div>
                      <div className='w-full grid grid-cols-2'>
                        <div className="w-full flex flex-col px-2">
                          <div className='flex items-center gap-1'>
                            <div className="w-[1rem] h-[1rem]">
                              <img src={`${leader.gender == 'Male' ? '/icons/man.png' : '/icons/woman.png'}`} alt="" />
                            </div>
                            <h1>{leader.username}</h1>
                          </div>
                          <div className="flex gap-1 items-center">
                            <div className="w-[1rem] h-[1rem]">
                              <img src="/icons/star.png" alt="" />
                            </div>
                            <h1 className="text-sm">{leader.points}</h1>
                          </div>
                        </div>
                        <div className='w-full flex flex-col items-end justify-center'>
                          <div className="flex gap-1 items-center">
                            <div className="w-[1.5rem] h-[1.5rem]">
                              <img src="/icons/start.png" alt="" />
                            </div>
                            <h1 className='text-lg'>{leader.level}</h1>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="relative top-5">
          <Loader />
        </div>
      )}
    </>
  );
}
