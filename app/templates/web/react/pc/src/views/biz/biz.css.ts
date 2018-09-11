
import styled, { injectGlobal } from 'styled-components'

const BizTag = styled.div`
height:100%;
.ant-layout{
        height:100%;
        .content{
            .nav{
                background:#fff;
                border-right:1px solid #e9e9e9;
                box-shadow:0px 1px 3px 2px #e2e1e1;
                height:100%;
            }
            .biz{
                overflow:auto;
                padding:10px 1% 0 1%;
                height:calc(100% - 20px);
            }
        }
        
}
`



export default BizTag;