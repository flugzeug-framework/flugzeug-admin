import React from 'react';
import { FormLabel } from '@mui/material';
import './style.css';
const JSONEditorC = require('react-json-editor-viewer').JSONEditor;

interface JSONEditorProps {
  name: String;
  data: Object;
  collapsible: boolean;
  onChange: (key:any, value:any, parent:any, data:Object) => void;
}

const JSONEditor: React.FC<JSONEditorProps> = (props) => {
  const {name, ...rest} = props;
  return (
    <span className="json-editor-component-admin">
      <FormLabel className="capitalize">
        {name}
      </FormLabel>
      <span className="json-form">
        <JSONEditorC
          className="bungi"
          {...rest}
        />
      </span>
    </span>
  )
}

export default JSONEditor;