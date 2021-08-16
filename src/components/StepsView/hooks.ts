import * as React from 'react';
import { StepsContext } from './context';
import { StepsContextI, useStepsI } from './types';

export const useSteps = <S, D>(): useStepsI<S, D> => {
  const { state, dispatch, reset } =
    React.useContext<StepsContextI<S, D>>(StepsContext);

  return { state, dispatch, reset };
};
