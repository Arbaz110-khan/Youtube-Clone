import { Button, ButtonGroup, Card, Heading } from "@chakra-ui/react"
import axios from "axios"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"


function Profile(){
   let navigate= useNavigate()
    const[user,setUser]=useState({})
    const[myVideos,setMyVideos]=useState([])
 const[isCalled,setIsCalled]=useState(false)
    let getProfile=async()=>{
       let response= await axios.get(`http://localhost:5000/getprofile/${localStorage.getItem("UID")}`)
       console.log(response.data)
       setUser(response.data.user)
       setMyVideos(response.data.MyVideos)
       setIsCalled(true)
    }
    useEffect(()=>{
        if(isCalled==false)
            {
                getProfile()
            }
    })
    return(
        <div style={{display:"flex",flexDirection:"column"}}>
            <div style={{display:"flex",flexDirection:"column",margin:"auto"}}>
                <Card className="card" style={{display:"flex",height:"100px",flexDirection:"row",width:"300px",justifyContent:"space-evenly",background:"#f8f9fa",marginTop:"30px",margin:"auto",boxShadow: '1px 2px 9px #F4AAB9'}}>
                    
                <img style={{borderRadius:"50%",marginTop:"10px",height:"80px",width:"80px",border:"2px solid black"}} src={user.photoUrl}/>
                <Heading as='h4' size='md' style={{fontFamily:"Caslon Antique"}}>{user.name}</Heading>
                
                <p>{user.gmail}</p>
                <Button style={{height:"30px",width:"100px",borderRadius:"30px",fontFamily:"Caslon Antique",background:"red",color:"white",fontSize:"larger",marginTop:"60px",}}
                onClick={()=>{
                    navigate(`/editprofile/${localStorage.getItem("UID")}`)
                }}
                >Edit Profile</Button>
                </Card>
                <div style={{display:"flex",flexDirection:'row',flexWrap:"wrap",marginLeft:"auto",justifyContent:'space-between'}}>{
                myVideos.map((video)=>{
                    return(
   
                        <Card className="card1" style={{display:"flex",flexDirection:"column",justifyContent:"space-between",height:"480px", fontFamily:"Caslon Antique", width:"300px",margin:"auto",boxShadow: '1px 2px 9px #F4AAB9',borderRadius:"8px",background:"#f8f9fa",marginTop:"23px"}}
                         
                        >
                            
                            <div style={{justifyContent:"center",alignItems:"center",textAlign:"center",marginTop:"20px",borderRadius:"50px"}}
                             onClick={()=>{
                             navigate(`/video/${video._id}`)
                         }}>
                            
                            <img src={video.thumbnail} style={{width:"250px",height:"150px",marginTop:"20px",margin:"auto"}}></img>
                            <h1 style={{textAlign:"center",marginTop:"20px"}}>{video.title}</h1>
                            <h5 style={{textAlign:"center"}}>{video.description.length>200?video.description.slice(0,200)+"..":video.description}</h5>
                            <div style={{display:"flex",flexDirection:"row",justifyContent:"space-between",borderRadius:"40px"}}>
                            <h4 style={{backgroundColor:"red",borderRadius:"15px",width:"250px",color:"white",margin:"auto",marginTop:"20px"}}>{video.category}</h4> 
                            </div>
                            </div>
                            
                            
                          <div style={{display:"flex",flexDirection:"row",justifyContent:"space-between"}}>
                          <ButtonGroup variant='outline' spacing='6'> 
                            <Button colorScheme="red" borderColor='red.500' color="red.500"
                              style={{borderRadius:"30px",width:"90px",height:"40px",fontSize:"larger",fontFamily:"Caslon Antique",marginBottom:"10px"}}
                            onClick={()=>{
                                async function deleteVideoById(){
                                let response= await axios.delete(`http://localhost:5000/deletevideo/${video._id}`)
                                console.log(response)
                                if(response.data=='Success'){
                                    getProfile()
                                }
                                }deleteVideoById()
                                
                            }}
                            >Delete</Button>
                            </ButtonGroup>
                            <ButtonGroup variant='outline' spacing='6'>
                            <Button colorScheme="blue" borderColor='blue.500' color="blue.500"
                             style={{width:"90px",height:"40px",fontSize:"larger",fontFamily:"Caslon Antique",borderRadius:"30px",marginBottom:"10px"}}
                            onClick={()=>{
                                navigate(`/editvideo/${video._id}`)
                            }}
                            >Edit</Button>
                            </ButtonGroup>
                            </div>
                            
                        </Card>
                    )
                })
            }
            </div>
            </div>
            
        </div>
    )
}
export default Profile
