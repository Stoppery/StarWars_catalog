export function render(data, planetsData, speciesData){
	const headerLink = document.getElementsByClassName('navbar-brand')[0];
	const headerLinkImg = document.getElementsByClassName('header_link')[0];

	const container = document.createElement('div');
	const title = document.createElement('h1');
	const description = document.createElement('p');

	container.classList.add('container', 'bg-light', 'rounded');
	description.classList.add('w-75');

	headerLink.href = '?';
	headerLinkImg.src = '/img/BackToEpisodes.svg';

	title.textContent = `${data.title} ${data.episode_id}`;
	description.textContent = data.opening_crawl;

	container.append(title);
	container.append(description);

	container.append(fillList('Planets', planetsData));
	container.append(fillList('Species', speciesData));

	return container;
}

function fillList(header, data){
	const block = document.createElement('div');
	const listHeader = document.createElement('h2');
	const list = document.createElement('ul');

	listHeader.textContent = header;

	for (const elem of data) {
		const element = document.createElement('li');
		element.textContent = elem.name;
		list.append(element);
	}

	block.append(listHeader);
	block.append(list);

	return block;
}
