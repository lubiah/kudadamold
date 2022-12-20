/**
 * Generates a table of content
 * @param {HTMLElement} container
 * @returns {HTMLElement} The element containing the toc;
 */
const toc = (container) => {
	const HEADINGS_ARRAY = container.querySelectorAll("h2,h3,h4,h5,h6");
	const TOC_CONTAINER = document.createElement("nav");
	const UL_ELEMENT = document.createElement("ul");

	TOC_CONTAINER.classList.add("toc");
	TOC_CONTAINER.setAttribute("aria-label", "Table of contents for this article");

	/** @type {HTMLUListElement} */
	let first;
	/**@type {HTMLElement} */
	let second;
	/**@type {HTMLElement} */
	let third;

	HEADINGS_ARRAY.forEach((heading) => {
		const ID = heading.getAttribute("id");
		const LEVEL = parseInt(heading.localName.replace("h", ""));
		const TITLE = heading.innerHTML;

		const LI_ELEMENT = document.createElement("li");

		const LINK_ELEMENT = document.createElement("a");
		LINK_ELEMENT.classList.add("toc-link");
		LINK_ELEMENT.setAttribute("href", `#${ID}`);
		LINK_ELEMENT.setAttribute("data-reset-styles", "true");
		LINK_ELEMENT.innerHTML = TITLE;

		switch (LEVEL) {
			case 2:
				LI_ELEMENT.appendChild(LINK_ELEMENT);
				UL_ELEMENT.appendChild(LI_ELEMENT);
				UL_ELEMENT.classList.add("toc-level", "level-2");
				break;
			case 3:
				first = document.createElement("ul");
				first.classList.add("toc-level", "level-3");
				LI_ELEMENT.appendChild(LINK_ELEMENT);
				first.appendChild(LI_ELEMENT);
				UL_ELEMENT.appendChild(first);
				break;
			case 4:
				second = document.createElement("ul");
				second.classList.add("toc-level", "level-4");
				LI_ELEMENT.appendChild(LINK_ELEMENT);
				second.appendChild(LI_ELEMENT);
				first.appendChild(second);
				break;
			case 5:
				third = document.createElement("ul");
				LI_ELEMENT.appendChild(LINK_ELEMENT);
				LI_ELEMENT.classList.add("toc-level", "level-5");
				third.appendChild(LI_ELEMENT);
				second.appendChild(third);
				break;
			default:
				break;
		}
	});

	TOC_CONTAINER.appendChild(UL_ELEMENT);

	if (TOC_CONTAINER.querySelector(".toc-level") !== null) {
		let heading = document.createElement("p");
		heading.innerText = "Table Of Contents";
		heading.classList.add("toc-heading");
		TOC_CONTAINER.prepend(heading);
	}

	return TOC_CONTAINER;
};

/**
 * Scroll spy for table of contents
 * @param {HTMLElement} container
 */
const spy = (container) => {
	const observer = new IntersectionObserver(
		(entries) => {
			entries.forEach((entry) => {
				const ID = entry.target.id;
				if (entry.isIntersecting) {
					document.querySelectorAll(".toc-link").forEach((i) => i.classList.remove("active"));
					document
						.querySelector(".toc")
						?.querySelector(`a[href='#${ID}']`)
						?.classList.add("active");
				}
			});
		},
		{
			rootMargin: "0px 0px -90% 0px"
		}
	);

	container.querySelectorAll("h2,h3,h4,h5,h6").forEach((heading) => {
		observer.observe(heading);
	});

	return {
		stop: () => {
			observer.disconnect();
		}
	};
};

export { spy, toc };
