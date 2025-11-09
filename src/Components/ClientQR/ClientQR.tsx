import { QRCodeSVG } from "qrcode.react";
import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom"

export default function ClientQR() {
    const location = useLocation();
    const navigate = useNavigate();

    const goBackToDashboard = () => {
        navigate('/dashboard/admin/clients')
    }
    
    useEffect(() => {
        console.log(location);
    },[]);

  return (
    <div className="w-full h-full flex flex-col justify-center items-center p-4">
        <h1 className="text-xl mb-5">QR Code for: {location.state.email}</h1>
        <div className="bg-white w-full h-full p-4">
            <QRCodeSVG className="w-full h-full" value={location.state ? JSON.stringify(location.state) : ''}/>
        </div>
        <button onClick={goBackToDashboard} className="mt-2 bg-gray-900 w-full border-[2px] border-blue-400 px-3 py-2 rounded-md">
            Back to Admin Dashboard
        </button>
    </div>
  )
}
