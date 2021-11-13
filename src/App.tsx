import React from 'react';
import Button, {ButtonSize, ButtonType} from "./component/Button/button";


function App() {
  return (
    <div className="App">
      <header className="App-header">

          <Button onClick={()=>{alert("primary")}} btnType={ButtonType.Success} size={ButtonSize.Small} > {"small"}</Button>
          <br/>
          <Button size={ButtonSize.Large} btnType={ButtonType.Primary}> {"large"}</Button>
          <br />
          <Button size={ButtonSize.Large} btnType={ButtonType.Link}  target={"_blank"} href="http://www.baidu.com"> {"link"}</Button>
          <br />
          <Button size={ButtonSize.Small} btnType={ButtonType.Danger}> {"small"}</Button>

      </header>
    </div>
  );
}

export default App;
