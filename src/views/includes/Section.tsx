import React, { FC, useEffect, useState } from 'react';
import ProductCart, { ProductType } from '../../components/ProductCart';
import { Link } from 'react-router-dom';
import Spinner from '../../components/Spinner';
import RoutePaths from '../../config';

const Category = ({ category, arrow = 'left' }: { category: any; arrow?: string }) => {
  return (
    <div key={category.id} className="category text-dark">
      {arrow === 'left' ? <i className='bi bi-chevron-double-right me-2'></i> : null}
      <Link to={"/"} className='text-dark'>{category.name}</Link>
      {arrow === 'right' ? <i className='bi bi-chevron-right float-end opacity-75 me-2'></i> : null}
    </div>
  );
}

const About: FC = () => {
  return (
    <div className="section-info p-2 py-4 rounded-3 my-5 border-2 border-color-light shadow text-black" style={{ minHeight: '100px' }}>
      <div className="container-fluid">
        <div className="row ">
          <div className="col-12 col-lg-3 py-3 py-lg-0 d-flex gap-2">
            <div className='w-25 text-center align-self-center'><i className="bi bi-bus-front fa-2x bg-"></i></div>
            <div><h6 className='fw-bold'>Free Shipping</h6><span className="font-light opacity-75">Free USA shipping when you spend $30.</span></div>
          </div>
          <div className="col-12 col-lg-3 py-3 py-lg-0 d-flex gap-2">
            <div className='w-25 text-center align-self-center'><i className="bi bi-flower2 fa-2x bg-"></i></div>
            <div><h6 className='fw-bold'>Get Fresh Products</h6><span className="font-light opacity-75">Find a wide range of fresh new clothing products.</span></div>
          </div>
          <div className="col-12 col-lg-3 py-3 py-lg-0 d-flex gap-2">
            <div className='w-25 text-center align-self-center'><i className="bi bi-currency-dollar fa-2x bg-"></i></div>
            <div><h6 className='fw-bold'>Moneyback Offer</h6><span className="font-light opacity-75">Free USA shipping when you spend $30.</span></div>
          </div>
          <div className="col-12 col-lg-3 py-3 py-lg-0 d-flex gap-2">
            <div className='w-25 text-center align-self-center'><i className="bi bi-shield-x fa-2x bg-"></i></div>
            <div><h6 className='fw-bold'>Safe Payment</h6><span className="font-light opacity-75">We are using secure payment methods.</span></div>
          </div>
        </div>
      </div>
    </div>
  );
}

const PopularProducts = ({ grid = 3, type = 'grid', products }: { grid?: number | boolean; type?: string; products: ProductType[] }) => {
  return (
    <div className={type === 'list' ? "test" : `d-grid gap-3 grid-0 grid-lg-${grid}`}>
      {products.map((product: ProductType) => (
        <ProductCart {...product} type="grid" key={product.id} />
      ))}
    </div>
  );
}

const Section: FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedOption, setSelectedOption] = useState<string>('Low to High');
  const [productsList, setProductsList] = useState<ProductType[]>([]);
  const [categories, setCategories] = useState<string[]>([]); // State to hold categories

  useEffect(() => {
    // Fetch the categories from the API
    fetch('https://fakestoreapi.com/products/categories')
      .then((response) => response.json())
      .then((data: string[]) => {
        setCategories(data);
      })
      .catch((error) => {
        console.error('Error fetching categories:', error);
      });

    // Fetch the products from the API
    fetch('https://fakestoreapi.com/products')
      .then((response) => response.json())
      .then((data: ProductType[]) => {
        setProductsList(data);
      })
      .catch((error) => {
        console.error('Error fetching products:', error);
      });
  }, []);

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedCategory(e.target.value);
  };

  const handleOptionChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedOption(e.target.value);
  };

  // Filter products based on selected category
  const filteredProducts = productsList.filter((product: ProductType) => {
    if (selectedCategory === 'All') {
      return true; // Show all products if 'All' is selected
    }
    return product.category === selectedCategory;
  });

  // Sort products based on selected option
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (selectedOption === 'Low to High') {
      return a.price - b.price;
    } else {
      return b.price - a.price;
    }
  });

  return (
    <section>
      <div className="container-fluid">
        <div className='px-3 px-lg-5 py-4'>
          <About />
          <div className="popular-products text-black my-5">
            <div className="d-flex flex-wrap justify-content-between mb-5">
              <h4>Popular Products</h4>
             
            </div>
            <div style={{ display: "flex", justifyContent: "space-between" }} className="filters">
              <div className="sortFilter">
                <label htmlFor="category">Sort Product:</label> <br />
                <select id="category" value={selectedCategory} onChange={handleCategoryChange}>
                  <option value="All">All</option>
                  {categories.map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <div className="priceFilter">
                  <label htmlFor="sort">Filter by Price:</label> <br />
                  <select id="sort" value={selectedOption} onChange={handleOptionChange}>
                    <option value="Low to High">Low to High</option>
                    <option value="High to Low">High to Low</option>
                  </select>
                </div>
              </div>
            </div>
            <PopularProducts grid={3} products={sortedProducts} /> {/* Pass the sorted products */}
          </div>
        </div>
      </div>
    </section>
  )
}

export { Section, PopularProducts, Category };
