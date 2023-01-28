import { useParams, useNavigate } from 'react-router-dom';
import {
  customGET,
  customPUT,
  getConvertStringNumberToNumber,
} from '../Utilities/index';
import { useEffect, useState } from 'react';

export default function UpdateProduct() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [name, setName] = useState('');
  const [nameError, setNameError] = useState('');

  const [description, setDescription] = useState('');
  const [descriptionError, setDescriptionError] = useState('');

  const [quantity, setQuantity] = useState(0);
  const [quantityError, setQuantityError] = useState('');

  const [price, setPrice] = useState(0);
  const [priceError, setPriceError] = useState('');

  useEffect(() => {
    customGET(`products/${id}`).then((response) => {
      const { name, description, quantity, price } = response.data;
      setName(name);
      setDescription(description);
      setQuantity(quantity);
      setPrice(price);
    });
  }, [id]);

  function setNameAndNameError(value, isOnBlur = false) {
    if(isOnBlur) {
      value = value.trim();
    }
    setName(value);

    if (value === '') {
      setNameError('Please enter product name');
    } else {
      setNameError('');
    }
  }

  function setDescriptionAndDescriptionError(value, isOnBlur = false) {
    if(isOnBlur) {
      value = value.trim();
    }
    
    setDescription(value);

    if (value === '') {
      setDescriptionError('Please enter product description');
    } else {
      setDescriptionError('');
    }
  }

  function setQuantityAndQuantityError(value) {
    setQuantity(value);

    const convertedValue = getConvertStringNumberToNumber(value);

    if (value === '') {
      setQuantityError('Please enter the quantity');
    } else if (convertedValue <= 0) {
      setQuantityError('Please enter quantity greater than zero');
    } else if (convertedValue >= 100000) {
      setQuantityError('Please enter quantity less than 100000');
    } else {
      setQuantityError('');
    }
  }

  function setPriceAndPriceError(value) {
    setPrice(value);
    const convertedValue = getConvertStringNumberToNumber(value);

    if (value === '') {
      setPriceError('Please enter price');
    } else if (convertedValue <= 0) {
      setPriceError('Please enter price greater than zero');
    } else {
      setPriceError('');
    }
  }

  function onSubmit(event) {
    event.preventDefault();

    setNameAndNameError(name);
    setDescriptionAndDescriptionError(description);
    setPriceAndPriceError(price);
    setQuantityAndQuantityError(quantity);

    if (nameError || descriptionError || priceError || quantityError) {
      return;
    }

    const request = {
      name: name,
      description: description,
      quantity: quantity,
      price: price,
    };

    customPUT(`products/${id}`, request).then((response) =>
      navigate('/dashboard/products')
    );
  }

  return (
    <div className='container mt-5'>
      <div className='card'>
        <h5 className='card-header'>Update</h5>
        <div className='card-body'>
          <form onSubmit={onSubmit}>
            <div className='form-group mt-2'>
              <label htmlFor='productName' className='mb-2'>
                Product Name
              </label>
              <input
                type='text'
                className={`form-control ${nameError && 'is-invalid'}`}
                id='productName'
                placeholder='Product Name'
                value={name}
                onChange={(event) => setNameAndNameError(event.target.value)}
                onBlur={(event) => setNameAndNameError(event.target.value,true)}
              />
              {nameError && <span className='text-danger'>{nameError}</span>}
            </div>
            <div className='form-group mt-2'>
              <label htmlFor='productDescription' className='mb-2'>
                Product Description
              </label>
              <textarea
                type='text'
                className={`form-control ${descriptionError && 'is-invalid'}`}
                id='productDescription'
                placeholder='Product Description'
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
              <div className='row'>
                <div className='col'>
                  <label htmlFor='productQuantity' className='mb-2'>
                    Product Quantity
                  </label>
                  <input
                    type='number'
                    className={`form-control ${quantityError && 'is-invalid'}`}
                    placeholder='Quantity'
                    id='productQuantity'
                    value={quantity}
                    onChange={(event) =>
                      setQuantityAndQuantityError(event.target.value)
                    }
                    onBlur={(event) =>
                      setQuantityAndQuantityError(event.target.value)
                    }
                  />
                  {quantityError && (
                    <span className='text-danger'>{quantityError}</span>
                  )}
                </div>
                <div className='col'>
                  <label htmlFor='productPrice' className='mb-2'>
                    Product Price
                  </label>
                  <input
                    type='number'
                    className={`form-control ${priceError && 'is-invalid'}`}
                    placeholder='price'
                    id='productPrice'
                    value={price}
                    onChange={(event) =>
                      setPriceAndPriceError(event.target.value)
                    }
                    onBlur={(event) =>
                      setPriceAndPriceError(event.target.value)
                    }
                  />
                  {priceError && (
                    <span className='text-danger'>{priceError}</span>
                  )}
                </div>
              </div>
            </div>
            <div className='form-group mt-5'>
              <button type='submit' className='btn btn-primary'>
                Update
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
