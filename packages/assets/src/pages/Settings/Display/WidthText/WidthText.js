import React from 'react';
import {RangeSlider, TextField} from '@shopify/polaris';

const WidthText = ({label, value, onChange, helpText}) => {
  return (
    <RangeSlider
      suffix={
        <div style={{width: '110px'}}>
          <TextField
            value={String(value)}
            onChange={onChange}
            autoComplete="off"
            suffix="seconds"
          />
        </div>
      }
      helpText={helpText}
      label={label}
      value={value}
      onChange={onChange}
      output
    />
  );
};

export default WidthText;
