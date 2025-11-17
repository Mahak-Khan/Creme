import React from 'react'
import CategoryPage from '../CategoryPage/CategoryPage'
import BgBreadBun from '../../Assets/BreadBun-banner.jpg'

const Breads = () => {
  return (
    <div>
      <CategoryPage title='Breads & Buns' bgImage={BgBreadBun} categories={['Breads']}/>
    </div>
  )
}

export default Breads
