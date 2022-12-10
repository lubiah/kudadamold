<script>
	import { page } from '$app/stores';
	import { debounceWindow, trapFocus } from '$utils';
	import MenuButton from '$lib/icons/menu.svg?component';
	import Logo from '$lib/icons/logo.svg?component';
	import CloseButton from '$lib/icons/x-mark.svg?component';

	$: pathname = $page.url.pathname;

	const PATHS = [
		{ path: '/about', name: 'About', label: 'Read more aboout me here' },
		{ path: '/projects', name: 'Projects', label: 'Vist my projects page' },
		{ path: '/blog', name: 'Blog', label: 'Read my blog posts' },
		{ path: '/contact', name: 'Contact', label: 'Visit my contact page' }
	];

	const setY = () => (headroomProps.y = window.scrollY);

	const deriveClass = (y = 0, scrolled = 0) => {
		if (y < headroomProps.offset) return 'pin';
		if (!scrolled || Math.abs(scrolled) < headroomProps.tolerance) return headroomProps.headerClass;
		const direction = scrolled < 0 ? 'down' : 'up';
		if (direction === 'up') return 'pin';
		if (direction === 'down') return 'unpin';
		return headroomProps.headerClass;
	};

	const updateClass = (y = 0) => {
		const scrolledPixels = headroomProps.lastY - headroomProps.y;
		const result = deriveClass(y, scrolledPixels);
		headroomProps.lastY = headroomProps.y;
		return result;
	};

	const headroomProps = {
		offset: 50,
		tolerance: 10,
		headerClass: 'pin',
		lastHeaderClass: 'pin',
		y: 0,
		lastY: 0
	};

	/**@type {HTMLElement}*/
	let HEADER_ELEMENT;
	let NAVBAR_OPENED = false;

	$: {
		headroomProps.headerClass = updateClass(headroomProps.y);
		headroomProps.lastHeaderClass = headroomProps.headerClass;
	}

	/** Closes the mobile navbar*/
	const closeNavbar = () => {
		NAVBAR_OPENED = false;
	};

	/** Opens the mobile navbar*/
	const openNavbar = () => {
		NAVBAR_OPENED = true;
	};

	/**
	 * @param {HTMLElement} node
	 * @param {Boolean} change
	 */
	const trap = (node, change) => {
		const focus = trapFocus(node);
		change ? focus.start() : focus.destroy();

		return {
			update: (/**@type {Boolean}*/ change) => {
				change ? focus.start() : focus.destroy();
			}
		};
	};
</script>

<header
	bind:this={HEADER_ELEMENT}
	class="{headroomProps.headerClass} fixed top-0 left-0 shadow-neutral-200 bg-white w-full will-change-transform motion-safe:transition-transform duration-300 ease-linear z-10 px-0.5"
>
	<nav class="py-1 flex items-center" id="desktop-nav">
		<a data-reset-styles href="/" aria-label="Visit the homepage" class="icon"><Logo /></a>
		<button
			class="icon ml-auto md:hidden"
			aria-label="Open the naviation panel"
			on:click|stopPropagation={openNavbar}><MenuButton aria-hidden={true} /></button
		>
		<ul class="hidden list-none p-0 m-0 gap-x-3 md:flex ml-auto">
			{#each PATHS as { path, name, label }}
				<li>
					<a
						aria-current={pathname === path ? 'page' : false}
						data-reset-styles
						href={path}
						class="p-2 hover:text-inherit font-semibold aria-[current='page']:text-[color:var(--primary-500)] text-neutral-500"
						aria-label={label}>{name}</a
					>
				</li>
			{/each}
		</ul>
	</nav>
	<style>
		.pin {
			transform: translateY(0%);
		}

		.unpin {
			transform: translateY(-100%);
		}
	</style>
</header>
<nav
	use:trap={NAVBAR_OPENED}
	id="mobileNavbar"
	style:transform={NAVBAR_OPENED ? 'translateX(0%)' : 'translateX(-100%)'}
	class="fixed bg-white inset-0 z-30 p-2 will-change-transform motion-safe:transition-transform duration-150 ease-linear md:hidden"
>
	<button
		tabindex={NAVBAR_OPENED ? 0 : -1}
		class="icon block ml-auto"
		aria-label="Close the navigation panel"
		on:click|stopPropagation={closeNavbar}><CloseButton aria-hidden={true} /></button
	>
	<ul class="list-none p-0 w-full bg-inherit">
		{#each PATHS as { name, label, path }}
			<li>
				<a
					on:click={closeNavbar}
					tabindex={NAVBAR_OPENED ? 0 : -1}
					aria-current={pathname === path ? 'page' : false}
					class="w-full block text-center py-3 my-8 aria-[current='page']:bg-[color:var(--primary-50)] aria-[current='page']:text-[color:var(--primary-600)] font-semibold text-neutral-500"
					href={path}
					data-reset-styles
					aria-label={label}>{name}</a
				>
			</li>
		{/each}
	</ul>
</nav>
<svelte:window
	on:scroll={debounceWindow(setY)}
	on:scroll={debounceWindow(() => {
		window.scrollY >= 35
			? HEADER_ELEMENT.classList.add('shadow-sm')
			: HEADER_ELEMENT.classList.remove('shadow-sm');
	})}
/>
