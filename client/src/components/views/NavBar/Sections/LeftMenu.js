import React from 'react';
import {Menu} from 'antd';

const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;

function LeftMenu(props) {
    return (
        <Menu mode={props.mode}>
            <Menu.Item key="mail">
                <a href="/"> 홈 </a>
                {/*<Text style={{fontSize: 26, fontFamily: 'AppleSDGothicNeo-Regular'}}> 홈 </Text>*/}
            </Menu.Item>

            <Menu.Item key="volunteer">
                <a href="/volunteer"> 봉사하기 </a>
            </Menu.Item>

            <Menu.Item key="adopt">
                <a href="/adopt"> 입양하기 </a>
            </Menu.Item>

            <Menu.Item key="donation">
                <a href="/donation"> 후원하기 </a>
            </Menu.Item>

            {/*<SubMenu title={<span> 블로그 </span>}>*/}
            {/*    <MenuItemGroup title="Item 1">*/}
            {/*        <Menu.Item key="setting:1">Option 1</Menu.Item>*/}
            {/*        <Menu.Item key="setting:2">Option 2</Menu.Item>*/}
            {/*    </MenuItemGroup>*/}
            {/*    <MenuItemGroup title="Item 2">*/}
            {/*        <Menu.Item key="setting:3">Option 3</Menu.Item>*/}
            {/*        <Menu.Item key="setting:4">Option 4</Menu.Item>*/}
            {/*    </MenuItemGroup>*/}
            {/*</SubMenu>*/}
        </Menu>
    )
}

export default LeftMenu