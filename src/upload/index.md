import React from 'react';
import { message, Popover, Upload } from 'antd';
import type { WhitePPTPlugin } from '@netless/ppt-plugin';

export function DynamicUploadButton() {
  <Upload
    key="upload-dynamic"
    accept={'application/vnd.openxmlformats-officedocument.presentationml.presentation,.pptx'}
    showUploadList={false}
    customRequest={this.uploadDynamic}>
    <div>
      <div>Document to webpage</div>
      <div>Place our Icon here</div>
    </div>
  </Upload>;
  return <div>hello world</div>;
}
