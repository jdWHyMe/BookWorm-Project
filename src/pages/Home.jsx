import BookCard from "../Components/BookCard";
import FeaturePanel from "../Components/FeaturePanel";
import { useState, useEffect, use } from "react"
import { searchBooks, getLatestsBooks } from "../services/api";
import '../css/Home.css'

function Home(){
    const [searchQuery, setSearchQuery] = useState("");
    const [books, setBooks] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    const [selectedBook, setSelectedBook] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const Modal = ({book, onClose}) => {
        if(!book) return null;

        return (<div className="modal-overlay" onClick={onClose}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                <img src={book.volumeInfo.imageLinks?.thumbnail} alt = {book.volumeInfo.title}/>
                <h2>{book.volumeInfo.title}</h2>
                <p>{book.volumeInfo.description}</p>
                <button onClick={onClose}>Close</button>
            </div>
        </div>);
    };
    useEffect(() => {
        const loadBooks = async () => {
            try
            {
                const latestBooks = await getLatestsBooks()
                setBooks(latestBooks)
            }
            catch(err)
            {
                console.log(err)
                setError("Failed to load books...")
            }
            finally
            {
                setLoading(false)
            }
        }

        loadBooks()
    }, [])
    
    const handleSearch = async (e) => {
        e.preventDefault()
        if(!searchQuery.trim())return
        if(loading) return
        setLoading(true);
        try 
        {
            const searchResults = await searchBooks(searchQuery)
            setBooks(searchResults)
            setError(null)
        } 
        catch (err) 
        {
            console.log(err)
            setError("Failed to find book...")
        }
        finally{setLoading(false)}
        setSearchQuery("");
    };

    const handleBookClick = (book) => {
        setSelectedBook(book);
        setIsModalOpen(true);
    };
    const closeModal = () => {
        setIsModalOpen(false);
        setSelectedBook(null);
    }

    return <div className="home">
        <form onSubmit={handleSearch} className="search-form">
            <input type="text" 
            placeholder="Search for book..." 
            className="search-input"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button type="submit" className="search-button">Search</button>
        </form>
        {error && <div className="error-message"> {error} </div>}
        {loading ? (
            <div className="loading">Loading...</div>
        ) : (
            <div className="main-div">
                <FeaturePanel book={books[0]}/>
                <div className="book-grid">
                {books.map(book => (
                    <BookCard book={book} key={book.id} onClick={() => handleBookClick(book)}/>
                    ))}
                </div>                
            </div>
        )}
        {console.log(selectedBook)}
        {console.log(isModalOpen)}
        {isModalOpen && <Modal book={selectedBook} onClose={closeModal} />}
    </div>
}

export default Home;