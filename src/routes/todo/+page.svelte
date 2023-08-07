<script lang="ts">
	import Icon from '@iconify/svelte';
	import { enhance } from '$app/forms';
	export let data;
</script>

<div class="space-y-10 text-center flex flex-col items-center">
	<form use:enhance action="?/create" method="POST">
		<h2 class="h2">New todo</h2>
		<div class="flex">
			<input
				class="m-4 input"
				name="task"
				title="Input (text)"
				type="text"
				placeholder="new todo..."
				required
			/>
			<button class="m-4 text-2xl" type="submit">
				<Icon icon="zondicons:add-solid" />
			</button>
		</div>
	</form>

	<div class="flex text-2xl">
		<ul class="todos space-y-4">
			{#each data.list as todo (todo.id)}
				<li class="flex">
					<form use:enhance method="POST" action="?/update">
						<input type="hidden" name="done" value={todo.done} />
						<input type="hidden" name="id" value={todo.id} />
						<button>
							<Icon icon={todo.done ? 'akar-icons:check-box' : 'radix-icons:box'} />
						</button>
					</form>
					<form use:enhance method="POST" action="?/delete">
						<input type="hidden" name="id" value={todo.id} />
						{#if todo.done}
							<span><s>{todo.task}</s></span>
						{:else}
							<span>{todo.task}</span>
						{/if}
						<button>
							<Icon icon="mdi:bin" />
						</button>
					</form>
				</li>
			{/each}
		</ul>
	</div>
</div>
