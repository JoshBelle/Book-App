import { deleteBook, toggleFavourite } from '../../redux/books/actionCreators'
import { useSelector, } from 'react-redux/es/hooks/useSelector'
import { useDispatch } from 'react-redux'
import { BsBookmarkStar } from "react-icons/bs";
import { BsBookmarkStarFill } from "react-icons/bs";
import './BookList.css'

const BookList = () => {
  const books = useSelector((state) => state.books)
  const dispatch = useDispatch()

  const handleDeleteBook = (id) => {
    dispatch(deleteBook(id))
  }

  const handleToggleFavourite = (id) => {
    dispatch(toggleFavourite(id))
  }

  return (
    <div className="app-block book-list">
        <h2>Book List</h2>
        {books.length === 0 ? 
          (<p>No Books Available</p>) 
          : (
            <ul>
              {books.map((book, i) => (
                <li key={book.id}>
                  <div className="book-info">
                      {++i}. {book.title} by <strong>{book.author}</strong>
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
