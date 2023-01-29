import { useState } from 'react';
import { customPOST } from '../Utilities';
import { useNavigate } from 'react-router-dom';

export default function CreateBook() {
  const [name, setName] = useState('');
  const [nameError, setNameError] = useState('');

  const [description, setDescription] = useState('');
  const [descriptionError, setDescriptionError] = useState('');

  const [authorName, setAuthorName] = useState('');
  const [authorNameError, setAuthorNameError] = useState('');

  const [publishedYear, setPublishedYear] = useState(2023);
  const [publishedYearError, setPublishedYearError] = useState('');

  const navigate = useNavigate();

  function setNameAndNameError(value, isOnBlur) {
    if (isOnBlur) {
      value = value.trim();
    }
    setName(value);
    if (value === '') {
      setNameError('Please enter a book name');
    } else {
      setNameError('');
    }
  }

  function setDescriptionAndDescriptionError(value, isOnBlur) {
    if (isOnBlur) {
      value = value.trim();
    }
    setDescription(value);
    if (value === '') {
      setDescriptionError('Please enter a book description');
    } else {
      setDescriptionError('');
    }
  }

  function setAuthorNameAndAuthorNameError(value, isOnBlur) {
    if (isOnBlur) {
      value = value.trim();
    }
    setAuthorName(value);
    if (value === '') {
      setAuthorNameError('Please enter a book author name');
    } else {
      setAuthorNameError('');
    }
  }

  function setPublishedYearAndPublishedYearError(value) {
    setPublishedYear(value);
    if (value === '') {
      setPublishedYearError('Please enter the book published year');
    } else {
      setPublishedYearError('');
    }
  }

  function onSubmit(event) {
    event.preventDefault();

    setNameAndNameError(name);
    setDescriptionAndDescriptionError(description);
    setAuthorNameAndAuthorNameError(authorName);
    setPublishedYearAndPublishedYearError(publishedYear);

    if (
      nameError ||
      descriptionError ||
      authorNameError ||
      publishedYearError
    ) {
      return;
    }

    const request = {
      name: name,
      description: description,
      authorName: authorName,
      publishedYear: publishedYear,
    };

    customPOST('books', request).then((response) =>
      navigate('/dashboard/books')
    );
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
                className={`form-control ${nameError && 'is-invalid'}`}
                placeholder='Book Name'
                maxLength={40}
                value={name}
                onChange={(event) => setNameAndNameError(event.target.value)}
                onBlur={(event) =>
                  setNameAndNameError(event.target.value, true)
                }
              />
              {nameError && <span className='text-danger'>{nameError}</span>}
            </div>
            <div className='form-group mt-2'>
              <label htmlFor='bookDescription' className='mb-2'>
                Book Description
              </label>
              <textarea
                type='text'
                id='bookDescription'
                className={`form-control ${descriptionError && 'is-invalid'}`}
                placeholder='Book Description'
                value={description}
                onChange={(event) =>
                  setDescriptionAndDescriptionError(event.target.value)
                }
                onBlur={(event) =>
                  setDescriptionAndDescriptionError(event.target.value, true)
                }
              />
              {descriptionError && (
                <span className='text-danger'>{descriptionError}</span>
              )}
            </div>
            <div className='form-group mt-2'>
              <label htmlFor='authorName' className='mb-2'>
                Author Name
              </label>
              <input
                type='text'
                id='authorName'
                className={`form-control ${authorNameError && 'is-invalid'}`}
                placeholder='Author Name'
                maxLength={50}
                value={authorName}
                onChange={(event) =>
                  setAuthorNameAndAuthorNameError(event.target.value)
                }
                onBlur={(event) =>
                  setAuthorNameAndAuthorNameError(event.target.value, true)
                }
              />
              {authorNameError && (
                <span className='text-danger'>{authorNameError}</span>
              )}
            </div>
            <div className='form-group mt-2'>
              <label htmlFor='publishedYear' className='mb-2'>
                Published Year
              </label>
              <input
                type='number'
                id='publishedYear'
                className={`form-control ${publishedYearError && 'is-invalid'}`}
                placeholder='Published Year'
                maxLength={4}
                value={publishedYear}
                onChange={(event) =>
                  setPublishedYearAndPublishedYearError(event.target.value)
                }
                onBlur={(event) =>
                  setPublishedYearAndPublishedYearError(
                    event.target.value,
                    true
                  )
                }
              />
              {publishedYearError && (
                <span className='text-danger'>{publishedYearError}</span>
              )}
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
