import { useEffect, useState } from "react"
import SwichTheme from "./SwitchTheme"

const Calculator = props => {
    const { themeNum: initThemeNum } = props
    const [dispStr, setDispStr] = useState('0')
    const [operation, setOperation] = useState(undefined)
    const [operand, setOperand] = useState('0')
    const [themeNum, setThemeNum] = useState(initThemeNum)

    const processKey = key => () => {
        let s = dispStr
        if (s === 'Error') {
            s = '0'
        }
        if (key === '.' && s.indexOf('.') >= 0) return
        s += key
        if (key !== '.') {
            s = '' + +s
        }
        setDispStr(s)
    }

    const processDelRes = key => () => {
        switch(key) {
            case 'del': {
                let s = dispStr
                s = s.substring(0, s.length - 1)
                if (s === '') s = '0'
                setDispStr(s)
                break
            }
            case 'reset': {
                setDispStr('0')
                setOperation(undefined)
                break
            }
            default:
                break
        }
    }

    const processOperation = op => () => {
        if (operation !== undefined) return
        setOperation(op)
        setOperand(dispStr)
        setDispStr('0')
    }

    const processEqual = () => {
        if (operation === '/' && dispStr === '0') {
            setDispStr('Error')
            return
        }
        // eslint-disable-next-line
        setDispStr('' + eval(operand + operation + dispStr))
        setOperation(undefined)
    }

    const handleKeyUp = event => {
        switch(event.key) {
            case '0': case '1': case '2': case '3': case '4':
            case '5': case '6': case '7': case '8': case '9': case '.':
                processKey(event.key)()
                break
            case 'Backspace':
                processDelRes('del')()
                break
            case '+': case '-': case '*': case '/':
                processOperation(event.key)()
                break
            case 'Enter': case '=':
                processEqual()
                break
            default:
                break
        }
    }

    useEffect(() => {
        window.addEventListener("keyup", handleKeyUp);

        return () => {
            window.removeEventListener("keyup", handleKeyUp);
        }
    // eslint-disable-next-line
    }, [dispStr])

    useEffect(() => {
        document.body.setAttribute('data-theme', 'theme' + themeNum);
    }, [themeNum])

    return (
        <main className="calc">
            <header className="calc__header">
                <div className="calc__header__logo">calc</div>
                <SwichTheme themeNum={themeNum} setThemeNum={setThemeNum} />
            </header>

            <div className="calc__editor">{dispStr}</div>
            <div className="calc__keyboard" >
                <NumKey value='7' processKey={processKey(7)} />
                <NumKey value='8' processKey={processKey(8)} />
                <NumKey value='9' processKey={processKey(9)} />
                <DelRes value='DEL' processKey={processDelRes('del')} />
                <NumKey value='4' processKey={processKey(4)} />
                <NumKey value='5' processKey={processKey(5)} />
                <NumKey value='6' processKey={processKey(6)} />
                <NumKey value='+' processKey={processOperation('+')} />
                <NumKey value='1' processKey={processKey(1)} />
                <NumKey value='2' processKey={processKey(2)} />
                <NumKey value='3' processKey={processKey(3)} />
                <NumKey value='-' processKey={processOperation('-')} />
                <NumKey value='.' processKey={processKey('.')} />
                <NumKey value='0' processKey={processKey(0)} />
                <NumKey value='/' processKey={processOperation('/')} />
                <NumKey value='*' processKey={processOperation('*')} />
                <DelRes value='RESET' cols2 processKey={processDelRes('reset')} />
                <Equal cols2 processKey={processEqual} />
            </div>
        </main>
    )
}

export default Calculator

const NumKey = props => {
    const { value, processKey } = props
    return (
        <div className="calc__keyboard__num-key" onClick={processKey} >{value}</div>
    )
}

const DelRes = props => {
    const { value, cols2, processKey } = props
    return (
        <div className={'calc__keyboard__delres-key ' + (cols2 && 'cols13') } onClick={processKey}>{value}</div>
    )
}

const Equal = props => {
    const { cols2, processKey } = props
    return (
        <div className={'calc__keyboard__equal-key '  + (cols2 && 'cols35')} onClick={processKey}>=</div>
    )
}