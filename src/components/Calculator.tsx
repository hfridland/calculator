import { useEffect, useState } from 'react'
import SwichTheme from './SwitchTheme'
import CalcEditor from './CalcEditor'
import About from './About'

interface CalculatorProps {
  themeNum: number
}

type Operation = '+' | '-' | '*' | '/' | undefined

export interface OpDescr {
  op1: string
  op2: string
  operation: Operation
  opInd: 1 | 2
  isDone: boolean
}

const Calculator = (props: CalculatorProps) => {
  const [isVisibleAbout, setVisibleAbout] = useState<boolean>(false)
  const [themeNum, setThemeNum] = useState<number>(props.themeNum)

  const initOpSedcr: OpDescr = {
    op1: '0',
    op2: '0',
    operation: undefined,
    opInd: 1,
    isDone: false,
  }

  const [opDescr, setOpDescr] = useState<OpDescr>(initOpSedcr)
  const [res, setRes] = useState<string>('0')

  const getCurOpKey = (): string => 'op' + opDescr.opInd

  const processKey = (key: string) => () => {
    if (opDescr.isDone) return
    setOpDescr((opDescr) => {
      const curOpKey = getCurOpKey()
      const newVal = '' + Number(opDescr[curOpKey as keyof OpDescr] + key)
      if (newVal.length <= 5) {
        return { ...opDescr, [curOpKey]: newVal }
      } else return { ...opDescr }
    })
  }

  const processDelRes = (key: string) => () => {
    switch (key) {
      case 'del': {
        if (opDescr.isDone) return
        setOpDescr((opDescr) => {
          const curOpKey = getCurOpKey()
          const curVal: string = opDescr[curOpKey as keyof OpDescr] as string
          const newVal =
            curVal.length > 1 ? curVal.slice(0, curVal.length - 1) : '0'
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

  const processOperation = (op: string) => () => {
    if (opDescr.opInd === 2 || opDescr.isDone) return
    const operation: Operation = op as Operation
    setOpDescr((opDescr) => {
      return { ...opDescr, operation, opInd: 2 }
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

  const processKeyPress = (key: string) => {
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

  const handleKeyUp = (event: KeyboardEvent) => {
    event.preventDefault()
    processKeyPress(event.key)
  }

  const handleKeyDown = (event: KeyboardEvent) => {
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
        <NumKey value="7" processKey={processKey('7')} />
        <NumKey value="8" processKey={processKey('8')} />
        <NumKey value="9" processKey={processKey('9')} />
        <DelRes value="DEL" cols2={false} processKey={processDelRes('del')} />
        <NumKey value="4" processKey={processKey('4')} />
        <NumKey value="5" processKey={processKey('5')} />
        <NumKey value="6" processKey={processKey('6')} />
        <NumKey value="+" processKey={processOperation('+')} />
        <NumKey value="1" processKey={processKey('1')} />
        <NumKey value="2" processKey={processKey('2')} />
        <NumKey value="3" processKey={processKey('3')} />
        <NumKey value="-" processKey={processOperation('-')} />
        <NumKey value="." processKey={processKey('.')} />
        <NumKey value="0" processKey={processKey('0')} />
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

interface NumKeyProps {
  value: string | number
  processKey: () => void
}

const NumKey = ({ value, processKey }: NumKeyProps) => {
  return (
    <div className="calc__keyboard__num-key" onClick={() => processKey()}>
      {value}
    </div>
  )
}

interface DelResProps {
  value: string
  cols2: boolean
  processKey: () => void
}

const DelRes = ({ value, processKey, cols2 = false }: DelResProps) => {
  return (
    <div
      className={'calc__keyboard__delres-key ' + (cols2 && 'cols13')}
      onClick={() => processKey()}
    >
      {value}
    </div>
  )
}

interface EqualProps {
  cols2: boolean
  processKey: () => void
}

const Equal = ({ cols2, processKey }: EqualProps) => {
  // const { cols2, processKey } = props
  return (
    <div
      className={'calc__keyboard__equal-key ' + (cols2 && 'cols35')}
      onClick={processKey}
    >
      =
    </div>
  )
}
