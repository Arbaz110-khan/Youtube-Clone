import { useState } from "react"
import axios from "axios"
import storage from "./firebaseConfig"
import { getDownloadURL,ref,uploadBytes } from "firebase/storage"
import { useNavigate } from "react-router"
import { Card, Button, Input, Link, Text, Container, Heading, Box } from '@chakra-ui/react'

function AddVideo(){
    const[text,setText]=useState("")
    let navigate=useNavigate()
    const[title,setTitle]=useState("")
    const[description,setDescription]=useState("")
    const[category,setCategory]=useState("")
    const[thumbnail,setThumbnail]=useState("")
    const[url,setUrl]=useState("")
    const[isCalled,setIsCalled]=useState(false)
    
    return(
        <Card backgroundImage={require("./bg7.jpg")} backgroundSize="cover" height="610px">
        <Card style={{display:"flex",flexDirection:"column",width:"400px",margin:"auto",marginTop:"20px",justifyContent:"space-evenly",height:"900px",border:"1px solid red"}}>
            <Box boxShadow='dark-lg' p='6' rounded='md' bg='red' color='white'>
            <Heading style={{textAlign:"center",fontFamily:"Dancing Script"}}> WonderVids </Heading>
            </Box>
            <Input placeholder="Title" style={{width:"300px",height:"30px",fontFamily:"Caslon Antique",margin:"auto",textAlign:"center",borderRadius:"20px",border:"1px solid black"}}
            onChange={(e)=>{
                setTitle(e.target.value)
            }}
            ></Input>
            <Input placeholder="Description" style={{width:"300px",height:"30px",fontFamily:"Caslon Antique",margin:"auto",textAlign:"center",borderRadius:"20px",border:"1px solid black"}}
            onChange={(e)=>{
                setDescription(e.target.value)
            }}
            ></Input>
            <Input placeholder="Category" style={{width:"300px",height:"30px",fontFamily:"Caslon Antique",margin:"auto",textAlign:"center",borderRadius:"20px",border:"1px solid black"}}
            onChange={(e)=>{
                setCategory(e.target.value)
            }}
            ></Input>
            <Input type="file" style={{width:"300px",height:"auto",margin:"auto",borderRadius:"5px",fontFamily:"Caslon Antique",border:"1px solid black"}}
            onChange={(e)=>{
                async function uploadVideo(){
                let files= e.target.files[0]
                let reference=ref(storage,'videos'+Math.random().toString())
               await uploadBytes(reference,files)
                let DownloadURL=await getDownloadURL(reference)
                console.log(DownloadURL)
                setUrl(DownloadURL)
                
            }uploadVideo()
            }}/>
            {
                url.length==0?<h4 style={{textAlign:"center",fontFamily:"Caslon Antique"}}>No Selected Video</h4>:<video controls={true} src={url}  style={{width:"380px",margin:"auto",height:"120px",marginTop:'5px',marginBottom:"5px"}}/>
            }
            <Input type="file" style={{width:"300px",height:"auto",margin:"auto",borderRadius:"5px",fontFamily:"Caslon Antique",border:"1px solid black"}}
            onChange={(e)=>{
                async function uploadThumbNail(){
                    let file=e.target.files[0]
                    let reference=ref(storage,"thumbnail"+Math.random().toString())
                    await uploadBytes(reference,file)
                    let DownloadURL=await getDownloadURL(reference)
                    setThumbnail(DownloadURL)
                }uploadThumbNail()
            }}
            />
            {
                thumbnail.length==0?<h4 style={{fontFamily:"Caslon Antique",textAlign:"center"}}>No Selected Thumbnail</h4>:<img style={{width:"380px",margin:"auto",height:"120px",marginTop:'5px',marginBottom:"5px"}} src={thumbnail}></img>
            }
            <Button  colorScheme='red'  
                  style={{fontFamily:"Caslon Antique",borderRadius:"30px",marginTop:"2px",width:"150px",margin:"auto",marginBottom:"5px"}}

            // style={{width:"150px",height:"auto",margin:"auto",textAlign:"center",borderRadius:"5px"}}

            onClick={()=>{
                console.log(title)
                console.log(description)
                console.log(category)
                console.log(thumbnail)
                console.log(url)
                async function addVideo(){
                    let response=await axios.post("http://localhost:5000/addvideo",{url,thumbnail,title,description,category,commentedBy:[],likedBy:[],disLikedBy:[],createdBy:localStorage.getItem("UID")})
                    console.log(response)
                    {
                        if (response.data=="Success"){
                            navigate("/videos")
                        }
                    }
                
                }addVideo()
            }}
            > Add Video</Button>
        </Card>
        </Card>
    )
}
export default AddVideo