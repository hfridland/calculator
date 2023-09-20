import Calculator from "./components/Calculator";

function App() {
  let themeNum = 1

  if (window.matchMedia) {
    if(window.matchMedia('(prefers-color-scheme: dark)').matches){
      // Dark
      // document.body.setAttribute('data-theme', 'theme3');
      themeNum = 3
    } else {
      themeNum = 2
      // document.body.setAttribute('data-theme', 'theme2');
    }
  }
  // } else {
  //   document.body.setAttribute('data-theme', 'theme1');
  // }
  return (
    <div className="app">
      <Calculator themeNum={themeNum} />
    </div>
  );
}

export default App;
