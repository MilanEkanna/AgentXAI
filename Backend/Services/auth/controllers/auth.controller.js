import { getAuth } from 'firebase-admin/auth'
import { app } from '../config/firebase.js';
import User from '../models/user.model.js';
import redis from '../../../Shared/redis/redis.js';

export const login = async (req, res) => {
    try {
        const { token } = req.body;
        // verifyIdToken checks the Firebase token sent by the client, confirms it's genuine and unexpired, and returns the decoded user data — this is how the backend authenticates requests securely
        const decoded = await getAuth(app).verifyIdToken(token)
        // console.log(decoded.name);
        
        let user = await User.findOne({
            firebaseUid: decoded.uid
        });

        if (!user) {
            user = await User.create({
                firebaseUid:decoded.uid,
                name:decoded.name,
                email:decoded.email,
                avatar:decoded.picture
            })
        }

        const sessionId = crypto.randomUUID()
        await redis.set(`session-${sessionId}`,JSON.stringify({
            userId:user._id,
            name:user.name,
            email:user.email,
            avatar:user.avatar
        }), "EX",7*24*60*60)

        res.cookie("session", sessionId, {
            httpOnly: true,
            secure: true,
            sameSite:"strict",
            maxAge:7*24*60*60*1000
        });
        return res.status(200).json({
            message:"Success",
            user
        })

    } catch (error) {
        return res.status(500).json({
            message:"Login error"
        })
        
    }
}

export const logout = async(req, res)=>{
    try {
        const sessionId = req.cookies?.session
        if(sessionId){

            await redis.del(`session-${sessionId}`)
        }

         res.clearCookie("session");

         return res.status(200).json({
            success:true,
            message:"Logged Out successfully"
         })
    } catch (error) {
        console.log("Logout error", error);

        return res.status(500).json({
            success:false,
            message:"Internal server error"
        })
        
    }
}