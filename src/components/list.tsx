export default function List ({ children }: { children?: React.ReactNode }){
    return (
        <div className="flex items-center justify-center mt-6 p-8 ">
            <div className="shadow-xl rounded-2xl border-yellow-300 border-2 p-8 text-black">
                {children}
            </div>
        </div>
    )
}