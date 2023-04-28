import {useState, ChangeEvent, Dispatch, SetStateAction} from "react";
import { safeComment } from "../types";
import { formatDistanceToNow } from "date-fns";
import { useUserContext } from "../Context/UserContext";


export const useForm = (postId:string,setComments?: Dispatch<SetStateAction<safeComment[] | undefined>>) => {
    const [showPostBtn, setShowPostBtn] = useState<boolean>(false);
    const [commentvalue, setCommentValue] = useState<string>('');
    const [loading,setLoading] = useState(false);

    const {state} = useUserContext();

    const handleChange = (e:ChangeEvent<HTMLInputElement>) => {
        const text = e.target.value;
        if(text.trim()) {
            setShowPostBtn(true);
            setCommentValue(text)
        } else {
            setShowPostBtn(false);
            setCommentValue('');
        }
    }

    const handleCommentSubmit = async(e:any) => {
        e.preventDefault();
        if(commentvalue===''|| loading) {
            setShowPostBtn(false);
            return;
        }
        setLoading(true);
 
        await fetch('/api/postComment',{
            method: "POST",
            headers: {
                "content-type": "application/json",
            },
            body: JSON.stringify({
                postId,
                comment: commentvalue,
            })
        })
        if(setComments?.name) {
        const comment: safeComment = {
            id: Math.ceil(Math.random()*180).toString(),
            postId,
            userId: state.id,
            title: commentvalue,
            createdAt: new Date().toISOString(),
            user: {
                image: state.image,
                name: state.name
            }
        }
        setComments(prev => {
            if(!prev) {
                return [];
            }
            return [comment,...prev]
        })
    }
        setLoading(false);
        setShowPostBtn(false);
        setCommentValue('');
    }   

  return {
    submit:handleCommentSubmit,
    handleChange,
    showPostBtn,
    commentvalue,
    loading
  }
}

export default useForm