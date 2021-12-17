import React, {useContext, useEffect, useState} from 'react';
import GlobalContext from "../../Context/GlobalContext";
import Cell from "../Cell"



function Row() {
  const {field} = useContext(GlobalContext)

  const [cols, setCols] = useState([])


  useEffect(() => {
    const arr = []
    let i = 0 ,  len = field.cols
    while (++i <= len) arr.push(i);

    setCols(arr)
  }, [field])

  return (
  <tr>
    {cols.map((_, idx) => {
      return <Cell key={idx} />
    })}    
  </tr>
  )
}

export default Row