export function render(data) {

	const container = document.createElement('div');

  container.classList.add(
    'container',
    'd-flex',
    'justify-content-between',
    'flex-wrap',
    'py-4'
  );

  let counter = 1;

	for (const episode of data.results) {

    const linkCard = document.createElement('a');
    const cardBody = document.createElement('div');
    const title = document.createElement('h5');
    const numberEpisode = document.createElement('p');

    linkCard.classList.add('d-block');
    linkCard.style.width = '18%';
    linkCard.classList.add('card', 'my-2', 'lnk');
    linkCard.style.outline = 'none';
    linkCard.style.textDecoration = 'none';
    linkCard.id = counter;

    linkCard.addEventListener('click', (evt) => {
      evt.preventDefault();
      history.pushState(linkCard.id, '', `?episodeId=${linkCard.id}`);
      window.history.go(0);
    });

    linkCard.onmouseover = function(event){
      linkCard.style.cursor = 'pointer';
    };

    cardBody.classList.add('card-body','d-flex','flex-column','justify-content-between', 'h-100');
    title.classList.add('card-title');
    numberEpisode.style.bottom = '10%';

    linkCard.append(cardBody);
    cardBody.append(title);
    cardBody.append(numberEpisode);

    title.textContent = episode.title;
    numberEpisode.textContent = `Episode:${episode.episode_id}`;

    container.append(linkCard);
    counter++;
	}
  return container;
}
