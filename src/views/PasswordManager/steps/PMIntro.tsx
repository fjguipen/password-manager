import { useTranslation } from 'react-i18next';
import { StepProps } from '../../../components/StepsView/types';
import { PUBLIC_URL } from '../../../constants';
import { PasswordManagerStateType } from '../types';

function PMIntro(props: StepProps<PasswordManagerStateType>) {
  const { t } = useTranslation();
  return (
    <div className="step__intro" data-testid="pm-intro">
      <div className="">
        <h2>{t('PManager.steps.0.0.title')}</h2>
        <div className="row">
          <div>
            <div className="draw">
              <img
                src={`${PUBLIC_URL}/img/head.svg`}
                alt="Store your passwords"
              />
            </div>
            <p>{t('PManager.steps.0.0.content.0')}</p>
          </div>
          <div>
            <div className="draw">
              <img src={`${PUBLIC_URL}/img/locker.svg`} alt="Secured store" />
            </div>
            <p>{t('PManager.steps.0.0.content.1')}</p>
          </div>
        </div>
      </div>
      <div className="block">
        <h3 className="block__title">{t('PManager.steps.0.1.title')}</h3>
        <p>{t('PManager.steps.0.1.text')}</p>
      </div>
      <div className="block">
        <h3 className="block__title">{t('PManager.steps.0.2.title')}</h3>
        <p>{t('PManager.steps.0.2.text')}</p>
      </div>
    </div>
  );
}

export default PMIntro;
