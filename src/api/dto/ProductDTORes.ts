import { CategoryDTO } from './CategoryDTO';

export interface ProductDTORes {
  id?: string;
  name: string;
  categoryId?: string;
  description?: string;
  category?: CategoryDTO;
  previewImage?: { data: ArrayBuffer; type: string };
}
