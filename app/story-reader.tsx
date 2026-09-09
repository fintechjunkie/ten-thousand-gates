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

const characters = [
  {
    name: 'Sexton',
    role: 'Retrieval specialist',
    image: '/world/sexton.png',
    fact: 'Nobody gets left.',
  },
  {
    name: 'Veth Garg',
    role: 'Companion · Stranded',
    image: '/world/veth-garg.png',
    fact: 'Forty-one doors. Still looking.',
  },
  {
    name: 'Mother Ansel',
    role: 'Keeper of the Lazaret',
    image: '/world/mother-ansel.png',
    fact: 'Tea means things went badly.',
  },
  {
    name: 'Verity Ash',
    role: 'Keeper of the files',
    image: '/world/verity-ash.png',
    fact: 'Nine lines. No contractions.',
  },
];

const visuals = [
  {
    image: '/scenes/01-receiving-hall.png',
    label: 'Receiving Hall',
    caption: 'A returned traveler. Two crowns. Half a world in his pockets.',
  },
  {
    image: '/world/mother-ansel.png',
    label: 'The Lazaret',
    caption:
      'A carriage, a cup of tea, and a clerk who has already made himself conspicuous.',
  },
  {
    image: '/world/sexton.png',
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
    image: '/world/veth-garg.png',
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
];

const sceneOffsets = [0, 3, 6, 10];

export default function StoryReader({ chapters }: { chapters: Chapter[] }) {
  const [chapter, setChapter] = useState(0);
  const [activeScene, setActiveScene] = useState(0);
  const [overlay, setOverlay] = useState<'stories' | 'characters' | null>(null);
  const chapterData = chapters[chapter];
  const visual =
    visuals[Math.min(sceneOffsets[chapter] + activeScene, visuals.length - 1)];

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

  return (
    <main className="reader-shell">
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
              {characters.slice(0, 3).map((c) => (
                <Image
                  key={c.name}
                  src={c.image}
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
                  <article
                    key={character.name}
                    style={
                      {
                        '--tilt': `${index % 2 ? 2 : -2}deg`,
                      } as React.CSSProperties
                    }
                  >
                    <div className="portrait">
                      <Image
                        src={character.image}
                        alt={character.name}
                        fill
                        sizes="260px"
                      />
                    </div>
                    <span>{character.role}</span>
                    <h3>{character.name}</h3>
                    <p>{character.fact}</p>
                  </article>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </main>
  );
}
