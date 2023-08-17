import { $http } from './Axios';
import { FetchCount } from './FetchResult';
import { QueryFilters } from '../../models/filters/QueryFilters';
import { Endpoints } from '../constants';

export interface ICrudEndpoint<DTO> {
  fetchItems(queryFilters: QueryFilters): Promise<DTO[]>;
  fetchItem(itemId: number | string): Promise<DTO>;
  deleteItem(itemId: number | string): Promise<number>;
  updateItem(itemId: string | undefined, newItem: DTO): Promise<DTO>;
  addItem(item: DTO): Promise<DTO>;
  fetchCount(): Promise<FetchCount>;
}

export abstract class CrudEndpoint<DTO> implements ICrudEndpoint<DTO> {
  protected entityEndpoint: Endpoints = Endpoints.DEFAULT;
  private headers = {};

  protected constructor(entityEndpoint: Endpoints) {
    this.entityEndpoint = entityEndpoint;
    this.headers = {
      'Content-Type':
        this.entityEndpoint === Endpoints.PRODUCTS
          ? 'multipart/form-data'
          : 'application/json',
    };
  }

  public async fetchItems(queryFilters?: QueryFilters): Promise<DTO[]> {
    const params = queryFilters?.mapQueryFilterToRequestParams();

    const response = await $http.get(`/${this.entityEndpoint}`, {
      params,
    });
    return response.data;
  }

  public async fetchItem(itemId: string): Promise<DTO> {
    const response = await $http.get(`/${this.entityEndpoint}/${itemId}`);
    return response.data;
  }

  public async deleteItem(itemId: string): Promise<number> {
    const response = await $http.delete(`/${this.entityEndpoint}/${itemId}`);
    return response.status;
  }

  public async updateItem(itemId: string, newItem: DTO): Promise<DTO> {
    const response = await $http.put(`/${this.entityEndpoint}/${itemId}`, newItem, {
      headers: this.headers,
    });
    // Fetch updated item in case PUT doesn't return one
    if (response.status >= 200 && response.status < 400 && !response.data)
      return await this.fetchItem(itemId);
    return response.data;
  }

  public async addItem(item: DTO): Promise<DTO> {
    const response = await $http.post(`/${this.entityEndpoint}`, item, {
      headers: this.headers,
    });
    return response.data;
  }
  public async fetchCount(): Promise<FetchCount> {
    const response = await $http.get(`/${this.entityEndpoint}/count`);
    return response.data;
  }
}
