import { Trainer } from "../trainer"
import youngster from '../../assets/trainerSprites/Spr_B2W2_Youngster.png'

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

export const normalTrainers = [
    youngsterJoey2
]