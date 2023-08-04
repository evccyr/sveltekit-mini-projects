<script lang="ts">
	// import Icon from '@iconify/svelte';

	let types: string[] = ['general', 'knock-knock', 'programming', 'dad'];
	let promise: any = new Promise(() => {});

	async function generateJoke(type: string) {
		try {
			const res = await fetch('https://official-joke-api.appspot.com/jokes/' + type + '/random');
			const data = await res.json();
			return { setup: data[0].setup, punchline: data[0].punchline };
		} catch (error) {
			throw error;
		}
	}
	function handleClick(type: string) {
		promise = generateJoke(type);
		console.log(promise);
	}
</script>

<div class="space-y-10 text-center flex flex-col items-center">
	<h2 class="h2">Generate a random joke</h2>
	<!-- Generator button -->
	<div class="flex justify-around">
		{#each types as type}
			<button
				class="text-2xl hover:bg-slate-600 p-1 mx-4 border-2 bg-gray-900 border-slate-600 rounded"
				on:click={() => handleClick(type)}
			>
				{type}
			</button>
		{/each}
	</div>
	<!-- Display joke -->
	<div class="space-y-2">
		{#await promise}
			<p>...waiting</p>
		{:then joke}
			<p class="text-xl">{joke.setup}</p>
			<p class="text-xl">{joke.punchline}</p>
		{:catch error}
			<p style="color: red">{error.message}</p>
		{/await}
	</div>
</div>
