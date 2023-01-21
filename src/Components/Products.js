import { useState, useEffect } from 'react';
import { customGET } from '../Utilities/index';
import Product from './Product';

export default function Products() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    customGET('products').then((response) => {
      const products = response.data;
      setProducts(products);
    });
  }, []);

  return (
    <>
      <div className='container'>
        <div className='row'>
          <div className='col-12'>
            <h1 className='display-4 pb-2'>Products</h1>
            <button type='button' className='btn btn-primary btn-lg float-end'>
              Add
            </button>
          </div>
        </div>
        <div className='row mt-5'>
          {products.map((product) => (
            <div className='col-3'>
              <Product product={product} />
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
