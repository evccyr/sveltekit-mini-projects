<script lang="ts">
	// import Icon from '@iconify/svelte';
	import { RangeSlider } from '@skeletonlabs/skeleton';

	let value: number = 1;
	let promise: any = new Promise(() => {});

	async function birdImages(count: number) {
		try {
			const res = await fetch('https://shibe.online/api/birds?count=' + count);
			const data = await res.json();
			console.log(typeof data, data);
			return data;
		} catch (error) {
			throw error;
		}
	}

	function handleClick(count: number = 1) {
		promise = birdImages(count);
	}
</script>

<div class="space-y-10 text-center flex flex-col items-center">
  <h2 class="h2">How many birds you wan see?</h2>
	<!-- Generator button -->
	<RangeSlider
		class="w-4/5 text-4xl"
		name="range-slider"
		bind:value
		min={1}
		max={10}
		step={1}
		ticked
	>
		
	</RangeSlider>
	<button
		class="text-2xl hover:bg-slate-600 p-1 mx-4 border-2 bg-gray-900 border-slate-600 rounded"
		on:click={() => handleClick(value)}
	>
		Show {value} bird{value > 1 ? 's' : ''}!
	</button>

	<!-- Display joke -->
	<div class="space-y-2">
		{#await promise}
			<p>...waiting</p>
		{:then images}
			{#each images as image}
				<img alt="a bird" src={image} />
			{/each}
		{:catch error}
			<p style="color: red">{error.message}</p>
		{/await}
	</div>
</div>
