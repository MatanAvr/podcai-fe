// local storage handler
export class LS {
  private static instance: LS;

  public static getInstance(): LS {
    if (!LS.instance) {
      LS.instance = new LS();
    }
    return LS.instance;
  }

  save(key: string, data: any): void {
    const dataJson = JSON.stringify(data);
    localStorage.setItem(key, dataJson);
  }

  load(key: string) {
    try {
      const dataFromLocalStorage = localStorage.getItem(key);
      if (dataFromLocalStorage) {
        const data = JSON.parse(dataFromLocalStorage);
        return data;
      }
      console.error("LS - !dataFromLocalStorage for key", key);
      return undefined;
    } catch (error) {
      console.error("LS", error);
      return undefined;
    }
  }

  delete(key: string): void {
    localStorage.removeItem(key);
  }
}
