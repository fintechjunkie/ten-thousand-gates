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

const chapterNames = ['The Contract', 'The Warning', 'The Red', 'Ten Seconds'];
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
    image: '/scenes/01-receiving-hall.png',
    label: 'Receiving Hall',
    caption: 'A returned traveler. Two crowns. Half a world in his pockets.',
  },
  {
    image: '/scenes/16-ansel-refuses-tea.png',
    label: 'The Lazaret',
    caption:
      'A carriage, a cup of tea, and a clerk who has already made himself conspicuous.',
  },
  {
    image: '/scenes/15-lazaret-contract.png',
    label: 'The Contract',
    caption:
      'Four hundred for the man and the case. Eight hundred for the case alone.',
  },
  {
    image: '/scenes/02-ledger-house.png',
    label: 'The Ledger House',
    caption: 'Nine lines about a habitable world. Four of them are warnings.',
  },
  {
    image: '/scenes/03-gate-hut.png',
    label: 'Gate 660',
    caption: 'Smashed goggles. Unused line. The noise does not stop.',
  },
  {
    image: '/scenes/17-veth-tailor-stone.png',
    label: 'A second stone',
    caption: 'His is honest. Sexton’s is not. That is the whole reason.',
  },
  {
    image: '/world/ten-thousand-gates.png',
    label: 'The Salt',
    caption: 'The rail stops. The arches keep going.',
  },
  {
    image: '/scenes/04-crossing.png',
    label: 'Through',
    caption: 'White behind them. One color ahead.',
  },
  {
    image: '/scenes/05-button-trail.png',
    label: 'Up-valley',
    caption: 'He sold the outside first and worked his way in.',
  },
  {
    image: '/scenes/06-oracle.png',
    label: 'The Oracle',
    caption: 'One answer in every eleven landing. Enough to build a faith on.',
  },
  {
    image: '/scenes/07-silence.png',
    label: 'Ten seconds',
    caption:
      'The Note stopped. What replaced it was so big Sexton forgot what he was holding.',
  },
  {
    image: '/scenes/08-return.png',
    label: 'Two out. Two back.',
    caption:
      'The Salt was so completely, stupidly white that it hurt to look at.',
  },
  {
    image: '/scenes/09-lazaret-tea.png',
    label: 'Tea at the Lazaret',
    caption:
      'Ansel said no. It was the kindest thing anybody did for Fisk all week.',
  },
  {
    image: '/scenes/10-veth-tailor.png',
    label: 'The Ninth Market',
    caption:
      'Four arms, formal dress, and a stone bought over four years of missed rent.',
  },
  {
    image: '/scenes/11-the-note.png',
    label: 'The Note',
    caption: 'Low. Continuous. There was no direction to it and no past it.',
  },
  {
    image: '/scenes/12-waistcoat-trail.png',
    label: 'The suit in pieces',
    caption: 'A cuff, a heel, and half a waistcoat cut down for a child.',
  },
  {
    image: '/scenes/13-terrace-run.png',
    label: 'South',
    caption: 'Two hundred behind them. The gate was two hours away.',
  },
  {
    image: '/scenes/14-fisk-office.png',
    label: 'A room with a carpet',
    caption:
      'They paid double for the box because a man who comes home can talk.',
  },
  {
    image: '/scenes/18-deepwalker.png',
    label: 'Four drinks deep',
    caption: 'A knotted cord remembers the route when a deepwalker cannot.',
  },
];

const chapterVisuals = [
  [0, 1, 2, 12, 17, 5],
  [3, 4, 18, 6, 5, 13, 2, 17],
  [6, 7, 14, 8, 15, 9, 11, 5, 4, 13, 3],
  [9, 10, 16, 11, 17, 12, 14, 15, 8, 0],
];

export default function StoryReader({
  chapters,
  primer,
}: {
  chapters: Chapter[];
  primer: string;
}) {
  const [phase, setPhase] = useState<'world' | 'primer' | 'crossing' | 'story'>(
    'world',
  );
  const [chapter, setChapter] = useState(0);
  const [activeScene, setActiveScene] = useState(0);
  const [overlay, setOverlay] = useState<'stories' | 'characters' | null>(null);
  const [selectedCharacter, setSelectedCharacter] = useState<Character | null>(
    null,
  );
  const chapterData = chapters[chapter];
  const visualIndexes = chapterVisuals[chapter] ?? [0];
  const visual =
    visuals[
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
  }, [chapter]);

  const chooseChapter = (next: number) => {
    setChapter(next);
    setActiveScene(0);
    setOverlay(null);
    requestAnimationFrame(() =>
      window.scrollTo({ top: 0, behavior: 'smooth' }),
    );
  };

  const enterStory = () => {
    setPhase('crossing');
    window.setTimeout(() => setPhase('story'), 1250);
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
            <button onClick={() => setPhase('primer')}>
              Open the first account <ArrowRight />
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
            <small>Entry concerning the return of travelers</small>
            <button onClick={enterStory} disabled={phase === 'crossing'}>
              Begin Story One <ArrowRight />
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
          <span>Story I</span>
          <strong>The Red</strong>
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
          <span className="chapter-count">01 / 08</span>
        </nav>
      </header>

      <div className="experience">
        <section className="visual-stage" aria-live="polite">
          {visuals.map((item) => (
            <Image
              key={item.image + item.label}
              className={`stage-image ${item === visual ? 'is-active' : ''}`}
              src={item.image}
              alt=""
              fill
              priority={item === visuals[0]}
              sizes="(max-width: 860px) 100vw, 58vw"
            />
          ))}
          <div className="stage-wash" />
          <div className="scene-counter">
            CH {chapter + 1} · {String(activeScene + 1).padStart(2, '0')}
          </div>
          <div className="stage-caption" key={visual.label}>
            <span>{visual.label}</span>
            <p>{visual.caption}</p>
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
                {chapterNames[index]}
              </button>
            ))}
          </div>
          <div className="reading-scroll">
            <div className="chapter-opening">
              <span>Story One · Chapter {chapter + 1}</span>
              <h1>{chapterNames[chapter]}</h1>
              <p>
                {
                  [
                    'A man came home in a stranger’s cloth. The Order paid two crowns to learn what the journey was worth.',
                    'Four ways to learn what waits beyond a door—and every one of them is a warning.',
                    'At Gate 660 the whole world was red. Then the Note arrived.',
                    'The contract was for a case. Sexton was always going to bring the man.',
                  ][chapter]
                }
              </p>
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
                  Continue to {chapterNames[chapter + 1]} <ArrowRight />
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
                    className={index === 0 ? 'available' : ''}
                    onClick={() => index === 0 && chooseChapter(0)}
                  >
                    <span className="shelf-number">{number}</span>
                    <strong>{title}</strong>
                    <small>{copy}</small>
                    <em>{index === 0 ? 'Read now' : 'In the archive'}</em>
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
