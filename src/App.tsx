import { Route, Routes, useNavigate } from 'react-router-dom'
import Pages from './Components/Pages'
import supabase from './Supabase/Supabase'
import { useEffect } from 'react';

function App() {
  const navigate = useNavigate();
  const getUserSession = async() => {
    const {data:{session}} = await supabase.auth.getSession();
    if(session){
      navigate('/dashboard');
    }
    else{
      navigate('/');
    }
  };

  useEffect(() => {
    getUserSession();
  },[])

  return (
    <>
      <Routes>
        <Route path='/' element={<Pages.HomePage/>}/>
        <Route path='/login' element={<Pages.Login/>}/>
        <Route path='/signup' element={<Pages.Signup/>}/>

        <Route path='/dashboard'  element={<Pages.Dashboard/>}>
          <Route path='' element={<Pages.Dashboard/>}/>
          <Route path='admin' element={<>Admin</>}/>
          <Route path='trainer' element={<>Trainer</>}/>
        </Route>

        <Route path='/profile' element={<Pages.Profile/>}/>

        <Route path='/tasks' element={<Pages.UserTasks/>}/>

        <Route path='/updateData' element={<Pages.UpdateData/>}/>

        <Route path='/firstTimeUser' element={<Pages.FirstTimeUser />}/>
        <Route path='/verifyAccount' element={<Pages.VerifyAccount />}/>
      </Routes>
    </>
  )
}

export default App
