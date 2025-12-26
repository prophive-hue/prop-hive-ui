export class TrackByFunctions {
  static trackById(index: number, item: any): any {
    return item?.id || index;
  }

  static trackByIndex(index: number): number {
    return index;
  }

  static trackByProperty(property: string) {
    return (index: number, item: any): any => {
      return item?.[property] || index;
    };
  }

  static trackByEmail(index: number, item: any): any {
    return item?.email || index;
  }

  static trackByName(index: number, item: any): any {
    return item?.name || index;
  }

  static trackByTitle(index: number, item: any): any {
    return item?.title || index;
  }
}