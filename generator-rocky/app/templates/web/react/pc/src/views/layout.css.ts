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
.yeoman-page{
    background-color: #fff;
    padding: 10px 1%;
}
.rowStyle{
    margin-bottom: 40px;
}
`

export default layout;