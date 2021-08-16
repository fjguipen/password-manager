import { render, waitFor, screen, fireEvent, act } from '../../../setupTests';
import PasswordManager from '..';
import { PRUEBA_KO } from '../../../services/api';

const setupInputStep = async () => {
  const utils = render(<PasswordManager />);

  await act(async () => {
    fireEvent.click(utils.getByTestId('steps-next'));
  });

  return utils;
};

const setupSubmitForm = async (type: 'success' | 'error') => {
  const formData = {
    success: {
      password: 'hola123Ff',
      rePassword: 'hola123Ff',
    },
    error: {
      password: PRUEBA_KO,
      rePassword: PRUEBA_KO,
    },
  };
  const utils = await setupInputStep();

  const password = utils.getByLabelText('input-password') as HTMLInputElement;
  const rePassword = utils.getByLabelText(
    'input-rePassword'
  ) as HTMLInputElement;

  await act(async () => {
    fireEvent.change(password, { target: { value: formData[type].password } });
    fireEvent.change(rePassword, {
      target: { value: formData[type].rePassword },
    });
  });

  await act(async () => {
    fireEvent.click(utils.getByTestId('steps-next'));
  });

  return utils;
};

describe('Testing PasswordManager', () => {
  test('Password manager renders correctly', async () => {
    render(<PasswordManager />);
    const el = screen.getByTestId('password-manager');
    expect(el).toBeInTheDocument();
  });

  test('Password manager steps forward', async () => {
    const { getByTestId } = await setupInputStep();

    const el = getByTestId('pm-input');
    expect(el).toBeInTheDocument();
  });

  test('Password manager steps reset', async () => {
    const { getByTestId } = await setupInputStep();

    expect(getByTestId('pm-input')).toBeInTheDocument();

    await act(async () => {
      await fireEvent.click(getByTestId('steps-cancel'));
    });

    expect(getByTestId('pm-intro')).toBeInTheDocument();
  });

  test('Password manager password errors', async () => {
    const { getByTestId, getByLabelText } = await setupInputStep();

    const password = getByLabelText('input-password') as HTMLInputElement;

    await act(async () => {
      fireEvent.click(getByTestId('steps-next'));
    });
    await act(async () => {
      fireEvent.change(password, { target: { value: 'hola' } });
    });

    expect(getByTestId('password-minLength')).toBeInTheDocument();
    expect(getByTestId('password-pattern-password')).toBeInTheDocument();
  });

  test('Password manager rePassword missmatch error', async () => {
    const { getByTestId, getByLabelText } = await setupInputStep();

    const password = getByLabelText('input-password') as HTMLInputElement;
    const rePassword = getByLabelText('input-rePassword') as HTMLInputElement;
    await act(async () => {
      fireEvent.change(password, { target: { value: 'hola123fF' } });
      fireEvent.change(rePassword, { target: { value: 'adios' } });
    });

    expect(getByTestId('rePassword-sameAs-password')).toBeInTheDocument();
  });

  test('Password manager form submit: success', async () => {
    const { getByTestId } = await setupSubmitForm('success');

    expect(getByTestId('pm-loading')).toBeInTheDocument();

    await waitFor(() => getByTestId('pm-feedback'), {
      timeout: 1500,
    });

    expect(getByTestId('pm-feedback')).toBeInTheDocument();
    expect(getByTestId('pm-btn-success')).toBeInTheDocument();
  });

  test('Password manager form submit: error', async () => {
    const { getByTestId } = await setupSubmitForm('error');

    expect(getByTestId('pm-loading')).toBeInTheDocument();

    await waitFor(() => getByTestId('pm-feedback'), {
      timeout: 1500,
    });

    expect(getByTestId('pm-feedback')).toBeInTheDocument();
    expect(getByTestId('pm-btn-error')).toBeInTheDocument();
  });
});
