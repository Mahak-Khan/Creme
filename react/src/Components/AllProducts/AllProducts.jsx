import React from 'react'
import CategoryPage from '../CategoryPage/CategoryPage'
import BgAllProd from '../../Assets/all-banner.jpg'

const AllProducts = () => {
  return (
    <div>
      <CategoryPage title='All Products' bgImage={BgAllProd} categories={['All']}/>
    </div>
  )
}

export default AllProducts
