import React, {useState, useMemo} from "react";
import GlobalContext from "./Context/GlobalContext";
import ButtonsContext from "./Context/ButtonsContext";
import Table from "./Components/Table";
import Button from "./Components/Button";

function App() {
  const [field, setField] = useState({
    cols: 4,
    rows: 4,
  })

  const [buttons] = useState([
    {name: 'createCol', class: 'btn add add-col', actionKey: 'cols', actionType: 'plus'},
    {name: 'createRow', class: 'btn add add-row', actionKey: 'rows', actionType: 'plus'},
    {name: 'deleteCol', class: 'btn del del-col', actionKey: 'cols', actionType: 'min', showClass: 'hovered'},
    {name: 'deleteRow', class: 'btn del del-row', actionKey: 'rows', actionType: 'min', showClass: 'hovered'},
  ])

  const [styleForBtn, setStyleForBtn] = useState({
    delColBtn: {},
    delRowBtn: {}
  })

  const [showColBtnFlag, setShowColBtnFlagBtn] = useState(false)

  const [showRowBtnFlag, setShowRowBtnFlagBtn] = useState(false)

  function btnHandle( key = 'cols', type = 'plus' ) {
    setField({
      ...field,
      [key]: field[key] = type === 'plus'? ++field[key] : --field[key]
    })
    hideBtnDel()
  }

  function changeBtnDelPosition(event) { 
    const hoverOnCell = event.target.localName === 'td'
    const showRowBtnFlag = field.rows > 1
    const showColBtnFlag = field.cols > 1

    if (event.target.classList[1] === 'add') hideBtnDel()

    if (showRowBtnFlag && showColBtnFlag && hoverOnCell) {
      setShowRowBtnFlagBtn(true)
      setShowColBtnFlagBtn(true)
      setButtonsPosition(event)
      return
    }

    if (showRowBtnFlag && hoverOnCell && !showColBtnFlag) {
      setShowRowBtnFlagBtn(true)
      setButtonsPosition(event)
      return
    }

    if (showColBtnFlag && hoverOnCell && !showRowBtnFlag) {
      setShowColBtnFlagBtn(true)
      setButtonsPosition(event)
      return
    }
  }

  function setButtonsPosition (event) {
    setStyleForBtn({
      ...styleForBtn,
      delColBtn: {
        left: `${event.nativeEvent.layerX - event.nativeEvent.offsetX}px`
      },
      delRowBtn: {
        top: `${event.nativeEvent.layerY- event.nativeEvent.offsetY}px`
      },
    })
  }

  function hideBtnDel() { 
    setShowColBtnFlagBtn(false)
    setShowRowBtnFlagBtn(false)
  }

  const btnValue = useMemo(
    () => ({ btnHandle, showColBtnFlag, showRowBtnFlag, styleForBtn}),
    [showColBtnFlag, showRowBtnFlag, styleForBtn]
  );


  return (
      <div className="container">
        <div className="field" onMouseOver={changeBtnDelPosition} onMouseLeave={hideBtnDel}>
          <GlobalContext.Provider value = {{ field }}>
            <Table/>
          </GlobalContext.Provider>

          <ButtonsContext.Provider value={btnValue}>
            {buttons.map(btnData => (
              <Button btnValue={btnData} key={btnData.name} />
            ))}
          </ButtonsContext.Provider>

        </div>
      </div>
  );
}

export default App;
