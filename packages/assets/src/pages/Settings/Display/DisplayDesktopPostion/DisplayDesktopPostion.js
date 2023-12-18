import React from 'react';
import {Card, Checkbox, FormLayout, RangeSlider, TextField, TextStyle} from '@shopify/polaris';
import DesktopPositionInput from '../../../../components/DesktopPositionInput/DesktopPositionInput';
import Timing from '../Timing/Timing';

export const DisplayDesktopPostion = ({settings, onChangeInput}) => {
  const {
    position,
    hideTimeAgo,
    truncateProductName,
    displayDuration,
    firstDelay,
    popsInterval,
    maxPopsDisplay
  } = settings;

  const timings = [
    {
      id: 1,
      label: 'Display duration',
      value: displayDuration,
      helpText: 'How long each pop will display on your page',
      onChange: value => onChangeInput('displayDuration', Number(value))
    },
    {
      id: 2,
      label: 'Time before the first pop',
      value: firstDelay,
      helpText: 'The delay time before the first notificaton',
      onChange: value => onChangeInput('firstDelay', Number(value))
    },
    {
      id: 3,
      label: 'Gap time between two pops',
      value: popsInterval,
      helpText: 'The time interval between two popup notifycation',
      onChange: value => onChangeInput('popsInterval', Number(value))
    },
    {
      id: 4,
      label: 'Maximum of popups',
      value: maxPopsDisplay,
      helpText:
        'The maximum number of popups are allowed to show after page loading. Maximum number is 80',
      onChange: value => onChangeInput('maxPopsDisplay', Number(value))
    }
  ];

  const thePops = [
    {
      id: 1,
      label: 'Hide time ago',
      checked: hideTimeAgo,
      helpText: ' ',
      onChange: _val => onChangeInput('hideTimeAgo', !hideTimeAgo)
    },
    {
      id: 2,
      label: 'Truncate content text',
      checked: truncateProductName,
      helpText:
        "If your product name is long for one line, it will be truncated to 'Product na...' ",
      onChange: _val => onChangeInput('truncateProductName', !truncateProductName)
    }
  ];

  return (
    <div>
      <Card.Section title="Appearance">
        <TextStyle>Desktop Postion</TextStyle>
        <DesktopPositionInput onChange={val => onChangeInput('position', val)} value={position} />
        <TextStyle>The display postion of the pop on your website</TextStyle>
        <div>
          {thePops.map(thePop => {
            return (
              <Checkbox
                key={thePop.id}
                label={thePop.label}
                checked={thePop.checked}
                onChange={thePop.onChange}
                helpText={thePop.helpText}
              />
            );
          })}
        </div>
      </Card.Section>
      <Card.Section title="Timing">
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            alignItems: 'center',
            gap: '20px'
          }}
        >
          {timings.map(timing => {
            return (
              <div style={{width: 'calc(50% - 10px)'}} key={timing.id}>
                <Timing
                  label={timing.label}
                  value={timing.value}
                  onChange={timing.onChange}
                  helpText={timing.helpText}
                />
              </div>
            );
          })}
        </div>
      </Card.Section>
    </div>
  );
};
