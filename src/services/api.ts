import { PMFormData } from '../views/PasswordManager/types';

type APIResponse = {
  status: number;
};

export const PRUEBA_KO = 'pruebaKO123';

const RESPONSE_OK: APIResponse = { status: 200 };
const RESPONSE_KO: APIResponse = { status: 401 };

const submitPMForm = ({ password }: PMFormData): Promise<APIResponse> =>
  new Promise((resolve, reject) =>
    setTimeout(
      () =>
        password !== PRUEBA_KO ? resolve(RESPONSE_OK) : reject(RESPONSE_KO),
      1000
    )
  );

export { submitPMForm };
