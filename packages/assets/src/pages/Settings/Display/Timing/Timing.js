import React from 'react';
import {RangeSlider, Stack, TextField, TextStyle} from '@shopify/polaris';

const Timing = ({label, value, onChange, helpText}) => {
  return (
    <>
      <Stack alignment="trailing">
        <Stack.Item fill>
          <RangeSlider label={label} value={value} onChange={onChange} output />
        </Stack.Item>
        <div style={{width: '110px'}}>
          <TextField
            value={String(value)}
            onChange={onChange}
            autoComplete="off"
            suffix="seconds"
          />
        </div>
      </Stack>
      <TextStyle variation="subdued"> {helpText}</TextStyle>
    </>
  );
};

export default Timing;
