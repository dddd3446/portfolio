import type { Metadata } from "next";
import Image from "next/image";

import { EDUCATION, INTRO, SKILL_GROUPS, type SkillGroup } from "@/lib/resume";
import { SITE } from "@/lib/site";
import s from "./page.module.css";

export const metadata: Metadata = { title: "Resume" };

function SkillColumn({ group, className }: { group: SkillGroup; className: string }) {
  return (
    <section className={className}>
      <h2 className={s.sectionHeading}>{group.heading}</h2>
      <span className={s.rule} style={{ width: `${group.ruleWidth / 16}rem` }} aria-hidden />
      <ul className={s.list}>
        {group.items.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </section>
  );
}

export default function ResumePage() {
  return (
    <main className={s.page}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img className={s.waveTop} src="/assets/decor/wave-resume-top.svg" alt="" aria-hidden />
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img className={s.waveBottom} src="/assets/decor/wave-resume-bottom.svg" alt="" aria-hidden />
      {/* A third curve above the footer, drawn only on the 390 frame. */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img className={s.waveFoot} src="/assets/decor/wave-resume-390-foot.svg" alt="" aria-hidden />

      <div className={s.stage}>
        {/* `fill` rather than width/height: the frame is a different aspect
            ratio to the source and crops via object-fit. */}
        <div className={s.portrait}>
          <Image
            src="/assets/images/resume/portrait.png"
            alt="Chai Gai Foon standing in a suit and wide-brimmed hat, pointing at the camera"
            fill
            sizes="337px"
            quality={90}
            priority
          />
        </div>

        <div className={s.intro}>
          <h1 className={s.introHeading}>{INTRO.heading}</h1>
          <p className={s.introBody}>{INTRO.body}</p>
        </div>

        <section className={s.education}>
          <h2 className={s.sectionHeading}>Education</h2>
          <span
            className={`${s.rule} ${s.ruleEducation}`}
            style={{ width: `${27 / 16}rem` }}
            aria-hidden
          />
          <ol className={s.eduList}>
            {EDUCATION.map((entry) => (
              <li key={entry.title} className={s.eduEntry}>
                <div className={s.eduTitleRow}>
                  <h3 className={s.eduTitle}>{entry.title}</h3>
                  <span className={s.eduPeriod}>{entry.period}</span>
                </div>
                <p className={s.eduOrg}>{entry.org}</p>
                <p className={s.eduDescription}>{entry.description}</p>
              </li>
            ))}
          </ol>
        </section>

        <div className={s.skills}>
          <SkillColumn group={SKILL_GROUPS.design} className={s.colDesign} />
          <SkillColumn group={SKILL_GROUPS.development} className={s.colDevelopment} />
          <SkillColumn group={SKILL_GROUPS.language} className={s.colLanguage} />
          <SkillColumn group={SKILL_GROUPS.hobbies} className={s.colHobbies} />
        </div>

        {SITE.cvPath ? (
          <a className={s.cta} href={SITE.cvPath} download>
            <span>DOWNLOAD CV</span>
            <span aria-hidden>&darr;</span>
          </a>
        ) : (
          <span className={`${s.cta} ${s.ctaInert}`} aria-disabled title="CV file not added yet">
            <span>DOWNLOAD CV</span>
            <span aria-hidden>&darr;</span>
          </span>
        )}
      </div>
    </main>
  );
}
