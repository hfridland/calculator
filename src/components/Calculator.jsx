import { useEffect, useState } from 'react'
import SwichTheme from './SwitchTheme'
import CalcEditor from './CalcEditor'
import About from './About'

const Calculator = (props) => {
  const { themeNum: initThemeNum } = props
  const [isVisibleAbout, setVisibleAbout] = useState(false)
  const [themeNum, setThemeNum] = useState(initThemeNum)

  const initOpSedcr = {
    op1: '0',
    op2: '0',
    operation: undefined,
    opInd: 1,
    isDone: false,
  }

  const [opDescr, setOpDescr] = useState(initOpSedcr)
  const [res, setRes] = useState('0')

  const getCurOpKey = () => 'op' + opDescr.opInd

  const processKey = (key) => () => {
    if (opDescr.isDone) return
    setOpDescr((opDescr) => {
      const curOpKey = getCurOpKey()
      const newVal = '' + Number(opDescr[curOpKey] + key)
      if (newVal.length <= 5) {
        return { ...opDescr, [curOpKey]: newVal }
      } else return { ...opDescr }
    })
  }

  const processDelRes = (key) => () => {
    switch (key) {
      case 'del': {
        if (opDescr.isDone) return
        setOpDescr((opDescr) => {
          const curOpKey = getCurOpKey()
          const newVal =
            opDescr[curOpKey].length > 1
              ? opDescr[curOpKey].slice(0, opDescr[curOpKey].length - 1)
              : '0'
          return { ...opDescr, [curOpKey]: newVal }
        })
        break
      }
      case 'reset': {
        setOpDescr(initOpSedcr)
        setRes('0')
        break
      }
      default:
        break
    }
  }

  const processOperation = (op) => () => {
    if (opDescr.opInd === 2 || opDescr.isDone) return
    setOpDescr((opDescr) => {
      return { ...opDescr, operation: op, opInd: 2 }
    })
  }

  const processEqual = () => {
    setRes(
      '' +
        parseFloat(
          Number(
            '' +
              // eslint-disable-next-line
              eval(`${opDescr.op1} ${opDescr.operation} ${opDescr.op2}`)
          ).toFixed(5)
        )
    )
    setOpDescr({ ...opDescr, isDone: true })
  }

  const processKeyPress = (key) => {
    switch (key) {
      case '0':
      case '1':
      case '2':
      case '3':
      case '4':
      case '5':
      case '6':
      case '7':
      case '8':
      case '9':
      case '.':
        processKey(key)()
        break
      case 'Backspace':
        processDelRes('del')()
        break
      case 'Delete':
        processDelRes('reset')()
        break
      case '+':
      case '-':
      case '*':
      case '/':
        processOperation(key)()
        break
      case 'Enter':
      case '=':
        processEqual()
        break
      default:
        break
    }
  }

  const handleKeyUp = (event) => {
    event.preventDefault()
    processKeyPress(event.key)
  }

  const handleKeyDown = (event) => {
    event.preventDefault()
  }

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown)
    window.addEventListener('keyup', handleKeyUp)
    return () => {
      window.removeEventListener('keyup', handleKeyUp)
      window.removeEventListener('keydown', handleKeyDown)
    }
    // eslint-disable-next-line
  }, [opDescr])

  useEffect(() => {
    document.body.setAttribute('data-theme', 'theme' + themeNum)
  }, [themeNum])

  const handleAboutClick = () => {
    setVisibleAbout(true)
  }
  const handleAboutClose = () => {
    setVisibleAbout(false)
  }

  return (
    <main className="calc">
      <header className="calc__header">
        <div className="calc__header__logo">calc</div>
        <div className="calc__header__about" onClick={handleAboutClick}>
          About
        </div>
        <SwichTheme themeNum={themeNum} setThemeNum={setThemeNum} />
      </header>

      <CalcEditor opDescr={opDescr} result={res} />
      <div className="calc__keyboard">
        <NumKey value="7" processKey={processKey(7)} />
        <NumKey value="8" processKey={processKey(8)} />
        <NumKey value="9" processKey={processKey(9)} />
        <DelRes value="DEL" processKey={processDelRes('del')} />
        <NumKey value="4" processKey={processKey(4)} />
        <NumKey value="5" processKey={processKey(5)} />
        <NumKey value="6" processKey={processKey(6)} />
        <NumKey value="+" processKey={processOperation('+')} />
        <NumKey value="1" processKey={processKey(1)} />
        <NumKey value="2" processKey={processKey(2)} />
        <NumKey value="3" processKey={processKey(3)} />
        <NumKey value="-" processKey={processOperation('-')} />
        <NumKey value="." processKey={processKey('.')} />
        <NumKey value="0" processKey={processKey(0)} />
        <NumKey value="/" processKey={processOperation('/')} />
        <NumKey value="*" processKey={processOperation('*')} />
        <DelRes value="RESET" cols2 processKey={processDelRes('reset')} />
        <Equal cols2 processKey={processEqual} />
      </div>
      <About visible={isVisibleAbout} handleClose={handleAboutClose} />
    </main>
  )
}

export default Calculator

const NumKey = (props) => {
  const { value, processKey } = props
  return (
    <div className="calc__keyboard__num-key" onClick={processKey}>
      {value}
    </div>
  )
}

const DelRes = (props) => {
  const { value, cols2, processKey } = props
  return (
    <div
      className={'calc__keyboard__delres-key ' + (cols2 && 'cols13')}
      onClick={processKey}
    >
      {value}
    </div>
  )
}

const Equal = (props) => {
  const { cols2, processKey } = props
  return (
    <div
      className={'calc__keyboard__equal-key ' + (cols2 && 'cols35')}
      onClick={processKey}
    >
      =
    </div>
  )
}
