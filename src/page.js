// console.log('Hola mundo')
const page = require('page');

const avatars = {
  vegueto: 'https://vignette.wikia.nocookie.net/dragonball/images/0/0b/Vegetto_Artwork.png/revision/latest?cb=20171201162014&path-prefix=es',
  goku: 'https://vignette.wikia.nocookie.net/dragonballfanon/images/4/44/Goku_fnf_dbds.png/revision/latest?cb=20160815184538&path-prefix=es',
  vegueta: 'https://pre00.deviantart.net/1e61/th/pre/i/2017/130/e/7/vegeta_dbz_by_gokusupremo15-db8tn3v.png'
};

function about(){
  document.querySelector('p')
    .textContent = 'viewing about'
}

const user = (ctx) => {
  document.querySelector('p')
    .textContent = `viewing user ${ctx.params.username || ''}`
}

const userEdit = (ctx) => {
  document.querySelector('p')
    .textContent = `user edit ${ctx.params.username}`
}

page.base('/profile');

page('/', index)
// page('/about', about)
// page('/user', user)
// page('/user/:username', user)

// page('/user/:username/edit', userEdit)


page('/user/*', displayIndexAfter(5000));
page('/user/:name', load, show);

page('*', () => {
  document.querySelector('p')
    .textContent = 'No Found'
})
// A los # no es necesario definirle una ruta

page()

document.querySelector('#cycle').onclick = function(e){
  let i = 0;
  let names = Object.keys(avatars);
  setInterval(function(){
    let name = names[i++ % names.length];
    page('/user/' + name);
  }, 1500);
};

function text(str) {
  document.querySelector('p').textContent = str;
}


function displayIndexAfter(ms) {
  let id;
  return function(ctx, next){
    id && clearTimeout(id);

    if ('/' != ctx.path) {
      id = setTimeout(function(){
        page('/');
      }, ms);
    }
    next();
  }
}

function index(){
  // document.querySelector('p')
  //   .textContent = 'Hola home'

  text('Click a user below to load their avatar');
  document.querySelector('img')
    .style.display = 'none';
}

function load(ctx, next) {
  ctx.avatar = avatars[ctx.params.name];
  // console.info('segundo')
  next();
}

function show(ctx) {
  let img = document.querySelector('img');
  img.src = ctx.avatar;
  img.style.display = 'block';
  text(`Showing ${ctx.params.name}`);
}
