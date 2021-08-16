import { useTranslation } from 'react-i18next';
import Button from '../../../components/Button';
import { useSteps } from '../../../components/StepsView/hooks';
import { StepProps } from '../../../components/StepsView/types';
import { PasswordManagerReducer } from '../reducer';
import { PasswordManagerStateType } from '../types';
import { FaChevronRight, FaTimesCircle, FaCheckCircle } from 'react-icons/fa';

function PMFeedback(props: StepProps<PasswordManagerStateType>) {
  const { state, reset } = useSteps<
    PasswordManagerStateType,
    typeof PasswordManagerReducer
  >();

  return (
    <div className="step__feedback" data-testid="pm-feedback">
      <div className="message">
        {state.result === 'success' ? (
          <SuccessMessage cta={reset} />
        ) : (
          <ErrorMessage cta={reset} />
        )}
      </div>
    </div>
  );
}

export default PMFeedback;

const SuccessMessage = ({ cta }: { cta: () => void }) => {
  const { t } = useTranslation();
  return (
    <>
      <div className="row">
        <div className="draw">
          <FaCheckCircle className="success" size="44" />
        </div>
        <div>
          <h2>{t('PManager.steps.2.success.title')}</h2>
          <p>{t('PManager.steps.2.success.text')}</p>
        </div>
      </div>
      <Button
        testId={'pm-btn-success'}
        className="action"
        onClick={cta}
        text={t('PManager.steps.2.success.cta')}
        RightIcon={FaChevronRight}
      />
    </>
  );
};

const ErrorMessage = ({ cta }: { cta: () => void }) => {
  const { t } = useTranslation();
  return (
    <>
      <div className="row">
        <div className="draw">
          <FaTimesCircle className="danger" size="44" />
        </div>
        <div>
          <h2>{t('PManager.steps.2.error.title')}</h2>
          <p>{t('PManager.steps.2.error.text')}</p>
        </div>
      </div>
      <Button
        testId={'pm-btn-error'}
        className="action"
        onClick={cta}
        text={t('PManager.steps.2.error.cta')}
        RightIcon={FaChevronRight}
      />
    </>
  );
};
