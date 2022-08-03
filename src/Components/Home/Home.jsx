import React, { useContext } from 'react'
import style from './Home.module.css'
import { Link } from 'react-router-dom';
import { CounterContext } from '../../CreateCounterContext';
export default function Home() {

  let {movies,TvShows,persons} = useContext(CounterContext)
  return (<>

  {movies ?  <>
  
  <div className="row">
<div className="col-md-4 my-5 d-flex align-items-center">
  <div className='w-100'>
    <div className={ `w-25 ${style.brdr}`}></div>
    <h2>Trending</h2>
    <h2>Movies</h2>
    <h2>To watch now </h2>
    <p className='secondColor'>most watched movies by day</p>
    <div className={`w-100 ${style.brdr}`}></div>

  
  </div>
</div>
    {movies.map((movie,index)=>{
      return<div key={index} className="position-relative col-md-2 my-4">
        <div className='position-relative w-100'>
          <Link to={`/MovieDetails/${movie.id}`}>
          <img className='w-100' src={`https://image.tmdb.org/t/p/original${ movie.poster_path}`} alt="" />
          <span className='w-25 text-center bg-danger text-black position-absolute top-0 end-0 py-3'>{movie.vote_average}</span>
          <h2>{movie.title ? movie.title : "no title"}</h2>
          </Link>
        </div>
      </div>
    })}
  </div>
  </>:''}


{TvShows ? <>

  <div className="row">
<div className="col-md-4 my-5 d-flex align-items-center">
  <div className='w-100'>
    <div className={ `w-25 ${style.brdr}`}></div>
    <h2>Trending</h2>
    <h2>Tv</h2>
    <h2>To watch now </h2>
    <p className='secondColor'>most watched Tvs by day</p>
    <div className={`w-100 ${style.brdr}`}></div>

  
  </div>
</div>
    {TvShows.map((TvShow,index)=>{
      return<div key={index} className="position-relative col-md-2 my-4">
        <div className='position-relative w-100'>
          <img className='w-100' src={`https://image.tmdb.org/t/p/original${TvShow.poster_path}`} alt="" />
          <span className='w-25 text-center bg-danger text-black position-absolute top-0 end-0 py-3'>{TvShow.vote_average ? TvShow.vote_average : 'none'}</span>
          <h2>{TvShow.name}</h2>
        </div>
      </div>
    })}
  </div>
</> :''}

{   persons ? <>

  <div className="row">
<div className="col-md-4 my-5 d-flex align-items-center">
  <div className='w-100'>
    <div className={ `w-25 ${style.brdr}`}></div>
    <h2>Trending</h2>
    <h2>persons</h2>
    <h2>To watch now </h2>
    <p className='secondColor'>most watched person by day</p>
    <div className={`w-100 ${style.brdr}`}></div>

  
  </div>
</div>
    {persons.map((person,index)=>{
      return<div key={index} className="position-relative col-md-2 my-4">
        <div className='position-relative w-100'>
          <img className='w-100' src={`https://image.tmdb.org/t/p/original${person.profile_path}`} alt="" />
          <span className='w-25 text-center bg-danger text-black position-absolute top-0 end-0 py-3'>{person.popularity}</span>
          <h2>{person.name}</h2>
        </div>
      </div>
    })}
  </div>
  </> :''}



  </>
  )
}
