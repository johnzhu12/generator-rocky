//added by john 8-6
import styled, { injectGlobal } from 'styled-components'

const layout = styled.div`
.appFrame{
    height:100%;
    >div{
        height:100%;
    }
}
`
//全局样式
injectGlobal`
.ant-table-thead{
    th{
        text-align:center !important;
    }
}
`

export default layout;