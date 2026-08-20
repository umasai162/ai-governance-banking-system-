import {useState} from "react"
import axios from "axios"

function FileUpload(){

const [file,setFile]=useState(null)
const [result,setResult]=useState("")

const uploadFile=async()=>{

const formData=new FormData()

formData.append("file",file)

const res=await axios.post(
"http://localhost:5001/analyze",
formData
)

setResult(res.data.analysis)

}

return(

<div>

<h2>Upload Insurance Policy</h2>

<input
type="file"
onChange={(e)=>setFile(e.target.files[0])}
/>

<button onClick={uploadFile}>
Analyze Policy
</button>

{result && (

<div>

<h3>AI Analysis</h3>

<p>{result}</p>

</div>

)}

</div>

)

}

export default FileUpload