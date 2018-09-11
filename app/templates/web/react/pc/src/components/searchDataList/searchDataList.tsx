import * as React from 'react'
import { Row, Col, Select, DatePicker, Input, Form,  Upload, Icon, Modal, Button  } from 'antd'
import SearchBar from './searchBar'
import BaseTable from '../global/table'

interface PropSearchData {
    
}
class SearchList extends React.Component<PropSearchData, {}>{
    tableData = []
    total = 0
    pageNo = 0
    tableOptions = {
        pageSize: 10,
        onSelect: (selectedRow, selectedRows) => {},
        onPaging: (pageNo, pageSize) => {}
    }
    columns = [
        {dataIndex: 'serial', title: '序号'},
        {dataIndex: 'text0', title: '索引编号'},
        {dataIndex: 'text1', title: '字段01'},
        {dataIndex: 'text2', title: '字段02'},
        {dataIndex: 'text3', title: '字段03'},
        {dataIndex: 'text4', title: '字段04'},
        {dataIndex: 'text5', title: '字段05'},
        {dataIndex: 'text6', title: '字段06'},
        {dataIndex: 'text7', title: '字段07'},
        {dataIndex: 'text8', title: '字段08'},
        {dataIndex: 'text9', title: '字段09'},
        {dataIndex: 'text10', title: '字段10'},
    ]
    render(){
        let { pageSize, onPaging, onSelect } = this.tableOptions
        return (
            <div>
                <SearchBar />
                <div className="yeoman-page" style={{marginTop: 20}}>
                    <BaseTable dataSource={this.tableData} total={this.total} pageSize={pageSize} onSelect={onSelect} 
                            onPaging={onPaging} pageNo={this.pageNo} columns={this.columns}/>
                </div>
            </div>
        )
    }
}
export default SearchList