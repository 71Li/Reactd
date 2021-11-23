import "../src/styles/index.scss"
import {configure} from "@storybook/react";
import {addDecorator} from "@storybook/client-api";
import React from "react";

configure(require.context('../src',true,/\.stories\.tsx$/),module)


const styles:React.CSSProperties= {
    textAlign: 'center'
}
// 1. decorator方式产生addon
const centerDecorator = (storyFn:any)=> <div style={styles}>{storyFn()}</div>
addDecorator(centerDecorator)

