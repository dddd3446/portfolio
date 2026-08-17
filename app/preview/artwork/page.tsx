import type { Metadata } from "next";
import Image from "next/image";

import { CATEGORIES, WORKS } from "@/lib/artwork";
import { CONTENT, contentFor } from "@/lib/artwork-content";
import s from "./page.module.css";

export const metadata: Metadata = { title: "Artwork keys" };

/**
 * Dev-only index for filling in lib/artwork-content.ts. Every piece is shown
 * next to the key you write it under, so you can see which photo `vp-17`
 * actually is. Safe to delete — nothing links to it.
 */
export default function ArtworkKeysPage() {
  // Counted in pieces, not tiles: a second crop is not another thing to write.
  const pieces = WORKS.filter((work) => !work.sameAs);
  const done = pieces.filter((work) => contentFor(work.slug)).length;

  return (
    <main className={s.page}>
      <header className={s.head}>
        <h1>Artwork keys</h1>
        <p>
          Write into <code>lib/artwork-content.ts</code>. A piece switches on its
          hover overlay and its <code>/artwork/[slug]</code> page as soon as it has
          a <code>title</code>.
        </p>
        <p className={s.count}>
          {done} of {pieces.length} written
        </p>
      </header>

      {CATEGORIES.map((category) => (
        <section key={category.id}>
          <h2 className={s.category}>{category.label}</h2>

          <ul className={s.grid}>
            {WORKS.filter((work) => work.category === category.id).map((work) => {
              const slug = work.sameAs ?? work.slug;
              const content = contentFor(slug);
              return (
                <li key={work.id} className={s.card} data-done={content ? true : undefined}>
                  <div className={s.thumb}>
                    <Image src={work.src} alt={work.alt} fill sizes="220px" />
                  </div>
                  <code className={s.key}>&quot;{slug}&quot;</code>
                  {work.sameAs && (
                    <p className={s.alias}>
                      second crop of {work.sameAs} — write it there
                    </p>
                  )}
                  <p className={s.file}>{work.src.split("/").pop()}</p>
                  <p className={s.status}>
                    {content ? content.title : CONTENT[slug] ? "empty" : "missing entry"}
                  </p>
                </li>
              );
            })}
          </ul>
        </section>
      ))}
    </main>
  );
}
