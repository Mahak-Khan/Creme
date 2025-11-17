import React from 'react'
import CategoryPage from '../CategoryPage/CategoryPage'
import BgCookieBiscuits from '../../Assets/CookieBiscuits-banner.jpg'

const Cookies = () => {
  return (
    <div>
      <CategoryPage title='Cookies & Biscuits' bgImage={BgCookieBiscuits} categories={['Cookies']}/>
    </div>
  )
}

export default Cookies
