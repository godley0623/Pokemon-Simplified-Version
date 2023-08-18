import { Trainer } from "../trainer"
import youngster from '../../assets/trainerSprites/Spr_B2W2_Youngster.png'
import pokefanM from '../../assets/trainerSprites/Spr_B2W2_Pokéfan_M.png'
import backpackerM from '../../assets/trainerSprites/Spr_B2W2_Backpacker_M.png'
import backpackerF from '../../assets/trainerSprites/Spr_B2W2_Backpacker_F.png'
import clerkF from '../../assets/trainerSprites/Spr_B2W2_Clerk_F.png'
import breederM from '../../assets/trainerSprites/Spr_B2W2_Pokémon_Breeder_M.png'
import joker from '../../assets/trainerSprites/Spr_B2W2_Harlequin.png'

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

export const sei424Larisa = new Trainer('SEI424', 'Larisa', 'Normal', backpackerF, 'sei424', [
    {
        'pokemon': 'smeargle',
        'moves': ['Normal+', 'Fire+', 'Water+', 'Grass+'],
        'items': [],
        'ai': ['weakness']
    },
    {
        'pokemon': 'mightyena',
        'moves': ['Dark+', 'Psychic', 'Flying'],
        'items': [],
        'ai': ['weakness']
    },
    {
        'pokemon': 'pelipper',
        'moves': ['Flying+', 'Water', 'Fairy'],
        'items': [],
        'ai': ['weakness']
    },
    {
        'pokemon': 'typhlosion',
        'moves': ['Fire+', 'Flying', 'Ghost'],
        'items': [],
        'ai': ['weakness']
    },
    {
        'pokemon': 'porygon-z',
        'moves': ['Normal+', 'Ice+', 'Electric+', 'Fire+'],
        'items': [],
        'ai': ['weakness']
    }
])

export const sei424Luke = new Trainer('SEI424', 'Luke', 'Normal', backpackerM, 'sei424', [
    {
        'pokemon': 'jigglypuff',
        'moves': ['Fairy+', 'Fighting', 'Psychic',],
        'items': [],
        'ai': ['weakness']
    },
    {
        'pokemon': 'pikachu',
        'moves': ['Electric+', 'Fighting', 'Grass',],
        'items': [],
        'ai': ['weakness']
    },
    {
        'pokemon': 'wigglytuff',
        'moves': ['Fairy+', 'Fighting', 'Ground'],
        'items': [],
        'ai': ['weakness']
    },
    {
        'pokemon': 'raichu',
        'moves': ['Electric+', 'Fighting', 'Ice'],
        'items': [],
        'ai': ['weakness']
    },
    {
        'pokemon': 'lucario',
        'moves': ['Steel+', 'Fighting+', 'Water'],
        'items': [],
        'ai': ['weakness']
    }
])

export const sei424Devin = new Trainer('SEI424', 'Devin', 'Normal', breederM, 'sei424', [
    {
        'pokemon': 'granbull',
        'moves': ['Fairy+', 'Fighting', 'Water'],
        'items': [],
        'ai': ['weakness']
    },
    {
        'pokemon': 'stoutland',
        'moves': ['Normal+', 'Fighting', 'Grass'],
        'items': [],
        'ai': ['weakness']
    },
    {
        'pokemon': 'houndoom',
        'moves': ['Fire+', 'Dark+', 'Fighting', 'Flying'],
        'items': [],
        'ai': ['weakness']
    },
    {
        'pokemon': 'arcanine',
        'moves': ['Fire+', 'Fighting+', 'Rock+', 'Dragon+'],
        'items': [],
        'ai': ['weakness']
    }
])

export const sei424Grant = new Trainer('SEI424', 'Grant', 'Normal', joker, 'sei424', [
    {
        'pokemon': 'mr-mime',
        'moves': ['Psychic+', 'Fairy', 'Ghost', 'Bug'],
        'items': [],
        'ai': ['weakness']
    },
    {
        'pokemon': 'liepard',
        'moves': ['Dark+', 'Fairy', 'Fire'],
        'items': [],
        'ai': ['weakness']
    },
    {
        'pokemon': 'ludicolo',
        'moves': ['Grass+', 'Water+', 'Ghost', 'Ice'],
        'items': [],
        'ai': ['weakness']
    },
    {
        'pokemon': 'gengar',
        'moves': ['Ghost+', 'Poison+', 'Ice+', 'Fighting+'],
        'items': [],
        'ai': ['weakness']
    }
])

export const normalTrainers = [
    youngsterJoey2,
    sei424Jamari,
    sei424Larisa,
    sei424Luke,
    sei424Devin,
    sei424Grant
]