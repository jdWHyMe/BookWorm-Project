import '../css/Favorites.css'
import { useBookContext } from '../contexts/BookContext';
import BookCard from '../Components/BookCard';

function Favorites()
{
    const {favorites} = useBookContext();

    if(favorites)
    {
        return <div className='favorites'>
            <h2>Your favorites</h2>
            <div className="book-grid">
            {favorites.map(book => (
                <BookCard book={book} key={book.id}/>
                ))}
            </div> 
        </div>
    }
    else {return <div className="favorites-empty">
        <h2>No books</h2>
        <p>Start liking books</p>
    </div>}
}

export default Favorites;