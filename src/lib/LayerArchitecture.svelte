<script lang="ts">
  import { layerArch } from '../data/profiles';
</script>

<section class="layers">
  <h3>The Riddim Architectural Matrix — four parallel layers</h3>
  <p class="intro">
    Tearout is a <strong>composite object</strong>. One patch is a single stem — never the
    final sound. Duplicate the MIDI into four tracks, each with its own synth, routed into an
    Audio Effect Rack for parallel processing. That is the missing "final step".
  </p>
  <div class="stack">
    {#each layerArch as layer, i (layer.name)}
      <div class="layer" style="--i:{i}">
        <div class="idx">{i + 1}</div>
        <div class="body">
          <div class="row">
            <span class="name">{layer.name}</span>
            <span class="range">{layer.range}</span>
          </div>
          <div class="method">{layer.method}</div>
          <div class="fn">{layer.function}</div>
        </div>
      </div>
    {/each}
  </div>
</section>

<style>
  .layers h3 {
    color: #e5edff;
    font-size: 1.05rem;
    margin: 0 0 0.4rem;
  }
  .intro {
    color: #b9c6e6;
    max-width: 70ch;
    margin: 0 0 1rem;
    line-height: 1.55;
  }
  .intro strong {
    color: #22d3ee;
  }
  .stack {
    display: flex;
    flex-direction: column;
    gap: 0.55rem;
  }
  .layer {
    display: flex;
    gap: 0.7rem;
    background: #0a0e1c;
    border: 1px solid #1c2540;
    border-radius: 10px;
    padding: 0.65rem 0.8rem;
    transition: border-color 0.2s ease;
  }
  .layer:hover {
    border-color: #22d3ee55;
  }
  .idx {
    width: 26px;
    height: 26px;
    flex: 0 0 26px;
    border-radius: 50%;
    background: linear-gradient(135deg, #0ea5e9, #22d3ee);
    color: #04121f;
    font-weight: 800;
    display: grid;
    place-items: center;
    font-size: 0.8rem;
  }
  .body {
    flex: 1;
  }
  .row {
    display: flex;
    justify-content: space-between;
    align-items: baseline;
    gap: 0.5rem;
  }
  .name {
    font-weight: 700;
    color: #e5edff;
  }
  .range {
    font-size: 0.72rem;
    color: #8fa0c8;
    white-space: nowrap;
  }
  .method {
    font-size: 0.82rem;
    color: #b9c6e6;
    margin-top: 0.15rem;
  }
  .fn {
    font-size: 0.78rem;
    color: #22d3ee;
    margin-top: 0.1rem;
  }
</style>