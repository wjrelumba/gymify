import { useEffect } from "react"
import { loaderAudio } from "../../../Functions/AudioFunctions/AudioFunctions"

export default function Loader() {
  useEffect(() => {
    const audio = loaderAudio();

    return () => {audio.pause()}
  },[])
  return (
    <>
        <div className="flex justify-center items-center h-full">
            <div className="loader-line border-t-[0.5rem]"></div>
        </div>
    </>
  )
}
