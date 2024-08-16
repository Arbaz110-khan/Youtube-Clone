import axios from 'axios';
import { useState } from "react";
import { MdArrowRightAlt } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { Card, Button, Input, Link, Text, Container, Heading, Box, ButtonGroup } from '@chakra-ui/react'
import { toast } from 'react-toastify';


function SignIn(){
    let  navigate=useNavigate()
    const[EMailAddress,setEMailAddress]=useState("")
    const[passWord,setPassword]=useState("")
    return(
        <Card backgroundImage={require("./bg6.jpg")} backgroundSize={"cover"} height={'610px'}>
            
        <Card style={{display:"flex",flexDirection:"column",width:"500px",height:"400px",margin:"auto",justifyContent:"space-between",borderRadius:"20px",fontFamily:"Caslon Antique",marginTop:"35px",border:"1px solid pink"}}>
            <Box boxShadow='dark-lg' p='6' rounded='md' bg='red' color='white'>

              <Heading style={{textAlign:"center",fontFamily:"Dancing Script"}}> WonderVids </Heading>

            </Box>
            {/* <Heading style={{display:"flex",textAlign:"center",justifyContent:"center",fontFamily:"Dancing Script"}}>Sign In</Heading> */}
            <Input style={{width:"400px",borderRadius:"40px",textAlign:"center",height:"30px",margin:"auto",fontFamily:"Caslon Antique",fontSize:"larger",border:"1px solid black"}} type="gmail" placeholder="Enter valid email"
            onChange={(e)=>{
                setEMailAddress(e.target.value)
            }}
            ></Input>
            <Input style={{width:"400px",borderRadius:"40px",textAlign:"center",height:"30px",margin:"auto",fontFamily:"Caslon Antique",fontSize:"larger",border:"1px solid black"}} type="password" placeholder="Enter password"
            onChange={(e)=>{
                setPassword(e.target.value)
            }}
            ></Input>
            <ButtonGroup variant='outline' spacing='6'> 
            <Button colorScheme="red" borderColor='red.500' color="red.500"
            style={{width:"150px",borderRadius:"40px",textAlign:"center",height:"40px",margin:"auto",fontFamily:"Caslon Antique",fontSize:"larger"}}
            onClick={()=>{
                console.log(EMailAddress)
                console.log(passWord)
                async function addsignin(){
                    let response=await axios.post("http://localhost:5000/login",{EMailAddress,passWord})
                    console.log(response)
                    
                        if(response.data.success==true){
                        console.log(response.data.message)
                        toast.success("Login Success")
                         navigate('/videos')
                        
                        }
                        else if(response.data.success==false)
                            {
                                console.log(response.data.message)
                                toast.error("failed Credential")
                            }

                    
                }addsignin()
            }}
            >Sign In <MdArrowRightAlt/></Button>
            </ButtonGroup>
            <Text style={{display:"flex",justifyContent:"center"}}>if you have not register,Click on <Link color={'blue'} href="/signup">SignUp</Link></Text>
        </Card>
        </Card>
    )
}
export default SignIn