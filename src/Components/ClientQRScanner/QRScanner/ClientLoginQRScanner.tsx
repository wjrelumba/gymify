import React, { useEffect } from "react";
import { Html5QrcodeScanner } from "html5-qrcode";
import supabase from "../../../Supabase/Supabase";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const ClientLoginQRScanner: React.FC = () => {
    const navigate = useNavigate();

    const logIn = async(credentials:any) => {
        const credentialValue = JSON.parse(credentials);
        const {data, error} = await supabase.auth.signInWithPassword(credentialValue);
        if(data){
            navigate('/');
        };
        if(error){
            toast.error('Invalid Credentials');
        };
    };

    useEffect(() => {
        function onScanSuccess(decodedText: string, decodedResult: any) {
        // Handle the scanned QR code
        console.log(`Code matched = ${decodedText}`, decodedResult);
        logIn(decodedText);
        // alert(`Scanned Code: ${decodedText}`);
        }

        function onScanFailure(error: string) {
        // Handle scan failure
        console.warn(`Code scan error = ${error}`);
        }

        // Create the scanner instance
        const html5QrcodeScanner = new Html5QrcodeScanner(
            "reader",
            {
                fps: 1, // Scans per second
                qrbox: { width: 250, height: 250 }, // Size of the scanning area
            },
            false // verbose logging
            );

        // Start the scanner
        html5QrcodeScanner.render(onScanSuccess, onScanFailure);

        // Cleanup on component unmount
            return () => {
            html5QrcodeScanner.clear().catch((error) => {
                console.error("Failed to clear QR scanner", error);
            });
        };
    }, []);
    
    return (
        <div className="p-2">
            <div id="reader" className="scanner-class" />
        </div>
    );
};

export default ClientLoginQRScanner;
