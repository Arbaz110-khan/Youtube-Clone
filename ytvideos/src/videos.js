import axios from "axios"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router"
import { GoPlus } from "react-icons/go";
import { IoMdHome } from "react-icons/io";
import { Card, Button, Input, Link, Text, Container, Heading, Box } from '@chakra-ui/react'
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import { VscAdd } from "react-icons/vsc";

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';


function Videos()
{
    const[keywords,setKeywords]=useState("")
    const[isCalled,setIsCalled]=useState(false)
    const[videos,setVideos]=useState([])
    const[allvideos,setAllVideos]=useState([])
    let navigate=useNavigate()
    
        let getVideos= async()=>{
            let response=await axios.get("http://localhost:5000/videos")
            setVideos(response.data)
            setAllVideos(response.data)
            console.log(response.data)
            setIsCalled(true)
        }
        useEffect(()=>{
        if(isCalled==false){
            getVideos()
        }
        
    })        
     return(
        <Card style={{display:"flex",flexDirection:"column",justifyContent:"space-between",background:"#e9ecef",margin:"auto"}}>
            <Card style={{display:"flex",flexDirection:"row", fontFamily:"Caslon Antique",justifyContent:"space-between",height:"60px",background:"red"}}>
               <Heading style={{color:"white",fontFamily:"Dancing Script",fontSize:"28px",marginTop:"10px",marginLeft:"20px"}}>WonderVids</Heading>
                {/* <img src={require('./logo.png')} style={{width:"200px",height:"40px",backgroundSize:"cover",borderRadius:"50%",marginTop:"8px"}}></img> */}
                <input 
                 onChange={(e)=>{
                    let _keywords=e.target.value
                   let searchResults= allvideos.filter((video)=>{
                        return(video.title.toLowerCase().includes(_keywords.toLowerCase())||video.description.toLowerCase().includes(_keywords.toLowerCase())||video.category.toLowerCase().includes(_keywords.toLowerCase()))
                    })
                    setVideos(searchResults)
                }}   placeholder="Search Here" style={{ fontFamily:"Caslon Antique",width:"500px",borderRadius:"20px",textAlign:"center",height:"40px",marginTop:"8px"}}></input>

                <Button style={{fontWeight:"bold",height:"40px",width:"40px",borderRadius:"40px",marginTop:"8px",color:"black",border:"black",fontSize:"larger",textAlign:"center"}}>
                
                <VscAdd 
                onClick={()=>{
                    navigate('/addvideo')
                }}
                />

                </Button>

                <img className="img" onClick={()=>{
                    navigate("/profile")
                }} style={{backgroundSize:"cover",height:"55px",width:"60px",border:"2px solid white",borderRadius:"50%"}} src={localStorage.getItem("profilePhotoUrl")} ></img>
            </Card>

            <Card style={{display:'flex',flexDirection:"row",justifyContent:"space-between",marginTop:"3px",height:"45px",padding:""}}>
            <Swiper
      // install Swiper modules
      modules={[Navigation, Pagination, Scrollbar, A11y]}
      spaceBetween={50}
      slidesPerView={5}
      navigation
      onSwiper={(swiper) => console.log(swiper)}
      onSlideChange={() => console.log('slide change')}
    >
      <SwiperSlide>
                <Button colorScheme='teal' variant='outline'  
                style={{fontFamily:"Caslon Antique",borderRadius:"30px",marginTop:"2px"}}
                // style={{fontFamily:"Caslon Antique",color:'white',fontSize:"larger",borderRadius:"40px",width:"auto",height:"30px",marginTop:"5px"}} 
                
                onClick={()=>{
                   let filteredVideos= allvideos.filter((video)=>{
                        return(video.category=="Entertainment")
                    })
                    setVideos(filteredVideos)
                    
                }}>Entertainment</Button></SwiperSlide>

                <SwiperSlide>
                <Button colorScheme='teal' variant='outline'
                style={{fontFamily:"Caslon Antique",borderRadius:"40px",marginTop:"2px"}}
                onClick={()=>{
                    let filteredVideos=allvideos.filter((video)=>{
                        return(video.category=="Gaming")
                    })
                    setVideos(filteredVideos)
                }}
                >Gaming</Button></SwiperSlide>

                <SwiperSlide>
                <Button colorScheme='teal' variant='outline'
                style={{fontFamily:"Caslon Antique",borderRadius:"30px",marginTop:"2px"}}
                onClick={()=>{
                    let filteredVideos=allvideos.filter((video)=>{
                        return(video.category=="Sports")
                    })
                    setVideos(filteredVideos)
                }}
                >Sports</Button></SwiperSlide>

                <SwiperSlide>
                <Button colorScheme='teal' variant='outline'
                style={{fontFamily:"Caslon Antique",borderRadius:"40px",marginTop:"2px"}}
                onClick={()=>{
                    let filteredVideos=allvideos.filter((video)=>{
                        return(video.category=="Music")
                    })
                    setVideos(filteredVideos)
                }}
                >Music</Button></SwiperSlide>

                <SwiperSlide>
                <Button colorScheme='teal' variant='outline'
                style={{fontFamily:"Caslon Antique",borderRadius:"40px",marginTop:"2px"}}
                onClick={()=>{
                    let filteredVideos=allvideos.filter((video)=>{
                        return(video.category=="Programing")
                    })
                    setVideos(filteredVideos)
                }}
                >Programing</Button></SwiperSlide>

                <SwiperSlide>
                <Button colorScheme='teal' variant='outline'
                style={{fontFamily:"Caslon Antique",borderRadius:"40px",marginTop:"2px"}}
                onClick={()=>{
                    let filteredVideos=allvideos.filter((video)=>{
                        return(video.category=="Action")
                    })
                    setVideos(filteredVideos)
                }}
                >Action</Button></SwiperSlide>

                <SwiperSlide>
                <Button colorScheme='teal' variant='outline'
                style={{fontFamily:"Caslon Antique",borderRadius:"40px",marginTop:"2px"}}
                onClick={()=>{
                    let filteredVideos=allvideos.filter((video)=>{
                        return(video.category=="Arcade")
                    })
                    setVideos(filteredVideos)
                }}
                >Arcade</Button></SwiperSlide>

                <SwiperSlide>
                <Button colorScheme='teal' variant='outline'
                style={{fontFamily:"Caslon Antique",borderRadius:"40px",marginTop:"2px"}}
                onClick={()=>{
                    let filteredVideos=allvideos.filter((video)=>{
                        return(video.category=="Funny")
                    })
                    setVideos(filteredVideos)
                }}
                >Funny</Button></SwiperSlide>

                <SwiperSlide>
                <Button colorScheme='teal' variant='outline'
                style={{fontFamily:"Caslon Antique",borderRadius:"40px",marginTop:"2px"}}
                onClick={()=>{
                let filteredVideos=allvideos.filter((video)=>{
                    return(video.category=="Cartoon")
                })
                setVideos(filteredVideos)
                }}
                >Cartoon</Button></SwiperSlide>

                <SwiperSlide>
                <Button colorScheme='teal' variant='outline'
                style={{fontFamily:"Caslon Antique",borderRadius:"40px",marginTop:"2px"}}
                onClick={()=>{
                    let filteredVideos=allvideos.filter((video)=>{
                        return(video.category=="Animals")
                    })
                    setVideos(filteredVideos)
                }}
                >Animals</Button>
                </SwiperSlide>
                </Swiper>
            </Card>
        <Card style={{display:'flex',flexDirection:"row",flexWrap:"wrap",marginTop:"10px"}}>
            
            
            {
                videos.map((video)=>{
                    return(
                        
                        <Card className="card" style={{display:"flex",flexDirection:"column",justifyContent:"space-between",height:"500px", fontFamily:"Caslon Antique", width:"300px",margin:"auto",borderRadius:"8px",marginTop:"23px",boxShadow: '5px 4px 9px #ED1D24'}}>
                            
                            <Box style={{borderRadius:"50px",justifyContent:"center",alignItems:"center",textAlign:"center",marginTop:"30px"}}
                             onClick={()=>{
                             navigate(`/video/${video._id}`)
                         }}>
                            <img src={video.thumbnail} style={{width:"250px",height:"150px",marginTop:"10px",margin:"auto"}}></img>
                            <Heading as='h1' size='1x1' style={{textAlign:"center",marginTop:"15px"}}>{video.title}</Heading>
                            <h5 style={{textAlign:"center",marginTop:"15px"}}>{video.description.length>200?video.description.slice(0,200)+"..":video.description}</h5>
                            <Box style={{display:"flex",flexDirection:"row",justifyContent:"space-between",borderRadius:"40px",margin:"auto"}}>
                            <Text style={{backgroundColor:"black",borderRadius:"15px",width:"250px",color:"white",textAlign:"center",margin:"auto",marginTop:"15px"}}>{video.category}</Text> 
                            </Box>
                            </Box>
                            
                            
                        </Card>
                    )
                })
            }
        </Card>
        </Card>
     )
}
export default Videos

