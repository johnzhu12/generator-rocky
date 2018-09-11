import * as React from 'react'
import { Row, Col, Select, DatePicker, Input, Form,  Upload, Icon, Modal, Button  } from 'antd'
import BaseTable from '../global/table'
const { RangePicker } = DatePicker;
const FormItem = Form.Item;
const Option = Select.Option;

interface PropComplexenter {
    form: any;
}
class Complexenter extends React.Component<PropComplexenter, {}>{
    tableData = []
    total = 0
    pageNo = 0
    tableOptions = {
        pageSize: 10,
        onSelect: (selectedRow, selectedRows) => {},
        onPaging: (pageNo, pageSize) => {}
    }
    columns = [
        {dataIndex: 'text0', title: '字段00（索引编号）'},
        {dataIndex: 'text1', title: '字段01'},
        {dataIndex: 'text2', title: '字段02'},
        {dataIndex: 'text3', title: '字段03'},
        {dataIndex: 'text4', title: '字段04'},
        {dataIndex: 'text5', title: '字段05'},
        {dataIndex: 'text6', title: '字段06'},
        {dataIndex: 'time', title: '时间'},
        {dataIndex: 'date', title: '日期'},
    ]
    onOk = (value) => {
        console.log('onOk: ', value);
    }
    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values);
            }
        });
    }
    render() {
        let { pageSize, onPaging, onSelect } = this.tableOptions
        return (
            <div className="yeoman-page">
                <Form onSubmit={this.handleSubmit} className="login-form">
                    <Row className="rowStyle">
                        <Col span={6}>
                            <span>输入框：</span>
                            <Input placeholder="输入内容3" style={{ width: '70%' }} />
                        </Col>
                        <Col span={6}>
                            <span>输入框：</span>
                            <Input placeholder="输入内容3" style={{ width: '70%' }} />
                        </Col>
                        <Col span={6}>
                            <span>输入框：</span>
                            <Input placeholder="输入内容3" style={{ width: '70%' }} />
                        </Col>
                        <Col span={6}>
                            <span>输入框：</span>
                            <Input placeholder="输入内容3" style={{ width: '70%' }} />
                        </Col>
                    </Row>
                    <Row className="rowStyle">
                        <Col span={6}>
                            <span>单项选择：</span>
                            <Select placeholder="单项选择" style={{ width: 120 }}>
                                <Option value="jack">选项1</Option>
                                <Option value="lucy">选项2</Option>
                            </Select>
                        </Col>
                        <Col span={6}>
                            <span>单项选择：</span>
                            <Select placeholder="单项选择" style={{ width: 120 }}>
                                <Option value="jack">选项1</Option>
                                <Option value="lucy">选项2</Option>
                            </Select>
                        </Col>
                        <Col span={6}>
                            <span>多项选择：</span>
                            <Select placeholder="多项选择" mode="tags" style={{ width: '70%' }}>
                                <Option value="jack">选项1</Option>
                                <Option value="lucy">选项2</Option>
                            </Select>
                        </Col>
                        <Col span={6}>
                            <span>多项选择：</span>
                            <Select placeholder="多项选择" mode="tags" style={{ width: '70%' }}>
                                <Option value="jack">选项1</Option>
                                <Option value="lucy">选项2</Option>
                            </Select>
                        </Col>
                    </Row>
                    <Row className="rowStyle">
                        <Col span={6}>
                            <span>输入框：</span>
                            <Input placeholder="输入内容3" style={{ width: '70%' }} />
                        </Col>
                        <Col span={12}>
                            <span>选择时间：</span>
                            <RangePicker
                                showTime={{ format: 'HH:mm' }}
                                format="YYYY-MM-DD HH:mm"
                                placeholder={['Start Time', 'End Time']}
                                onOk={this.onOk}
                            />
                        </Col>
                        <Col span={6}>
                            <Button type="primary">筛选</Button>
                            <Button>清空</Button>
                        </Col>
                    </Row>
                </Form>
                <BaseTable dataSource={this.tableData} total={this.total} pageSize={pageSize} onSelect={onSelect} 
                            onPaging={onPaging} pageNo={this.pageNo} columns={this.columns}/>
            </div>
        )
    }
}
const ComplexenterStyle = Form.create()(Complexenter)
export default ComplexenterStyle