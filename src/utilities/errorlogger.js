const fs = require('fs');

let errorLogger = (err,req,res,next) => {
    if(err){
        let msg = new Date().toDateString() + " " + err.stack + "\n";
        fs.appendFile('ErrorLogger.txt', msg, (err)=>{
            if(err){
                console.log("logging error failed");
            }
        });
        if(err.status){
            res.status(err.status);
        }else{
            res.status(500)
        }
        res.json({'message': err.message});
    }
    next();
}

module.exports = errorLogger;