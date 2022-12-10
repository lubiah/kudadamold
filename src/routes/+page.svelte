<script>
	import Head from "$components/Head";
	import BlogCard from "$components/BlogCard";
	import ProjectCard from "$components/ProjectCard";

	/**@type {import("./$types").PageServerData}*/
	export let data;

	const SEO = {
		title: "Lucretius Biah — A teen software and web developer • Kudadam",
		description:
			"This is Lucretius' personal website, where he shares his projects and writes articles about technology and other topics",
		keywords: ["Lucretius Biah", "Lucretius", "Lucretius website", "kudadam", "kudadam biah"],
		canonical: "https://kudadam.com"
	};
</script>

<Head
	title={SEO.title}
	description={SEO.description}
	keywords={SEO.keywords.toString()}
	canonical={SEO.canonical}
	openGraph={{
		type: "website",
		title: SEO.title,
		description: SEO.description,
		url: SEO.canonical
		//TODO: Add images
	}}
	twitter={{
		title: SEO.title,
		description: SEO.description
	}}
>
	<link
		rel="preload"
		as="image"
		href="https://ik.imagekit.io/kudadam/illustrations/developer.svg"
		type="image/svg+xml"
	/>
</Head>

<main class="lg:h-full grid grid-cols-[1fr_calc(100%-20px)_1fr] py-4">
	<section
		class="flex lg:flex-1 flex-wrap flex-col-reverse lg:flex-row lg:flex-nowrap gap-4 items-center justify-center lg:h-full pb-12"
	>
		<div>
			<h1 class="display-1">Building resilient software and websites</h1>
			<p>
				Hi👋, I'm Lucretius. <br />
				I'm a software developer enthusiastic about building scalable and efficient software. In addition,
				I design stunning websites using cutting-edge web technologies with a key🔑 focus on accessibility
				and responsiveness.
			</p>
			<a
				class="button mb-3 font-semibold"
				data-theme="primary"
				data-reset-styles
				href="mailto:lucretiusbiah@protonmail.com">Let's get in touch</a
			>
		</div>
		<img
			loading="eager"
			src="https://ik.imagekit.io/kudadam/illustrations/developer.svg"
			alt=""
			width="500"
			height="500"
		/>
	</section>
	<section
		class="flex justify-center w-full from-purple-100 to-purple-50 bg-gradient-to-t !full-bleed py-14"
	>
		<div
			id="paper"
			class="font-mono bg-white my-4 mx-3 shadow max-w-prose relative pt-8 pb-7 before:w-0.5 before:h-full before:absolute before:top-0 before:left-7 before:bg-[rgb(255,0,0,0.5)]"
		>
			<div class="h-full bg-[repeating-linear-gradient(white_0px,white_24px,teal_25px)]">
				<div class="leading-[25px] pt-6 pl-9">
					Hello and welcome. I'm Lucretius.<br /> Welcome to my online home, where I express myself through
					code. I am a big fan of open source. I help open source by fixing bugs, improving code, and
					writing documentation. Some of my work may be seen in the projects section of my website. Also,
					I develop software and build websites, finding means and ways to make the products I build
					accessible to all and sundry, regardless of their disability.
				</div>
			</div>
		</div>
	</section>
	<section>
		<div class="max-w-prose mx-auto">
			<h2 class="display-2">Projects.</h2>
			<p>
				Some of the projects I've completed are listed here. They are not sorted in any particular
				order, but rather at random. You can <a href="/projects">view all the projects here</a>.
			</p>
		</div>
		<div class="flex flex-wrap justify-center gap-10 mt-10">
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
	</section>
	<section>
		<div class="max-w-prose mx-auto">
			<h2 class="display-2">Writing.</h2>
			<p>
				I like writing on a wide range of topics, from technology to personal. Some of my most
				popular writing may be seen below.
			</p>
		</div>
		<div class="flex flex-wrap justify-center gap-10 mt-10">
			{#each data.articles as article}
				<BlogCard
					title={article.title}
					excerpt={article.excerpt}
					date={article.date}
					slug={article.slug}
					category={article.category}
				/>
			{/each}
		</div>
	</section>
	<style>
		#root-layout {
			padding-left: 0;
			padding-right: 0;
		}

		.container {
			margin-left: 0;
			margin-right: 0;
			max-width: unset;
		}
	</style>
</main>

<style lang="postcss">
	section {
		grid-column: 2/3;
		margin-bottom: 50px;
	}
</style>
