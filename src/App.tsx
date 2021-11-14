import React from 'react';
import Button, {ButtonSize, ButtonType} from "./component/Button/button";
// import Alert, {AltMessage, AltType} from "./component/Alert/alert";
import Menu from "./component/Menu/menu";
import MenuItem from "./component/Menu/menuItem";

function App() {
  return (
    <div className="App">
      <header className="App-header">
           <Button onClick={()=>{alert("primary")}} btnType={ButtonType.Success} size={ButtonSize.Small} >
               {/*<Alert type={AltType.Info} message={AltMessage.TiShi} >111 </Alert>*/}
               {"small"}
           </Button>
          <br/>
          <Button size={ButtonSize.Large} btnType={ButtonType.Primary}> {"large"}</Button>
          <br />
          <Button size={ButtonSize.Large} btnType={ButtonType.Link}  target={"_blank"} href="http://www.baidu.com"> {"link"}</Button>
          <br />
          <Button size={ButtonSize.Small} btnType={ButtonType.Danger}> {"small"}</Button>
          <Menu defaultIndex={0}>
              <MenuItem index={1}> item1 </MenuItem>
              <MenuItem> item2 </MenuItem>
              <MenuItem> item3 </MenuItem>

          </Menu>
      </header>
    </div>
  );
}

export default App;
