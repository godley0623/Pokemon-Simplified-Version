import { Trainer } from "../trainer"
import youngster from '../../assets/trainerSprites/Spr_B2W2_Youngster.png'
import pokefanM from '../../assets/trainerSprites/Spr_B2W2_Pokéfan_M.png'

export const youngsterJoey2 = new Trainer('Youngster', 'Joey', 'Normal', youngster, 'trainer', [
    {
        'pokemon': 'rattata',
        'moves': ['Normal', 'Grass'],
        'items': [],
        'ai': ['weakness']
    },
    {
        'pokemon': 'rattata',
        'moves': ['Normal', 'Fire'],
        'items': [],
        'ai': ['weakness']
    },
    {
        'pokemon': 'rattata',
        'moves': ['Normal', 'Water'],
        'items': [],
        'ai': ['weakness']
    },
    {
        'pokemon': 'raticate',
        'moves': ['Normal', 'Grass', 'Fire', 'Water'],
        'items': [],
        'ai': ['weakness']
    }
])

export const sei424Jamari = new Trainer('SEI424', 'Jamari', 'Normal', pokefanM, 'sei424', [
    {
        'pokemon': 'makuhita',
        'moves': ['Fighting', 'Ice', 'Steel'],
        'items': [],
        'ai': ['weakness']
    },
    {
        'pokemon': 'croconaw',
        'moves': ['Water', 'Poison', 'Dark'],
        'items': [],
        'ai': ['weakness']
    },
    {
        'pokemon': 'vigoroth',
        'moves': ['Normal+', 'Fighting', 'Ghost'],
        'items': [],
        'ai': ['weakness']
    },
    {
        'pokemon': 'poliwrath',
        'moves': ['Water+', 'Fighting+', 'Fire', 'Fairy'],
        'items': [],
        'ai': ['weakness']
    }
])

export const normalTrainers = [
    youngsterJoey2,
    sei424Jamari
]