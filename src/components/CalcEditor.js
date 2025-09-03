const CalcEditor = ({ opDescr, result }) => {
  return (
    <div className="ce_container">
      <div className="ce_container_input">
        <div
          className={`ce_container_input_operand ${
            opDescr.opInd === 1 ? 'selected' : ''
          }`}
        >
          {opDescr.op1}
        </div>
        <div className="ce_container_input_operator">{opDescr.operation}</div>
        <div
          className={`ce_container_input_operand ${
            opDescr.opInd === 2 ? 'selected' : ''
          }`}
        >
          {opDescr.op2}
        </div>
      </div>
      <div className="ce_container_output">{result}</div>
    </div>
  )
}

export default CalcEditor
