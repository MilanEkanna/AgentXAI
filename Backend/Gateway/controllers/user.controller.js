export const getCurrentUser = async(req , res)=>{
    try {
        const myData = req.user;
         return res.status(200).json(myData)
    } catch (error) {
         return res.status(500).json({
                message:`Get current user error ${error}`
            })
    }
}