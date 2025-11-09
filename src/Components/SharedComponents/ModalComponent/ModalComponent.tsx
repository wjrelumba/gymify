import { rendererOne } from "../../Dashboard/Renderer";

export default function ModalComponent({ 
  show,
  onClose,
  closeButtonClass ='bg-gray-300 hover:bg-gray-400 text-black font-bold py-2 px-4 rounded',
  closeButtonShow = true,
  closeButtonMessage = 'Close',
  title, 
  message=null, 
  rewardData=null, 
  acceptMessage='Save Changes', 
  acceptClassname="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded",
  acceptFunction=null,
  parameterData=null,
  color='bg-white',
  borderColor='border-gray-200'
}:any)
{
  if (!show) return null;

  return (
    <>
      {/* Overlay */}
      <div className="fixed z-40 inset-0 bg-black opacity-50" onClick={onClose}></div>
      
      {/* Modal Content */}
      <div className="fixed z-50 inset-0 flex items-center justify-center animate-in">
        <div className={`${color} ${borderColor} border rounded-lg shadow-lg w-11/12 max-w-lg`}>
          <div className="px-6 py-4">
            <h2 className="text-xl font-bold w-full border-b-[2px] border-gray-300 font-mono">{title}</h2>
            {message && (<p>{message}</p>)}
            {parameterData && (
              <div className="rounded-md mt-5">
                {rendererOne(parameterData.userParameters, parameterData.oldUserParameters, parameterData.title, parameterData.unit, parameterData.impDataParam)}
              </div>
            )}
            {rewardData ? (
              <div className='flex flex-col items-center mt-3'>
                <p className='font-mono w-full border-b border-gray-400 text-center'>Claim your Reward</p>
                <div className='w-full justify-items-center grid grid-cols-2 gap-2 py-2 h-full'>
                    <h1 className='flex items-center gap-1 border-r-[2px] border-gray-400 w-full h-full justify-center'>
                        {rewardData ? `${rewardData.exp}` : null}
                        <div className='w-[1rem] h-[1rem]'>
                            <img src="/icons/xp.png" alt="" />
                        </div>
                    </h1>
                    <h1 className='flex items-center gap-1 border-l-[2px] border-gray-400 w-full h-full justify-center'>
                        {rewardData ? `${rewardData.points}` : null}
                        <div className='w-[1rem] h-[1rem]'>
                            <img src="/icons/star.png" alt="" />
                        </div>
                    </h1>
                </div>
              </div>
            ) : null}
          </div>
          <div className="flex justify-end px-6 py-4">
            {closeButtonShow && (
              <button
              className={`mr-2 ${closeButtonClass}`}
              onClick={onClose}
            >
              {closeButtonMessage}
            </button>
          )}
            <button
              className={acceptClassname}
              onClick={acceptFunction ? acceptFunction : onClose} // Replace with your save function
            >
              {acceptMessage}
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
