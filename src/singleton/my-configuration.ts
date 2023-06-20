import config from "./config.json";

export default class MyConfiguration {
  private static instance: MyConfiguration;

  private static _connectionString: string;
  private static _enviromment: string;
  private static _apiUrl: string;

  private constructor() {}

  private static initialize(): void {
    this._connectionString = config.connectionString;
    this._enviromment = config.enviromment;
    this._apiUrl = config.apiUrl;
  }

  public static getInstance(): MyConfiguration {
    if (!this.initialize) {
      this.initialize();
      this.instance = new MyConfiguration();
    }

    return this.instance;
  }

  get connectionString(): string {
    return MyConfiguration._connectionString;
  }

  get enviromment(): string {
    return MyConfiguration._enviromment;
  }

  get apiUrl(): string {
    return MyConfiguration._apiUrl;
  }
}
