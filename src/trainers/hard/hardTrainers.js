import { Trainer } from "../trainer"
import youngster from '../../assets/trainerSprites/Spr_B2W2_Youngster.png'
import pokefanM from '../../assets/trainerSprites/Spr_B2W2_Pokéfan_M.png'
import backpackerM from '../../assets/trainerSprites/Spr_B2W2_Backpacker_M.png'
import backpackerF from '../../assets/trainerSprites/Spr_B2W2_Backpacker_F.png'
import clerkF from '../../assets/trainerSprites/Spr_B2W2_Clerk_F.png'
import veteranF from '../../assets/trainerSprites/Spr_B2W2_Veteran_F.png'
import cyclistM from '../../assets/trainerSprites/Spr_B2W2_Cyclist_M.png'
import hiker from '../../assets/trainerSprites/Spr_B2W2_Hiker.png'

export const sei424Cicely = new Trainer('SEI424', 'Cicely', 'Hard', veteranF, 'sei424', [
    {
        'pokemon': 'mawile',
        'moves': ['Steel+', 'Fairy+', 'Flying+'],
        'items': [],
        'ai': ['weakness']
    },
    {
        'pokemon': 'delcatty',
        'moves': ['Normal+', 'Flying+', 'Dark', 'Grass'],
        'items': [],
        'ai': ['weakness']
    },
    {
        'pokemon': 'spinda',
        'moves': ['Normal+', 'Flying+', 'Bug', 'Psychic'],
        'items': [],
        'ai': ['weakness']
    },
    {
        'pokemon': 'mismagius',
        'moves': ['Ghost+', 'Flying+', 'Electric'],
        'items': [],
        'ai': ['weakness']
    },
    {
        'pokemon': 'roserade',
        'moves': ['Grass+', 'Poison+', 'Flying+', 'Rock'],
        'items': [],
        'ai': ['weakness']
    },
    {
        'pokemon': 'altaria',
        'moves': ['Dragon+', 'Flying+', 'Steel+', 'Water+'],
        'items': [],
        'ai': ['weakness']
    }
])

export const sei424Matt = new Trainer('SEI424', 'Matt', 'Hard', cyclistM, 'sei424', [
    {
        'pokemon': 'wobbuffet',
        'moves': ['Psychic+', 'Bug+'],
        'items': [],
        'ai': ['weakness']
    },
    {
        'pokemon': 'mightyena',
        'moves': ['Dark+', 'Bug+', 'Steel', 'Electric'],
        'items': [],
        'ai': ['weakness']
    },
    {
        'pokemon': 'scizor',
        'moves': ['Steel+', 'Bug+', 'Rock', 'Flying'],
        'items': [],
        'ai': ['weakness']
    },
    {
        'pokemon': 'muk',
        'moves': ['Poison+', 'Bug+', 'Dark', 'Ice'],
        'items': [],
        'ai': ['weakness']
    },
    {
        'pokemon': 'blaziken',
        'moves': ['Fire+', 'Fighting+', 'Bug+', 'Electric'],
        'items': [],
        'ai': ['weakness']
    },
    {
        'pokemon': 'magnezone',
        'moves': ['Electric+', 'Steel+', 'Bug+', 'Water+'],
        'items': [],
        'ai': ['weakness']
    }
])

export const sei424Shalom = new Trainer('SEI424', 'Shalom', 'Hard', hiker, 'sei424', [
    {
        'pokemon': 'hypno',
        'moves': ['Psychic+', 'Bug', 'Steel+', 'Fire'],
        'items': [],
        'ai': ['weakness']
    },
    {
        'pokemon': 'sableye',
        'moves': ['Dark+', 'Ghost+', 'Steel+', 'Rock+'],
        'items': [],
        'ai': ['weakness']
    },
    {
        'pokemon': 'stantler',
        'moves': ['Normal+', 'Bug', 'Steel+', 'Fairy'],
        'items': [],
        'ai': ['weakness']
    },
    {
        'pokemon': 'shiftry',
        'moves': ['Grass+', 'Dark+', 'Flying', 'Steel'],
        'items': [],
        'ai': ['weakness']
    },
    {
        'pokemon': 'wailord',
        'moves': ['Water+', 'Bug', 'Fire+', 'Steel+'],
        'items': [],
        'ai': ['weakness']
    },
    {
        'pokemon': 'probopass',
        'moves': ['Rock+', 'Steel+', 'Psychic+', 'Fire+'],
        'items': [],
        'ai': ['weakness']
    }
])

export const hardTrainers = [
    sei424Cicely,
    sei424Matt,
    sei424Shalom
]