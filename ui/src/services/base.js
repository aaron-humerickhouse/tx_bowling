import axios from 'axios';

export class BaseService {
  http;

  constructor() {
    this.http = axios.create({
      baseURL: `${'http://localhost:3001'}/api/v1`,
    });
  };

  get = (path, config) => {
    config = this.spread(config || {});
    return this.http.get(path, config);
  };

  put = (path, data, config) => {
    return this.http.put(path, data, config);
  };

  post = (path, data, config) => {
    config = this.spread(config || {});
    return this.http.post(path, data, config);
  };

  delete = (path, config) => {
    return this.http.delete(path, config);
  };

  spread = (config) => {
    config['headers'] = { ...config['headers'], 'Content-Type': 'application/json' };
    config['headers'] = { ...config['headers'], 'accept': 'application/json' };

    return config;
  };
}

export default BaseService;
