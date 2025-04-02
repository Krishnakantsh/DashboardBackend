
// handlle with promises resolve and reject

const asyncHandler = (requestHandler) =>{

  return (req , res, next) =>{
 
   Promise.resolve(requestHandler(req , res , next)).catch((err) => next(err))
 
 }
 }
 
export default asyncHandler  
