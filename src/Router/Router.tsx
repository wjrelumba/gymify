import Pages, { AdminPages } from "../Components/Pages";
import ErrorComponent from "../Components/ErrorComponent/ErrorComponent";
import { createBrowserRouter } from "react-router-dom";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";
import Unauthorized from "../Components/Unauthorized/Unauthorized";
import ManageClients_ from "../Components/AdminDashboard/Management/ManageClients_";

const router = createBrowserRouter([{
    path: '*',
    element: <ErrorComponent />,
    errorElement: <ErrorComponent/>
  },{
    path: '/',
    element: <ProtectedRoute children={<Pages.HomePage/>} allowedRoles={['admin', 'trainer', 'client', 'non_client', 'first_time']}/>,
    errorElement: <ErrorComponent/>
  },{
    path: '/unauthorized',
    element: <Unauthorized/>,
  },{
    path: '/dashboard',
    element: <ProtectedRoute children={<Pages.Dashboard/>} allowedRoles={['admin', 'trainer', 'client', 'non_client', 'first_time']}/>,
    errorElement: <ErrorComponent/>,
    children: [{
      path: 'client',
      element: <ProtectedRoute children={<Pages.ClientDashboard/>} allowedRoles={['client']}/>,
      errorElement: <ErrorComponent/>,
      children: [{
        path: '',
        element: <Pages.Leaderboard/>,
        errorElement: <ErrorComponent/>,
      },{
        path: 'tasks',
        element: <Pages.UserTasks/>,
        errorElement: <ErrorComponent/>,
      },{
        path: 'parameters',
        element: <Pages.Parameters/>,
        errorElement: <ErrorComponent/>,
      }]
    },{
      path: 'admin',
      element: <ProtectedRoute children={<Pages.AdminDashboard/>} allowedRoles={['admin']}/>,
      errorElement: <ErrorComponent />,
      children: [{
        path: '',
        element: <AdminPages.AdminHome/>,
        errorElement: <ErrorComponent/>
      },{
        path: 'trainers',
        element: <AdminPages.ManageTrainers/>,
        errorElement: <ErrorComponent/>
      },{
        path: 'clients',
        element: <ManageClients_/>,
        errorElement: <ErrorComponent/>
      },{
        path: 'businesses',
        element: <ErrorComponent/>,
        errorElement: <ErrorComponent/>
      }]
    },{
      path: 'trainer',
      element: <Pages.TrainerDashboard/>,
      errorElement: <ErrorComponent/>,
    }]
  },{
    path: '/playMode',
    element: <Pages.PlayMode/>,
    errorElement: <ErrorComponent/>,
    children: [{
      path: 'start',
      element: <Pages.StartPlay/>,
      errorElement: <ErrorComponent/>,
    }]
  },{
    path: '/clientQr',
    element: <AdminPages.ClientQR/>,
    errorElement: <ErrorComponent/>
  }
  ,{
  path: '/clientQrScanner',
    element: <Pages.ClientQRScanner/>,
    errorElement: <ErrorComponent/>
  },{
    path: '/login',
    element: <Pages.Login/>,
    errorElement: <ErrorComponent/>,
  },{
    path: '/signup',
    element: <Pages.Signup/>,
    errorElement: <ErrorComponent/>,
  },{
    path: '/profile',
    element: <Pages.Profile/>,
    errorElement: <ErrorComponent/>,
  },{
    path: '/updateData',
    element: <Pages.UpdateData/>,
    errorElement: <ErrorComponent/>,
  },{
    path: '/firstTimeUser',
    element: <ProtectedRoute children={<Pages.FirstTimeUser/>} allowedRoles={['first_time', 'client']}/>,
    errorElement: <ErrorComponent/>,
  },{
    path: '/verifyAccount',
    element: <ProtectedRoute children={<Pages.VerifyAccount/>} allowedRoles={['non_client']}/>,
    errorElement: <ErrorComponent/>,
  }
  ]);

export default router;