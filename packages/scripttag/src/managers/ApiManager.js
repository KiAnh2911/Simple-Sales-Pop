import makeRequest from '../helpers/api/makeRequest';

const BASE_URL = 'https://localhost:3000';
export default class ApiManager {
  getNotifications = async () => {
    const path = `/clientApi/notifications?shopifyDomain=${window.Shopify.shop}`;
    const {notifications, settings} = await this.getApiData(path);
    return {notifications, settings};
  };

  getApiData = async path => {
    try {
      const response = await makeRequest(BASE_URL + path);
      return response.data;
    } catch (error) {
      console.error(error);
      return {};
    }
  };
}
