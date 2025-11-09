import HomePage from "./Homepage/HomePage";
import Login from "./Login/Login"
import Signup from "./Signup/Signup";
import Dashboard from "./Dashboard/Dashboard"
import FirstTimeUser from "./FirstTimeUser/FirstTimeUser"
import VerifyAccount from "./VerifyAccount/VerifyAccount"
import UserTasks from "./UserTasks/UserTasks"
import UpdateData from "./UpdateData/UpdateData";
import Profile from "./Profile/Profile";
import ClientDashboard from "./Dashboard/ClientDashboard";
import AdminDashboard from "./AdminDashboard/AdminDashboard";
import TrainerDashboard from "./TrainerDashboard/TrainerDashboard";
import Leaderboard from "./Leaderboard/Leaderboard";
import Parameters from "./Parameters/Parameters";
import ManageTrainers from "./AdminDashboard/Management/ManageTrainers";
import ManageClients from "./AdminDashboard/Management/ManageClients";
import AdminHome from "./AdminDashboard/AdminHome";
import ClientQR from "./ClientQR/ClientQR";
import ClientQRScanner from "./ClientQRScanner/ClientQRScanner";
import PlayMode from "./PlayMode/PlayMode";
import StartPlay from "./PlayMode/StartPlay/StartPlay";

interface PagesObject {
    HomePage: any,
    Login: any,
    Signup: any,
    Dashboard: any,
    FirstTimeUser: any,
    VerifyAccount: any,
    UserTasks: any,
    UpdateData: any,
    Profile: any,
    ClientDashboard: any,
    AdminDashboard: any,
    TrainerDashboard: any,
    Leaderboard: any,
    Parameters: any,
    ClientQRScanner: any,
    PlayMode: any,
    StartPlay: any,
};

interface AdminPages {
    ManageTrainers: any,
    ManageClients: any,
    AdminHome: any,
    ClientQR: any,
}

const Pages:PagesObject = {
    HomePage,
    Login,
    Signup,
    Dashboard,
    FirstTimeUser,
    VerifyAccount,
    UserTasks,
    UpdateData,
    Profile,
    ClientDashboard,
    AdminDashboard,
    TrainerDashboard,
    Leaderboard,
    Parameters,
    ClientQRScanner,
    PlayMode,
    StartPlay,
}

export const AdminPages:AdminPages = {
    ManageTrainers,
    ManageClients,
    AdminHome,
    ClientQR,
}

export default Pages;