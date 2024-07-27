import { useEffect, useState } from "react"
import useConversation from "../store/useConversation";
import toast from "react-hot-toast";

function useGetMessages() {
    const [loading, setLoading] = useState(false);
    const {messages, setMessages, selectedConversation} = useConversation();


    useEffect(() => {
        const getMessages = async () => {
            setLoading(true);
            try {
                const res = await fetch(`/api/messages/${selectedConversation._id}`);
                const data = res.json();

                if(data.error) throw new Error(error.message);
                setMessages(data);
            } catch (error) {
                toast.error(error.message);
                console.log("from useGetMessages");
            } finally {
                setLoading(false);
            }
        }

        if(selectedConversation?._id) getMessages()
    }, [selectedConversation?._id, setMessages]);

    return {messages, loading}
}

export default useGetMessages;
