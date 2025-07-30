import { createContext, useContext, useState, useEffect } from "react";

const BookContext = createContext()

export const useBookContext = () => useContext(BookContext)

export const BookProvider = ({children}) => {
    const[favorites, setFavorites] = useState([])
    
    useEffect(() => {
        const storedFavs = localStorage.getItem("favorites")

        if(storedFavs) setFavorites(JSON.parse(storedFavs))
    },[])

    useEffect(() => {
        localStorage.setItem('favorites', JSON.stringify(favorites))
    },[])

    const addToFav = (book) => {
        
        setFavorites(prev => [...prev, book])
    }
    const removeFromFav = (bookId) => {
        setFavorites(prev => prev.filter(book => book.id !== bookId))
    }

    const isFav = (bookId) => {
        return favorites.some(book => book.id === bookId)
    }

    const value = {
        favorites,
        addToFav,
        removeFromFav,
        isFav
    }
    return <BookContext.Provider value={value}>
        {children}
    </BookContext.Provider>
}