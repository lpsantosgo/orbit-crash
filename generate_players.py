import random

first_names = [
    "Lucas", "Mateus", "Gabriel", "Enzo", "Guilherme", "Rafael", "Felipe", "Gustavo", "Rodrigo", "Daniel",
    "Ana", "Julia", "Beatriz", "Mariana", "Camila", "Leticia", "Fernanda", "Isabela", "Larissa", "Amanda",
    "Ricardo", "Vinicius", "Tiago", "Andre", "Bruno", "Caio", "Diego", "Eduardo", "Fabio", "Igor",
    "Janaína", "Karina", "Lorena", "Milena", "Natália", "Patrícia", "Renata", "Sabrina", "Tatiana", "Vanessa",
    "Alexandre", "Breno", "Calebe", "Davi", "Erick", "Francisco", "Geraldo", "Henrique", "Italo", "João",
    "Kleber", "Leonardo", "Murilo", "Natan", "Otávio", "Paulo", "Queiroz", "Ruan", "Samuel", "Túlio",
    "Ualisson", "Vitor", "Wagner", "Xavier", "Yago", "Zeca", "Adriano", "Bernardo", "Cristiano", "Douglas"
]

last_names = [
    "Silva", "Santos", "Oliveira", "Souza", "Rodrigues", "Ferreira", "Alves", "Pereira", "Lima", "Gomes",
    "Costa", "Ribeiro", "Martins", "Carvalho", "Almeida", "Lopes", "Soares", "Fernandes", "Vieira", "Barbosa",
    "Rocha", "Dias", "Nascimento", "Andrade", "Moreira", "Nunes", "Marques", "Machado", "Mendes", "Freitas",
    "Cardoso", "Ramos", "Santana", "Teixeira", "Guimarães", "Araújo", "Melo", "Castro", "Pinto"
]

ddd_list = ["11", "21", "31", "41", "51", "61", "71", "81", "91", "19", "27", "32", "47", "54", "62", "79", "85", "92", "98"]

players = []
seen = set()

while len(players) < 2000:
    mode = random.choice(["name", "phone"])
    if mode == "name":
        first = random.choice(first_names)
        last = random.choice(last_names)
        name = f"{first} {last}"
    else:
        ddd = random.choice(ddd_list)
        # Exemplo: 619998**63
        # ddd + 9 + 3 digits + ** + 2 digits
        p1 = "".join([str(random.randint(0, 9)) for _ in range(3)])
        p2 = "".join([str(random.randint(0, 9)) for _ in range(2)])
        name = f"{ddd}9{p1}**{p2}"
    
    if name not in seen:
        players.append(name)
        seen.add(name)

import json
print("export const PLAYER_NAMES = " + json.dumps(players) + ";")
