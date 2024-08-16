import axios from "axios"
import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router"
import { BiLike } from "react-icons/bi";
import { BiDislike } from "react-icons/bi";
import { RiShareForwardLine } from "react-icons/ri";
import { Card, Button, Input, Link, Text, Container, Heading, Box } from '@chakra-ui/react'

function Video(){
    const[text,setText]=useState("")
    let { Id }= useParams()
    let navigate=useNavigate()
    const[isCalled,setIsCalled]=useState(false)
    const[video,setVideo]=useState({})
    let getVideoById=async()=>{
        let response=await axios.get(`http://localhost:5000/getvideo/${Id}`)
           console.log(response.data)
           console.log(response.data.commentedBy)
           setVideo(response.data)
           setIsCalled(true)
    }
    useEffect(()=>{
    if(isCalled==false)
            {
                getVideoById()
            }
    })
    if(isCalled==false)
        {
            return(<div>
                Loading Video
            </div>)

        }
        else
        {
    return(
        <div>
            {
            <Card style={{display:"flex",flexDirection:"column",width:"60%",margin:"auto",alignItems:"center",marginTop:"20px"}}>
        
                <video  src={video.url} controls={true} style={{width:"652px",height:"367px",marginTop:"10px"}}></video>
                <div style={{display:'flex',flexDirection:"row",justifyContent:"flex-end",width:"652px",marginTop:"10px"}}>
                <Card style={{display:"flex",flexDirection:"row"}}>
                <Button style={{borderRadius:"30px",width:"50px",height:"30px"}}
                onClick={()=>{
                    async function addLike(){
                        let response=await axios.post(`http://localhost:5000/like/${Id}/${localStorage.getItem("UID")}`)
                        if(response.data=="success"){
                            getVideoById()
                            console.log("like")
                        }
                        
                    }addLike()
                    
                }}
                ><BiLike /></Button>
                <h3 style={{height:"30px",marginLeft:"10px",marginTop:"5px"}}>{video.likedBy.length}</h3>
                </Card>

                <Button style={{borderRadius:"30px",width:"50px",height:"30px"}}
                onClick={()=>{
                    async function dislike(){
                      let response=  await axios.post(`http://localhost:5000/dislike/${Id}/${localStorage.getItem("UID")}`)
                    if(response.data=="Success"){
                        getVideoById()
                        console.log("disliked")
                    }
                }dislike()
                }}
                
                ><BiDislike/>
                </Button>
                
                <h2>{video.disLikedBy.length}</h2>
                
                

                <Button style={{borderRadius:"30px",height:"30px",width:"100px",fontFamily:"Caslon Antique"}}><RiShareForwardLine />Share</Button>
                <Button style={{borderRadius:"50%",width:"40px",height:"30px"}}>...</Button>

                </div>
                <Heading style={{fontFamily:"Caslon Antique",width:"652px",display:"flex",justifyContent:'center'}}>{video.title}</Heading>
                <Text style={{fontFamily:"Caslon Antique",width:"652px"}}>{video.description}</Text>
               <div>
               <Input placeholder="Write Comment" style={{width:"300px",fontFamily:"Caslon Antique",height:"50px",borderRadius:"30px",textAlign:"center",margin:"auto",fontSize:"larger"}} onChange={(e)=>{
                    setText(e.target.value)
                }}></Input>
                <Button style={{width:"100px",fontFamily:"Caslon Antique",height:"50px",borderRadius:"30px",textAlign:"center",margin:"auto",fontSize:"larger"}}
                 onClick={()=>{
                    async function addComment()
                    {
                        let response= await axios.put(`http://localhost:5000/addcomment/${Id}/${localStorage.getItem("UID")}`,{text})
                        if(response.data=="Success")
                            {
                                getVideoById()
                                console.log("Comment Added")

                            }

                    }
                    addComment()
                }}>
                    Post
                </Button>
               </div>
               <div style={{display:"flex",flexDirection:"column",fontFamily:"Caslon Antique",background:'#f8f9fa'}}>
                {


                    video.commentedBy.length==0?<h1>NO Comments!</h1>:video.commentedBy.map((comment)=>{
                    return(
                    <Card style={{display:"flex",flexDirection:"row",fontFamily:"Caslon Antique",height:"200px",width:"300px",borderRadius:"5px" ,marginTop:"5px",backgroundColor:"white"}}>
                       <Box style={{display:"flex",flexDirection:"row",}}>
                        
                        <img src={comment.userPhoto} style={{height:"50px",width:"50px",borderRadius:"50px",marginTop:"15px"}}/>
                      
                       </Box>
                        
                        <Box style={{display:"flex",flexDirection:"column",height:"110px",width:"200px"}}>
                          <Heading style={{textAlign:"center",fontFamily:"Caslon Antique"}}>{comment.userName}</Heading>
                          <Text style={{textAlign:"center",fontFamily:"Caslon Antique"}}>{comment.text}</Text>
                       </Box>
                    </Card>
                    )
                 })
                }
               </div>
                
            </Card>    
            }
        </div>
        )
}

}

export default Video