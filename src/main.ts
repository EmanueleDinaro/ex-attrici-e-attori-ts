type Person = {
  readonly id: number;
  readonly name: string;
  birth_year: number;
  death_year?: number;
  biography: string;
  image: string;
};

type Actress = Person & {
  most_famous_movies: [string, string, string];
  awards: string;
  nationality:
    | "American"
    | "British"
    | "Australian"
    | "Israeli-American"
    | "South African"
    | "French"
    | "Indian"
    | "Israeli"
    | "Spanish"
    | "South Korean"
    | "Chinese";
};

function isActress(dati: unknown): dati is Actress {
  if (
    dati &&
    typeof dati === "object" &&
    dati !== null &&
    "id" in dati &&
    typeof dati.id === "number" &&
    "name" in dati &&
    typeof dati.name === "string" &&
    "birth_year" in dati &&
    typeof dati.birth_year === "number" &&
    "death_year" in dati &&
    (typeof dati.death_year === "number" || dati.death_year === undefined) &&
    "image" in dati &&
    typeof dati.image === "string" &&
    "most_famous_movies" in dati &&
    dati.most_famous_movies instanceof Array &&
    dati.most_famous_movies.length === 3 &&
    dati.most_famous_movies.every((movie) => typeof movie === "string") &&
    "awards" in dati &&
    typeof dati.awards === "string" &&
    "nationality" in dati &&
    typeof dati.nationality === "string"
  ) {
    return true;
  }
  return false;
}

async function getActress(id: number): Promise<Actress | null> {
  try {
    const response = await fetch(`http://localhost:3333/actresses/${id}`);
    if (!response.ok) {
      throw new Error(`Errore HTTP ${response.status}: ${response.statusText}`);
    }
    const dati: unknown = await response.json();
    if (!isActress(dati)) {
      throw new Error("Formato dei dati non valido");
    }
    return dati;
  } catch (error) {
    if (error instanceof Error) console.error(error);
    return null;
  }
}

async function getAllActresses(): Promise<Actress[]> {
  try {
    const response = await fetch("http://localhost:3333/actresses");
    if (!response.ok) {
      throw new Error(`Errore HTTP ${response.status}: ${response.statusText}`);
    }

    const dati: unknown = await response.json();
    if (!(dati instanceof Array)) {
      throw new Error("Formato dei dati non valido, non è un array");
    }
    const validActresses = dati.filter(isActress);
    return validActresses;
  } catch (error) {
    if (error instanceof Error) console.error(error);
    return [];
  }
}
