import { useEffect, useState } from "react"
import axios from "axios"
import storage from "./firebaseConfig"
import { getDownloadURL,ref,uploadBytes } from "firebase/storage"
import { useNavigate, useParams } from "react-router"
function UpdateVideo(){
    const { Id }=useParams()
    let navigate=useNavigate()
    const[title,setTitle]=useState("")
    const[description,setDescription]=useState("")
    const[category,setCategory]=useState("")
    const[thumbnail,setThumbnail]=useState("")
    const[url,setUrl]=useState("")
    const[isCalled,setIsCalled]=useState(false)
    useEffect(()=>{
        async function getVideoById(){
            let respons=await axios.get(`http://localhost:5000/getvideo/${Id}`)
            console.log(respons.data)
            setTitle(respons.data.title)
            setDescription(respons.data.description)
            setCategory(respons.data.category)
            setThumbnail(respons.data.thumbnail)
            setUrl(respons.data.url)
            setIsCalled(true)
        } if(isCalled==false){
            getVideoById()
        }
    })
    return( 
        <div style={{display:"flex",flexDirection:"column",width:"400px",height:"auto",margin:"auto",marginTop:"10px",justifyContent:"space-evenly",height:"500px",background:"lightgrey"}}>
            <input value={title} placeholder="Title" style={{width:"300px",height:"30px",fontFamily:"Caslon Antique",margin:"auto",textAlign:"center",borderRadius:"20px"}}
            onChange={(e)=>{
                setTitle(e.target.value)
            }}
            ></input>
            <input value={description} placeholder="Description" style={{width:"300px",height:"30px",fontFamily:"Caslon Antique",margin:"auto",textAlign:"center",borderRadius:"20px"}}
            onChange={(e)=>{
                setDescription(e.target.value)
            }}
            ></input>
            <input value={category} placeholder="Category" style={{width:"300px",height:"30px",fontFamily:"Caslon Antique",margin:"auto",textAlign:"center",borderRadius:"20px"}}
            onChange={(e)=>{
                setCategory(e.target.value)
            }}
            ></input>
            <input type="file" style={{width:"300px",height:"auto",margin:"auto",borderRadius:"5px"}}
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
                url.length==0?<h4 style={{textAlign:"center",fontFamily:"Caslon Antique"}}>No Selected Video</h4>:<video controls={true} src={url}  style={{height:"120px",width:"100%"}}/>
            }
            <input type="file" style={{width:"300px",height:"auto",margin:"auto",borderRadius:"5px",fontFamily:"Caslon Antique"}}
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
                thumbnail.length==0?<h4 style={{fontFamily:"Caslon Antique",textAlign:"center"}}>No Selected Thumbnail</h4>:<img style={{width:"100%",height:"120px"}} src={thumbnail}></img>
            }
            <button style={{width:"150px",height:"auto",margin:"auto",textAlign:"center",borderRadius:"5px"}}
            onClick={()=>{
                console.log(title)
                console.log(description)
                console.log(category)
                console.log(thumbnail)
                console.log(url)
                async function editVideo(){
                    let response=await axios.put(`http://localhost:5000/updatevideo/${Id}`,{url,thumbnail,title,description,category,createdBy:localStorage.getItem("UID")})
                    console.log(response.data)
                    {
                        if (response.data=="Success"){
                            console.log("Successfully Update")
                            navigate('/videos')
                        }
                    }
                    
                }editVideo()
            }}
            > Edit Video</button>
        </div>
    )
}
export default UpdateVideo