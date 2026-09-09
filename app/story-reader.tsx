'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';
import { ArrowLeft, ArrowRight, BookOpen, Map, Pause, Volume2, X } from 'lucide-react';

const plates = [
  { type: 'image', src: '/world/ten-thousand-gates.png', alt: 'A line of monumental gates crossing the desert outside Sill', label: 'Sill · Receiving Hall', note: 'Returned travelers are examined here. The Order calls it accounting. Sexton calls it two crowns.' },
  { type: 'image', src: '/world/mother-ansel.png', alt: 'Mother Ansel, proprietor of the Lazaret', label: 'Nine miles out · The Lazaret', note: 'Last drink before the doors. First drink after them. Tea only if things have gone badly.' },
  { type: 'image', src: '/world/the-train.png', alt: 'The gate train that runs to the edge of the desert', label: 'The railhead · Four in the afternoon', note: 'Everybody takes the train. A carriage is what you use when you do not want to be noticed.' },
  { type: 'video', src: '/world/sexton-video.mp4', poster: '/world/sexton.png', alt: 'Sexton, a veteran gate runner', label: 'Field dossier · Sexton', note: 'Nineteen years through the doors. One rule: nobody gets left.' },
  { type: 'image', src: '/world/sexton.png', alt: 'Sexton, known in the trade as the Gray Man', label: 'Contract 660 · Accepted', note: 'Four hundred for Ord and the case. Eight hundred for the case alone.' },
];

export default function StoryReader({ scenes }: { scenes: string[][] }) {
  const [scene, setScene] = useState(0);
  const [drawer, setDrawer] = useState<'world' | 'sexton' | null>(null);
  const [ambient, setAmbient] = useState(false);
  const total = Math.max(scenes.length, 1);
  const plate = plates[Math.min(scene, plates.length - 1)];
  const move = (delta: number) => setScene((current) => Math.min(total - 1, Math.max(0, current + delta)));

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'ArrowRight') setScene((n) => Math.min(total - 1, n + 1));
      if (event.key === 'ArrowLeft') setScene((n) => Math.max(0, n - 1));
      if (event.key === 'Escape') setDrawer(null);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [total]);

  return (
    <main className="reader-shell">
      <header className="masthead">
        <button className="wordmark" onClick={() => setScene(0)} aria-label="Return to the beginning">
          <span className="gate-mark" aria-hidden="true"><i /></span><span>Ten Thousand Gates</span>
        </button>
        <div className="story-mark"><span>Story I</span><strong>The Red</strong></div>
        <nav aria-label="World navigation">
          <button onClick={() => setDrawer('world')}><Map size={17} /><span>World</span></button>
          <button onClick={() => setDrawer('sexton')}><BookOpen size={17} /><span>Dossiers</span></button>
          <button className="sound" onClick={() => setAmbient(!ambient)} aria-pressed={ambient}>
            {ambient ? <Pause size={16} /> : <Volume2 size={16} />}<span>{ambient ? 'Quiet' : 'Atmosphere'}</span>
          </button>
        </nav>
      </header>

      <section className="spread" aria-label={`Chapter one, scene ${scene + 1} of ${total}`}>
        <div className="plate">
          {plate.type === 'video' ? (
            <video className="plate-media" poster={plate.poster} controls={ambient} autoPlay={ambient} muted loop playsInline><source src={plate.src} type="video/mp4" /></video>
          ) : (
            <Image className="plate-media" src={plate.src} alt={plate.alt} fill priority={scene === 0} sizes="(max-width: 800px) 100vw, 56vw" />
          )}
          <div className="plate-shade" />
          <div className="plate-index">PLATE {String(scene + 1).padStart(2, '0')} / {String(total).padStart(2, '0')}</div>
          <div className="plate-caption"><span>{plate.label}</span><p>{plate.note}</p></div>
        </div>

        <article className="page">
          <div className="page-topline"><span>Chapter One</span><span>{String(scene + 1).padStart(2, '0')}</span></div>
          <div className="prose" key={scene}>
            {scene === 0 && <h1>The Order doesn’t like<br />to waste a trip.</h1>}
            {scenes[scene]?.map((paragraph, index) => <p key={index} className={scene === 0 && index === 0 ? 'lede' : ''}>{paragraph}</p>)}
          </div>
          <div className="folio" aria-label="Reading controls">
            <button onClick={() => move(-1)} disabled={scene === 0} aria-label="Previous scene"><ArrowLeft size={19} /></button>
            <div className="progress"><i style={{ width: `${((scene + 1) / total) * 100}%` }} /></div>
            <button onClick={() => move(1)} disabled={scene === total - 1} aria-label="Next scene"><ArrowRight size={19} /></button>
          </div>
        </article>
      </section>

      <div className="chapter-rail" aria-hidden="true"><span>01</span><i /><span>Gate 660</span></div>

      {drawer && <aside className="drawer" aria-label={drawer === 'world' ? 'World notes' : 'Character dossier'}>
        <button className="drawer-close" onClick={() => setDrawer(null)} aria-label="Close panel"><X /></button>
        {drawer === 'world' ? <>
          <span className="eyebrow">The known world</span><h2>Every door is a border.</h2>
          <p>Sill stands at the edge of a desert lined with gates. A charged stone gets you through. What waits on the other side is rarely current in the records.</p>
          <dl><div><dt>Current destination</dt><dd>Gate 660</dd></div><div><dt>Last crossing</dt><dd>Nine months ago</dd></div><div><dt>Status</dt><dd>File presumed wrong</dd></div></dl>
        </> : <>
          <Image src="/world/sexton.png" width={260} height={260} alt="Sexton" />
          <span className="eyebrow">Active dossier · 11</span><h2>Sexton</h2>
          <p>Body-detail veteran, retrieval specialist, and keeper of a very expensive rule: nobody gets left behind.</p>
          <dl><div><dt>Trade name</dt><dd>The Gray Man</dd></div><div><dt>Years through</dt><dd>19</dd></div><div><dt>Known for</dt><dd>Bringing them back</dd></div></dl>
        </>}
      </aside>}
    </main>
  );
}
