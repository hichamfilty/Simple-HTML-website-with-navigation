const postContainer = document.getElementById('posts-container');
const loading = document.querySelector('.loader');
const filter = document.getElementById('filter');

let limit = 5;
let page = 1;
// fetch posts from API
async function getPosts() {
  const res = await fetch(
    `https://jsonplaceholder.typicode.com/posts?_limit=${limit}&_page=${page}`
  );
  const data = await res.json();
  return data;
}
// show posts in DOM
async function showPosts() {
  const posts = await getPosts();
  posts.forEach((post) => {
    const postEl = document.createElement('div');
    postEl.classList.add('post');
    postEl.innerHTML = `
         <div class="number">${post.id}</div>
         <div class="post-info">
            <div class="post-title">${post.title}</div>
            <p class="post-body">${post.body}</p>
         </div>

      `;

    postContainer.appendChild(postEl);
  });
}

//show loader & fetch more posts
function showLoading() {
  loading.classList.add('show');

  setTimeout(() => {
    loading.classList.remove('show');

    setTimeout(() => {
      page++;
      showPosts();
    }, 300);
  }, 1000);
}
//filter input posts
function filterPosts(e) {}

//show initial posts
showPosts();

window.addEventListener('scroll', () => {
  const { scrollTop, scrollHeight, clientHeight } = document.documentElement;

  if (scrollTop + clientHeight >= scrollHeight - 5) {
    showLoading();
  }
});
filter.addEventListener('input', filterPosts);
