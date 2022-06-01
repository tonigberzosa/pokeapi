export class PokemonStats {
  name: string;
  value: number;

  constructor(json: any) {
      this.name = json.stat.name;
      this.value = json.base_stat;
  }
}
