import React, {useEffect, useState} from "react"

export default function CommentsDiv(){
    const [comments, setComments] = useState([])
    const [inputContent, setInputContent] = useState('')

    useEffect(updateComments, [])

    function updateComments(){
        fetch("http://127.0.0.1:5000/api/v1/get/newest10")
        .then(res=>{
            return res.json()
        })
        .then(json=>{
            setComments(json.reverse())
        })
    }

    function onChange(event){
        setInputContent(event.target.value)
    }

    function onClick(){
        if(!inputContent){
            alert("comment cannot be empty")
            return
        }
        fetch("http://127.0.0.1:5000/api/v1/add", {
            method:"POST",
            mode:'cors',
            body:JSON.stringify({text:inputContent}),
            headers:{
                "Content-type":"application/json"
            }
        }).then(res=>{   
            if(res.ok){
                setInputContent('')
                updateComments()
            }else{
                alert("failed to send your comment")
            }
        })
    }

    return(<div>
        <CommentsList comments={comments}/>
        <InputBox content={inputContent} onClick={onClick} onChange={onChange} />
    </div>)

}

function CommentsList({comments = {}}){
    return(<div>
        <h1>Comments</h1>
        <hr />
        {comments.map((item, index)=>{
           return <div key={index}>{item.text}</div>  
        })}
    </div>)
}

function InputBox({content, onClick, onChange}){
    return (<div>
        <input type='text' value={content} onChange={onChange} placeholder="type in your comments" ></input>
        <button onClick={onClick}>send</button>
    </div>)
}

