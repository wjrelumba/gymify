export default function Navbar( {
    dataValues = [{ // Sample data for navlink
        function: () => console.log('hello world'), // Function that the button will do
        mode: true, // The mode it is in whether active or not
        icon: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-home"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path><polyline points="9 22 9 12 15 12 15 22"></polyline></svg>,
        text: 'Home', // The text on the navbar
    },{
        function: () => console.log('hello world'),
        mode: false,
        icon: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-users"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>,
        text: 'Sample Button',
    }],
}:any) {
  return (
    <div className={`fixed grid grid-cols-${dataValues.length} bottom-0 h-[4.5rem] gap-1 bg-gray-300 w-full px-2`}>
        {dataValues.map((data:any,index:number) => (
            <button key={index} onClick={data.function} className={`flex flex-col py-2 justify-start items-center border-t-[3px] ${data.mode && ' border-black'}`}>
                {data.icon}
                <h1 className='text-xs'>{data.text}</h1>
            </button>
        ))}
    </div>
  )
}
