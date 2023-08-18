import { Trainer } from "../trainer"
import youngster from '../../assets/trainerSprites/Spr_B2W2_Youngster.png'
import pokefanM from '../../assets/trainerSprites/Spr_B2W2_Pokéfan_M.png'

export const youngsterJoey = new Trainer('Youngster', 'Joey', 'Easy', youngster, 'trainer', [
    {
        'pokemon': 'rattata',
        'moves': ['Normal', 'Grass'],
        'items': [],
        'ai': ['random']
    },
    {
        'pokemon': 'rattata',
        'moves': ['Normal', 'Fire'],
        'items': [],
        'ai': ['random']
    },
    {
        'pokemon': 'rattata',
        'moves': ['Normal', 'Water'],
        'items': [],
        'ai': ['random']
    }
])

export const sei424Jaime = new Trainer('SEI424', 'Jaime', 'Easy', youngster, 'sei424', [
    {
        'pokemon': 'cherubi',
        'moves': ['Grass', 'Rock'],
        'items': [],
        'ai': ['random']
    },
    {
        'pokemon': 'chatot',
        'moves': ['Normal', 'Flying', 'Ground'],
        'items': [],
        'ai': ['random']
    },
    {
        'pokemon': 'combusken',
        'moves': ['Fire+', 'Fighting+'],
        'items': [],
        'ai': ['random']
    }
])

export const sei424Jude = new Trainer('SEI424', 'Jude', 'Easy', pokefanM, 'sei424', [
    {
        'pokemon': 'bidoof',
        'moves': ['Normal', 'Water', 'Flying'],
        'items': [],
        'ai': ['random']
    },
    {
        'pokemon': 'slowpoke',
        'moves': ['Water', 'Psychic', 'Fire'],
        'items': [],
        'ai': ['random']
    },
    {
        'pokemon': 'bibarel',
        'moves': ['Water+', 'Normal+'],
        'items': [],
        'ai': ['random']
    }
])

export const easyTrainers = [
    youngsterJoey,
    sei424Jaime,
    sei424Jude
]