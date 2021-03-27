import { ToastPosition } from 'react-toastify';

export const PUBLIC_PAGES = {
  NAME: {
    HOME: '/',
  },
};

export type AlertTypeOptions = 'info' | 'success' | 'warning' | 'error' | undefined;

interface TYPE_OPTIONS {
  [type: string]: AlertTypeOptions;
}

export const TOAST_TYPE: TYPE_OPTIONS = {
  SUCCESS: 'success',
  ERROR: 'error',
  INFO: 'info',
  WARNING: 'warning',
};

interface POSITION_OPTIONS {
  [pos: string]: ToastPosition;
}

export const POSITION: POSITION_OPTIONS = {
  TOP_LEFT: 'top-left',
  TOP_RIGHT: 'top-right',
  TOP_CENTER: 'top-center',
  BOTTOM_LEFT: 'bottom-left',
  BOTTOM_RIGHT: 'bottom-right',
  BOTTOM_CENTER: 'bottom-center',
};

export const DURATION = {
  TOAST: 1000,
  TOAST_TRANSITION: 1000,
  BULK_POLLING_DELAY: 15000,
  UPDATE_NOTIFICATIONS: 60000,
  UPDATE_PROGRESS_JOB: 5000,
};
