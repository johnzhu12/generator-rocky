import * as React from 'react'
import { Table  } from 'antd'
interface PropTable {
    dataSource: Array<any>;    //表格数据
    columns?: Array<any>;    //表格列信息
    // rowSelection?: object;   //多选框
    total: number;
    pageSize: number;
    pageNo: number;
    onSelect?: onSelectFunc;   //勾选列事件
    onPaging?: onPagingFunc;   //点击页面事件
}
interface onSelectFunc {
    (record?: any, selectedRows?: Array<any>, isChecked?: boolean, changeRows?: Array<any>): void
}
interface onPagingFunc {
    (pageNo: number, pageSize: number): void
}
export default class Complexenter extends React.Component<PropTable, {}>{
    state = {
        selectedRows: []
    }
    options = {
        rowSelection: null,
        pagingtion: null
    }
    constructor(props){
        super(props)
        this.setPagingOptions(this.props)
    }
    rowSelection = {}
    setPagingOptions = (props:any) => {
        let {total=0, pageSize = 10, onPaging, pageNo} = props
        let pagingOptions = {};
        pagingOptions['total'] = total
        pagingOptions['pageSize'] = pageSize
        if(pageNo){
            pagingOptions['current'] = pageNo
        }
        pagingOptions['onChange'] = (pageNo) => {
            //当没有记忆功能的时候，在分页的时候要清除勾选行
            this.setState({selectedRows:[]})
            this.rowSelection['selectedRowKeys'] = [];
            if(this.props.onSelect){
                this.props.onSelect(null, [])
            }
        }
        pagingOptions['showQuickJumper'] = true;
        pagingOptions['showTotal'] = () => { return `共搜索到 ${total} 条数据`};
        this.options.pagingtion = pagingOptions
    }
    componentWillReceiveProps(nextProps){
        this.setPagingOptions(nextProps)
    }
    render(){
        let {rowSelection, pagingtion} = this.options
        let { columns, dataSource } = this.props
        return(
            <Table rowSelection={rowSelection} columns={columns} dataSource={dataSource} pagination={pagingtion}/>
        )
    }
}