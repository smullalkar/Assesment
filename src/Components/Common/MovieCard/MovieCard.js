import { Card } from 'antd';

const { Meta } = Card;

const MovieCard = ({ Movie }) => {
    const description = (
        <div>
            <div>Type : {Movie.Type}</div>
            <div>Year : {Movie.Year}</div>
            <div>IMDB ID : {Movie.imdbID}</div>
        </div>
    )
    return (
        <Card
            hoverable
            cover={<img alt="example" height='470px' src={Movie.Poster} />}
        >
            <Meta title={Movie.Title} description={description} />
        </Card>
    )
}

export default MovieCard