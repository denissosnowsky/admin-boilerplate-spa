import Entity from './Entity';

export class Product implements Entity {
  public id?: string;
  public name = '';
  public categoryId = '';
  public description = '';
  public previewImage?: string | FileList = '';
  public hidden: boolean;

  constructor(initData: Partial<Product>) {
    Object.assign(this, initData);
  }
}
