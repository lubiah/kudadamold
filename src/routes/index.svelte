<script context="module">
	export const prerender = true;
</script>

<script type="text/javascript">
	import SEO from 'svelte-seo';
	import ProjectCard from '$lib/Components/ProjectCard';
</script>

<svelte:head>
	<meta name="google-site-verification" content="RHfIklWVoksL16DFRd-8qvkEbHTJVyre13PUFcBEzqs" />
</svelte:head>
<SEO
	title="Lucretius Biah • Kudadam"
	description="Hey, am Lucretius, a software developer and website designer. Welcome to my part of the internet. Feel free to read my blog post, download my softwares or just look around"
	keywords="lucretius, biah, lucretius biah, lucretius website"
	canonical="https://www.kudadam.com"
	openGraph={{
		title: "Lucretius Biah • Kudadam",
		description:
			'Hey, am Lucretius, a software developer and website designer. Welcome to my part of the internet. Feel free to read my blog post, download my softwares or just look around',
		url: 'https://www.kudadam.com',
		type: 'website',
		images: [
			{
				url: 'https:kudadam.sirv.com/logo/logo.png',
				width: 850,
				height: 650,
				alt: 'Kudadam Logo'
			}
		]
	}}
	twitter={{
		site: '@kudadam_',
		title: "Lucretius Biah • Kudadam",
		description:
			'Hey, am Lucretius, a software developer and website designer. Welcome to my part of the internet. Feel free to read my blog post, download my softwares or just look around',
		image: 'https://kudadam.sirv.com/logo/logo.png',
		imageAlt: 'Logo of Kudadam'
	}}
/>

<div class="xl:w-[65%] mx-auto">
<section>
	<div>
		<div class="flex justify-center flex-wrap md:flex-nowrap mx-auto" id="banner">
			<div>
				<h1 class="font-bold !m-1">Hey, I'm Lucretius</h1>
				<p>
				Am a software developer and website designer located somewhere in Wakanda.
				Also, am an open-source enthusiast, frequent gamer and an avid reader.
				Welcome to my part of the internet where I <a href="/blog">share my knowledge</a>, <a href="/toolz">create useful tools</a> and <a href="/projects">showcase my projects</a>
				</p>
				<p>Want me to help you with a project? <a href="/contact">Contact me</a></p>
			</div>
			<img
			class="w-80"
			width="320"
			height="320.5"
			loading="lazy"
			src="https://kudadam.sirv.com/svg/boy.svg?q=1"
			alt="Cartoonish boy winking his eye"
		/>
		</div>
	</div>
</section>
<section>
	<h2 class="text-center">Area of interest</h2>
	<div class="flex flex-wrap md:flex-row-reverse mb-2">
		<div class="w-full md:w-1/2">
			<img
				loading="lazy"
				src="https://kudadam.sirv.com/svg/showing_resume.svg?q=1"
				alt="Showing a resume"
				width="491"
				height="365"
				style="max-height: 200px;width: 100%"
			/>
		</div>
		<div class="w-full my-2 md:w-1/2 flex items-center justify-center">
			<p>
				My primary area of interest is in back-end development and software development.
				Nevertheless, am equally good in frontend development too with 3+ years experience
			</p>
		</div>
	</div>
</section>
<section class="my-4">
	<h2 class="text-center">
		Languages I <span style="color: green">&lt;</span><span class="text-red-500">speak</span><span
			style="color: green">/&gt;</span
		>
	</h2>

	<div class="grid grid-cols-1 md:grid-cols-2 gap-x-4 md:px-10">
		<div>
			<p class="font-bold my-3">Backend languages</p>
				<ul class="rounded border divide-y divide-gray-300 p-0 hide_list_style">
					<li class="flex p-2">Ruby</li>
					<li class="flex p-2">C++</li>
					<li class="flex p-2">Python</li>
					<li class="flex p-2">MySQL</li>
					<li class="flex p-2">JavaScript</li>
					<li class="flex p-2">PHP</li>
					<li class="flex p-2">Node JS</li>
				</ul>
		</div>
		<div class="w-full">
			<p class="font-bold my-3">Front-end languages</p>
				<ul class="rounded border divide-y divide-gray-300 p-0 hide_list_style">
					<li class="flex p-2">HTML</li>
					<li class="flex p-2">CSS</li>
					<li class="flex p-2">SASS</li>
					<li class="flex p-2">Svelte</li>
				</ul>
		</div>			
	</div>
</section>
<section>
	<h2 class="text-center">Projects</h2>
	<p class="text-center">Some things I have done so far</p>
	<div class="flex flex-wrap justify-center">
		<ProjectCard
			image="https://kudadam.sirv.com/FLAMES/image.png"
			title="FLAMES Game"
			description="A simple game which can tell the relationship between two people with the use of their names"
			url="/flames"
		/>
		<ProjectCard
			image="https://kudadam.sirv.com/extractfrom/version_5.png?thumbnail=200"
			title="Extract From"
			description="A software which helps you to extract a specific file type from one place to another"
			url="https://www.kudadam.com/extractfrom"
		/>
	</div>
</section>
</div>
