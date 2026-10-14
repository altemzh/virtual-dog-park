# Virtual Dog Park

A dog encyclopedia and virtual pet website built for a first-year programming lab (AIE1101, Week 5 Lab 2). It uses only HTML, CSS and vanilla JavaScript, with no frameworks, packages, backend or external API.

## Features

- **Dog Encyclopedia:** Beagle, Golden Retriever and Poodle, each with an illustration and short notes on size, personality and everyday care.
- **Adoption:** choose one breed, enter a name (1–20 characters after trimming spaces from the start and end) and adopt one dog.
- **Feed and Play:** each click raises happiness.
- **Next Day:** simulates one day passing.
- **Growth:** the stage is shown in words, with a growth bar, and by the size of the dog picture.
- **Saved progress:** the dog is restored after a page refresh.
- **Start Over:** asks for confirmation before deleting the saved dog.

## How to preview

1. Open the `virtual-dog-park` folder in VS Code.
2. Install the **Live Server** extension (by Ritwick Dey).
3. Right-click `index.html` and choose **Open with Live Server**.
4. The page opens at a local address such as `http://127.0.0.1:5500`.

Use the same browser and local address while testing saved progress. Avoid opening the file through a `file://` address, because browser storage can behave differently there.

## Rules

| Rule | Behaviour |
| --- | --- |
| New dog | Day 1, Puppy, happiness 50 |
| Feed / Play | +10 happiness per click, maximum 100 |
| Next Day | +1 day and −5 happiness, minimum 0 |
| Growth | Day 1 = Puppy; Days 2–3 = Young Dog; Day 4 onward = Adult Dog |

## Where progress is saved

The adopted dog's name, breed, day and happiness are saved in the browser's **localStorage** under the key `virtualDogParkPetV1`. The data stays only in that browser on that device. It is **not** stored in a GitHub account and is **not** uploaded by Git. Only one dog is stored at a time.

## Manual testing checklist

- [ ] Three breed entries and three illustrations display with no broken images.
- [ ] An empty or spaces-only name is rejected with a message.
- [ ] Leading and trailing spaces are removed; the name input stops at 20 characters.
- [ ] A name containing `<` and `>` is shown as plain text.
- [ ] Adopting Buddy as a Beagle shows Day 1, Puppy, happiness 50.
- [ ] Feed and Play raise happiness by 10 and stop at 100.
- [ ] Next Day: Day 2 is Young Dog, Day 4 is Adult Dog; happiness drops by 5 and never below 0.
- [ ] Refresh after adoption, Play, Next Day and Feed restores the latest values.
- [ ] Start Over → Cancel keeps the dog; Start Over → OK returns to the adoption form, and the old dog does not return after refresh.
- [ ] The page is usable on a narrow (phone-width) screen with no horizontal scrolling.

## Files

```
virtual-dog-park/
├── index.html      page structure
├── style.css       layout, colours and phone layout
├── script.js       adoption, care, growth and saving
├── assets/
│   ├── beagle.svg
│   ├── golden-retriever.svg
│   └── poodle.svg
├── README.md
└── .gitignore
```

## Credits

The SVG dog illustrations are simple project-created drawings, not real dog photographs. Code was written with help from an AI coding assistant and reviewed for this lab.
