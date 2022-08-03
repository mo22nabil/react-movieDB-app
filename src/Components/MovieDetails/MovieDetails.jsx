import axios from 'axios';
import React, { useState ,useEffect} from 'react'
import { useParams } from 'react-router-dom'

export default function MovieDetails() {
    const [movieDetails, setMovieDetails] = useState({})
    let baseUrl = "https://image.tmdb.org/t/p/original";

let prams = useParams();
async function getMovieDetails() {
   let {data} = await axios.get(`https://api.themoviedb.org/3/movie/${prams.id}?api_key=c636ed7787cc302d96bf88ccf334e0d8&language=en-US`)
   setMovieDetails(data);
}
useEffect(() => {
    getMovieDetails();
}, [])

  return (<>
  <div className="container">
  <div className="row">
      <div className="offset-3 col-md-6">
          <div >
              <img className='w-100' src={baseUrl + movieDetails.backdrop_path } alt="" />
              <h4> over view</h4>
              <p>{movieDetails.overview}</p>
          </div>
      </div>
  </div>
  </div>
 
  </>
  )
}
