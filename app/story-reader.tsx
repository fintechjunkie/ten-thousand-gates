'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';
import {
  ArrowRight,
  BookOpen,
  ChevronDown,
  Compass,
  Library,
  Menu,
  X,
} from 'lucide-react';
import { characters, type Character } from './characters';

type Chapter = { number: string; scenes: string[][] };
type Story = { chapters: Chapter[]; primer: string };

const chapterNames = ['The Contract', 'The Warning', 'The Red', 'Ten Seconds'];
const storyTwoChapterNames = ['The Bell', 'The Crew', 'The Gold', 'The Return'];
const storyNames = ['The Red', 'The Gold'];
const storyNumerals = ['I', 'II'];
const storyIntroductions = [
  [
    'A man came home in a stranger’s cloth. The Order paid two crowns to learn what the journey was worth.',
    'Four ways to learn what waits beyond a door—and every one of them is a warning.',
    'At Gate 660 the whole world was red. Then the Note arrived.',
    'The contract was for a case. Sexton was always going to bring the man.',
  ],
  [
    'The bell rang twice at Gate One. Nell Coombe had been waiting for a different return.',
    'An unwalked gate needs a crew, a rented stone, and terms nobody likes saying aloud.',
    'Five hundred feet below the only door home, an entire civilization is built from knots.',
    'A tower, a drifting stone, and the smallest lie that might let a nineteen-year-old sleep.',
  ],
];
const storyShelf = [
  ['I', 'The Red', 'A recovery at Gate 660.'],
  ['II', 'The Gold', 'The next account.'],
  ['III', 'The Eight', 'Eleven names. Eight remain.'],
  ['IV', 'The Quiet Door', 'A crossing without a sound.'],
  ['V', 'Small for Small', 'A bargain measured carefully.'],
  ['VI', 'The Shelf', 'What was left waiting.'],
  ['VII', 'Nothing to Sell', 'A world where value changed.'],
  ['VIII', 'The Ladder', 'The way farther through.'],
];

const visuals = [
  {
    image: '/scenes/theatre/01-receiving-hall.png',
    label: 'Receiving Hall',
    caption: 'A returned traveler. Two crowns. Half a world in his pockets.',
  },
  {
    image: '/scenes/theatre/02-ansel-tea.png',
    label: 'One cup only',
    caption:
      'Ansel said no. It was the kindest thing anybody did for Fisk all week.',
  },
  {
    image: '/scenes/theatre/03-contract.png',
    label: 'The Contract',
    caption:
      'Four hundred for the man and the case. Eight hundred for the case alone.',
  },
  {
    image: '/scenes/theatre/04-commitment.png',
    label: 'Nobody gets left',
    caption: 'The case was in the contract. The man was already coming home.',
  },
  {
    image: '/scenes/theatre/05-ledger-house.png',
    label: 'The first way',
    caption: 'Nine lines about a habitable world. Four of them are warnings.',
  },
  {
    image: '/scenes/theatre/06-gate-660.png',
    label: 'The second way',
    caption: 'Smashed goggles. Unused line. The noise does not stop.',
  },
  {
    image: '/scenes/theatre/07-deepwalker.png',
    label: 'The third way',
    caption: 'Four drinks and a knotted cord. Deepwalkers lie for money.',
  },
  {
    image: '/scenes/theatre/08-veth-tailor.png',
    label: 'The fourth way',
    caption: 'His stone is honest. Sexton’s is not. That is the whole reason.',
  },
  {
    image: '/scenes/theatre/09-salt-rail.png',
    label: 'The Salt',
    caption: 'The rail stops caring. The arches keep going.',
  },
  {
    image: '/scenes/theatre/10-gate-dark.png',
    label: 'Gate 660',
    caption: 'At 660 it went dark, and Sexton could not see it.',
  },
  {
    image: '/scenes/theatre/11-the-note.png',
    label: 'The Note',
    caption: 'Low. Continuous. There was no direction to it and no past it.',
  },
  {
    image: '/scenes/theatre/12-clothing-trail.png',
    label: 'The suit in pieces',
    caption: 'A cuff, a lining, and half a waistcoat cut down for a child.',
  },
  {
    image: '/scenes/theatre/13-terraces.png',
    label: 'Up through the terraces',
    caption:
      'Everybody came out. The children ran alongside. Sexton did not like it.',
  },
  {
    image: '/scenes/theatre/14-red-wall.png',
    label: 'The last of the light',
    caption: 'There was a man to recover and a whole settlement in the way.',
  },
  {
    image: '/scenes/theatre/15-oracle-house.png',
    label: 'The Oracle',
    caption: 'Eleven people waited. One man knew the stone in Sexton’s arm.',
  },
  {
    image: '/scenes/theatre/16-ten-seconds.png',
    label: 'Ten seconds',
    caption: 'The Note stopped. The silence was bigger than the sound.',
  },
  {
    image: '/scenes/theatre/17-return.png',
    label: 'Two out. Three back.',
    caption: 'They arrived the way a dropped thing arrives.',
  },
  {
    image: '/scenes/theatre/18-epilogue.png',
    label: 'The case on Fisk’s desk',
    caption: 'Black, locked, and heavier than it looked. Fisk put one hand on the lid.',
  },
  {
    image: '/scenes/theatre/19-case-only.png',
    label: 'The cost book',
    caption: 'At home, Sexton entered the job in a narrow column beside his two watches.',
  },
  {
    image: '/scenes/theatre/20-cost-book.png',
    label: 'Find out properly',
    caption: 'Even the riggers stopped arguing over their knot to hear Ansel’s warning.',
  },
  {
    image: '/scenes/theatre/21-ansel-ending.png',
    label: 'One cup, after all',
    caption: 'Ansel put down a mug Sexton had not ordered. Veth lifted his own tea.',
  },
];

const storyTwoVisuals = [
  '/scenes/story-two/01-gate-one-bell.png',
  '/scenes/story-two/02-nell-tea.png',
  '/scenes/story-two/03-corrigan-ledger.png',
  '/scenes/story-two/04-vane-assay.png',
  '/scenes/story-two/05-cassandra-terms.png',
  '/scenes/story-two/06-sparrow-asks.png',
  '/scenes/story-two/07-gold-descent.png',
  '/scenes/story-two/08-gold-world.png',
  '/scenes/story-two/09-rope-towers.png',
  '/scenes/story-two/10-stone-overhead.png',
  '/scenes/story-two/11-tower-build.png',
  '/scenes/story-two/12-sparrow-return.png',
  '/scenes/story-two/13-gil-catches-stone.png',
  '/scenes/story-two/14-five-back.png',
  '/scenes/story-two/15-linen-secret.png',
].map((image) => ({ image, label: '', caption: '' }));

const chapterVisuals = [
  [0, 1, 2, 18, 19, 3],
  [4, 4, 5, 5, 5, 6, 7, 7],
  [8, 8, 9, 10, 10, 11, 11, 12, 12, 12, 12],
  [13, 13, 14, 14, 15, 15, 16, 16, 17, 17, 20],
];

const storyTwoChapterVisuals = [
  [0, 1, 1, 1, 1, 1, 1],
  [2, 2, 3, 3, 4, 4, 5, 5, 5, 6, 6],
  [6, 6, 7, 7, 8, 8, 8, 9, 9, 9, 9, 9, 10, 10, 10, 10, 10, 10],
  [10, 10, 10, 11, 11, 11, 11, 12, 12, 12, 13, 13, 13, 13, 14, 14, 14],
];

export default function StoryReader({
  stories,
}: {
  stories: Story[];
}) {
  const [phase, setPhase] = useState<'world' | 'primer' | 'crossing' | 'story'>(
    'world',
  );
  const [chapter, setChapter] = useState(0);
  const [activeStory, setActiveStory] = useState(0);
  const [activeScene, setActiveScene] = useState(0);
  const [overlay, setOverlay] = useState<'stories' | 'characters' | null>(null);
  const [selectedCharacter, setSelectedCharacter] = useState<Character | null>(
    null,
  );
  const story = stories[activeStory] ?? stories[0];
  const chapters = story.chapters;
  const primer = story.primer;
  const activeChapterNames =
    activeStory === 0 ? chapterNames : storyTwoChapterNames;
  const activeVisuals = activeStory === 0 ? visuals : storyTwoVisuals;
  const activeChapterVisuals =
    activeStory === 0 ? chapterVisuals : storyTwoChapterVisuals;
  const chapterData = chapters[chapter];
  const visualIndexes = activeChapterVisuals[chapter] ?? [0];
  const visual =
    activeVisuals[
      visualIndexes[activeScene] ?? visualIndexes[visualIndexes.length - 1]
    ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible)
          setActiveScene(Number((visible.target as HTMLElement).dataset.scene));
      },
      {
        root: null,
        rootMargin: '-20% 0px -35% 0px',
        threshold: [0, 0.25, 0.5],
      },
    );
    document
      .querySelectorAll('[data-scene]')
      .forEach((node) => observer.observe(node));
    return () => observer.disconnect();
  }, [chapter, activeStory]);

  const chooseChapter = (next: number) => {
    window.scrollTo({ top: 0, behavior: 'auto' });
    setChapter(next);
    setActiveScene(0);
    setOverlay(null);
    requestAnimationFrame(() => {
      setActiveScene(0);
      window.scrollTo({ top: 0, behavior: 'auto' });
    });
  };

  const enterStory = () => {
    setPhase('crossing');
    window.setTimeout(() => setPhase('story'), 1250);
  };

  const enterArchive = () => {
    setPhase('story');
    setOverlay('stories');
  };

  const openStory = (index: number) => {
    setActiveStory(index);
    chooseChapter(0);
    setPhase('primer');
  };

  return (
    <main className="reader-shell">
      {phase === 'world' && (
        <section className="world-intro">
          <Image
            src="/world/ten-thousand-gates.png"
            alt="The Ten Thousand Gates stretching across the Salt"
            fill
            priority
            sizes="100vw"
          />
          <div className="intro-shade" />
          <div className="intro-copy">
            <span>Welcome to Sill</span>
            <h1>
              Ten Thousand
              <br />
              Gates
            </h1>
            <p>
              Beyond each door is another world. A stone buys the crossing. The
              Order keeps the records. The people who go through bring back
              whatever the records missed.
            </p>
            <div className="world-rules">
              <div>
                <strong>10,000</strong>
                <small>doors across the Salt</small>
              </div>
              <div>
                <strong>One stone</strong>
                <small>one way home</small>
              </div>
              <div>
                <strong>The rule</strong>
                <small>nobody gets left</small>
              </div>
            </div>
            <button onClick={enterArchive}>
              Enter the story archive <ArrowRight />
            </button>
          </div>
        </section>
      )}
      {(phase === 'primer' || phase === 'crossing') && (
        <section
          className={`primer-intro ${phase === 'crossing' ? 'is-crossing' : ''}`}
        >
          <div className="primer-gate" aria-hidden="true">
            <i />
          </div>
          <div className="primer-page">
            <span>Purchased at Sill · One crown</span>
            <h1>
              The Traveler’s
              <br />
              Primer
            </h1>
            <div className="primer-rule" />
            <p>{primer}</p>
            <small>
              {activeStory === 0
                ? 'Entry concerning the return of travelers'
                : 'Entry concerning the gate bell'}
            </small>
            <button onClick={enterStory} disabled={phase === 'crossing'}>
              Begin Story {activeStory === 0 ? 'One' : 'Two'} <ArrowRight />
            </button>
          </div>
        </section>
      )}
      <header className="masthead">
        <button
          className="menu-button"
          onClick={() => setOverlay('stories')}
          aria-label="Open story library"
        >
          <Menu size={19} />
        </button>
        <button className="wordmark" onClick={() => chooseChapter(0)}>
          <span className="gate-mark">
            <i />
          </span>
          <span>Ten Thousand Gates</span>
        </button>
        <div className="story-mark">
          <span>Story {storyNumerals[activeStory]}</span>
          <strong>{storyNames[activeStory]}</strong>
        </div>
        <nav>
          <button onClick={() => setOverlay('stories')}>
            <Library size={17} />
            <span>Stories</span>
          </button>
          <button onClick={() => setOverlay('characters')}>
            <BookOpen size={17} />
            <span>People</span>
          </button>
          <span className="chapter-count">
            {String(chapter + 1).padStart(2, '0')} / 04
          </span>
        </nav>
      </header>

      <div className="experience">
        <section className="visual-stage" aria-live="polite">
          <div className="plate-frame" aria-hidden="true" />
          {activeVisuals.map((item) => (
            <Image
              key={item.image + item.label}
              className={`stage-image ${item === visual ? 'is-active' : ''}`}
              src={item.image}
              alt=""
              fill
              priority={item === activeVisuals[0]}
              sizes="(max-width: 980px) 100vw, 60vw"
            />
          ))}
          <div className="stage-wash" />
          <div className="scene-counter">
            CH {chapter + 1} · {String(activeScene + 1).padStart(2, '0')}
          </div>
          <button
            className="character-peek"
            onClick={() => setOverlay('characters')}
          >
            <span className="avatar-stack">
              {characters.slice(15, 18).map((c) => (
                <Image
                  key={c.name}
                  src={`/characters/${c.slug}.webp`}
                  alt=""
                  width={38}
                  height={38}
                />
              ))}
            </span>
            <span>Meet the company</span>
            <ArrowRight size={16} />
          </button>
          <div className="scroll-cue">
            <span>Scroll the account</span>
            <ChevronDown size={16} />
          </div>
        </section>

        <section className="reading-panel">
          <div className="chapter-tabs" aria-label="Story chapters">
            {chapters.map((item, index) => (
              <button
                key={item.number}
                className={index === chapter ? 'active' : ''}
                onClick={() => chooseChapter(index)}
              >
                <span>{String(index + 1).padStart(2, '0')}</span>
                {activeChapterNames[index]}
              </button>
            ))}
          </div>
          <div className="reading-scroll">
            <div className="chapter-opening">
              <span>Story {storyNumerals[activeStory]} · Chapter {chapter + 1}</span>
              <h1>{activeChapterNames[chapter]}</h1>
              <p>{storyIntroductions[activeStory][chapter]}</p>
            </div>
            {chapterData?.scenes?.length ? (
              chapterData.scenes.map((scene, index) => (
                <article className="story-scene" data-scene={index} key={index}>
                  <div className="scene-rule">
                    <i />
                    <span>{String(index + 1).padStart(2, '0')}</span>
                  </div>
                  {scene.map((paragraph, pIndex) => (
                    <p
                      key={pIndex}
                      className={index === 0 && pIndex === 0 ? 'lede' : ''}
                    >
                      {paragraph}
                    </p>
                  ))}
                </article>
              ))
            ) : (
              <article className="story-scene story-error">
                <h2>The account could not be opened.</h2>
                <p>Please return to the story shelf and open it again.</p>
              </article>
            )}
            <footer className="chapter-end">
              <span>End of Chapter {chapter + 1}</span>
              {chapter < chapters.length - 1 ? (
                <button onClick={() => chooseChapter(chapter + 1)}>
                  Continue to {activeChapterNames[chapter + 1]} <ArrowRight />
                </button>
              ) : (
                <button onClick={() => setOverlay('stories')}>
                  Return to the story shelf <Library />
                </button>
              )}
            </footer>
          </div>
        </section>
      </div>

      {overlay && (
        <div className="overlay">
          <button className="overlay-close" onClick={() => setOverlay(null)}>
            <X />
            <span>Close</span>
          </button>
          {overlay === 'stories' ? (
            <div className="library-view">
              <div className="overlay-heading">
                <Compass />
                <span>The accounts of Sexton</span>
                <h2>
                  Eight stories.
                  <br />
                  Ten thousand ways through.
                </h2>
              </div>
              <div className="story-shelf">
                {storyShelf.map(([number, title, copy], index) => (
                  <button
                    key={title}
                    className={index < 2 ? 'available' : ''}
                    onClick={() => index < 2 && openStory(index)}
                  >
                    <span className="shelf-number">{number}</span>
                    <strong>{title}</strong>
                    <small>{copy}</small>
                    <em>{index < 2 ? 'Read now' : 'In the archive'}</em>
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <div className="people-view">
              <div className="overlay-heading">
                <BookOpen />
                <span>Persons of interest</span>
                <h2>
                  The people who
                  <br />
                  walk through.
                </h2>
                <p>
                  Every portrait opens a piece of the world. Their histories
                  deepen as the stories unfold.
                </p>
              </div>
              <div className="character-deck">
                {characters.map((character, index) => (
                  <button
                    key={character.name}
                    onClick={() => setSelectedCharacter(character)}
                    style={
                      {
                        '--tilt': `${index % 2 ? 2 : -2}deg`,
                      } as React.CSSProperties
                    }
                  >
                    <div className="portrait">
                      <Image
                        src={`/characters/${character.slug}.webp`}
                        alt={character.name}
                        fill
                        sizes="260px"
                      />
                    </div>
                    <span>{character.role}</span>
                    <h3>
                      {character.name}
                      {character.tbd && <em className="tbd-badge">TBD</em>}
                    </h3>
                    <p>{character.fact}</p>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
      {selectedCharacter && (
        <aside className="dossier-sheet">
          <button
            className="dossier-close"
            onClick={() => setSelectedCharacter(null)}
          >
            <X />
            <span>Back to the archive</span>
          </button>
          <div className="dossier-portrait">
            <Image
              src={`/characters/${selectedCharacter.slug}.webp`}
              alt={selectedCharacter.name}
              fill
              sizes="(max-width: 700px) 100vw, 50vw"
            />
          </div>
          <div className="dossier-copy">
            <span>Canonical record</span>
            <h2>{selectedCharacter.name}</h2>
            <strong>{selectedCharacter.role}</strong>
            <p>{selectedCharacter.fact}</p>
            <dl>
              <dt>First known account</dt>
              <dd>{selectedCharacter.firstStory}</dd>
              <dt>Archive status</dt>
              <dd>
                {selectedCharacter.role.includes('sealed') ? 'Sealed' : 'Open'}
              </dd>
            </dl>
          </div>
        </aside>
      )}
    </main>
  );
}
