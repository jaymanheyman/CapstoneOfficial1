import React, { FC, SyntheticEvent, useEffect, useRef, useState } from 'react'
import { Link, Route } from 'react-router-dom'

import ViewCart from '../../components/ViewCart'
import ViewSearch from '../../components/ViewSearch'

import RoutePaths from '../../config'
import { cartKeyName, getItem, toggleLinkClass, wishlistKeyName } from '../../Utils/Generals'
import { ProductType } from '../../components/ProductCart'
import { fillProductsList, fillShoppingCart, fillWishList } from '../../store/productSlice'
import { useAppDispatch, useAppSelector } from '../../hooks/redux-hooks'
import { useGetAllProductsQuery } from '../../store/apiquery/productApiSlice'
import { setUser } from '../../store/userSlice'
import { useGetUserQuery } from '../../store/apiquery/usersApiSlice'

const navsBar = [
    { path: RoutePaths.home, name: 'Home' },
   
];

const Header: FC = () => {


    const wishlist: ProductType[] = useAppSelector((state) => state.productWishlist);
    const shoppingcart: ProductType[] = useAppSelector((state) => state.productCart);

    const dispatch = useAppDispatch();

    const [showCart, setShowCart] = useState(false);
    const [showSearch, setShowSearch] = useState(false);

    const isLogged = getItem(RoutePaths.token);
    const user = !isLogged ? null : JSON.parse(getItem('user') || '');
    const { data } = !user ? { data: null } : useGetUserQuery(user.id);

    useEffect(() => {

        if (data) {
            dispatch(setUser(data.data));
        }
    }
        , [data]);

    useEffect(() => {

        const wishList = getItem(wishlistKeyName);
        const shoppingList = getItem(cartKeyName);
        wishList && dispatch(fillWishList(wishList));
        shoppingList && dispatch(fillShoppingCart(shoppingList));

    }, [])

    const viewCart = (e: SyntheticEvent) => {
        e.preventDefault();
        setShowCart(true);
    };

    const viewSearch = (e: SyntheticEvent) => {
        e.preventDefault();
        setShowSearch(true);
    };

    return (<>
        <div className="header bg-white shadow sticky-top">
            
            <div className="navigation font-regular d-flex flex-wrap justify-content-between px-3 px-lg-5 ">
                <nav className='navbar col-12 col-lg-7 navbar-expand-lg'>
                    <Link to={"/"}  className='navbar-brand w-20 h-20 me-5'><img style={{width:"80px"}} src="https://static.vecteezy.com/system/resources/thumbnails/022/686/856/small/american-patriotic-eagle-illustration-artwork-patriot-eagles-transparent-background-t-shirt-tshirt-design-ai-generated-png.png" alt="Logo" /></Link>
                    <button className="navbar-toggler" data-bs-toggle="collapse" data-bs-target="#headerNavbar">
                        <span className="navbar-icon-toggler"><i className="bi bi-list"></i></span>
                    </button>
                    <nav className="collapse navbar-collapse" id="headerNavbar">
                        <div className="container-fluid d-lg-flex justify-content-between">
                            <ul className="navbar-nav d-lg-flex gap-3">
                                {
                                    navsBar.map((link) => {
                                        return <li key={link.name} className="navbar-item align-self-center">
                                            <Link to={link.path} className={"navbar-link fd-hover-color-primary " + toggleLinkClass(link.path, 'fd-underline') + " text-dark"} >{link.name}</Link>
                                        </li>
                                    })
                                }
                            </ul>
                        </div>
                    </nav>
                </nav>
                <div className="d-flex col-12 col-lg-3 gap-2 my-2 my-lg-0 align-self-center justify-content-end">
                    <div onClick={viewCart}><a href='#' className="position-relative border-3 shadow border-light py-2 px-3 text-dark fd-hover-bg-primary"><i className="bi bi-cart3"></i><span className="position-absolute top-0">{shoppingcart.length}</span></a></div>
                    <div><Link to={RoutePaths.wishlist} className="position-relative border-3 shadow border-light py-2 px-3 text-dark fd-hover-bg-primary"><i className="bi bi-heart"></i><span className="position-absolute top-0">{wishlist.length}</span></Link></div>
                    <div onClick={viewSearch}><a href='#' className="position-relative border-3 shadow border-light py-2 px-3 text-dark fd-hover-bg-primary"><i className="bi bi-search"></i></a></div>
                    <div>
                        <Link to="/login"
                            className="position-relative border-3 shadow border-light py-2 px-3 text-dark fd-hover-bg-primary"><i className="bi bi-person"></i>
                        </Link>
                    </div>
            </div>
        </div>
    </div >
        { showCart?<ViewCart setShow = { setShowCart } /> : null
}
{ showSearch ? <ViewSearch setShow={setShowSearch} /> : null }
    </>
    )
}

export default Header