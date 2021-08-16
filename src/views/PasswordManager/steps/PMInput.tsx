import * as React from 'react';
import { useTranslation } from 'react-i18next';
import { useForm } from '../../../components/Form/hooks';
import InputPassword from '../../../components/Form/InputPassword';
import InputText from '../../../components/Form/InputText';
import LoadingIndicator from '../../../components/LoadingIndicator';
import { StepProps } from '../../../components/StepsView/types';
import { PasswordManagerStateType, PMFormData } from '../types';

function PMInput(props: StepProps<PasswordManagerStateType>) {
  const { t } = useTranslation();
  const { form, update, errors, config, busy } = useForm<PMFormData>();

  const handleOnChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const {
      target: { value, name },
    } = event;

    update(name as keyof PMFormData, value);
  };

  if (busy) {
    return (
      <div data-testid="pm-loading">
        <LoadingIndicator width={55} height={55} />
      </div>
    );
  }

  return (
    <div className="step__input" data-testid="pm-input">
      <h2>{t('PManager.steps.1.title')}</h2>
      <div className="block">
        <p>{t('PManager.steps.1.intro.0')}</p>
        <p>{t('PManager.steps.1.intro.1')}</p>
      </div>
      <div className="row">
        <InputPassword
          name="password"
          value={form.password}
          onChange={handleOnChange}
          label={'PManager.form.password.label'}
          placeholder={'PManager.form.password.placeholder'}
          config={config.fields.find((c) => c.key === 'password')}
          errors={errors.filter((e) => e.key === 'password')}
        />
        <InputPassword
          name="rePassword"
          value={form.rePassword}
          onChange={handleOnChange}
          label={'PManager.form.rePassword.label'}
          placeholder={'PManager.form.rePassword.placeholder'}
          config={config.fields.find((c) => c.key === 'rePassword')}
          errors={errors.filter((e) => e.key === 'rePassword')}
        />
      </div>
      <div className="block">
        <p>{t('PManager.steps.1.hintTip')}</p>
      </div>
      <InputText
        className="w100"
        name="hint"
        value={form.hint}
        onChange={handleOnChange}
        label={'PManager.form.hint.label'}
        placeholder={'PManager.form.hint.placeholder'}
        config={config.fields.find((c) => c.key === 'hint')}
        withCounter
        errors={errors.filter((e) => e.key === 'hint')}
      />
    </div>
  );
}

export default PMInput;
