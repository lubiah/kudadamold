<script context="module">
	import projects_json from "./projects.json";
		export async function load(){
			return {
				props: {
					projects: projects_json
				}
			}
		}	
</script>

<script>	
	import Head from "svelte-seo";
	import Card from "$lib/Components/ProjectCard";
	export let projects;

</script>	

<Head
title = "Projects - Stuff Curated by me • Kudadam"
description = "This is a page which showcases a list of projects which were curated or designed by me"
keywords = "kudadam projects, lucretius projects, developer projects, web development projects, software development projects"
canonical = "https://www.kudadam.com/projects"

openGraph={{
    title: 'Projects - Stuff Curated by me • Kudadam',
    description: 'This is a page which showcases a list of projects which were curated or designed by me',
    url: 'https://www.kudadam.com/projects',
    type: 'website',
    images: [
      {
        url: 'https://kudadam.sirv.com/logo/logo.png?q=10',
        width: 850,
        height: 650,
        alt: 'Website logo image'
      }
     ]
  }}

    twitter={{
    site: "@kudadam_",
    title: "Projects - Stuff Curated by me • Kudadam",
    description: "This is a page which showcases a list of projects which were curated or designed by me",
    image: "https://kudadam.sirv.com/logo/logo.png?q=10",
    imageAlt: "Website logo image",
  }}

/>

<main class="max-w-6xl mx-auto">
	<div class="text-center">
		<h1 class= "font-bold">Projects</h1>
		<p class="italic">This is a list of awesome projects curated by me in my spare time</p>
	</div>
	<section class="flex flex-wrap justify-center items-center mt-[50px] gap-x-4 gap-y-4">	
		{#each projects as project (project.id) }
			<Card
			title="{project.name}"
			description="{project.description}"
			image="{project.image}"
			repo="{project.repo}"
			url="{project.url}"
			/>
		{/each}
	</section>	
</main>
