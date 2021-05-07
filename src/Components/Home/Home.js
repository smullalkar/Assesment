import { useState } from 'react';
import axios from 'axios';
import { BASE_URL, FIRST_PAGE } from '../../Utils/Constants'
import Error from '../Common/Error/Error'
import { Select, Spin, Typography, Row, Col, Divider } from 'antd';
import styles from './Home.module.css'
import MovieCard from '../Common/MovieCard/MovieCard';
import { Link } from 'react-router-dom';
import Pages from '../Common/Pagination/Pagination';

const { Text, Title } = Typography;
const { Option } = Select;
export default function Home() {
    const [error, setError] = useState(null);
    const [friendlyError, setFriendlyError] = useState(null);
    const [isMovieFetched, setIsMovieFetched] = useState(true);
    const [data, setData] = useState([]);
    const [allMovieData, setAllMovieData] = useState([]);
    const [movie, setMovie] = useState(undefined);
    const [currentPage, setCurrentPage] = useState(1)

    let timeout;
    let currentValue;
    const onSearchMovie = (value, currentPage, callback) => {
        if (timeout) {
            clearTimeout(timeout);
            timeout = null;
        }
        currentValue = value;

        const fetchMovies = () => {
            let newUrl = new URL(BASE_URL)
            newUrl.searchParams.set("s", value);
            newUrl.searchParams.set("page", currentPage);
            setIsMovieFetched(false)
            axios.get(newUrl)
                .then((response) => {
                    // handle success
                    if (response.status === 200 && response.data.Response === 'False') {
                        setFriendlyError(response.data.Error)
                    }
                    if (response.status === 200 && (response.data || response.data.Response === 'True')) {
                        if (currentValue === value) {
                            callback(response.data);
                        }
                    }
                })
                .catch((error) => {
                    // handle error
                    setError(error)
                })
                .finally(response => setIsMovieFetched(true))
        }

        timeout = setTimeout(fetchMovies, 600);
    }

    const handleMovieSearch = value => {
        setFriendlyError(null)
        if (value) {
            onSearchMovie(value, FIRST_PAGE, data => setData(data));
        } else {
            setFriendlyError(null)
            setData([]);
        }
    };

    const handleMovieChange = value => {
        setMovie(value);
    };

    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            setMovie(event.target.value)
            onSearchMovie(event.target.value, FIRST_PAGE, data => setAllMovieData(data));
        }
    }

    // Pagination
    const pageChange = pageNumber => {
        setCurrentPage(pageNumber)
        onSearchMovie(movie, pageNumber, data => setAllMovieData(data));
    };

    if (error) {
        return <Error error={error} />;
    }
    else {
        return (
            <>
                <Title className={styles.title}>Movie Finder</Title>
                <div className={styles.centered}>
                    <Select
                        showSearch
                        value={movie}
                        placeholder='Enter a movie name'
                        style={{ width: '300px' }}
                        defaultActiveFirstOption={false}
                        showArrow={false}
                        allowClear
                        filterOption={false}
                        onSearch={handleMovieSearch}
                        onChange={handleMovieChange}
                        onKeyDown={handleKeyDown}
                        notFoundContent={isMovieFetched ? null : <Spin size='small' />}
                    >
                        {
                            data && data.Search && data.Search.map((movie, index) => (
                                <Option key={index} value={movie.imdbID}>
                                    <Link to={`/${movie.imdbID}`} className={styles.textDeco}>
                                        {movie.Title}
                                    </Link>
                                </Option>

                            ))
                        }
                    </Select>
                </div>
                {
                    friendlyError && friendlyError === 'Too many results.' ? <Text className={styles.centeredError} type="danger">{`${friendlyError} Please enter atleast 3 characters in a Movie Name for better results`}</Text> : <Text className={styles.centeredError} type="danger">{friendlyError}</Text>
                }
                <div className={styles.cardGrid}>
                    {
                        allMovieData && allMovieData.Search && <Divider orientation="center">Search Results</Divider>
                    }
                    <Row gutter={[16, 32]} justify="space-around">
                        {
                            allMovieData && allMovieData.Search && allMovieData.Search.map((movie, index) => (
                                <Col className="gutter-row" xs={{ span: 22 }} sm={{ span: 10 }} md={{ span: 10 }} lg={{ span: 7 }} xl={{ span: 5 }}>
                                    <Link to={`/${movie.imdbID}`}>
                                        <MovieCard Movie={movie} key={index} />
                                    </Link>
                                </Col>
                            ))
                        }
                    </Row>
                </div>
                {
                    allMovieData && allMovieData.Search && <Pages currentPage={currentPage} totalPages={allMovieData.totalResults} pageChange={pageChange} />
                }
            </>
        );
    }
}
