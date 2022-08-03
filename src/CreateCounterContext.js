import  { createContext, useEffect , useState } from 'react'
import axios from 'axios'

export let CounterContext = createContext(0);

export  function CounterContextProvider(props) {
  const [movies, setmovies] = useState([])
  const [TvShows, setTvShows] = useState([])
  const [persons, setpersons] = useState([])


  async function getTrending(mediaType, callback) {
  let {data} = await axios.get(`https://api.themoviedb.org/3/trending/${mediaType}/day?api_key=c636ed7787cc302d96bf88ccf334e0d8`);
    
  callback(data.results);
    
  }

  useEffect(() => {
    getTrending('movies',setmovies);
    getTrending('tv',setTvShows);
    getTrending('person',setpersons);
  }, [])
  return (
    <CounterContext.Provider value={{movies  , TvShows , persons}} >
        {props.children}
    </CounterContext.Provider>
  )
}
