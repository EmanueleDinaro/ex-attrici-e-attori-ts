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

//  Milestone 3
// Crea una funzione getActress che, dato un id, effettua una chiamata a:

// GET /actresses/:id
// La funzione deve restituire l’oggetto Actress, se esiste, oppure null se non trovato.

// Utilizza un type guard chiamato isActress per assicurarti che la struttura del dato ricevuto sia corretta.

function isActress(dati: unknown): dati is Actress {
  if (
    dati &&
    typeof dati === "object" &&
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
    Array.isArray(dati.most_famous_movies) &&
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
    console.error(error);
    return null;
  }
}
