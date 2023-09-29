import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import NumberCount from './NumberCount';
import { Carousel } from 'react-responsive-carousel';
import AddToCart from './AddToCart';
import { ProductType } from './ProductCart';
import { link } from '../Utils/Generals';
import Header from '../views/includes/Header';
const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState<ProductType | null>(null);

  useEffect(() => {
    // Fetch product details based on the 'id' parameter
    fetch(`https://fakestoreapi.com/products/${id}`)
      .then((response) => response.json())
      .then((data) => setProduct(data))
      .catch((error) => console.error('Error fetching product:', error));
  }, [id]);

  return (
    <><Header/>
    <div className='view-product px-3 px-lg-5'>
      
      {product ? (
        <div className="details-generals border border-1 fd-hover-border-primary bg-white row text-black justify-content-between p-5 gap-2 mt-5" style={{minHeight : '400px'}}>
          <div className='p-img col-12 col-lg-6'>
            <div className="product-img col-9 h-25">
              <Carousel showArrows={false} showIndicators={false} swipeable={true}>
                <div className="others-img"> <img src={product.image} alt={product.title}  /></div>
                <div className="others-img"> <img src={product.image} alt={product.title}  /></div>
                <div className="others-img"> <img src={product.image} alt={product.title}  /></div>
                <div className="others-img"> <img src={product.image} alt={product.title}  /></div>
              </Carousel>
            </div>
          </div>
          <div className="p-details col-12 col-lg-5">
        
            <p className="fw-bold opacity-50">
              Rating: {product.rating?.rate} <br /> ({product.rating?.count} reviews)
            </p>
          
            <h3 className="fw-bold my-4">{product.title}</h3>
            <p className='fw-bold opacity-75'>{product.description}</p>
            <div className="d-flex flex-wrap gap-2">
              <h1 className="fw-bold fd-color-primary">${product.price}</h1>
              <h2 className="fw-bold align-self-end" style={{textDecoration : "line-through"}}>${product.old_price}</h2>
            </div><hr />
            
            <div className="p-types d-flex flex-wrap gap-2 align-items-center">
              <h5 className="fw-bold d-flex flex-wrap gap-2 mb-0">Colors : </h5>
              <div className='d-flex flex-wrap gap-2'>
                <span className='p-color bg-danger'></span><span className='p-color bg-warning'></span>
                <span className='p-color bg-info'></span><span className='p-color bg-primary'></span><span className='p-color bg-secondary'></span>
              </div>
            </div>
            
            <div className='d-flex flex-wrap gap-2 my-4'>
              <NumberCount product={product} min={1} />
              <AddToCart product={product} divClass='align-self-center'/>
            </div>
            <div className="p-share d-flex flex-wrap gap-2 align-items-center">
              <h5 className="fw-bold d-flex flex-wrap gap-2 mb-0">Share : </h5>
              <div className='d-flex flex-wrap gap-2'>
                <div><a href="#" className='text-black'><i className="bi bi-facebook"></i></a></div>
                <div><a href="#" className='text-black'><i className="bi bi-twitter"></i></a></div>
                <div><a href="#" className='text-black'><i className="bi bi-pinterest"></i></a></div>
                <div><a href="#" className='text-black'><i className="bi bi-instagram"></i></a></div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div>Loading...</div>
      )}
    </div></>
    
  );
};

export default ProductDetails;
