import React, { useEffect, useState } from "react"; 
import './Image.css'
import InsertEmoticonRoundedIcon from '@mui/icons-material/InsertEmoticonRounded';

const API_KEY = "4wHhcWtRtee4DaDTD0zUR3F9Ys-YJx8NEYcRcMhR6gQ";

function Image(){
    const [search, setSearch] = useState("");
    const [data, setData] = useState([]);
    const [loading , setLoading] = useState(false);
    const [page, setPage] = useState(1);
    const [totalPage, setTotalPage] = useState(0);
    const [show, setShow] = useState(false);

    useEffect(()=>{
        if (search.trim() !== "") {
            fetchData();
        } else {
            setData([]); 
        }
    },[search,page])

     async function fetchData(){
        setLoading(true);
        try{
        const res = await fetch(`https://api.unsplash.com/search/photos?query=${search}&per_page=20&page=${page}&client_id=${API_KEY}`);
        const data = await res.json();
        setData(data.results);
        setTotalPage(data.total_pages);
        }
        catch (error) {
            console.error('Error fetching data:', error);
        } finally {
            setLoading(false); 
            setShow(true);
        }
     }

     function handlePrevBtn(){
        if(page>1){
            setPage(page-1);
        }
     }

     function handleNextBtn(){
        if(page<totalPage){
            setPage(page+1);
        }
     }
     
    return (
        <>
        <div className="imageAppBody">
            <h1 >
                Image Generation App
            </h1>
            
            <input type="text" placeholder="Search Images" value={search} onChange={(e)=>{
                setSearch(e.target.value)
                setPage(1)}
            }/>
            <div className="mainContainer">
                {show ?
            <div className="ImageContainer">
                {loading ? <p>Loading...</p>:
                data.map((item, index)=>(
                 <img src={item.urls.full} />
                )) }
                <div className="pagenation">
                    <button onClick={handlePrevBtn} disabled={page==1}>Prev</button>
                    <span>{page}</span>
                    <button onClick={handleNextBtn} disabled={page==totalPage}>Next</button>
                </div>
            </div> : <div style={{display:"flex", justifyContent:"center" , alignItems:"center"}}><h1 style={{textAlign:"center"}}>Welcome to our website </h1><InsertEmoticonRoundedIcon style={{color:"green", fontSize:"2.5rem"}}/></div>}
            </div>
        </div>
        </>
    )
}
export default Image;