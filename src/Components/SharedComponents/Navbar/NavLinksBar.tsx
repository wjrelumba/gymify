import { NavLink } from "react-router-dom";
import { navAudio } from "../../../Functions/AudioFunctions/AudioFunctions";

export default function NavLinksBar( {
    dataValues = [{ // Sample data for navlink
        path: '', // Function that the button will do
        icon: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-home"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path><polyline points="9 22 9 12 15 12 15 22"></polyline></svg>,
        text: 'Home', // The text on the navbar
    },{
        path: '',
        icon: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-users"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>,
        text: 'Sample Button',
    }],
}:any) {
  return (
    <div className={`fixed grid ${dataValues.length == 3 ? 'grid-cols-3' : (dataValues.length == 4) ? 'grid-cols-4' : ''} bottom-0 h-[4.5rem] gap-1 bg-blue-950 w-full px-2 z-0`}>
        {dataValues.map((data:any, index:number) => (
            <NavLink onClick={() => navAudio()} to={data.path} key={index} className={({ isActive }) =>
                `text-sm navlink-border-animation flex flex-col justify-center items-center ${
                  isActive ? 'navlink-border-animation-active border-blue-400' : 'border-blue-950'
                }`
              } end>
                {data.icon}
                <h1>{data.text}</h1>
            </NavLink>
        ))}
    </div>
  )
}
