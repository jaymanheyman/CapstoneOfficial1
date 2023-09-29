import React, { useEffect } from 'react'
import Footer from './includes/Footer';
import Header from './includes/Header';
import Spinner from '../components/Spinner';
import NotFound from "../components/404";
import ProductDetails from '../components/ProductDetails1';
import { useParams } from 'react-router-dom';
import { useGetProductQuery } from "../store/apiquery/productApiSlice"

const ViewProduct = () => {

  const params = useParams()
  const { isLoading, data : details , isSuccess, isError } = useGetProductQuery(params.id || '');


  return (
    <>
        <Header />
        {
          !isLoading && isSuccess ? <ProductDetails product={details.data}/> : 
          (isError ? <NotFound /> : <Spinner />)
        }
        <Footer />
    </>
  )
}

export default ViewProduct;