import { Link } from "react-router-dom";

export default function ErrorComponent() {
  return (
    <div className='w-full h-full flex justify-center items-center p-2'>
        <div className='flex flex-col h-full w-full items-center justify-center'>
            <h1 className="text-3xl mt-10">404 Not Found</h1>
            <Link className="bg-gray-300 rounded-md p-2 mt-5" to={'/'}>
                Back to Home
            </Link>
        </div>
    </div>
  )
}
