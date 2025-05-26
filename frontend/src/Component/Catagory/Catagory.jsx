import React from 'react'
import { catagoryInfos} from './CatagoryFullInfo.js'
import CatagoryCard from './CatagoryCard'
import classes from './catagory.module.css'

function Catagory() {
  return (
    <div>
          <section className={classes.catagory_container}>
              {
                  catagoryInfos.map((Infos) => {
                     return <CatagoryCard data={Infos} />
                  }
                  )
                //   catagoryInfos.map((Infos) => (
                //     <CatagoryCard data={Infos}/>)
                //  )
              }


        </section>
    </div>
  )
}

export default Catagory
