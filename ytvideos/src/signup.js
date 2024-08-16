import axios from "axios";
import { Card, Button, Input, Link, Text, Container, Box, Heading } from '@chakra-ui/react'
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { useState } from "react";
import { MdArrowRightAlt } from "react-icons/md";
import { useNavigate } from "react-router";
import storage from "./firebaseConfig";
import { BiFullscreen } from "react-icons/bi";
import { toast } from 'react-toastify';

function SignUp(){
    const navigate=useNavigate()
    const[name,setName]=useState("")
    const[EMailAddress,setEMailAddress]=useState("")
    const[passWord,setPassword]=useState("")
    const[photoUrl,setphotoUrl]=useState("")
    return(
        <Card backgroundImage={require("./bg3.jpg")} backgroundSize={"cover"} height={'610px'}>

        <Card style={{display:"flex",flexDirection:"column",width:"400px",height:"500px",marginLeft:"60px",justifyContent:"space-between",borderRadius:"20px",fontFamily:"Caslon Antique",marginTop:"50px"}}>
            <Box boxShadow='dark-lg' p='6' rounded='md' bg='red' color='white'>

              <Heading style={{textAlign:"center",fontFamily:"Dancing Script"}}> WonderVids </Heading>
            
            </Box>
         
          {
            photoUrl.length==0?<h3 style={{textAlign:"center"}}>Select your Profile picture</h3>:<img style={{width:"80px",height:"80px",textAlign:"center",borderRadius:'50%',margin:"auto"}} src={photoUrl}></img>
          }
            {/* <h2 style={{display:"flex",textAlign:"center",justifyContent:"center"}}>Sign Up</h2> */}
            <Input style={{width:"250px",borderRadius:"40px",textAlign:"center",height:"30px",margin:"auto",fontFamily:"Caslon Antique",fontSize:"larger"}} placeholder="Your Name"
            onChange={(e)=>{
                setName(e.target.value)
            }}
            ></Input>
            <Input style={{width:"250px",borderRadius:"40px",textAlign:"center",height:"30px",margin:"auto",fontFamily:"Caslon Antique",fontSize:"larger"}} type="gmail" placeholder="Enter valid email"
            onChange={(e)=>{
                setEMailAddress(e.target.value)
            }}
            ></Input>
            <Input style={{width:"250px",borderRadius:"40px",textAlign:"center",height:"30px",margin:"auto",fontFamily:"Caslon Antique",fontSize:"larger"}} type="password" placeholder="Enter password"
            onChange={(e)=>{
                setPassword(e.target.value)
            }}
            ></Input>
          
        
             <Input type="file" style={{width:"250px",borderRadius:"10px",textAlign:"center",height:"30px",margin:"auto",fontFamily:"Caslon Antique",fontSize:"larger"}}
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
            <Button style={{width:"150px",borderRadius:"40px",textAlign:"center",height:"30px",margin:"auto",fontFamily:"Caslon Antique",fontSize:"larger",color:"black"}} colorScheme='red' variant='outline'
            onClick={()=>{
                
                async function createAccount(){
                let response=await axios.post("http://localhost:5000/createaccount",{name,EMailAddress,passWord,photoUrl})
                console.log(response)
                {
                if(response.data.success==true){
                    console.log(response.data.message)
                    console.log(response.data.UID)
                    localStorage.setItem("profilePhotoUrl",photoUrl)
                    localStorage.setItem("UID",response.data.UID)
                    toast.success("Succesfully Register")
                     navigate("/videos")
                    
                }
                else if(response.data.success==false)
                    {
                        console.log(response.data.message)
                        toast.error("Already Registerd")
                    }
                }
            }createAccount()

                
            }}
            >Sign Up <MdArrowRightAlt/></Button>
            <Text style={{display:"flex",justifyContent:"center"}}>if you have already account,Click on <Link color="blue" href="/signin">SignIn</Link></Text>
        </Card>
        </Card>
    )
}
export default SignUp