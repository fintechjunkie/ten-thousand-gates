import storyOne from '../content/story-one.md?raw';
import storyTwo from '../content/story-two.md?raw';
import StoryReader from './story-reader';

function parseStory(markdown: string) {
  return markdown
    .split(/# CHAPTER /)
    .slice(1)
    .map((chapter) => {
      const [number, ...body] = chapter.split('\n');
      return {
        number: number.trim(),
        scenes: body
          .join('\n')
          .trim()
          .split(/\n---\n/g)
          .map((scene) => scene.trim())
          .filter(Boolean)
          .map((scene) =>
            scene
              .split(/\n{2,}/g)
              .map((paragraph) => paragraph.replace(/^>\s?/gm, '').trim())
              .filter(Boolean),
          ),
      };
    });
}

export default function Home() {
  const makeStory = (source: string) => ({
    chapters: parseStory(source),
    primer:
      source
      .split('---')[1]
      ?.replace(/^>\s?/gm, '')
      .replace(/\*/g, '')
      .trim() ?? '',
  });

  return <StoryReader stories={[makeStory(storyOne), makeStory(storyTwo)]} />;
}
