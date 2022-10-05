import AxiosClient from './axiosClient';

const apiController = () => {
  api: () => {
    return AxiosClient.get('/');
  };
};

export default apiController;
