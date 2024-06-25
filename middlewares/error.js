class ErrorHandler extends Error{
    constructor (message,statusCode){
        super(message);
        this.statusCode=statusCode;
    }
}
export default ErrorHandler;
export const errorMiddleWare=(err,req,res,next)=>{
    err.message=err.message || "Internal Server Error"
    err.statusCode=err.statusCode || 500;

    if(err.code===11000){
        const message=`Duplicate ${Object.keys(err.keyValue)} Entered`;
        err=new ErrorHandler(message,400); 
    }
    if(err.code==='jsonwebTokenError'){
        const message=`JSON web Token is invalid. Try again`;
        err=new ErrorHandler(message,400); 
    }
    if(err.code==='TokenExpiredError'){
        const message=`JSON web Token is expired. Try to login again`;
        err=new ErrorHandler(message,400); 
    }
    if(err.code==='CastError'){
        const message=`Invalid ${err.path}`;
        err=new ErrorHandler(message,400); 
    }
    const errorMessage=err.error
    ?Object.values(err.errors)
    .map((error)=>error.message)
    .join("")
    :err.message;

    return res.status(err.statusCode).json({
        success:false,
        message:errorMessage,
    })
};
// console.log(error)
