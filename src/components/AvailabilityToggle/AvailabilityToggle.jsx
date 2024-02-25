import * as React from 'react';
import clsx from 'clsx';
import { styled } from '@mui/system';
import { useSwitch } from '@mui/base/useSwitch';
import Online from '@mui/icons-material/RecordVoiceOver';
import Offline from '@mui/icons-material/PersonOff';

export default function AvailabilityToggle() {
  return <MUISwitch />;
}

function MUISwitch(props) {
  const { getInputProps, checked, disabled, focusVisible } = useSwitch(props);

  const stateClasses = {
    checked,
    disabled,
    focusVisible,
  };

  return (
    <SwitchRoot className={clsx(stateClasses)}>
      <SwitchTrack>
        <SwitchThumb className={clsx(stateClasses)} />
      </SwitchTrack>
      <SwitchInput {...getInputProps()} />
    </SwitchRoot>
  );
}

// The track the switch slides on, interactive
const SwitchRoot = styled('span')`
  display: inline-block;
  position: relative;
  width: 50px;
  height: 15px;
  padding: 10px 8px;
`;

// Where and how the switch is interactive
const SwitchInput = styled('input')`
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  opacity: 0;
  z-index: 1;
  margin: 0;
  cursor: pointer;
`;

// The switch itself
const SwitchThumb = styled('span')`
  position: absolute;
  display: block;
  width: 30px;
  height: 30px;
  border-radius: 8px;
  background-color: #48a6cd;
  top: 3px;
  left: 4px;
  transition: transform 150ms cubic-bezier(0.4, 0, 0.2, 1);

  &::before {
    display: block;
    content: '';
    width: 100%;
    height: 100%;

    /* false positive: */
    /* stylelint-disable unit-no-unknown */
    background: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="22" width="22" viewBox="0 0 22 22"><path fill="${encodeURIComponent(
        '#fff',
      )}" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2m0 13c-2.32 0-4.45.8-6.14 2.12C4.7 15.73 4 13.95 4 12c0-1.85.63-3.55 1.69-4.9l2.86 2.86c.21 1.56 1.43 2.79 2.99 2.99l2.2 2.2c-.57-.1-1.15-.15-1.74-.15m6.31 1.9L7.1 5.69C8.45 4.63 10.15 4 12 4c4.42 0 8 3.58 8 8 0 1.85-.63 3.54-1.69 4.9"/></svg>')
      center center no-repeat;
    /* stylelint-enable unit-no-unknown */
  }

  &.focusVisible {
    background-color: #79b;
  }

  &.checked {
    transform: translateX(24px);

    &::before {
      /* false positive: */
      /* stylelint-disable unit-no-unknown */
      background-image: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="22" width="22" viewBox="0 0 22 22"><path fill="${encodeURIComponent(
        '#fff',
      )}" d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2M12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8m3.5-9c.83 0 1.5-.67 1.5-1.5S16.33 8 15.5 8 14 8.67 14 9.5s.67 1.5 1.5 1.5m-7 0c.83 0 1.5-.67 1.5-1.5S9.33 8 8.5 8 7 8.67 7 9.5 7.67 11 8.5 11m3.5 6.5c2.33 0 4.31-1.46 5.11-3.5H6.89c.8 2.04 2.78 3.5 5.11 3.5"/></svg>');
      /* stylelint-enable unit-no-unknown */
    }
  }
`;

// The track the switch slides on, visible
const SwitchTrack = styled('span')(`
  background-color: #332c7b;
  border-radius: 4px;
  width: 100%;
  height: 100%;
  display: block;

`,
);