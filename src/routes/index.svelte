<script type="text/javascript">
	import Head from 'svelte-seo';
	import { fade } from "svelte/transition";
	import { onMount } from "svelte";

	export let articles, projects;

	let texts = [
		"A full-stack web developer",
		"A software developer",
		"An open-source enthusiast",
		"A frequent gamer🎮",
		"An avid reader📗",
		"A fan of Hardy Boys books"
		];
	let textsCounter = 0;
	let currentText = texts[0];
	let TypeWriter;
	let BlogCard;
	let ProjectCard;

	setInterval(()=>{
		currentText = texts[(textsCounter + 1) % texts.length];
		textsCounter++;
	},4000);

	onMount(async ()=>{
		let Aos = await import("aos").then(e => e.default);
		BlogCard = await import("$lib/Components/BlogCard").then(e=> e.default);
		ProjectCard = await import("$lib/Components/ProjectCard").then(e=> e.default);
		TypeWriter = await import("typeit").then(e=> e.default);
		await import("aos/dist/aos.css");
		Aos.init({
			duration: 1500,
			once: true
		});
	});


	const sectionTwo = node =>{
		const animateSection = ()=>{
			let element = event.detail;
			let elementContent = element.innerHTML;
			element.innerHTML = "";
			const TypeIt = new TypeWriter(node, {
				speed: 40,
				afterComplete: instance =>{
					instance.destroy(true)
				}
			})
			.type(elementContent)
			.break()
			.type("I can torn an ordinary")
			.move(-14)
			.delete(1)
			.type("u")
			.move(14)
			.type(" <span class='ordinary-item'></span>")
			.type(" into this <span class='unique-item animate-bounce'></span>")
			.type(" with <span class='text-green-500'>&lt;/</span>code<span class='text-green-500'>&gt;</span>")
			.go()
		}
		document.addEventListener("aos:in:section-two", animateSection)
	}

	const SEO = {
		title: "Lucretius Biah • Kudadam",
		description: "Hey, am Lucretius, a software developer and website designer. Welcome to my part of the internet. Feel free to read my blog post, download my softwares or just look around",
		keywords: "lucretius, biah, lucretius biah, lucretius website",
		canonical: "https://www.kudadam.com"

	}

</script>

<Head
	title={SEO.title}
	description={SEO.description}
	keywords= {SEO.keywords}
	canonical={SEO.canonical}

	openGraph={{
		title: `${SEO.title}`,
		description: `${SEO.description}`,
		url: `${SEO.canonical}`,
		type: 'website',
		images: [
			{
				url: 'https:lucretius.sirv.com/logo/logo.png?q=50&w=850&h=650',
				width: 850,
				height: 650,
				alt: 'Kudadam Logo'
			}
		]
	}}

	twitter={{
		site: '@kudadam_',
		title: `${SEO.title}`,
		description: `${SEO.description}`,
		image: 'https:lucretius.sirv.com/logo/logo.png?q=50&w=850&h=650',
		imageAlt: 'Logo of Kudadam'
	}}

	jsonLd={{
		"@type": "Website",
		url: `${SEO.canonical}`,
		potentialAction: {
			"@type": "SearchAction",
			target: {
				"@type": "EntryPoint",
				urlTemplate: "https://www.kudadam.com/search?q={search_term_string}"
			},
			"query-input": "required name=search_term_string"
		}
	}}
/>


<main>
	<section class="grid  grid-cols-3 items-center justify-center section">
		
		<div class="col-span-3 md:col-span-2">
			<h1 class="display-1" id="me-text">Hey, am Lucretius</h1>
			<p class="display-8">
				{#key currentText}<span style:display="inline-block" in:fade>{currentText}</span>{/key} located somewhere in Wakanda🌍. Welcome to my part of the internet where I <a href="/projects">showcase my projects</a> and <a href="/blog">write about tech and non-techy stuff</a>.
			</p>
		</div>
		<img
		class="mx-auto col-span-3 md:col-span-1"
		src="https://lucretius.sirv.com/profile/avatar.svg?q=1"
		alt="Cartoonish boy winking his eye"
		height="370"
		width="370"
	/>
	</section>
	<section class="grid grid-cols-3 items-center  justify-center gap-4">
		<h2 class="display-4 font-bold text-center col-span-3" data-aos="fade-down">What I do?</h2>
		<div class="col-span-3 md:col-span-2 display-8" data-aos="fade-right" id="section-two-child-container" data-aos-id="section-two" use:sectionTwo>
			
I design stunning-looking web interfaces using cutting-edge web technologies with a key🔑 focus on accessibility and responsiveness to ensure users will have a great user experience💡.
		</div>
		<img data-aos="fade-left" class="col-span-3 row-start-2 md:row-start-[unset] md:col-span-1 mx-auto" alt="A developer standing by portfolio" src="https://lucretius.sirv.com/svg/showing_resume.svg?q=1" width="450" height="450" loading="lazy"/>
	</section>
	<section class="grid grid-cols-3 items-center justify-center  gap-4">
		<img height="450" width="450" data-aos="flip-right" data-aos-id="section-three" class="col-span-3 md:col-span-1" src="https://lucretius.sirv.com/svg/dev.svg?q=1" alt="Developer sitting in front of a laptop">
		<div class="display-8 col-span-3 md:col-span-2" data-aos="flip-left">
			When am not designing user-interfaces, I develop softwares and write the behind-the-scenes code that makes a website function. I do everything database, servers and caching
		</div>
	</section>
	<section>
		<div data-aos="zoom-in-down" class="text-center">
			<h2 class="display-4">Writing✍️</h2>
			<p>Over here is a list of some articles I have written</p>
		</div>
		<section class="flex overflow-auto snap-x xl:fancy-scrollbar">
			<div class="flex gap-x-4 pt-4">
				{#each articles as article}
					<svelte:component this={BlogCard} 
					class="snap-center"
					image = {article.image}
					title = {article.title}
					date = {article.date}
					slug = {article.slug}
					excerpt = {article.excerpt}
					category = {article.category}
					/>
				{/each}
			</div>
		</section>
	</section>
	<section>
		<div data-aos="zoom-in-down" class="text-center">
			<h2 class="display-4">Projects🚀</h2>
			<p>A few things I have built</p>
		</div>
		<section class="flex overflow-auto snap-x xl:fancy-scrollbar">
			<div class="flex gap-x-4 pt-4">
				{#each projects as project }
					<svelte:component this={ProjectCard} 
					title = {project.name}
					description = {project.description}
					image = {project.image}
					repo = {project.repo}
					url = {project.url}
					 />
				
				{/each}
			</div>
		</section>
	</section>
</main>

<style type="text/postcss">

	section {
		@apply mb-[180px];
	}
	#me-text {
		background: linear-gradient(to right,#008cff,#70fa00);
		background-clip: text;
		color: transparent;
		-webkit-background-clip: text;
		-webkit-text-fill-color: transparent;
	}

	main {
	background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1600 900'%3E%3Cdefs%3E%3ClinearGradient id='a' x1='0' x2='0' y1='1' y2='0' gradientTransform='rotate(65,0.5,0.5)'%3E%3Cstop offset='0' stop-color='%230FF'/%3E%3Cstop offset='1' stop-color='%23CF6'/%3E%3C/linearGradient%3E%3ClinearGradient id='b' x1='0' x2='0' y1='0' y2='1' gradientTransform='rotate(147,0.5,0.5)'%3E%3Cstop offset='0' stop-color='%23F00'/%3E%3Cstop offset='1' stop-color='%23FC0'/%3E%3C/linearGradient%3E%3C/defs%3E%3Cg fill='%23FFF' fill-opacity='0' stroke-miterlimit='10'%3E%3Cg stroke='url(%23a)' stroke-width='5.9399999999999995'%3E%3Cpath transform='translate(-144.9 31.999999999999996) rotate(19.7 1409 581) scale(1.0755080000000001)' d='M1409 581 1450.35 511 1490 581z'/%3E%3Ccircle stroke-width='1.9800000000000002' transform='translate(-87 84) rotate(24.200000000000003 800 450) scale(1.0399589999999999)' cx='500' cy='100' r='40'/%3E%3Cpath transform='translate(72.39999999999999 -243) rotate(241 401 736) scale(1.0399589999999999)' d='M400.86 735.5h-83.73c0-23.12 18.74-41.87 41.87-41.87S400.86 712.38 400.86 735.5z'/%3E%3C/g%3E%3Cg stroke='url(%23b)' stroke-width='1.8'%3E%3Cpath transform='translate(504 -31.599999999999998) rotate(7.8999999999999995 150 345) scale(0.919836)' d='M149.8 345.2 118.4 389.8 149.8 434.4 181.2 389.8z'/%3E%3Crect stroke-width='3.9600000000000004' transform='translate(-325 -211) rotate(288 1089 759)' x='1039' y='709' width='100' height='100'/%3E%3Cpath transform='translate(-492.8 163.2) rotate(48 1400 132) scale(0.99)' d='M1426.8 132.4 1405.7 168.8 1363.7 168.8 1342.7 132.4 1363.7 96 1405.7 96z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E");
	background-attachment: fixed;

	@apply bg-contain md:bg-cover overflow-x-hidden;
	}

	:global(#layout_root){
		@apply overflow-x-hidden;
	}

	:global(.ordinary-item) {
		height: 30px;
		width: 30px;
		display: inline-block;
		background: black;

	}

	:global(.unique-item){
		display: inline-block;
		height: 30px;
		border-radius: 50%;
		width: 30px;
		background: radial-gradient(circle at 10px 10px, #ff0c0c, #000);	
	}

</style>
