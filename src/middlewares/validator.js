const {validationResult} = require("express-validator");
const validatorFields = (req, res, next)=>{
    const errors = validationResult(req)

    if( !errors.isEmpty()){
        const newArrErrors = errors.errors.map((error)=>error.msg)
        return res.status(400).json({
            errors: newArrErrors
        });
    }

    next();
}

module.exports = {
    validatorFields
}