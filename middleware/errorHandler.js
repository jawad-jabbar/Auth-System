const errorHandler = (err,req,res,next)=>{
    const {stack = "", message="", status=500, statusText="Internal Server error"} = err
    if(err)
    {
        res.status(status).json({
            success :false,
            message,
        })
    }
    next()

}

module.exports = errorHandler;