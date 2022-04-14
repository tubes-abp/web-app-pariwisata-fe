import React, { useState } from 'react';
import { message, Button, Upload, Avatar } from 'antd';
import { UploadOutlined } from '@ant-design/icons';

import './style.scss'

const OrganismsWidgetUploadImage = ({ initialUploadData, handleSubmit }) => {
  const [fileList, setfileList] = useState({});
  const handleChange = (info) => {
    setfileList(info.file)
  };
  const handleType = (file) => {
    if (file.type !== 'image/png' && file.type !== 'image/jpeg') {
      message.error(`${file.name} is not a image file`);
    }
    return file.type === 'image/png' || file.type === 'image/jpeg'  ? false : Upload.LIST_IGNORE;
  };
  
  return (
    <div className="o-widget-upload-image">
      <div className="o-widget-upload-image__group">
        <Avatar shape="square" src={`${process.env.REACT_APP_API_ENDPOINT}/storage/${initialUploadData.url}`} />
        <Upload
          listType="picture"
          maxCount={1}
          onChange={handleChange} 
          beforeUpload={(file) => handleType(file)} 
        >
          <Button icon={<UploadOutlined />}>Upload</Button>
        </Upload>
        <div className="o-widget-upload-image__group-btn">
          <Button 
            type="primary" 
            onClick={() => handleSubmit(fileList)}
          >
            Submit
          </Button>
        </div>
      </div>
    </div>
  )
}

export default OrganismsWidgetUploadImage
