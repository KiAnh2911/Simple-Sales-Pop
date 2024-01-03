import React from 'react';
import {Card, Checkbox, FormLayout} from '@shopify/polaris';
import DesktopPositionInput from '../../../components/DesktopPositionInput/DesktopPositionInput';
import WidthText from './WidthText/WidthText';

export const Display = ({settings, onChangeInput}) => {
  const thePops = [
    {
      id: 1,
      label: 'Hide time ago',
      checked: settings.hideTimeAgo,
      helpText: ' ',
      onChange: _val => onChangeInput('hideTimeAgo', !settings.hideTimeAgo)
    },
    {
      id: 2,
      label: 'Truncate content text',
      checked: settings.truncateProductName,
      helpText:
        "If your product name is long for one line, it will be truncated to 'Product na...' ",
      onChange: _val => onChangeInput('truncateProductName', !settings.truncateProductName)
    }
  ];

  return (
    <FormLayout>
      <Card.Section title="Appearance">
        <FormLayout>
          <DesktopPositionInput
            label="Desktop Postion"
            onChange={val => onChangeInput('position', val)}
            value={settings.position}
            helpText="The display postion of the pop on your website"
          />
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
        </FormLayout>
      </Card.Section>
      <Card.Section title="Timing">
        <FormLayout>
          <FormLayout.Group>
            <WidthText
              label="Display duration"
              value={settings.displayDuration}
              onChange={value => onChangeInput('displayDuration', Number(value))}
              helpText="How long each pop will display on your page"
            />
            <WidthText
              label="Time before the first pop"
              value={settings.firstDelay}
              onChange={value => onChangeInput('firstDelay', Number(value))}
              helpText="The delay time before the first notificaton"
            />
          </FormLayout.Group>
          <FormLayout.Group>
            <WidthText
              label="Gap time between two pops"
              value={settings.popsInterval}
              onChange={value => onChangeInput('popsInterval', Number(value))}
              helpText="The time interval between two popup notifycation"
            />
            <WidthText
              label="Maximum of popups"
              value={settings.maxPopsDisplay}
              onChange={value => onChangeInput('maxPopsDisplay', Number(value))}
              suffix="pop(s)"
              helpText="The maximum number of popups are allowed to show after page loading. Maximum number is 80"
            />
          </FormLayout.Group>
        </FormLayout>
      </Card.Section>
    </FormLayout>
  );
};
