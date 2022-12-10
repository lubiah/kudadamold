<script>
	import Head from '$components/Head';
	import ProjectCard from '$components/ProjectCard';

	/**@type {import("./$types").PageData}*/
	export let data;

	const SEO = {
		title: 'The Projects Page • Kudadam',
		description: 'This page contains a list of projects which are created by Lucretius Biah',
		canonical: 'https://kudadam.com/projects'
	};
</script>

<Head
	title={SEO.title}
	description={SEO.description}
	canonical={SEO.canonical}
	twitter={{
		title: SEO.title,
		description: SEO.description
	}}
/>

<main>
	<h1 class="text-center mb-[30px]">My Projects</h1>
	<div class="flex flex-wrap gap-5 justify-center">
		{#each data.projects as project}
			<ProjectCard
				name={project.name}
				description={project.description}
				demo={project.demo}
				image={project.image}
				source={project.source}
			/>
		{/each}
	</div>
</main>
