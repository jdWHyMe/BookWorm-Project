import '../css/BookCard.css'
import { useBookContext } from '../contexts/BookContext';

function BookCard({book, onClick})
{
    const info = book.volumeInfo;
    const authors = info.authors ? info.authors.join(", ") : "Unknown Author";

    const{isFav, addToFav, removeFromFav} = useBookContext()
    const favorite = isFav(book.id)
    function onClickFavorite(e)
    {
        e.preventDefault()
        if(favorite) removeFromFav(book.id)
        else addToFav(book)
    }
    return <>
        <div className="book-card" >
            <div className="book-cover" >
                <img src={info.imageLinks?.thumbnail} alt = {info.title} />
                <div className='book-overlay' onClick={onClick}>

                </div>                    
                <button className={`favorite-btn ${favorite ? "active" : ""}`} onClick={onClickFavorite}>
                    ♥
                </button>
            </div>
            <div className="book-info" >
                <h3>{info.title}</h3>
                <p>{authors}</p>
            </div>
        </div>
    </>
}

export default BookCard;