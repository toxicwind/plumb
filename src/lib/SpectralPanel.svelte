<script lang="ts">
  import type { SpectrumProfile, BandReadout } from '../data/profiles';
  import { subRange, screechRange } from '../data/profiles';

  export let profile: SpectrumProfile;
  export let height = 220;

  // global max abs db for shared scale across panels
  export let scaleMin: number = -90;
  export let scaleMax: number = 0;

  $: maxDb = scaleMax;
  $: minDb = scaleMin;

  function bandClass(b: BandReadout): string {
    const mid = (b.lo + b.hi) / 2;
    if (mid >= subRange.lo && mid <= subRange.hi) return 'sub';
    if (mid >= screechRange.lo && mid <= screechRange.hi) return 'screech';
    return '';
  }

  // bar height 0..1 from db in [min,max]
  function barH(b: BandReadout): number {
    const v = (b.db - minDb) / (maxDb - minDb);
    return Math.max(0, Math.min(1, v));
  }
</script>

<div class="panel">
  <div class="legend">
    <span class="dot" style="background:{profile.color}"></span>
    <span class="label">{profile.label}</span>
    <span class="dom">dom {Math.round(profile.dominantHz)} Hz</span>
  </div>
  <div class="bars" style="height:{height}px">
    {#each profile.bands as b (b.band)}
      <div class="col" title="{b.band} — {b.db.toFixed(1)} dBFS">
        <div class="track">
          <div
            class="fill {bandClass(b)}"
            style="height:{barH(b) * 100}%; background:{profile.color}"></div>
        </div>
        <div class="bandname" class:bub={bandClass(b) === 'sub'} class:bscr={bandClass(b) === 'screech'}>
          {b.band}
        </div>
      </div>
    {/each}
  </div>
</div>

<style>
  .panel {
    flex: 1;
    min-width: 0;
    background: #0a0e1c;
    border-radius: 12px;
    padding: 0.9rem;
  }
  .legend {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    margin-bottom: 0.6rem;
    flex-wrap: wrap;
  }
  .dot {
    width: 10px;
    height: 10px;
    border-radius: 50%;
    flex: 0 0 auto;
  }
  .label {
    font-weight: 700;
    color: #e5edff;
    font-size: 0.92rem;
  }
  .dom {
    margin-left: auto;
    font-size: 0.72rem;
    color: #8fa0c8;
  }
  .bars {
    display: flex;
    align-items: flex-end;
    justify-content: space-between;
    gap: 6px;
  }
  .col {
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.3rem;
    min-width: 0;
  }
  .track {
    width: 100%;
    background: #141b30;
    border-radius: 6px;
    overflow: hidden;
    height: 100%;
    display: flex;
    align-items: flex-end;
  }
  .fill {
    width: 100%;
    border-radius: 6px 6px 0 0;
    transition: height 0.4s ease;
    opacity: 0.95;
  }
  .fill.sub {
    box-shadow: 0 0 12px color-mix(in srgb, white 30%, transparent);
  }
  .fill.screech {
    opacity: 0.6;
  }
  .bandname {
    font-size: 0.6rem;
    color: #8fa0c8;
    text-align: center;
    line-height: 1.1;
    white-space: nowrap;
  }
  .bub {
    color: #7dd3fc;
    font-weight: 700;
  }
  .bscr {
    color: #fca5a5;
    font-weight: 700;
  }
</style>