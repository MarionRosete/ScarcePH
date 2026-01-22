
function LoadingScreen({msg}:{msg:string}){
    return(
        <div className="h-screen flex justify-center flex-col items-center">
            <div>
                <img 
                    src="/image/ScarceLogo.PNG"
                    className="w-25 md:w-50 rounded-sm object-fit"
                />
            </div>
            <div>
            { msg}
            </div>
        </div>
    )
}

export default LoadingScreen