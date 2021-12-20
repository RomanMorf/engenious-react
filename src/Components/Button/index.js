import { useContext } from 'react'
import ButtonsContext from "../../Context/ButtonsContext";
import './index.scss'

function Button(props) {
  const {btnHandle, showColBtnFlag, showRowBtnFlag, styleForBtn} = useContext(ButtonsContext)

  function RenderButton () {
    switch (props.btnValue.name) {
      case 'deleteCol':
        return (
          <button 
            className={`${props.btnValue.class} ${showColBtnFlag? props.btnValue.showClass : ''}`} 
            onClick={()=> btnHandle(props.btnValue.actionKey, props.btnValue.actionType)}
            style={styleForBtn.delColBtn}
          />
        )

      case 'deleteRow':
        return (
          <button 
            className={`${props.btnValue.class} ${showRowBtnFlag? props.btnValue.showClass : ''}`} 
            onClick={()=> btnHandle(props.btnValue.actionKey, props.btnValue.actionType)}
            style={styleForBtn.delRowBtn}
          />
        )

      default:
        return (
          <button 
            className={props.btnValue.class} 
            onClick={()=> btnHandle(props.btnValue.actionKey, props.btnValue.actionType)}
          />
        )
    }
  }

  return (
    <RenderButton />
  )
}

export default Button