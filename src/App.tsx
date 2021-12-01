import React, {useEffect, useState} from 'react';
// import Alert, {AltMessage, AltType} from "./component/Alert/alert";
import Menu from "./component/Menu/menu";
import MenuItem from "./component/Menu/menuItem";
import SubMenu from "./component/Menu/subMenu";
import Icon from "./component/Icon/icon";
import {library} from "@fortawesome/fontawesome-svg-core";
import {fas} from "@fortawesome/free-solid-svg-icons";
import axios from "axios";

library.add(fas) //fas 图标集
function App() {
    const [title, setTitle] = useState('')
    const postData = {
        title: 'my title',
        body: 'body'
    }
    useEffect(() => {
        axios.post('', postData)
            .then(resp => {
                setTitle(resp.data.title)
            })
    })

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files
        if (files) {
            const upLoadFile = files[0]
            const formData = new FormData()
            formData.append(upLoadFile.name, upLoadFile)
            axios.post("https://jsonplaceholder.typicode.com/posts", formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            }).then(resp => {
            })
        }
        // @ts-ignore
        return (
            <div className="App" style={{marginTop: '100px', marginLeft: "100px"}}>
                <header className="App-header">
                    {/*<Button size={ButtonSize.Large } btnType={ButtonType.Primary}> {"large"}</Button>*/}
                    {/*<br />*/}
                    {/*<Button size={ButtonSize.Large} btnType={ButtonType.Link}  target={"_blank"} href="http://www.baidu.com"> {"link"}</Button>*/}
                    {/*<br />*/}
                    {/*<Button size={ButtonSize.Small} btnType={ButtonType.Danger}> {"small"}</Button>*/}
                    {/*<Alert message={"这是标题1"} altType={AltType.Success} show={false}> 这是详细内容</Alert>*/}

                    {/*<Alert message={"这是标题2"} altType={AltType.Info}> 这是详细内容</Alert>*/}

                    <Icon icon={'arrow-down'} theme={"warning"} size={"5x"} />
                    <Menu mode={"horizontal"} defaultIndex={"0"} onSelect={(index)=>{alert(index)}} defaultOPenSubMenus={['2']}>
                            <MenuItem >列表项1</MenuItem>
                            <MenuItem  disabled>列表项2</MenuItem>
                            <SubMenu title={'子菜单'} >
                                <MenuItem >sub列表项1</MenuItem>
                                <MenuItem  disabled>sub列表项2</MenuItem>
                            </SubMenu>
                            <MenuItem >列表项3</MenuItem>

                        </Menu>
                    <input type="file" name={'myFile'} onChange={handleFileChange}/>
                </header>
            </div>
        );
    }
}
export default App;
