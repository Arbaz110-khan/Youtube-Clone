import axios from "axios";
import { Card, ButtonGroup, Button } from "@chakra-ui/react";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { useEffect, useState } from "react";
import { MdArrowRightAlt } from "react-icons/md";
import { useNavigate, useParams } from "react-router";
import storage from "./firebaseConfig";

function EditProfile(){
    let { Id }=useParams()
    const navigate=useNavigate()
    const[name,setName]=useState("")
    const[passWord,setPassword]=useState("")
    const[photoUrl,setphotoUrl]=useState("")
    const[isCalled,setIsCalled]=useState(false)
    useEffect(()=>{
        async function editProfileById(){
            let response=await axios.get(`http://localhost:5000/getuser/${Id}`)
            console.log(response.data)
            setName(response.data.name)
            setPassword(response.data.passWord)
            setphotoUrl(response.data.photoUrl)
            setIsCalled(true)

        }if(isCalled==false){
            editProfileById()
        }
    })
    return(
        <Card backgroundImage={require("./bg6.jpg")} backgroundSize={"cover"} height={'610px'}>

        <Card style={{display:"flex",flexDirection:"column",width:"600px",height:"300px",margin:"auto",justifyContent:"space-between",borderRadius:"20px",fontFamily:"Caslon Antique",backgroundColor:"#d8e2dc",boxShadow: '1px 2px 9px #F4AAB9'}}>
         
          {
            photoUrl.length==0?<h3>Select your Profile picture</h3>:<img style={{width:"80px",height:"80px",textAlign:"center",borderRadius:'50%',margin:"auto"}} src={photoUrl}></img>
          }
            {/* <h2 style={{display:"flex",textAlign:"center",justifyContent:"center"}}>Sign Up</h2> */}
            <input value={name} style={{width:"300px",borderRadius:"40px",textAlign:"center",height:"30px",margin:"auto",fontFamily:"Caslon Antique",fontSize:"larger"}} placeholder="Your Name"
            onChange={(e)=>{
                setName(e.target.value)
            }}
            ></input>
            
            <input value={passWord} style={{width:"300px",borderRadius:"40px",textAlign:"center",height:"30px",margin:"auto",fontFamily:"Caslon Antique",fontSize:"larger"}} type="password" placeholder="Enter password"
            onChange={(e)=>{
                setPassword(e.target.value)
            }}
            ></input>
          
        
             <input type="file" style={{width:"250px",textAlign:"center",height:"40px",margin:"auto",fontFamily:"Caslon Antique",fontSize:"larger"}}
          onChange={(e)=>{
            async function getPhotoUrl(){
                let file=e.target.files[0]
                let reference=ref(storage,'Images'+Math.random().toString())
                await uploadBytes(reference,file)
                let DownloadURL=await getDownloadURL(reference)
                setphotoUrl(DownloadURL)
                
            }getPhotoUrl()
            
          }}
          />
          <ButtonGroup variant='outline' spacing='6'> 
            <Button colorScheme="red" borderColor='red.500' color="red.500"
             style={{width:"150px",borderRadius:"40px",textAlign:"center",height:"40px",margin:"auto",marginTop:"10px",marginBottom:"10px",fontFamily:"Caslon Antique",fontSize:"larger"}}
            onClick={()=>{
                
                async function editProfile(){
                let response=await axios.put(`http://localhost:5000/updateprofile/${Id}`,{name,passWord,photoUrl})
                console.log(response)
                {
                    if(response.data=="success"){
                        navigate('/profile')
                    }
                    }
    
                }editProfile()

                
            }}
            >Edit Profile <MdArrowRightAlt/></Button>
            </ButtonGroup>
            <p style={{display:"flex",justifyContent:"center"}}>if you have already account,Click on <a href="/signin">SignIn</a></p>
        </Card>
        </Card>
    )
}
export default EditProfile