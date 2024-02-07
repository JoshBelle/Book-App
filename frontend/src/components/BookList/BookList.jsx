import { deleteBook, toggleFavourite } from '../../redux/books/actionCreators'
import { useSelector, } from 'react-redux/es/hooks/useSelector'
import { useDispatch } from 'react-redux'
import { BsBookmarkStar } from "react-icons/bs";
import { BsBookmarkStarFill } from "react-icons/bs";
import './BookList.css'
import { selectTitleFilter, selectOnlyFavouriteFilter, selectAuthorFilter } from '../../redux/slices/filterSlice';

const BookList = () => {
  const books = useSelector((state) => state.books)
  const titleFilter = useSelector(selectTitleFilter)
  const authorFilter = useSelector(selectAuthorFilter)
  const onlyFavouriteFilter = useSelector(selectOnlyFavouriteFilter)
  const dispatch = useDispatch()

  const handleDeleteBook = (id) => {
    dispatch(deleteBook(id))
  }

  const handleToggleFavourite = (id) => {
    dispatch(toggleFavourite(id))
  }

  const filteredBooks = books.filter((book) => {
    const matchesTitle = book.title.toLowerCase().includes(titleFilter.toLowerCase())
    const matchesAuthor = book.author.toLowerCase().includes(authorFilter.toLowerCase())
    const matchesFavourite = onlyFavouriteFilter ? book.isFavourite : true
    return matchesTitle && matchesAuthor && matchesFavourite
  })

  const hightLightMatch = (text, filter) => {
    if (!filter) return text
    const regex = new RegExp(`(${filter})`, 'gi')

    return text.split(regex).map((substring, i) => {
        if (substring.toLowerCase() === filter.toLowerCase()){
          return (
            <span key={i} className="highlight">
              {substring}
            </span>
          )
        }
        return substring; 
    })
}

  return (
    <div className="app-block book-list">
        <h2>Book List</h2>
        {books.length === 0 ? 
          (<p>No Books Available</p>) 
          : (
            <ul>
              {filteredBooks.map((book, i) => (
                <li key={book.id}>
                  <div className="book-info">
                      {++i}. {hightLightMatch(book.title, titleFilter)} by <strong>{hightLightMatch(book.author, authorFilter)}</strong>
                  </div>
                  <div className="book-action">
                    <span onClick={() => handleToggleFavourite(book.id)}>
                      {book.isFavourite ? 
                      (<BsBookmarkStarFill className='star-icon' />) 
                      :(<BsBookmarkStar className='star-icon'/>)}
                    </span>
                    <button onClick={() => handleDeleteBook(book.id)}> Delete </button>
                  </div>
                </li>
              ))}
            </ul>
          )
        }
    </div>
  )
}

export default BookList
