import '../css/FeaturePanel.css'
import BookCard from './BookCard';

function FeaturePanel({book})
{
    if (!book) return null;
    const info = book.volumeInfo;
    return <>
        <div className='featured'>
            <div className='featured-book'> 
                <div className='featured-book-cover'>
                    <img src={info.imageLinks?.thumbnail} alt = {info.title}/>
                </div>
                <div className='featured-book-details'>
                    <h2 className='featured-book-title'>{info.title}</h2>
                    <p className='featured-desription'>
                        {info.description}
                    </p>
                </div>
            </div>
        </div>
    </>    
}

export default FeaturePanel;
