import { useNavigate } from "react-router-dom"

export default function Unauthorized() {
    const navigate = useNavigate();

    const goToHome = () => {
        navigate('/');
    }
  return (
    <div className="w-full justify-center items-center flex flex-col h-screen">
        <h1 className="text-3xl">Unauthorized</h1>
        <button className="bg-green-400 p-3 rounded-md mt-5" onClick={goToHome}>Go to Home</button>
    </div>
  )
}
