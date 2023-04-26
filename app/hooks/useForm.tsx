import {useState, ChangeEvent} from "react";

export const useForm = (postId:string) => {
    const [showPostBtn, setShowPostBtn] = useState<boolean>(false);
    const [commentvalue, setCommentValue] = useState<string>('');
    const [loading,setLoading] = useState(false);

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