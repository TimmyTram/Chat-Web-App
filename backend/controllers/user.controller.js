import User from "../models/user.model.js";

export const getUsersForSideBar = async (req, res) => {
    try {
        const loggedInUserId = req.user._id; // from protectRoute
        // get all user not equal to the current user
        const filteredUsers = await User
            .find({ _id: { $ne: loggedInUserId }})
            .select("-password");

        res.status(200).json(filteredUsers);
    } catch (error) {
        console.log("[ERROR]: Error in getUsersForSidebar controller, ", error.message);
        res.status(500).json({error: "Interal Server Error"});
    }
}