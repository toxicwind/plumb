<script lang="ts">
  export let src: string;
  export let label: string;
  export let accent: string = '#22d3ee';
  export let badges: string[] = [];
  let playing = false;
  let audio: HTMLAudioElement;

  function toggle(a: HTMLAudioElement) {
    if (playing) {
      a.pause();
    } else {
      void a.play();
    }
  }

  function onPlay() {
    playing = true;
  }
  function onPause() {
    playing = false;
  }
  function onEnded() {
    playing = false;
  }
</script>

<div class="player" style="--accent: {accent}">
  <button
    class="play"
    on:click={() => toggle(audio)}
    aria-label={playing ? 'Pause' : 'Play'}>
    {playing ? '❚❚' : '▶'}
  </button>
  <div class="meta">
    <div class="head">
      <span class="name">{label}</span>
      {#each badges as b}<span class="badge">{b}</span>{/each}
    </div>
    <div class="bar">
      <audio
        bind:this={audio}
        src={src}
        on:play={onPlay}
        on:pause={onPause}
        on:ended={onEnded}
        controls
        preload="none" />
    </div>
  </div>
</div>

<style>
  .player {
    display: flex;
    gap: 0.9rem;
    align-items: flex-start;
    padding: 0.9rem 1rem;
    border: 1px solid color-mix(in srgb, var(--accent) 35%, transparent);
    border-radius: 12px;
    background: #0b1020;
  }
  .play {
    width: 46px;
    height: 46px;
    flex: 0 0 46px;
    border: none;
    border-radius: 50%;
    background: var(--accent);
    color: #06080f;
    font-weight: 800;
    font-size: 1rem;
    cursor: pointer;
  }
  .play:hover {
    filter: brightness(1.15);
  }
  .meta {
    flex: 1;
    min-width: 0;
  }
  .head {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    margin-bottom: 0.45rem;
    flex-wrap: wrap;
  }
  .name {
    font-weight: 600;
    color: #e5edff;
  }
  .badge {
    font-size: 0.68rem;
    padding: 0.12rem 0.45rem;
    border-radius: 999px;
    background: color-mix(in srgb, var(--accent) 22%, transparent);
    color: var(--accent);
    font-weight: 600;
    letter-spacing: 0.02em;
  }
  .bar :global(audio) {
    width: 100%;
    height: 34px;
  }
</style>