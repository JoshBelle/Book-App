import { useDispatch, useSelector } from 'react-redux'
import { 
  setOnlyFavouriteFilter, 
  selectOnlyFavouriteFilter, 
  resetFilters, 
  setAuthorFilter, 
  selectAuthorFilter,
  selectTitleFilter, 
  setTitleFilter 
} from '../../redux/slices/filterSlice'
import './Filter.css'

const Filter = () => {
  const dispatch = useDispatch()
  const titleFilter = useSelector(selectTitleFilter)
  const authorFilter = useSelector(selectAuthorFilter)
  const onlyFavouriteFilter = useSelector(selectOnlyFavouriteFilter)

  const handleTitleFilterChange = (e) => {
    dispatch(setTitleFilter(e.target.value))
  }

  const handleAuthorFilterChange = (e) => {
    dispatch(setAuthorFilter(e.target.value))
  }

  const handleResetFilters = () => {
    dispatch(resetFilters())
  }

  const handleOnlyFavouriteFilterChange = () => {
    dispatch(setOnlyFavouriteFilter())
  }

  return (
    <div className="app-block filter">
      <div className='filter-row'>
          <div className='filter-group'>
            <input 
              onChange={handleTitleFilterChange}
              value={titleFilter}
              type="text" 
              placeholder="Filter by title ..."/>
          </div>
          <div className='filter-group'>
            <input 
              onChange={handleAuthorFilterChange}
              value={authorFilter}
              type="text" 
              placeholder="Filter by author ..."/>
          </div>
          <div className="filter-group">
            <label>
              <input type="checkbox" checked={onlyFavouriteFilter} onChange={handleOnlyFavouriteFilterChange}/>
              Only Favourite
            </label>
          </div>
          <button type="button" onClick={handleResetFilters}>Reset Filters</button>
      </div>
    </div>
  )
}

export default Filter
