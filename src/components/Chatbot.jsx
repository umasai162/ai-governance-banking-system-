import { useState, useRef, useEffect } from "react";

function Chatbot({ language }) {

const [message,setMessage] = useState("")
const [chat,setChat] = useState([])
const [open,setOpen] = useState(false)

const chatEndRef = useRef(null)

const sendMessage = async (msg) => {

const text = msg || message
if(!text.trim()) return

try{

const res = await fetch("http://localhost:5001/chatbot",{
method:"POST",
headers : {
    "Content-Type": "application/json"
},
body:JSON.stringify({
message:text,
language:language
})
})

const data = await res.json()

setChat(prev => [...prev,{
user:text,
bot:data.reply
}])

setMessage("")

}catch(error){

console.error(error)

setChat(prev => [...prev,{
user:text,
bot: language === "en"
? "Chatbot error"
: "చాట్‌బాట్ లోపం"
}])

}

}

const clearChat = () => {
setChat([])
}

useEffect(()=>{
chatEndRef.current?.scrollIntoView({behavior:"smooth"})
},[chat])

/* 🎤 Voice Input */

const startVoice = () => {

const recognition = new window.webkitSpeechRecognition()

recognition.lang = language === "en" ? "en-US" : "te-IN"

recognition.onresult = function(event){

const voiceText = event.results[0][0].transcript

setMessage(voiceText)

sendMessage(voiceText)

}

recognition.start()
}

return(

<>

{/* Floating Chat Bubble */}

{!open && (
<div
onClick={()=>setOpen(true)}
style={{
position:"fixed",
bottom:"25px",
right:"25px",
width:"65px",
height:"65px",
borderRadius:"50%",
background:"white",
display:"flex",
alignItems:"center",
justifyContent:"center",
fontSize:"30px",
cursor:"pointer",
boxShadow:"0 10px 30px rgba(0,0,0,0.4)"
}}
>
🤖
</div>
)}

{/* Chat Window */}

{open && (

<div style={{
position:"fixed",
bottom:"25px",
right:"25px",
width:"340px",
height:"460px",
background:"#0f172a",
borderRadius:"16px",
display:"flex",
flexDirection:"column",
boxShadow:"0 15px 40px rgba(0,0,0,0.5)",
overflow:"hidden",
fontFamily:"Segoe UI"
}}>

{/* Header */}

<div style={{
background:"linear-gradient(135deg,#2563eb,#7c3aed)",
padding:"14px",
display:"flex",
justifyContent:"space-between",
alignItems:"center",
color:"white"
}}>

<div>
<b>
{language === "en"
? "🤖 AI Loan Assistant"
: "🤖 లోన్ సహాయకుడు"}
</b>

<div style={{fontSize:"12px",opacity:"0.8"}}>
{language === "en" ? "Online" : "ఆన్‌లైన్"}
</div>
</div>

<div>

<button
onClick={clearChat}
style={{
background:"transparent",
border:"none",
color:"white",
fontSize:"18px",
cursor:"pointer",
marginRight:"10px"
}}
>
🔄
</button>

<button
onClick={()=>setOpen(false)}
style={{
background:"transparent",
border:"none",
color:"white",
fontSize:"18px",
cursor:"pointer"
}}
>
✕
</button>

</div>

</div>

{/* Chat Messages */}

<div style={{
flex:1,
padding:"12px",
overflowY:"auto",
background:"#020617"
}}>

{chat.map((c,i)=>(
<div key={i}>

{/* User Message */}

<div style={{
display:"flex",
justifyContent:"flex-end",
marginBottom:"6px"
}}>
<div style={{
background:"#2563eb",
color:"white",
padding:"8px 12px",
borderRadius:"14px",
maxWidth:"70%",
fontSize:"14px"
}}>
{c.user}
</div>
</div>

{/* Bot Message */}

<div style={{
display:"flex",
justifyContent:"flex-start",
marginBottom:"10px"
}}>
<div style={{
background:"#334155",
color:"white",
padding:"8px 12px",
borderRadius:"14px",
maxWidth:"70%",
fontSize:"14px"
}}>
{c.bot}
</div>
</div>

</div>
))}

<div ref={chatEndRef}></div>

</div>

{/* Input Area */}

<div style={{
display:"flex",
padding:"10px",
background:"#1e293b"
}}>

<input
value={message}
onChange={(e)=>setMessage(e.target.value)}
placeholder={
language === "en"
? "Ask about loans..."
: "లోన్స్ గురించి అడగండి..."
}
style={{
flex:1,
padding:"10px",
borderRadius:"10px",
border:"none",
outline:"none",
background:"#020617",
color:"white",
fontSize:"14px"
}}
/>

<button
onClick={()=>sendMessage()}
style={{
marginLeft:"6px",
padding:"10px",
borderRadius:"10px",
border:"none",
background:"#22c55e",
color:"white",
cursor:"pointer"
}}
>
➤
</button>

<button
onClick={startVoice}
style={{
marginLeft:"6px",
padding:"10px",
borderRadius:"10px",
border:"none",
background:"#f59e0b",
color:"white",
cursor:"pointer"
}}
>
🎤
</button>

</div>

</div>

)}

</>

)

}

export default Chatbot;