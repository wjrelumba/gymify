import { Link } from "react-router-dom";
import ClientLoginQRScanner from "./QRScanner/ClientLoginQRScanner";

export default function ClientQRScanner() {
  return (
    <div className="w-full h-full flex flex-col justify-center items-center p-2">
        <div className="mb-2">
            <h1 className="text-xl">
                Scan QR
            </h1>
        </div>
        <div className="w-full h-full p-2 bg-gray-900 rounded-lg border-[2px] border-blue-400">
            <ClientLoginQRScanner/>
        </div>
        <Link className="mt-2 bg-gray-800 border-[2px] border-red-400 rounded-lg w-full flex justify-center py-3" to={'/login'}>Go Back</Link>
    </div>
  )
}
