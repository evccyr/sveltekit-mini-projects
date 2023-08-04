<script>
	const routes = [
		['/jokes', 'Random Jokes Generator'],
		['/pokemon', 'Get info about any Pokemon'],
		['/birds', 'Random Bird Image Generator '],
		['/spaceStation', 'Internation Space Station Locator'],
		['/trivia', 'Trivia Question Game']
	];
</script>

<div class="space-y-10 text-center flex flex-col items-center">
	<h2 class="h2">Projects</h2>

	<ul>
		{#each routes as [route, title]}
			<li>
				<a class="text-2xl hover:underline leading-loose" href={route}>{title}</a>
			</li>
		{/each}
	</ul>
</div>
