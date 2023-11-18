import styled from "styled-components";
import Card from "./Card";
import Loading from "./Loading";
import { useEffect, useState } from "react";
import { getPopularMovies, getRelatedMovies } from "../services/api";
import { IconContext } from "react-icons";
import { FaThumbsDown, FaThumbsUp } from "react-icons/fa";



const DisplayCard = () =>{
    const [likedMovies, setLikedMovies] = useState([]);
    const [movies, setMovies] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);

    //console.log(likedMovies);
    useEffect(() => {
        getPopularMovies()
            .then(data => {
                setMovies(data);
            });
    },[]);

    useEffect(() => {
        if(currentIndex > 0 && currentIndex === movies.length -1){
            getRelated();
        }
    },[currentIndex])

    const getRelated = async () => {
        for (let movie of likedMovies){
            console.log("fetching more movies", movie.id);
            const data = await getRelatedMovies(movie.id);
            data.forEach(element => {
                let isIn = false;
                movies.forEach(element2 => {
                    if (element.id === element2.id){
                        isIn = true;
                        
                    }
                })
                if (isIn === false) {
                    setMovies((arr)=> [...arr, element]);
                }
            });
            
        }
    }

    return movies.length > 0 ? (
        <Wrapper>
            {/* send the movie to the card file to set to display  */}
            <Card movie={movies[currentIndex]}/>
            <div className="selectors">
            <button className="choice"
                    id="no" 
                    onClick={() => {
                        setCurrentIndex(currentIndex + 1)}
                    }> 
                    <IconContext.Provider value={{ size:'2.5rem' }}>
                        <div>
                            <FaThumbsDown />
                        </div>
                    </IconContext.Provider>
                </button> 
                <button className="choice"
                    id="yes" 
                    onClick={() => {
                        setLikedMovies((arr) => [...arr, movies[currentIndex]])
                        setCurrentIndex(currentIndex + 1)
                        
                    }}> 
                    <IconContext.Provider value={{ size:'2.5rem' }}>
                        <div>
                            <FaThumbsUp />
                        </div>
                    </IconContext.Provider>
                </button>
            </div>
        </Wrapper>
    ):(
        <Loading/>
    );
}

const Wrapper = styled.div`
    margin-top: 1rem;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: auto;
    gap: 2rem;

    .selectors{
        display: flex;
        gap: 3rem;
        height: auto;
    }
    .choice{
        gap: 2rem;
        width: 5rem;
        height: 5rem;
        color: white;
        border: none;
    }
    #yes{
        background-color: green;
    }
    #no{
        background-color: red;
    }
    
`
export default DisplayCard;