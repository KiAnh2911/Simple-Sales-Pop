import React from 'react';
import {RangeSlider, TextField} from '@shopify/polaris';

const WidthText = ({label, value, onChange, helpText, suffix = 'second(s)'}) => {
  return (
    <RangeSlider
      suffix={
        <div style={{width: '110px'}}>
          <TextField value={String(value)} onChange={onChange} autoComplete="off" suffix={suffix} />
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
