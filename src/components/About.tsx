interface AboutProps {
  visible: boolean
  handleClose: () => void
}

const About = ({ visible, handleClose }: AboutProps) => {
  const visStyle = {
    display: visible ? 'block' : 'none',
  }
  return (
    <div className="calc__about" style={visStyle}>
      <h2 className="calc__about__header">About</h2>
      <h3>You can use keyboard</h3>
      <ul>
        <li>Backspace - Del</li>
        <li>Delete - Reset</li>
        <li>Enter or '=' - '='</li>
        <li>Also number keys and '.', '+', '-', '*' and '/' are usefull</li>
      </ul>
      <p>
        <b>Powered by Haim Fridland hfridland@gmail.com</b>
      </p>
      <div className="calc__about__btn_close">
        <button onClick={handleClose}>Close</button>
      </div>
    </div>
  )
}

export default About
