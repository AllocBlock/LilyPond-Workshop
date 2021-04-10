# lilypond-workshop README

Provide LilyPond syntex highlighting and auto-compiling.

This project is based on [VSLilyPond](https://github.com/TrudyFirestone/VSLilyPond), which use the grammar from [SubLilyPond](https://github.com/yrammos/SubLilyPond).

## Requirements

If you need to compile an LilyPond file (.ly, .ily) to pdf, you will need a compiler on [LilyPond Official Website](https://lilypond.org). Download and install it, you can find the compiler (In Windows, it's at 
> C:/Program Files/LilyPond/usr/bin/lilypond.exe

on default).

## Features

- Support LilyPond syntex highlighting.
- Support compile and auto-compile.
- **No support** for pdf viewing. So you may find a pdf viewer plugin for viewing.

## Extension Commands and Settings
- Commands
  * `extension.lilypond-workshop.compile`(LilyPond Workshop: Compile): compile LilyPond file now
- Settings
  * `extension.lilypond-workshop.compilerPath`: path of LilyPond compiler (lilypond.exe)
  * `extension.lilypond-workshop.compileOnSave`: enable auto-compile on save

## Known Issues

- Doesn't currently support embedded scheme