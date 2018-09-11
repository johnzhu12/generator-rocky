import * as React from 'react'
import { Row, Col, Select, DatePicker, Input, Form,  Upload, Icon, Modal, Button  } from 'antd'
import SimpleenterStyle from './simpleenter.css'
const Option = Select.Option;
const { RangePicker } = DatePicker;
const FormItem = Form.Item;
const { TextArea } = Input;

interface PropSimpleenter {
    form: any;
}

class Simpleenter extends React.Component<PropSimpleenter, {}>{
    state = {
        previewVisible: false,
        previewImage: '',
        fileList: [],
    };
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
    handleCancel = () => this.setState({ previewVisible: false })

    handlePreview = (file) => {
        this.setState({
            previewImage: file.url || file.thumbUrl,
            previewVisible: true,
        });
    }

    handleChange = ({ fileList }) => this.setState({ fileList })

    render() {
        const { getFieldDecorator } = this.props.form;
        const { previewVisible, previewImage, fileList } = this.state;
        const uploadButton = (
            <div>
                <Icon type="plus" />
                <div className="ant-upload-text">Upload</div>
            </div>
        );
        return (
            <SimpleenterStyle className="yeoman-page">
                <Form onSubmit={this.handleSubmit} className="login-form">
                    <Row className="rowStyle">
                        <Col span={8}>
                            <span>单项选择：</span>
                            <Select placeholder="单项选择" style={{ width: 120 }}>
                                <Option value="jack">选项1</Option>
                                <Option value="lucy">选项2</Option>
                            </Select>
                        </Col>
                        <Col span={8}>
                            <span>单项选择：</span>
                            <Select placeholder="单项选择" style={{ width: 120 }}>
                                <Option value="jack">选项1</Option>
                                <Option value="lucy">选项2</Option>
                            </Select>
                        </Col>
                        <Col span={8}>
                            <span>多项选择：</span>
                            <Select placeholder="多项选择" mode="tags" style={{ width: '70%' }}>
                                <Option value="jack">选项1</Option>
                                <Option value="lucy">选项2</Option>
                            </Select>
                        </Col>
                    </Row>
                    <Row className="rowStyle">
                        <Col span={8}>
                            <span>选择时间：</span>
                            <RangePicker
                                showTime={{ format: 'HH:mm' }}
                                format="YYYY-MM-DD HH:mm"
                                placeholder={['Start Time', 'End Time']}
                                onOk={this.onOk}
                            />
                        </Col>
                        <Col span={8}>
                            <span>选择时间：</span>
                            <RangePicker
                                showTime={{ format: 'HH:mm' }}
                                format="YYYY-MM-DD HH:mm"
                                placeholder={['Start Time', 'End Time']}
                                onOk={this.onOk}
                            />
                        </Col>
                        <Col span={8}>
                            <span>选择时间：</span>
                            <RangePicker
                                showTime={{ format: 'HH:mm' }}
                                format="YYYY-MM-DD HH:mm"
                                placeholder={['Start Time', 'End Time']}
                                onOk={this.onOk}
                            />
                        </Col>
                    </Row>
                    <Row className="rowStyle">
                        <Col span={8}>
                            <span>输入框：</span>
                            {/*<FormItem style={{ width: '75%' }}>*/}
                                {/*{getFieldDecorator('userName', {*/}
                                      {/*rules: [{ required: true, message: 'Please input something' }],*/}
                                {/*})(*/}
                                    {/*<Input placeholder="输入内容1" style={{ width: '70%' }} />*/}
                                {/*)}*/}
                            {/*</FormItem>*/}
                            <Input placeholder="输入内容1" style={{ width: '70%' }} />
                        </Col>
                        <Col span={8}>
                            <span>输入框：</span>
                            {/*<FormItem style={{ width: '75%' }}>*/}
                                {/*{getFieldDecorator('userName', {*/}
                                    {/*rules: [{ required: true, message: 'Please input something' }],*/}
                                {/*})(*/}
                                    {/*<Input placeholder="输入内容2" style={{ width: '70%' }} />*/}
                                {/*)}*/}
                            {/*</FormItem>*/}
                            <Input placeholder="输入内容2" style={{ width: '70%' }} />
                        </Col>
                        <Col span={8}>
                            <span>输入框：</span>
                            {/*<FormItem style={{ width: '71%' }}>*/}
                                {/*{getFieldDecorator('userName', {*/}
                                    {/*rules: [{ required: true, message: 'Please input something' }],*/}
                                {/*})(*/}
                                    {/*<Input placeholder="输入内容3" style={{ width: '70%' }} />*/}
                                {/*)}*/}
                            {/*</FormItem>*/}
                            <Input placeholder="输入内容3" style={{ width: '70%' }} />
                        </Col>
                    </Row>
                    <Row className="rowStyle">
                        <Col span={8}>
                            <span>多行输入1：</span>
                            <TextArea rows={4} placeholder="输入内容1"/>
                        </Col>
                        <Col span={8}>
                            <span>多行输入2：</span>
                            <TextArea rows={4} placeholder="输入内容2"/>
                        </Col>
                        <Col span={8}>
                            <span>多行输入3：</span>
                            <TextArea rows={4} placeholder="输入内容3"/>
                        </Col>
                    </Row>
                    <Row className="rowStyle">
                        <Col span={24}>
                            <span>上传图片：</span>
                            <div className="clearfix">
                                <Upload
                                    action=""
                                    listType="picture-card"

                                    onPreview={this.handlePreview}
                                    onChange={this.handleChange}
                                >
                                  {uploadButton}
                                </Upload>
                                <Modal visible={previewVisible} footer={null} onCancel={this.handleCancel}>
                                  <img alt="example" style={{ width: '100%' }} src={previewImage} />
                                </Modal>
                            </div>
                        </Col>
                    </Row>
                    <Row className="rowStyle">
                        <Col span={24}>
                            <span>上传文件：</span>
                            <div className="clearfix">
                                <Upload
                                    action=""
                                >
                                    <Button>
                                         <Icon type="upload" /> Select File
                                    </Button>
                                </Upload>
                            </div>
                        </Col>
                    </Row>
                </Form>
            </SimpleenterStyle>
        )
    }
}
const Simple = Form.create()(Simpleenter)
export default Simple