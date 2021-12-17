import { useContext } from 'react'
import GlobalContext from '../../Context/GlobalContext'
import './index.scss'

function Button(props) {
  const {btnHandle, showColBtnFlag, showRowBtnFlag} = useContext(GlobalContext)

  function RenderButton () {
    switch (props.btnValue.name) {
      case 'deleteCol':
        return (
          <button 
            className={`${props.btnValue.class} ${showColBtnFlag? props.btnValue.showClass : ''}`} 
            onClick={()=> btnHandle(props.btnValue.actionKey, props.btnValue.actionType)}
            style={props.btnStyle.delColBtn}
          />
        )

      case 'deleteRow':
        return (
          <button 
            className={`${props.btnValue.class} ${showRowBtnFlag? props.btnValue.showClass : ''}`} 
            onClick={()=> btnHandle(props.btnValue.actionKey, props.btnValue.actionType)}
            style={props.btnStyle.delRowBtn}
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