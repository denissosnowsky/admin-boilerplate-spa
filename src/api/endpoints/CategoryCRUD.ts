import { CategoryDTO } from '../dto/CategoryDTO';
import { CrudEndpoint } from '../common/CrudEndpoint';
import { Endpoints } from '../constants';

export class CategoryCRUD extends CrudEndpoint<CategoryDTO> {
  constructor() {
    super(Endpoints.PRODUCT_CATEGORIES);
  }
}
