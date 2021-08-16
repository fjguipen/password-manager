import * as React from 'react';
import { StepsContextI } from './types';

export const StepsContext = React.createContext<StepsContextI<any, any>>({
  state: {},
  dispatch: () => {},
  reset: () => {},
});
