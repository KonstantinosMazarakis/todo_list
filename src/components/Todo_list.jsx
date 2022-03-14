import React, { useEffect, useState } from 'react';


let Todo_list = () =>{
    const [jobs, setjobs] = useState("")
    const [finishedJob, setfinishedJob] = useState(false)
    const [list, setlist] = useState([])



//prevent the form from reloading the page
let handleSubmit = (e) => {
    e.preventDefault()

    let listObj = {jobs,finishedJob}
    setlist([...list,listObj])
}

// toggles between true or false the job
let crossed =(i) =>{
    let copyOflist = [...list]
    copyOflist[i].finishedJob = !copyOflist[i].finishedJob
    
    setlist(copyOflist)
}

//delete the job
let deleteJob = (i) =>{
let filterdlist = list.filter((job,index)=>{
    return index!=i
})
setlist(filterdlist)
}


// reload the page and the info will stay
useEffect(() =>{
let data = localStorage.getItem("list")
if(data){
    setlist(JSON.parse(data))
}
},[])

useEffect(()=>{
    localStorage.setItem('list',JSON.stringify(list))
})
//------------------------------------------


    return<>

    <form onSubmit={handleSubmit}>
        <input type="text" className='form-group' onChange={(e) =>setjobs(e.target.value)}/>
        <input type="submit" value="add" className='btn btn-success'/>
    </form>
    {
    list.map((job,i) =>{
        return  <div key={i}>
            <p id='job' style={{textDecoration:job.finishedJob?"line-through":"" }}>{job.jobs}</p>
            {job.finishedJob?<input type="checkbox" id='check' defaultChecked onClick={() =>crossed(i)}/>:<input type="checkbox" id='check' onClick={() =>crossed(i)}/>}
            <button className='btn btn-danger' onClick={() =>deleteJob(i)}>Delete</button>
        </div>
    })
    }

    </>
}
export default Todo_list