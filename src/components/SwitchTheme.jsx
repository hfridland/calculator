
const SwichTheme = props => {
    const {themeNum, setThemeNum} = props

    const getSliderPosStyle = () => {
        switch(themeNum) {
            case 1:
                return { justifyContent: 'flex-start' }
            case 2:
                return { justifyContent: 'center' }
            case 3:
                return { justifyContent: 'flex-end' }
            default:
                return { justifyContent: 'flex-start' }
        }
    }

    const setNextSliderPos = () => {
        let tn = themeNum + 1
        if (tn > 3) {
            tn = 1
        }
        setThemeNum(tn)
    }

    return (
        <div className="swich-theme">
            <div className="swich-theme__up-row">
                <div className="swich-theme__up-row__steps">
                    <div className="swich-theme__steps_num">1</div>
                    <div className="swich-theme__steps_num">2</div>
                    <div className="swich-theme__steps_num">3</div>
                </div>
            </div>
            <div className="swich-theme__control">
                <div className="swich-theme__control__title">theme</div>
                <div className="swich-theme__control__outer" style={getSliderPosStyle()}>
                    <div
                        className="swich-theme__control__outer__slider"
                        onClick={setNextSliderPos}
                    >
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SwichTheme