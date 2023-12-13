import "./MyProfilePage.css"
import { useState, useEffect } from "react";
import { Link} from "react-router-dom";
import ProgramNavbar from "./SubComponents/ProgramNavbar";
import Button from "react-bootstrap/esm/Button";
import Container from "react-bootstrap/esm/Container";
import MovieCard from "./SubComponents/MovieCard";
import Row from "react-bootstrap/Row";


export default function MyProfilePage(){
    const [profileData, setProfileData] = useState({
        username: "Loading...",
        matchRate: 0,
        followerCount: 0,
        followingCount: 0,
        profilePictureUrl: ''
    });

    const jwtAccess = localStorage.getItem('jwtAccess');

    /*  ---------------------------------------------------------------------------
        --------------------------------------------------------------------------
        LAN DİYAR YAPILACAKLARI BURAYA YAZIYORUM

        -username hem aşağıda variable olarak tanımlı hem de navbar da. eğer onları
        backendde bi defa çekip bi yerde tutup oradan çekebiliyosan öyle yap
    */

    useEffect(() => {
        // Fetch username data
        fetch('http://127.0.0.1:8000/auth/users/me', {
            method: 'GET',
            headers: {
                'Authorization': `JWT ${jwtAccess}`,
                'Content-Type': 'application/json',
            },
        })
        .then(response => {
            if(response.ok) {
                return response.json();
            }
            throw new Error('Network response was not ok.');
        })
        .then(data => {
            // Set username in profile data
            const fetchedUsername = data.username;
            setProfileData(prevData => ({ ...prevData, username: fetchedUsername }));

            // Fetch profile data using the fetched username
            return fetch(`http://127.0.0.1:8000/accounts/profile/${fetchedUsername}`, {
                method: 'GET',
                headers: {
                    'Authorization': `JWT ${jwtAccess}`,
                    'Content-Type': 'application/json',
                },
            });
        })
        .then(response => {
            if(response.ok) {
                return response.json();
            }
            throw new Error('Network response was not ok.');
        })
        .then(profileInfo => {
            // Update state with profile information
            setProfileData(prevData => ({
                ...prevData,
                matchRate: profileInfo.match_rate,
                followerCount: profileInfo.follower_count,
                followingCount: profileInfo.following_count,
                profilePictureUrl: profileInfo.profile_picture_url
            }));
        })
        .catch(error => console.error('There has been a problem with your fetch operations:', error));
    }, [jwtAccess]);
    
    const MyProfileBgImage= "src/assets/dummy1.jpg";
    const ppLink= "src/assets/pp.jpg";
    //const username="Michael Corleone";

    
    const movieCount="1071";
    //const followersCount= "1453";
    //const followingsCount= "1923"

    // Dummy movie data
    const movieData = [
        { id: 1, name: "Movie 1", image: "src/assets/dummyPoster.jpg", date: "2022" },
        { id: 2, name: "Modsdddsdasdasda dasdasd dasdddddfsdvie 2", image: "src/assets/dummyPoster.jpg", date: "2021" },
        { id: 3, name: "Movie 3", image: "src/assets/dummyPoster.jpg", date: "2020" },
        { id: 3, name: "Movie 3", image: "src/assets/dummyPoster.jpg", date: "2020" },
        { id: 3, name: "Movie 3", image: "src/assets/dummyPoster.jpg", date: "2020" },
        { id: 3, name: "Movie 3", image: "src/assets/dummyPoster.jpg", date: "2020" },
        { id: 3, name: "Movie 3", image: "src/assets/dummyPoster.jpg", date: "2020" },
        { id: 3, name: "Movie 3", image: "src/assets/dummyPoster.jpg", date: "2020" },
        { id: 3, name: "Movie 3", image: "src/assets/dummyPoster.jpg", date: "2020" },
        { id: 3, name: "Movie 3", image: "src/assets/dummyPoster.jpg", date: "2020" },
    ];



    return(
        <div className="main-page">
            <ProgramNavbar/>
            <div className="profile-page-content"
              style={{
              backgroundImage: `linear-gradient(0deg, rgba(10, 20, 33, 0.4) 0%, rgba(10, 20, 33, 0.4) 100%), linear-gradient(0deg, #0A1421 0%, rgba(0, 0, 0, 0.00) 100%), url(${MyProfileBgImage})`,
              backgroundPosition: 'center center',
              backgroundSize: 'cover',
              backgroundRepeat: 'no-repeat',
                }}>
                <div className= "user-profile">
                    <img
                        className="user-profile-image"
                        src={ppLink}
                    />
                    <div className="user-name">{profileData.username}</div>
                </div>
                <div className="follow-stats">
                    <div><span style={{fontWeight: 'bold'}}>{movieCount}</span> MOVIES</div>
                    <div><span style={{fontWeight: 'bold'}}>{profileData.followerCount}</span> FOLLOWERS</div>
                    <div><span style={{fontWeight: 'bold'}}>{profileData.followingCount}</span> FOLLOWINGS</div>
                </div>
            </div>
            <div className="rest-myprofile-page">
                <div className="profile-buttons-container">
                    <Link to="/mylists">
                        <Button variant="success profile-button">LISTS</Button>
                    </Link>
                    <Button variant="success profile-button">STATS</Button>
                </div>
                <div className= "watched-movies">
                    <div className="watched-movies-text">
                        WATCHED MOVIES
                    </div>
                    <Container className="watched-movies-card-container">
                        <Row>
                            {movieData.map((movie) => (
                                <MovieCard key={movie.id} {...movie} />
                            ))}
                        </Row>
                    </Container>
                </div>
            </div>
        </div>
    )
}