export class PokemonType {
    name: string;

    constructor(json: any) {
        this.name = json.type.name;
    }
}
