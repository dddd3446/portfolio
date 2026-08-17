chai-gai-foon-cv.pdf is the file the Resume page's "Download CV" button
serves; lib/site.ts points `cvPath` at it (vscodetodo_1.md, todo 9).

To publish a newer CV, overwrite that file keeping the same name — nothing
in the code needs to change. Renaming it means updating `cvPath` too, and
an empty `cvPath` makes the button render inert rather than 404.
