import Mapper from './Mapper';
import { Category } from '../../models/entities/Category';
import { CategoryDTO } from '../../api/dto/CategoryDTO';
import { mapValueToInterface } from '../../utils/models';

export class CategoryMapper extends Mapper<Category, CategoryDTO, CategoryDTO> {
  mapFromDTO(categoryDTO: CategoryDTO): Category {
    return new Category(<Partial<Category>>categoryDTO);
  }

  mapToDTO(category: Category): CategoryDTO {
    return mapValueToInterface(category) as CategoryDTO;
  }
}
