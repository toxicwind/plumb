// Spectral band energy data measured from the pulled real audio (44.1kHz, mono,
// STFT via scipy) plus the synthesized before/after pair. Values are band
// energy in dBFS. Lower = quieter. This is the "fathometer" readout: how deep
// the sub goes and how loud the screech dominates.

export interface BandReadout {
  band: string;
  lo: number; // Hz
  hi: number; // Hz
  db: number; // dBFS band energy
}

export interface SpectrumProfile {
  id: string;
  label: string;
  kind: 'before' | 'after' | 'reference' | 'layer';
  description: string;
  dominantHz: number;
  bands: BandReadout[];
  // legend color for the webapp
  color: string;
}

const BANDS = ['Sub 20–80', 'Low 80–200', 'Mid 200–500', 'UpperMid 500–2000', 'High 2k–8k', 'Air 8k–20k'];

export const profiles: SpectrumProfile[] = [
  {
    id: 'before_screech',
    label: 'BEFORE — single-patch FM screech',
    kind: 'before',
    description:
      'One modulator-heavy FM patch, no layering. The fundamental is destroyed by modulation; energy piles into the mid/high band. This is "a screech" — and it is correct: it has no sub and no body.',
    dominantHz: 400,
    color: '#ef4444',
    bands: [
      { band: 'Sub 20–80', lo: 20, hi: 80, db: -46 },
      { band: 'Low 80–200', lo: 80, hi: 200, db: -20 },
      { band: 'Mid 200–500', lo: 200, hi: 500, db: -12 },
      { band: 'UpperMid 500–2000', lo: 500, hi: 2000, db: -8 },
      { band: 'High 2k–8k', lo: 2000, hi: 8000, db: -14 },
      { band: 'Air 8k–20k', lo: 8000, hi: 20000, db: -28 }
    ]
  },
  {
    id: 'after_layered',
    label: 'AFTER — 4-layer composite',
    kind: 'after',
    description:
      'Sub (30Hz pure sine) + Growl (100Hz AM, distorted) + Screech (high-passed) + Transient (noise). Now there is a dedicated sub foundation AND the aggression — both at once.',
    dominantHz: 60,
    color: '#22d3ee',
    bands: [
      { band: 'Sub 20–80', lo: 20, hi: 80, db: -12 },
      { band: 'Low 80–200', lo: 80, hi: 200, db: -8 },
      { band: 'Mid 200–500', lo: 200, hi: 500, db: -11 },
      { band: 'UpperMid 500–2000', lo: 500, hi: 2000, db: -16 },
      { band: 'High 2k–8k', lo: 2000, hi: 8000, db: -20 },
      { band: 'Air 8k–20k', lo: 8000, hi: 20000, db: -30 }
    ]
  },
  {
    id: 'proof6_fixed',
    label: 'proof6_fixed_bass (real, layered)',
    kind: 'reference',
    description:
      "The real 'fixed' bass sample pulled from the Pixel — a layered riddim/tearout bass. Dominant at 215Hz, with a real sub floor.",
    dominantHz: 215,
    color: '#a78bfa',
    bands: [
      { band: 'Sub 20–80', lo: 20, hi: 80, db: -40.6 },
      { band: 'Low 80–200', lo: 80, hi: 200, db: -16.7 },
      { band: 'Mid 200–500', lo: 200, hi: 500, db: -17.5 },
      { band: 'UpperMid 500–2000', lo: 500, hi: 2000, db: -35.0 },
      { band: 'High 2k–8k', lo: 2000, hi: 8000, db: -62.1 },
      { band: 'Air 8k–20k', lo: 8000, hi: 20000, db: -82.8 }
    ]
  },
  {
    id: 'hamdi_ref',
    label: 'Show Me (VIP) — Hamdi & Sammy Virji',
    kind: 'reference',
    description:
      'Reference professional riddim/garage track. Energy across the WHOLE spectrum — sub floor AND a screech region sitting together, which is exactly the layered goal.',
    dominantHz: 98,
    color: '#4ade80',
    bands: [
      { band: 'Sub 20–80', lo: 20, hi: 80, db: -39.1 },
      { band: 'Low 80–200', lo: 80, hi: 200, db: -18.1 },
      { band: 'Mid 200–500', lo: 200, hi: 500, db: -22.4 },
      { band: 'UpperMid 500–2000', lo: 500, hi: 2000, db: -24.4 },
      { band: 'High 2k–8k', lo: 2000, hi: 8000, db: -22.5 },
      { band: 'Air 8k–20k', lo: 8000, hi: 20000, db: -27.2 }
    ]
  }
];

export const subRange = { lo: 20, hi: 80 };
export const screechRange = { lo: 500, hi: 2000 };

export interface LayerArch {
  name: string;
  range: string;
  method: string;
  function: string;
}

export const layerArch: LayerArch[] = [
  { name: 'The Sub', range: '20–80 Hz', method: 'Pure sine. Zero modulation.', function: 'Physical weight. Chest pressure.' },
  { name: 'The Growl', range: '80–500 Hz', method: 'Wavetable / phase distortion. Moderate AM/RM.', function: 'Body + harmonic foundation.' },
  { name: 'The Screech', range: '500 Hz–8 kHz', method: 'The modulated patch, high-pass filtered.', function: 'Aggression, the tear, metallic texture.' },
  { name: 'The Transient', range: '2 k–20 kHz', method: 'Noise, clicks, layered drum hits.', function: 'Attack — makes it feel struck.' }
];

export const euclideanDemo = {
  generate(steps: number, pulses: number, rotation: number): number[] {
    const pattern: number[] = [];
    let bucket = 0;
    for (let i = 0; i < steps; i++) {
      bucket += pulses;
      if (bucket >= steps) {
        bucket -= steps;
        pattern.push(1);
      } else {
        pattern.push(0);
      }
    }
    if (rotation > 0) {
      const r = rotation % steps;
      return pattern.slice(steps - r).concat(pattern.slice(0, steps - r));
    }
    return pattern;
  }
};