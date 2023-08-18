import { Trainer } from "../trainer"
import youngster from '../../assets/trainerSprites/Spr_B2W2_Youngster.png'
import pokefanM from '../../assets/trainerSprites/Spr_B2W2_Pokéfan_M.png'
import backpackerM from '../../assets/trainerSprites/Spr_B2W2_Backpacker_M.png'
import backpackerF from '../../assets/trainerSprites/Spr_B2W2_Backpacker_F.png'
import clerkF from '../../assets/trainerSprites/Spr_B2W2_Clerk_F.png'
import blackbelt from '../../assets/trainerSprites/Spr_B2W2_Black_Belt.png'
import gentleman from '../../assets/trainerSprites/Spr_B2W2_Gentleman.png'
import worker from '../../assets/trainerSprites/Spr_B2W2_Worker.png'

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
        'pokemon': 'chatot',
        'moves': ['Normal', 'Flying'],
        'items': [],
        'ai': ['random']
    },
    {
        'pokemon': 'combusken',
        'moves': ['Fire', 'Fighting'],
        'items': [],
        'ai': ['random']
    },
    {
        'pokemon': 'sharpedo',
        'moves': ['Water+', 'Dark+'],
        'items': [],
        'ai': ['random']
    }
])

export const sei424Jude = new Trainer('SEI424', 'Jude', 'Easy', gentleman, 'sei424', [
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

export const sei424Nafisa = new Trainer('SEI424', 'Nafisa', 'Easy', clerkF, 'sei424', [
    {
        'pokemon': 'growlithe',
        'moves': ['Fire', 'Psychic'],
        'items': [],
        'ai': ['random']
    },
    {
        'pokemon': 'stantler',
        'moves': ['Normal', 'Psychic'],
        'items': [],
        'ai': ['random']
    },
    {
        'pokemon': 'miltank',
        'moves': ['Normal+', 'Fairy+'],
        'items': [],
        'ai': ['random']
    }
])

export const sei424Elijah = new Trainer('SEI424', 'Elijah', 'Easy', blackbelt, 'sei424', [
    {
        'pokemon': 'mankey',
        'moves': ['Fighting', 'Dark'],
        'items': [],
        'ai': ['random']
    },
    {
        'pokemon': 'prinplup',
        'moves': ['Water', 'Electric'],
        'items': [],
        'ai': ['random']
    },
    {
        'pokemon': 'medicham',
        'moves': ['Fighting+', 'Psychic+'],
        'items': [],
        'ai': ['random']
    }
])

export const sei424Darious = new Trainer('SEI424', 'Darious', 'Easy', worker, 'sei424', [
    {
        'pokemon': 'voltorb',
        'moves': ['Electric', 'Fire'],
        'items': [],
        'ai': ['random']
    },
    {
        'pokemon': 'klang',
        'moves': ['Steel', 'Poison'],
        'items': [],
        'ai': ['random']
    },
    {
        'pokemon': 'scrafty',
        'moves': ['Fighting+', 'Dark+'],
        'items': [],
        'ai': ['random']
    }
])

export const easyTrainers = [
    youngsterJoey,
    sei424Jaime,
    sei424Jude,
    sei424Nafisa,
    sei424Elijah,
    sei424Darious
]