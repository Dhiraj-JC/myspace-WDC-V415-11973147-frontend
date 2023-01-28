import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { customGET, customDELETE } from '../Utilities/index';
import Book from './Book';

export default function Books() {
  const navigate = useNavigate();
  const [books, setBooks] = useState([]);

  useEffect(() => {
    customGET('books').then((response) => setBooks(response.data));
  }, []);

  function onDelete(id) {
    if (window.confirm('Do you really want to delete this item?')) {
      customDELETE(`books/${id}`).then((response) => {
        const nonDeletedBooks = books.filter(
          (book) => book._id !== response.data._id
        );
        setBooks(nonDeletedBooks);
      });
    }
  }

  return (
    <>
      <div className='container'>
        <div className='row'>
          <div className='col-12'>
            <h1 className='display-4 pb-2'>Books</h1>
            <button
              type='button'
              className='btn btn-primary btn-lg float-end'
              onClick={() => {
                navigate('/dashboard/books/new');
              }}
            >
              Add
            </button>
          </div>
        </div>
        <div className='row mt-5'>
          {books.map((book) => (
            <div className='col-3' key={book._id}>
              <Book book={book} onDelete={onDelete} />
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
