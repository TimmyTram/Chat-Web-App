import Conversation from '../models/conversation.model.js';
import Message from '../models/message.model.js';
import { getReceiverSocketId, io } from '../socket/socket.js';


export const sendMessage = async (req, res) => {
    try {
        const { message } = req.body;
        const { id: receiverId } = req.params;
        const senderId = req.user._id;

        let conversation = await Conversation.findOne({
            participants: { $all: [senderId, receiverId] },
        });

        // first time messaging
        if (!conversation) {
            conversation = await Conversation.create({
                participants: [senderId, receiverId]
            });
        }

        const newMessage = new Message({
			senderId,
			receiverId,
			message,
		});

        if (newMessage) {
            conversation.messages.push(newMessage._id);
        }

        // this runs the two saves in parallel which saves time.
        await Promise.all([conversation.save(), newMessage.save()]);


        const receiverSocketId = getReceiverSocketId(receiverId);
        if(receiverSocketId) {
            io.to(receiverSocketId).emit("newMessage", newMessage);
        }

        res.status(201).json(newMessage);

    } catch (error) {
        console.log("[ERROR]: Error in sendMessage controller ", error.message);
        res.status(500).json({error: "Interal Server Error"});
    }
};

export const getMessage = async (req, res) => {
    try {
        
        const {id: userToChatId } = req.params;
        const senderId = req.user._id; // user._id comes from protectRoute middleware
        
        const conversation = await Conversation.findOne({
            participants: { $all: [senderId, userToChatId] }
        })
        .populate("messages"); // get actual message instead of ids.

        if (!conversation) {
            return res.status(200).json([]);
        }

        res.status(200).json(conversation.messages);
    } catch (error) {
        console.log("[ERROR]: Error in getMessage controller ", error.message);
        res.status(500).json({error: "Interal Server Error"});
    }
}