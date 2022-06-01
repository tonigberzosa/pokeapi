import { PokemonStats } from "./pokemon-stats.model";
import { PokemonType } from "./pokemon-type.model";

export class Pokemon {
    id: number;
    name: string;
    image: string;
    types: PokemonType[];
    stats: PokemonStats[];

    constructor(json: any) {
        this.id = json.id;
        this.name = json.name;
        this.image = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${this.id}.png`;
        this.types = json.types !== undefined ? json.types.map((dataType: any) => new PokemonType(dataType)): [];
        this.stats = json.stats !== undefined ? json.stats.map((dataStats: any) => new PokemonStats(dataStats)): [];
    }
}

// Stats.stat.name
// Stats.base_stat
