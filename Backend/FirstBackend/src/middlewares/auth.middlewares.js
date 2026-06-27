export const sampleMiddlewares = async(req, res, next)=>{
    console.log("i am simple middlewares 1");
    next();
    
}
export const sampleMiddlewares2 = async(req, res, next)=>{
    console.log("i am simple middlewares 2");
    next();
    
}