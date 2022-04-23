<script context="module">
	export const prerender = true;
</script>

<script>	
	import Head from "svelte-seo";
	import Card from "$lib/Components/ProjectCard";
	export let projects;

  const SEO = {
    meta: "Projects - Stuff curated by me • Kudadam",
    description: "This is a page which showcases a list of projects which were curated or designed by me",
    keywords: "kudadam projects, lucretius projects, developer projects, web development projects, software development projects",
    canonical: "https://www.kudadam.com/projects",
    image: "https://lucretius.sirv.com/logo/logo.png"
  }

</script>	

<Head
title = "{SEO.title}"
description = "{SEO.description}"
keywords = "{SEO.keywords}"
canonical = "{SEO.canonical}"

openGraph={{
    title: `${SEO.title}`,
    description: `${SEO.description}`,
    url: `${SEO.canonical}`,
    type: 'website',
    images: [
      {
        url: `${SEO.image}`,
        width: 850,
        height: 650,
        alt: 'Website logo image'
      }
     ]
  }}

    twitter={{
    site: "@kudadam_",
    title: `${SEO.title}`,
    description: `${SEO.description}`,
    image: `${SEO.image}`,
    imageAlt: "Website logo image",
  }}

/>

<main>
  <section>
    <div class="text-center">
      <h1>Projects</h1>
      <p>
        A list of stuff curated by me
      </p>
    </div>
    <section>
    <div class="flex flex-wrap items-center justify-center gap-2">
      {#each projects as project (project.id) }
			<Card
			title="{project.name}"
			description="{project.description}"
			image="{project.image}"
			repo="{project.repo}"
			url="{project.url}"
			/>
		  {/each}
    </div>
    </section>
  </section>
</main>

<style>
  main {
    display: grid;
    grid-template-columns: 1fr min(100%, 72rem) 1fr;
  }

   section {
    grid-column: 2/3;
  }
</style>