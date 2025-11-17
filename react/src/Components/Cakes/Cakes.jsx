import React from 'react'
import CategoryPage from '../CategoryPage/CategoryPage'
import BgCake from '../../Assets/Cake-banner.jpg'

const Cakes = () => {
  
  return (
    <div>
      <CategoryPage title='Cakes & Pasteries' bgImage={BgCake} categories={['Cakes', 'Pastries']}/>
    </div>
  )
}

export default Cakes
