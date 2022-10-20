const cssPromises = {}

function loadResource(src){

	if(src.endsWith('.js')){
		return import(src);
	}

	if(src.endsWith('.css')){
		if(!cssPromises[src]){
			const link = document.createElement('link');

			link.rel="stylesheet";
			link.href = src;

			cssPromises[src] = new Promise(resolve => {
				link.addEventListener('load', () => resolve());
			});
			document.head.append(link);
		}
		return cssPromises[src];
	}

	return fetch(src).then(res => res.json())
}

const appContainer = document.getElementsByClassName('episodes')[0];
let searchParams = new URLSearchParams(location.search);


let episodeId = searchParams.get('episodeId');




async function renderPage(modulName, apiUrl, css) {
	const [pageModule, data] = await Promise.all([
		modulName,
		apiUrl,
		css,
	].map((src) => loadResource(src)));

	let planetsData = [];
	let speciesData = [];

	if (episodeId) {
		planetsData = await Promise.all(data.planets.map((src) => loadResource(src)));
		speciesData = await Promise.all(data.species.map((src) => loadResource(src)));
	}
	appContainer.innerHTML = '';
	appContainer.append(pageModule.render(data, planetsData, speciesData));
}


function renderIf(episodeId){
	if (episodeId) {
		renderPage('/modules/episode-details.js',
		`https://swapi.dev/api/films/${episodeId}`,
		'https://cdn.jsdelivr.net/npm/bootstrap@5.2.0/dist/css/bootstrap.min.css');

	} else {
		renderPage('/modules/episode-list.js',
		'https://swapi.dev/api/films/',
		'https://cdn.jsdelivr.net/npm/bootstrap@5.2.0/dist/css/bootstrap.min.css');
	}
}

window.addEventListener('popstate', () => {
	searchParams = new URLSearchParams(location.search);
	episodeId = seacrhParams.get('episodeId');
	renderIf(episodeId);
});

renderIf(episodeId);
