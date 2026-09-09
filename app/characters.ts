export type Character = {
  name: string;
  slug: string;
  role: string;
  fact: string;
  firstStory: string;
  tbd?: boolean;
};

const known: Record<string, Omit<Character, 'name' | 'slug'>> = {
  "Cardinal J'onn": {
    role: 'A voice from beyond Sill',
    fact: 'Story Eight preserves his own account in his own words.',
    firstStory: 'Story Eight · The Ladder',
  },
  'Cassandra Lorde': {
    role: 'Crew leader · The Tariff',
    fact: 'She runs the best crew in Sill. Sexton is the only person who calls her Cas.',
    firstStory: 'Story Two · The Gold',
  },
  Ceryl: {
    role: 'Power broker of Sill',
    fact: 'When the others arrive with theater and guards, Ceryl arrives without either.',
    firstStory: 'Story Three · The Eight',
  },
  Corrigan: {
    role: 'Rope and line merchant',
    fact: "Corrigan's shop smells of tar, new hemp, and hot dust from line under load.",
    firstStory: 'Story Two · The Gold',
  },
  Dray: {
    role: 'Specialist for hire',
    fact: 'Sexton asks for Dray by name when the work allows fourteen days—or less.',
    firstStory: 'Story Two · The Gold',
  },
  Linen: {
    role: 'Keeper of a dark room',
    fact: 'Linen keeps a room off the Ninth Market with no lamp in it. It suits them both.',
    firstStory: 'Story Two · The Gold',
  },
  'Mother Ansel': {
    role: 'Keeper of the Lazaret',
    fact: 'She was stranded beyond Gate 1,046 for nine years and still wears her clear stone openly.',
    firstStory: 'Story One · The Red',
  },
  Orsk: {
    role: 'Visitor with nothing to sell',
    fact: 'He arrives with a fortune from a world where money cannot survive the crossing.',
    firstStory: 'Story Seven · Nothing to Sell',
  },
  Pim: {
    role: 'Young traveler in black',
    fact: 'His spiked shoulder plate has no possible use, which does not stop him wearing it.',
    firstStory: 'Story Seven · Nothing to Sell',
  },
  Quillon: {
    role: 'One of the Eight',
    fact: 'He makes sure he is standing when everyone else enters the room.',
    firstStory: 'Story Three · The Eight',
  },
  Sexton: {
    role: 'Retrieval specialist · The Gray Man',
    fact: 'Nineteen years through the doors. One rule: nobody gets left.',
    firstStory: 'Story One · The Red',
  },
  Sparrow: {
    role: 'Watcher and information broker',
    fact: 'If Sparrow finds you on the steps, she has probably been watching them for four days.',
    firstStory: 'Story Two · The Gold',
  },
  Tally: {
    role: 'Witness of the Ninth Market',
    fact: 'Nothing the rabbit-headed machine has written down has ever been successfully disputed.',
    firstStory: 'Story Three · The Eight',
  },
  'The Recorder': {
    role: 'Keeper of consequential accounts',
    fact: 'Nobody gets a Thursday audience. Sexton did.',
    firstStory: 'Story Four · The Quiet Door',
  },
  Tice: {
    role: 'One of the Eight',
    fact: 'He enters behind Quillon and takes the wall without being asked.',
    firstStory: 'Story Three · The Eight',
  },
  Toller: {
    role: 'One of the Eight',
    fact: 'Where his face should be, a lantern of moving light burns inside a cracked case.',
    firstStory: 'Story Three · The Eight',
  },
  'Tollis Vane': {
    role: 'Chief assayer',
    fact: 'The most feared unarmed man in Sill is small, tidy, and dressed in seamless charcoal.',
    firstStory: 'Story Two · The Gold',
  },
  'Verity Ash': {
    role: 'Keeper of the reading room',
    fact: 'In nineteen years Sexton has never heard her shorten a single word.',
    firstStory: 'Story One · The Red',
  },
  'Veth Garg': {
    role: 'Stranded companion',
    fact: 'Forty-one doors searched. Four arms. Sexton has called him Gary for thirty years.',
    firstStory: 'Story One · The Red',
  },
};

const names = [
  'Amon Tot',
  'Arty',
  'Beck Halloran',
  'Bram',
  "Cardinal J'onn",
  'Cassandra Lorde',
  'Ceryl',
  'Corrigan',
  'Dray',
  'Jasmine Kell',
  'Jeremiah',
  'Kell',
  'Lacey Roy',
  'Linen',
  'Mighty Max',
  'Mother Ansel',
  'Orsk',
  'Pim',
  'Quillon',
  'Roy',
  'Scratch',
  'Sexton',
  'Sok Ha',
  'Sparrow',
  'Tally',
  'Thalia',
  'The Bard',
  'The Mechanic',
  'The Messenger',
  'The Nameless One',
  'The Recorder',
  'Thrax',
  'Tice',
  'Toller',
  'Tollis Vane',
  'Verity Ash',
  'Veth Garg',
  'Weasel',
  'Whisper',
  'Zzzor',
];

const slug = (name: string) =>
  name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');

export const characters: Character[] = [
  ...names.map((name) => ({
    name,
    slug: slug(name),
    ...(known[name] ?? {
      role: 'Canonical figure · Archive sealed',
      fact: 'Their portrait is on record. Their place in the accounts has not yet been disclosed.',
      firstStory: 'Beyond the current account',
    }),
  })),
  ...Array.from({ length: 49 }, (_, index) => ({
    name: `Unnamed Figure ${String(index + 1).padStart(2, '0')}`,
    slug: `tbd-${String(index + 1).padStart(2, '0')}`,
    role: 'Identity pending',
    fact: 'This canonical portrait is awaiting a name and a confirmed place in the archive.',
    firstStory: 'To be determined',
    tbd: true,
  })),
];
