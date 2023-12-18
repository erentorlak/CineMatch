import "./MainPage.css"
import { useState, useEffect } from "react";
import { Link} from "react-router-dom";
import ProgramNavbar from "./SubComponents/ProgramNavbar";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import SVGStar from "./SubComponents/SVGStar";
import MovieCard from "./SubComponents/MovieCard";
import UserCard from "./SubComponents/UserCard";


export default function MainPage(){

    /*  ---------------------------------------------------------------------------
        --------------------------------------------------------------------------
        LAN DİYAR YAPILACAKLARI BURAYA YAZIYORUM

        --bestMatchMovieName a tıklandığında o filmin pageine gitmeli onu ayarla
        ben link to yazmadım html in içinde tam nasıl yapılacağını bilmedğimden sen
        yaz
        --benzer şekilde aşağıdaki herhangi bir movie carda tıklandığında onun page
        e gitsin
        --movie card mekanizmasını chat reis yaptı movie card file ında logic yok
    */

    const [data, setData] = useState([]); // Initialize with an empty array or an appropriate initial value
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const jwtAccess = localStorage.getItem("jwtAccess");
    //const [moviesData, setMoviesData] = useState([]);
    const [mostPopular, setMostPopular] = useState([]);
    const [bestRated, setBestRated] = useState([]);
    const [forYou, setForYou] = useState([]);

    const mostPopularMovieIds = [24, 11, 22, 70, 111];
    const bestRatedMovieIds = [15, 14, 13, 68, 69];
    const forYouMovieIds = [71, 75, 76, 77, 78];

    const fetchMovieData = async (movieIds, setState) => {
        try {
            const movies = await Promise.all(movieIds.map(async (movieId) => {
                const response = await fetch(`http://127.0.0.1:8000/movie/movie/movies/${movieId}/`, {
                    method: 'GET',
                    headers: {
                        'Authorization': `JWT ${jwtAccess}`,
                        'Content-Type': 'application/json',
                    },
                });

                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            }));
            setState(movies);
        } catch (error) {
            console.error('Error fetching movie data:', error);
            setError(error.toString());
        }
    };
    useEffect(() => {
        fetchMovieData([24, 11, 22, 70, 111], setMostPopular);
        fetchMovieData([15, 14, 13, 68, 69], setBestRated);
        fetchMovieData([71, 75, 76, 77, 78], setForYou);
    }, []);
    
  // Convert moviesData object to array for mapping
  const mostPopularArray = Object.values(mostPopular);
      

    /*const [bestMatchMovie, setBestMatchMovie] = useState({});
    const [movieCardsMostPopular, setMovieCardsMostPopular] = useState([]);
    const [movieCardsBestRated, setMovieCardsBestRated] = useState([]);
    const [movieCardsForYou, setMovieCardsForYou] = useState([]);
    const [userCards, setUserCards] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        setIsLoading(true);
        // Replace these URLs with your actual backend endpoints
        Promise.all([
            fetch('your-backend-url/best-match-movie'),
            fetch('your-backend-url/most-popular'),
            fetch('your-backend-url/best-rated'),
            fetch('your-backend-url/for-you'),
            fetch('your-backend-url/matched-people')
        ])
        .then(async ([resBestMatch, resMostPopular, resBestRated, resForYou, resMatchedPeople]) => {
            const bestMatch = await resBestMatch.json();
            const mostPopular = await resMostPopular.json();
            const bestRated = await resBestRated.json();
            const forYou = await resForYou.json();
            const matchedPeople = await resMatchedPeople.json();
            setBestMatchMovie(bestMatch);
            setMovieCardsMostPopular(mostPopular);
            setMovieCardsBestRated(bestRated);
            setMovieCardsForYou(forYou);
            setUserCards(matchedPeople);
        })
        .catch(error => {
            console.error('Error fetching data:', error);
            setError(error.toString());
        })
        .finally(() => {
            setIsLoading(false);
        });
    }, []);

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }*/

    // We will use this substitue for this  ---> <MovieCard key={movie.id} {...movie} />
    /* <Link to={`/movie/${movie.id}`} key={movie.id}>
                <MovieCard {...movie} />
        </Link> */ 
    


    const bestMatchMoviePoster= "src/assets/dummyPoster.jpg";
    const bestMatchMovieScene= "src/assets/dummy1.jpg";
    const bestMatchMovieName= "The Shining";
    const bestMatchMovieYear= "1980";
    const bestMatchMovieDesc= "A family heads to an isolated hotel for the winter where a sinister presence influences the father into violence, while his psychic son sees horrific forebodings from both past and future.";
    const bestMatchMoivePoints= "8.8"


    const movieCardsMostPopular = [
        { id: 5, title: "The Curious Case of Benjamin Button", poster_path: "src/assets/dummyPoster.jpg", release_date: "1980" },
        { id: 11, title: "The Shining", poster_path: "src/assets/dummyPoster.jpg", release_date: "1980" },
        { id: 12, title: "The Shining", poster_path: "src/assets/dummyPoster.jpg", release_date: "1980" },
        { id: 13, title: "The Shining", poster_path: "src/assets/dummyPoster.jpg", release_date: "1980" },
        { id: 19, title: "The Shining", poster_path: "src/assets/dummyPoster.jpg", release_date: "1980" },
      ];


      const movieCardsBestRated = [
        { id: 1, title: "The Shining", poster_path: "src/assets/dummyPoster.jpg", release_date: "1980" },
        { id: 2, title: "The Shining", poster_path: "src/assets/dummyPoster.jpg", release_date: "1980" },
        { id: 3, title: "The Shining", poster_path: "src/assets/dummyPoster.jpg", release_date: "1980" },
        { id: 4, title: "The Shining", poster_path: "src/assets/dummyPoster.jpg", release_date: "1980"},
        { id: 5, title: "The Shining", poster_path: "src/assets/dummyPoster.jpg", release_date: "1980"},
      ];

      const movieCardsForYou = [
        { id: 1, title: "The Shining", poster_path: "src/assets/dummyPoster.jpg", release_date: "1980" },
        { id: 2, title: "The Shining", poster_path: "src/assets/dummyPoster.jpg", release_date: "1980" },
        { id: 3, title: "The Shining", poster_path: "src/assets/dummyPoster.jpg", release_date: "1980" },
        { id: 4, title: "The Shining", poster_path: "src/assets/dummyPoster.jpg", release_date: "1980" },
        { id: 5, title: "The Shining", poster_path: "src/assets/dummyPoster.jpg", release_date: "1980" },
      ];

      const userCards = [
        { id: 1, username: "kea", percentage: 123, image: "src/assets/pp.jpg" },
        { id: 2, username: "diko", percentage: 456, image: "src/assets/pp.jpg" },
        { id: 3, username: "User4", percentage: 456, image: "src/assets/pp.jpg" },
        { id: 4, username: "User5", percentage: 456, image: "src/assets/pp.jpg" },
        { id: 5, username: "User6", percentage: 456, image: "src/assets/pp.jpg" },
      ];


    return(
        <div className="main-page">
            <ProgramNavbar/>
            <div className="best-match-movie">
                <div className= "best-match-movie-poster">
                    <img
                        src={bestMatchMoviePoster}
                        alt="First Image"
                        className="best-match-movie-poster-image"
                    />
                </div>
                <div className= "best-match-movie-scene" style={{
                    backgroundImage: `linear-gradient(0deg, #0A1421 12.5%, rgba(0, 0, 0, 0.00) 100%),url(${bestMatchMovieScene})`,
                    backgroundPosition: 'center center',
                    backgroundSize: 'cover',
                    backgroundRepeat: 'no-repeat',
                }}>
                <div className= "descriptive-text">
                    <div className= "best-match-text">BEST MATCH</div>
                    <div className= "best-match-movie-name">{bestMatchMovieName} ({bestMatchMovieYear})</div>
                    {/*<Link to={`/movie/${bestMatchMovieId}`} className="best-match-movie-name-link">
                        <div className="best-match-movie-name">
                            {bestMatchMovieName} ({bestMatchMovieYear})
                        </div>
                    </Link>*/}
                    <div className= "best-match-movie-desc">{bestMatchMovieDesc}</div>
                </div>
                <div className= "best-match-movie-points"><span className="true-points">{bestMatchMoivePoints}</span>/10</div>
                <div className="star"><SVGStar/></div>
                </div>
            </div>
            <Container className="rest-of-the-page">
                <Row className="main-page-list">
                    <div className="main-page-list-text">
                        Most Popular
                    </div>
                    <Container className="movie-cards-container">
                            <div className="movie-cards">
                            {mostPopular.map(movie => (
                                <Link to={`/moviepage/${movie.id}`} key={movie.id} className="movie-card-link">
                                    <MovieCard {...movie} />
                                </Link>
                            ))}
                            
                            </div>
                    </Container>
                </Row>
                <Row className="main-page-list">
                    <div className="main-page-list-text">
                        Best Rated
                    </div>
                    <Container className="movie-cards-container">
                            <div className="movie-cards">
                            {bestRated.map(movie => (
                                <Link to={`/moviepage/${movie.id}`} key={movie.id} className="movie-card-link">
                                    <MovieCard {...movie} />
                                </Link>
                            ))}
                            </div>
                    </Container>
                </Row>
                <Row className="main-page-list">
                    <div className="main-page-list-text">
                        For You
                    </div>
                    <Container className="movie-cards-container">
                            <div className="movie-cards">
                            {forYou.map(movie => (
                                <Link to={`/moviepage/${movie.id}`} key={movie.id} className="movie-card-link">
                                    <MovieCard {...movie} />
                                </Link>
                            ))}
                            </div>
                    </Container>
                </Row>
                <Row className="main-page-list">
                    <div className="main-page-list-text">
                        Matched People
                    </div>
                    <Container className="movie-cards-container">
                            <div className="movie-cards">
                                {userCards.map((user) => (
                                    <Link to={`/user/${user.username}`} key={user.id}>
                                        <UserCard {...user} />
                                    </Link>
                                ))}
                            </div>
                    </Container>
                </Row>
            </Container>
        </div>
    )
}