console.log('Hola mundo')


function text(str) {
  document.querySelector('p').textContent = str;
}

function index(){
  // document.querySelector('p')
  //   .textContent = 'Hola home'

  text('Click a user below to load their avatar');
  document.querySelector('img')
    .style.display = 'none';
}

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

function displayIndexAfter(ms) {
  var id;
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

page('/', index)
page('/about', about)
page('/user', user)
page('/user/:username', user)

page('/user/:username/edit', userEdit)

page('*', () => {
  document.querySelector('p')
    .textContent = 'No Found'
})

// A los # no es necesario definirle una ruta


var avatars = {
  glottis: 'http://homepage.ntlworld.com/stureek/images/glottis03.jpg',
  manny: 'http://kprojekt.net/wp-content/uploads/manny.jpg',
  sal: 'http://homepage.ntlworld.com/stureek/images/sal01.jpg'
};


page()