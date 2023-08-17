export default abstract class Mapper<Model extends Object, DTO extends Object, DTORes extends Object> {
  public mapFromDTOList(itemDTORes: DTORes[]): Model[] {
    return itemDTORes.map(dto => this.mapFromDTO(dto));
  }

  public mapToDTOList(items: Model[]): DTO[] {
    return items.map(item => this.mapToDTO(item));
  }

  public abstract mapFromDTO(itemDTORes: DTORes): Model;
  public abstract mapToDTO(item: Model): DTO;
}
