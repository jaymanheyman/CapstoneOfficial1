import React, { useEffect, useState } from 'react';
import AddToCart from './AddToCart';
import AddToWishlist from './AddToWishlist';
import { Link } from 'react-router-dom';
import './ProductCart.css';

export type ProductType = {
  id: number;
  image: string;
  title: string;
  price: number;
  old_price: number;
  discount?: string;
  category?: string;
  description?: string;
  quantity?: number;
  total_quantity: number;
  category_id?: number;
  type?: string;
  rating?: {
    rate: number;
    count: number;
  };
};

const ProductCart = (props: ProductType) => {
  const [product, setProduct] = useState<ProductType | null>(null);
  const [showFullDescription, setShowFullDescription] = useState(false);
  
 

  useEffect(() => {
    // Fetch product details from the FakeStoreAPI based on props.id
    fetch(`https://fakestoreapi.com/products/${props.id}`)
      .then((response) => response.json())
      .then((data) => setProduct(data))
      .catch((error) => console.error('Error fetching product:', error));
  }, [props.id]);

  if (!product) {
    return <div>Loading...</div>;
  }

  // Display a shortened or full description based on the state
  const descriptionToDisplay = showFullDescription ? product.description : product.description?.slice(0, 150) + (product.description?.length! > 150 ? '...' : '');

  return (
    <div className="position-relative bg-white mt-4 border-1 border fd-hover-border-primary product-cart" style={{ minHeight: '250px' }}>
      <div className="c">
        <div className="position-relative h-100 col-6  product-img">
          <img src={product.image} alt={product.title} className="w-100 h-100" />
        </div>
        <div className="title">
          <div>
            <Link to={`/productss/${props.id}`} className="product-name my-2 fw-bold text-dark">
              {product.title}
            </Link>
          </div>
          
          <div className="d-flex r-r">
           
            <p className="fw-bold opacity-50">
              Rating: {product.rating?.rate} <br /> ({product.rating?.count} reviews)
            </p>
            <h5 className="fd-color-primary">${product.price}</h5>
          </div>
          <p className="">
            {descriptionToDisplay}
            {product.description?.length! > 150 && (
              <a
                className="read-more"
                onClick={() => setShowFullDescription(!showFullDescription)}
              >
                {showFullDescription ? 'Show Less' : 'Read More'}
              </a>
            )}
          </p>
          <div className="d-flex gap-2 l-c-v">
            <AddToCart product={product} />
            <div>
              <Link to={`/productss/${props.id}`} className="fd-btn rounded-3">
                <i className="bi bi-eye"></i>
              </Link>
            </div>
            <div>
              <AddToWishlist product={product} classSup="rounded-3" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCart;
