import React from 'react'
import style from './dashboard.module.css'
import BlockTitle from '../utils/blockTitle'
export default function BestSales() {
  return (
    <section className={style.best_sales}>
      <BlockTitle title='Best Selling products'/>
    </section>
  )
}
