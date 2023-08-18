import { Trainer } from "../trainer"
import youngster from '../../assets/trainerSprites/Spr_B2W2_Youngster.png'
import pokefanM from '../../assets/trainerSprites/Spr_B2W2_Pokéfan_M.png'
import backpackerM from '../../assets/trainerSprites/Spr_B2W2_Backpacker_M.png'
import backpackerF from '../../assets/trainerSprites/Spr_B2W2_Backpacker_F.png'
import clerkF from '../../assets/trainerSprites/Spr_B2W2_Clerk_F.png'
import veteranF from '../../assets/trainerSprites/Spr_B2W2_Veteran_F.png'

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

export const hardTrainers = [
    sei424Cicely
]