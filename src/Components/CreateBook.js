import { useState } from 'react';
import { customPOST } from '../Utilities';
import { useNavigate } from 'react-router-dom';

export default function CreateBook() {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [authorName, setAuthorName] = useState('');
  const [publishedYear, setPublishedYear] = useState(2023);

  const navigate = useNavigate();

  function onSubmit(event) {
    event.preventDefault();

    const request = {
      name: name,
      description: description,
      authorName: authorName,
      publishedYear: publishedYear
    };

    customPOST('books',request)
    .then(response => navigate('/dashboard/books'));
  }

  return (
    <div className='container mt-5'>
      <div className='card'>
        <h5 className='card-header'>Add</h5>
        <div className='card-body'>
          <form onSubmit={onSubmit}>
            <div className='form-group mt-2'>
              <label htmlFor='bookName' className='mb-2'>
                Book Name
              </label>
              <input
                type='text'
                id='bookName'
                className='form-control'
                placeholder='Book Name'
                maxLength={40}
                value={name}
                onChange={(event) => setName(event.target.value)}
                onBlur={(event) => setName(event.target.value)}
              />
            </div>
            <div className='form-group mt-2'>
              <label htmlFor='bookDescription' className='mb-2'>
                Book Description
              </label>
              <textarea
                type='text'
                id='bookDescription'
                className='form-control'
                placeholder='Book Description'
                value={description}
                onChange={(event) => setDescription(event.target.value)}
                onBlur={(event) => setDescription(event.target.value)}
              />
            </div>
            <div className='form-group mt-2'>
              <label htmlFor='authorName' className='mb-2'>
                Author Name
              </label>
              <input
                type='text'
                id='authorName'
                className='form-control'
                placeholder='Author Name'
                maxLength={50}
                value={authorName}
                onChange={(event) => setAuthorName(event.target.value)}
                onBlur={(event) => setAuthorName(event.target.value)}
              />
            </div>
            <div className='form-group mt-2'>
              <label htmlFor='publishedYear' className='mb-2'>
                Published Year
              </label>
              <input
                type='number'
                id='publishedYear'
                className='form-control'
                placeholder='Published Year'
                maxLength={4}
                value={publishedYear}
                onChange={(event) => setPublishedYear(event.target.value)}
                onBlur={(event) => setPublishedYear(event.target.value)}
              />
            </div>
            <div className='form-group mt-5'>
              <button type='submit' className='btn btn-primary'>
                Save
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
