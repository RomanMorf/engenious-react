import React, {useState, useEffect, useContext} from 'react';
import GlobalContext from "../../Context/GlobalContext";
import Row from "../Row";
import './index.scss'

function Table() {
  const {field} = useContext(GlobalContext)

  const [rows, setRows] = useState([])

  useEffect(() => {
    const arr = []
    let i = 0, len = field.rows
    while (++i <= len) arr.push(i)

    setRows(arr)
  }, [field])

  return (
    <table>
      <tbody>
        {rows.map((_, idx) => {
          return <Row key={idx} />
        })}  
      </tbody>
    </table>
  )
}


export default Table