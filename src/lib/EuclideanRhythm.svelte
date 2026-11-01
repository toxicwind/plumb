<script lang="ts">
  import { euclideanDemo } from '../data/profiles';

  let steps = 16;
  let pulses = 5;
  let rotation = 3;
  let bpm = 140;

  $: pattern = euclideanDemo.generate(steps, pulses, rotation);
  $: stepMs = Math.round((60000 / bpm) / 4); // 16th notes
</script>

<section class="euclid">
  <h3>Euclidean rhythm — the tearout grid</h3>
  <p class="intro">
    The classic 16-step, 5-pulse, rotate-3 pattern behind the whole tearout groove
    (<em>Bal-suba</em>/Akadema family). Even spacing of <strong>{pulses}</strong> hits
    across <strong>{steps}</strong> steps, rotated <strong>{rotation}</strong>. Each '1' is a
    bass note; each '0' is space, letting the sub breathe.
  </p>

  <div class="controls">
    <label>Steps <input type="range" min="4" max="32" step="1" bind:value={steps} /> {steps}</label>
    <label>Pulses <input type="range" min="1" max="{Math.min(steps, 16)}" step="1" bind:value={pulses} /> {pulses}</label>
    <label>Rotation <input type="range" min="0" max="{Math.min(steps, 16)}" step="1" bind:value={rotation} /> {rotation}</label>
    <label>BPM <input type="range" min="70" max="180" step="1" bind:value={bpm} /> {bpm}</label>
  </div>

  <div class="grid">
    {#each pattern as p, i (i)}
      <div class="cell" class:on={p === 1} style="--dur:{stepMs}ms">
        {i + 1}
      </div>
    {/each}
  </div>

  <div class="string">
    {#each pattern as p, i (i)}<span class={p === 1 ? 'one' : 'zero'}>{p}</span>{/each}
  </div>
</section>

<style>
  .euclid h3 {
    color: #e5edff;
    font-size: 1.05rem;
    margin: 0 0 0.4rem;
  }
  .intro {
    color: #b9c6e6;
    max-width: 74ch;
    margin: 0 0 1rem;
    line-height: 1.55;
  }
  .intro em {
    color: #22d3ee;
  }
  .controls {
    display: flex;
    flex-wrap: wrap;
    gap: 1rem;
    margin-bottom: 1rem;
  }
  .controls label {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    color: #b9c6e6;
    font-size: 0.84rem;
  }
  .controls input[type='range'] {
    accent-color: #22d3ee;
  }
  .grid {
    display: grid;
    grid-template-columns: repeat(16, 1fr);
    gap: 4px;
    margin-bottom: 0.7rem;
  }
  .cell {
    aspect-ratio: 1;
    display: grid;
    place-items: center;
    font-size: 0.7rem;
    background: #141b30;
    border-radius: 6px;
    color: #5b6b92;
    cursor: pointer;
    transition: background 0.15s ease;
  }
  .cell:hover {
    filter: brightness(1.25);
  }
  .cell.on {
    background: linear-gradient(135deg, #0ea5e9, #22d3ee);
    color: #04121f;
    font-weight: 800;
    animation: pulse var(--dur) steps(1) infinite;
  }
  @keyframes pulse {
    50% {
      filter: brightness(1.3);
    }
  }
  .string {
    display: flex;
    gap: 2px;
    font-family: monospace;
    font-size: 0.9rem;
  }
  .one {
    color: #22d3ee;
    font-weight: 700;
  }
  .zero {
    color: #3a4868;
  }
</style>