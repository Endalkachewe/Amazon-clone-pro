import React from 'react'
import classes from './catagory.module.css'
import { Link } from "react-router-dom";

function CatagoryCard({data}) {
  return (
    <div className={classes.catagory}>
          <Link to={`/catagory/${data.name}`}>
              <span>
                 <h4>{data.title}</h4> 
              </span>
              <img src={data.imgLink} alt="" />
              <p>Shop now</p>
          </Link>
    </div>
  )
}

export default CatagoryCard
