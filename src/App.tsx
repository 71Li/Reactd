import React from 'react';
// import Alert, {AltMessage, AltType} from "./component/Alert/alert";
import Alert, {AltType} from "./component/Alert/alert";
import Menu from "./component/Menu/menu";
import MenuItem from "./component/Menu/menuItem";
import SubMenu from "./component/Menu/subMenu";
function App() {
    // @ts-ignore
    return (
        <div className="App">
          <header className="App-header">
              {/*<Button size={ButtonSize.Large} btnType={ButtonType.Primary}> {"large"}</Button>*/}
              {/*<br />*/}
              {/*<Button size={ButtonSize.Large} btnType={ButtonType.Link}  target={"_blank"} href="http://www.baidu.com"> {"link"}</Button>*/}
              {/*<br />*/}
              {/*<Button size={ButtonSize.Small} btnType={ButtonType.Danger}> {"small"}</Button>*/}
            {/*<Alert message={"这是标题1"} altType={AltType.Success} show={false}> 这是详细内容</Alert>*/}

            {/*<Alert message={"这是标题2"} altType={AltType.Info}> 这是详细内容</Alert>*/}
                <Menu mode={"horizontal"} defaultIndex={"0"} onSelect={(index)=>{alert(index)}} defaultOPenSubMenus={['2']}>
                    <MenuItem >列表项1</MenuItem>
                    <MenuItem  disabled>列表项2</MenuItem>
                    <SubMenu title={'子菜单'} >
                        <MenuItem >sub列表项1</MenuItem>
                        <MenuItem  disabled>sub列表项2</MenuItem>
                    </SubMenu>
                    <MenuItem >列表项3</MenuItem>

                </Menu>

          </header>
        </div>
  );
}

export default App;
