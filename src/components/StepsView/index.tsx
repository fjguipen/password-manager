import * as React from 'react';
import { useTranslation } from 'react-i18next';
import Button from '../Button';
import { StepsContext } from './context';
import StepsTracker from './StepsTracker';
import {
  Props,
  StepComponent,
  StepsViewState,
  ValidateStepFunc,
} from './types';

import { FaChevronRight } from 'react-icons/fa';

function checkStepValidation<S>(
  step: number,
  state: S,
  validators: Map<number, ValidateStepFunc<S>>
) {
  return (
    !validators.has(step) ||
    (validators.get(step) as ValidateStepFunc<S>)(state)
  );
}

function StepsView<S extends StepsViewState, D>({
  state,
  dispatch,
  children,
  reseteable,
  onReset,
}: Props<S, D>) {
  const validators = new Map<number, ValidateStepFunc<S>>();
  const [step, setStep] = React.useState(0);
  const { t } = useTranslation();

  const steps = React.Children.map(children, (child: StepComponent<S>, i) => {
    if (child.props.validateStep) {
      validators.set(i, child.props.validateStep);
    }

    return child;
  });

  const handleStep = async (action: 'next') => {
    if (!state.busy && action === 'next') {
      if (await checkStepValidation(step, state, validators)) {
        nextStep();
      }
    }
  };

  const nextStep = () => {
    setStep((prev) => {
      const next = prev + 1;
      if (next + 1 > steps.length) {
        return prev;
      }
      return next;
    });
  };

  const handleOnCancel = () => {
    if (!state.busy) {
      handleResetState();
      // go to home
    }
  };

  const handleResetState = () => {
    if (reseteable) {
      setStep(0);
      if (onReset) {
        onReset(state);
      }
    }
  };

  return (
    <div className="steps-view">
      <StepsTracker step={step} steps={steps} />
      <div className="steps-view__current">
        <StepsContext.Provider
          value={{ state, dispatch, reset: handleResetState }}
        >
          {steps[step]}
        </StepsContext.Provider>
      </div>
      <div className="steps-view__actions">
        {step < steps.length - 1 && (
          <>
            <Button
              testId="steps-cancel"
              type="button"
              className={'prev'}
              text={t('action.cancel')}
              disabled={state.busy}
              onClick={handleOnCancel}
            />
            <Button
              testId="steps-next"
              type="button"
              className={'next btn-secondary'}
              text={t('action.next')}
              onClick={() => handleStep('next')}
              disabled={state.busy}
              RightIcon={FaChevronRight}
            />
          </>
        )}
      </div>
    </div>
  );
}

export default StepsView;
