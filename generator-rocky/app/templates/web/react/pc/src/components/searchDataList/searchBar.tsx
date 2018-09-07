import * as React from 'react'
import { Row, Col, Select, DatePicker, Input, Form,  Upload, Icon, Modal, Button  } from 'antd'

const { RangePicker } = DatePicker;
const Option = Select.Option;

interface PropSearch {
    
}
class SearchBar extends React.Component<PropSearch, {}>{
    onOk = (value) => {
        console.log('onOk: ', value);
    }
    render(){
        return (
            <div className="yeoman-page">
                <Row className="">
                        <Col span={6}>
                            <span>输入框：</span>
                            <Input placeholder="输入内容3" style={{ width: '70%' }} />
                        </Col>
                        <Col span={6}>
                            <span>单项选择：</span>
                            <Select placeholder="单项选择" style={{ width: 120 }}>
                                <Option value="jack">选项1</Option>
                                <Option value="lucy">选项2</Option>
                            </Select>
                        </Col>
                        <Col span={8}>
                            <Select placeholder="时间选择" style={{ width: 120 }}>
                                <Option value="1">创建时间</Option>
                                <Option value="2">修改时间</Option>
                            </Select>
                            <RangePicker
                                showTime={{ format: 'HH:mm' }}
                                format="YYYY-MM-DD HH:mm"
                                placeholder={['Start Time', 'End Time']}
                                onOk={this.onOk}
                            />
                        </Col>
                        <Col span={4}>
                            <Button>清空</Button>
                            <Button type="primary">搜索</Button>
                        </Col>
                </Row>
            </div>
        )
    }
}
export default SearchBar