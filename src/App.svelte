<script lang="ts">
  import AudioPlayer from './lib/AudioPlayer.svelte';
  import SpectralPanel from './lib/SpectralPanel.svelte';
  import LayerArchitecture from './lib/LayerArchitecture.svelte';
  import EuclideanRhythm from './lib/EuclideanRhythm.svelte';
  import { profiles } from './data/profiles';

  const allProfiles = profiles;
</script>

<svelte:head><title>Plumb — Sound the Depths of Your Bass</title></svelte:head>

<header class="hero">
  <div class="badge">PEN · FATHOM · PRODUCT · PLUMB</div>
  <h1>Plumb</h1>
  <p class="tag">sound the depths of your bassline — before &amp; after</p>
  <p class="lede">
    One aggressively-modulated oscillator is a <strong>screech</strong>, not a bassline.
    The fundamental is destroyed by modulation and the low end is displaced into upper sidebands.
    EQing a single patch can't fix it. The fix is <strong>layering</strong> — and this tool proves it
    with real audio and real spectra.
  </p>
</header>

<main>
  <section class="section" id="compare">
    <h2>1 · Hear it — before vs after</h2>
    <p class="sub">
      Same 2 seconds, two architectures. <em>Before</em>: one FM patch, no sub.
      <em>After</em>: sub + growl + high-passed screech + transient, summed.
    </p>
    <div class="players">
      <AudioPlayer
        src="/audio/before_screech.wav"
        label="BEFORE — single-patch FM screech"
        accent="#ef4444"
        badges={['no sub', 'thin']} />
      <AudioPlayer
        src="/audio/after_layered.wav"
        label="AFTER — 4-layer composite"
        accent="#22d3ee"
        badges={['sub + body', 'tear']} />
    </div>
    <p class="hint">
      Proof sample (<em>proof6_fixed_bass</em>, pulled from the phone) — the real layered
      riddim bass that finally stopped being "a screech":
    </p>
    <div class="players">
      <AudioPlayer
        src="/audio/proof6_fixed_bass.wav"
        label="proof6_fixed_bass — real layered bass"
        accent="#a78bfa"
        badges={['real', 'fixed']} />
    </div>
  </section>

  <section class="section" id="spectrum">
    <h2>2 · See it — spectral depth readout</h2>
    <p class="sub">
      Band energy in dBFS. A layered bass seats a real sub floor <em>and</em> keeps the
      screech region — the single patch can't. The <span class="sub-hl">sub</span> and
      <span class="scr-hl">screech</span> bands are the tell.
    </p>
    <div class="panels">
      {#each allProfiles as p (p.id)}
        <SpectralPanel profile={p} scaleMin={-90} scaleMax={0} />
      {/each}
    </div>
    <div class="specgrid">
      <figure>
        <img src="/img/spec_before_screech.png" alt="Before screech spectrogram" />
        <figcaption>BEFORE — single-patch FM screech</figcaption>
      </figure>
      <figure>
        <img src="/img/spec_after_layered.png" alt="After layered spectrogram" />
        <figcaption>AFTER — 4-layer composite</figcaption>
      </figure>
      <figure>
        <img src="/img/spec_proof6_mono.png" alt="proof6 fixed bass spectrogram" />
        <figcaption>proof6_fixed_bass (real layered)</figcaption>
      </figure>
      <figure>
        <img src="/img/spec_hamdi_mono.png" alt="Hamdi reference spectrogram" />
        <figcaption>Show Me (VIP) — Hamdi &amp; Sammy Virji</figcaption>
      </figure>
      <figure>
        <img src="/img/spec_808_mono.png" alt="808 sample spectrogram" />
        <figcaption>808 sample</figcaption>
      </figure>
    </div>
  </section>

  <section class="section" id="architecture">
    <LayerArchitecture />
  </section>

  <section class="section" id="rhythm">
    <EuclideanRhythm />
  </section>
</main>

<footer>
  <p>Plumb · a product of the <strong>Fathom</strong> pen — sound the depths.</p>
</footer>

<style>
  :global(body) {
    margin: 0;
    font-family: ui-sans-serif, system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif;
    background: radial-gradient(1200px 600px at 70% -10%, #0f1836 0%, #06080f 60%);
    color: #dfe8ff;
    min-height: 100vh;
  }
  .hero {
    padding: 3.5rem 1.5rem 2.5rem;
    max-width: 960px;
    margin: 0 auto;
  }
  .badge {
    display: inline-block;
    font-size: 0.7rem;
    letter-spacing: 0.18em;
    color: #22d3ee;
    border: 1px solid #22d3ee44;
    padding: 0.25rem 0.7rem;
    border-radius: 999px;
    margin-bottom: 1rem;
  }
  h1 {
    font-size: 4rem;
    line-height: 1;
    margin: 0 0 0.3rem;
    background: linear-gradient(120deg, #38bdf8, #22d3ee, #a78bfa);
    -webkit-background-clip: text;
    background-clip: text;
    color: transparent;
  }
  .tag {
    color: #8fa0c8;
    font-size: 1.15rem;
    margin: 0 0 1.2rem;
  }
  .lede {
    max-width: 66ch;
    line-height: 1.65;
    color: #b9c6e6;
  }
  .lede strong {
    color: #ef4444;
  }
  main {
    max-width: 960px;
    margin: 0 auto;
    padding: 0 1.5rem 3rem;
  }
  .section {
    margin-bottom: 3rem;
  }
  h2 {
    color: #e5edff;
    font-size: 1.3rem;
    margin: 0 0 0.35rem;
  }
  .sub {
    color: #9aabcf;
    margin: 0 0 1rem;
    line-height: 1.5;
  }
  .sub em,
  .sub-hl {
    color: #22d3ee;
    font-style: normal;
  }
  .scr-hl {
    color: #f87171;
    font-style: normal;
  }
  .players {
    display: flex;
    flex-direction: column;
    gap: 0.7rem;
    margin-bottom: 0.6rem;
  }
  .hint {
    color: #8fa0c8;
    font-size: 0.85rem;
    margin: 1rem 0 0.4rem;
  }
  .hint em {
    color: #a78bfa;
    font-style: normal;
  }
  .panels {
    display: flex;
    flex-direction: column;
    gap: 0.9rem;
  }
  .specgrid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
    gap: 0.9rem;
    margin-top: 1.2rem;
  }
  .specgrid figure {
    margin: 0;
    background: #0a0e1c;
    border: 1px solid #1c2540;
    border-radius: 10px;
    overflow: hidden;
  }
  .specgrid img {
    width: 100%;
    display: block;
  }
  .specgrid figcaption {
    padding: 0.5rem 0.7rem;
    font-size: 0.78rem;
    color: #9aabcf;
  }
  footer {
    border-top: 1px solid #141b30;
    padding: 1.5rem;
    text-align: center;
    color: #7b8bb0;
    font-size: 0.85rem;
  }
  footer strong {
    color: #22d3ee;
  }
</style>