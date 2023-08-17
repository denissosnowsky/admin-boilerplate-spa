import { encode } from 'base64-arraybuffer';

import Mapper from './Mapper';
import { Product } from '../../models/entities/Product';
import { ProductDTO } from '../../api/dto/ProductDTO';
import { mapValueToInterface } from '../../utils/models';
import { ProductDTORes } from '../../api/dto/ProductDTORes';

export class ProductMapper extends Mapper<Product, ProductDTO, ProductDTORes> {
  mapFromDTO(productDTORes: ProductDTORes): Product {
    return new Product(<Partial<Product>>{
      ...productDTORes,
      previewImage: productDTORes.previewImage
        ? this.fromBufferToBase64(productDTORes.previewImage.data)
        : '',
    });
  }

  mapToDTO(product: Product): ProductDTO {
    return mapValueToInterface(product) as ProductDTO;
  }

  private fromBufferToBase64(buffer: ArrayBuffer): string {
    return `data:image/jpg;base64,${encode(buffer)}`;
  }
}
