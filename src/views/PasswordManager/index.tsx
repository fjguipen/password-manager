import * as React from 'react';
import FormContextProvider from '../../components/Form/FormContextProvider';
import { useFormValidation } from '../../components/Form/hooks';
import StepsView from '../../components/StepsView';
import { PasswordManagerReducer } from './reducer';
import PMFeedback from './steps/PMFeedback';
import PMInput from './steps/PMInput';
import PMIntro from './steps/PMIntro';
import {
  DEFAULT_PASSWORD_MANAGER_STATE,
  PasswordManagerStateType,
  PMFormData,
  PMStateResult,
} from './types';
import { PMFormConfig } from './formConfig';
import { submitPMForm } from '../../services/api';

function PasswordManager() {
  const [state, dispatch] = React.useReducer(
    PasswordManagerReducer,
    DEFAULT_PASSWORD_MANAGER_STATE
  );

  const getFormConfig = React.useMemo(() => {
    return PMFormConfig(state.form);
  }, [state.form]);

  const { errors, validateField, validateForm, clearErrors } =
    useFormValidation(state.form, getFormConfig);

  const handleOnReset = (state: PasswordManagerStateType) => {
    // handle on reset
    dispatch({
      type: 'reset',
    });
    clearErrors();
  };

  const handleValidateStep = async (state: PasswordManagerStateType) => {
    // handle form valdiation
    if (!validateForm()) {
      return false;
    }
    await handleSubmitForm(state.form);

    return true;
  };

  const handleSubmitForm = async (form: PMFormData) => {
    // handle form valdiation
    // submit mock form
    let result: PMStateResult;
    try {
      dispatch({
        type: 'busy',
        payload: true,
      });
      const response = await submitPMForm(form);
      result = response?.status === 200 ? 'success' : 'error';
    } catch {
      // handle error
      result = 'error';
    } finally {
      dispatch({
        type: 'busy',
        payload: false,
      });
    }

    dispatch({
      type: 'result',
      payload: result,
    });
  };

  const updateField = (key: keyof PMFormData, value: any) => {
    validateField(key, value);
    dispatch({
      type: 'updateField',
      payload: {
        [key]: value,
      },
    });
  };

  return (
    <div className="password-manager" data-testid="password-manager">
      <FormContextProvider<PMFormData>
        form={state.form}
        config={getFormConfig}
        update={updateField}
        errors={errors}
        busy={state.busy}
      >
        <StepsView<PasswordManagerStateType, typeof dispatch>
          state={state}
          dispatch={dispatch}
          reseteable
          onReset={handleOnReset}
        >
          <PMIntro />
          <PMInput validateStep={handleValidateStep} />
          <PMFeedback />
        </StepsView>
      </FormContextProvider>
    </div>
  );
}

export default PasswordManager;
