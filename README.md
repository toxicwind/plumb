# Plumb — sound the depths of your bassline

A worker-friendly **spectral before/after** tool for riddim & tearout bass layering,
proving — with real audio and real spectra — that a single modulated oscillator is a
screech, not a bassline.

A product of the **Fathom** pen (`pens/fathom`, deep-water/murk theme).

## Why it exists

The diagnosis: the issue is not AM/RM routing, the warp menu, or "refusing FM". The issue
is **architectural dogma — refusing to layer**. Tearout is a composite object: one synth
patch is one stem, never the final sound. This app demonstrates the four-layer matrix on
real files and interactive spectrograms.

## Four-layer matrix

| Layer | Range | Method | Function |
|---|---|---|---|
| The Sub | 20–80 Hz | Pure sine, zero modulation | Physical weight, chest pressure |
| The Growl | 80–500 Hz | Wavetable / phase distortion, moderate AM/RM | Body + harmonic foundation |
| The Screech | 500 Hz–8 kHz | The modulated patch, high-pass filtered | Aggression, the tear, metallic texture |
| The Transient | 2 k–20 kHz | Noise, clicks, layered drum hits | Attack — makes it feel struck |

## Features

- **Hear it**: before/after audio players (synthesized single-patch vs layered), plus the
  real `proof6_fixed_bass.wav` pulled from the phone.
- **See it**: band-energy bars (dBFS) across sub → air, plus real spectrogram images
  (inferno colormap) for before, after, the real bass, a Hamdi reference, and an 808.
- **Euclidean rhythm**: live 16-step generator (steps/pulses/rotation/BPM) — the tearout grid.

## Dev

```bash
bun install
bun run dev      # vite dev server
bun run build    # production build to dist/
bun run preview  # serve dist/
```

Assets live in `static/audio` and `static/img`. Spectral band data is in
`src/data/profiles.ts` (real measurements from 44.1 kHz mono STFT).

## Origin of the proof files

The `proof6_fixed_bass.wav`, `808 - OTT OTT _pwfuu_.wav`, `trench_flow.mp3` and
`Show Me (VIP) - Hamdi & Sammy Virji (FLAC).flac` were pulled from the Pixel 9 Pro XL
via ADB (`adb pull /sdcard/Download/…`). The synthesized before/after pair was generated
with numpy/scipy/matplotlib.