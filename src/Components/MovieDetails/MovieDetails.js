import { useEffect, useState } from 'react'
import { BASE_URL } from '../../Utils/Constants'
import axios from 'axios';
import Error from '../Common/Error/Error'
import Loader from '../Common/Loader/Loader';
import { Descriptions, Card, Button } from 'antd';
import styles from './MovieDetails.module.css'

export default function MovieDetails(props) {
    const [movieData, setMovieData] = useState(null)
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        var match_id = props.match.params.id
        let newUrl = new URL(BASE_URL)
        newUrl.searchParams.set("i", match_id);
        axios.get(newUrl)
            .then((response) => {
                // handle success
                if (response.status === 200) {
                    setMovieData(response.data)
                }
            })
            .catch((error) => {
                // handle error
                setError(error)
            })
            .finally(response => setIsLoaded(true))
    }, [props.match.params.id])

    const goBack = () => {
        props.history.goBack()
    }

    if (error) {
        return <Error error={error} />;
    }
    else if (!isLoaded) {
        return <Loader />;
    }
    else {
        return (
            <div className={styles.cardPadding}>
                <Card
                    hoverable
                    className={styles.card}
                    cover={<img alt="example" height='500px' src={movieData.Poster} />}
                >
                    <Descriptions
                        bordered
                        title={movieData.Title}
                        size='default'
                        layout='vertical'
                        extra={<span className={styles.ratings}>Rating : {movieData.Ratings[0].Value}</span>}
                    >
                        <Descriptions.Item label="Actors">{movieData.Actors}</Descriptions.Item>
                        <Descriptions.Item label="Awards">{movieData.Awards}</Descriptions.Item>
                        <Descriptions.Item label="Country">{movieData.Country}</Descriptions.Item>
                        <Descriptions.Item label="Director">{movieData.Director}</Descriptions.Item>
                        <Descriptions.Item label="Genre">{movieData.Genre}</Descriptions.Item>
                        <Descriptions.Item label="Language">{movieData.Language}</Descriptions.Item>
                        <Descriptions.Item label="Metascore">{movieData.Metascore}</Descriptions.Item>
                        <Descriptions.Item label="Plot">{movieData.Plot}</Descriptions.Item>
                        <Descriptions.Item label="Released">{movieData.Released}</Descriptions.Item>
                        <Descriptions.Item label="Response">{movieData.Response}</Descriptions.Item>
                        <Descriptions.Item label="Runtime">{movieData.Runtime}</Descriptions.Item>
                        <Descriptions.Item label="Type">{movieData.Type}</Descriptions.Item>
                        <Descriptions.Item label="Writer">{movieData.Writer}</Descriptions.Item>
                        <Descriptions.Item label="Year">{movieData.Year}</Descriptions.Item>
                        <Descriptions.Item label="imdbRating">{movieData.imdbRating}</Descriptions.Item>
                        <Descriptions.Item label="imdbVotes">{movieData.imdbVotes}</Descriptions.Item>
                        <Descriptions.Item label="totalSeasons">{movieData.totalSeasons}</Descriptions.Item>
                    </Descriptions>
                </Card>
                <div className={styles.btn} >
                    <Button onClick={goBack}>Go Back</Button>
                </div>
            </div>
        )
    }
}
