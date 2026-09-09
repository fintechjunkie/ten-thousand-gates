import storyOne from '../content/story-one.md?raw';
import StoryReader from './story-reader';

function chapterOneScenes(markdown: string) {
  const chapter = markdown.split('# CHAPTER ONE')[1]?.split('# CHAPTER TWO')[0]?.trim();
  return (chapter ?? '').split(/\n---\n/g).map((scene) => scene.trim()).filter(Boolean).map((scene) =>
    scene.split(/\n{2,}/g).map((paragraph) => paragraph.replace(/^>\s?/gm, '').trim()).filter(Boolean),
  );
}

export default function Home() {
  return <StoryReader scenes={chapterOneScenes(storyOne)} />;
}
