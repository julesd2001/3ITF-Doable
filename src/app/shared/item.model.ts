export class Item {
  constructor(
    id: number,
  public taskName: string,
  private list_id: string,
  public date: string,
  public isDone: boolean,
  public order: number,
  ) {}

}
