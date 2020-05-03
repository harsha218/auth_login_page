const fs = require('fs');

let requestLogger = (req,res,next) => {
    let msg = new Date().toDateString()+" "+req.method+" "+req.url+"\n";
    fs.appendFile('RequestLogger.txt', msg, (err)=>{
        if(err){
            return next(err);
        }
    })
    return next();
}

module.exports = requestLogger;