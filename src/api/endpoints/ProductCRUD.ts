import { ProductDTO } from '../dto/ProductDTO';
import { CrudEndpoint } from '../common/CrudEndpoint';
import { Endpoints } from '../constants';

export class ProductCRUD extends CrudEndpoint<ProductDTO> {
  constructor() {
    super(Endpoints.PRODUCTS);
  }
}
