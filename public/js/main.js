const showPassword = document.getElementsByClassName('fa-eye')[0];
const passwordInput = document.getElementById('password');
const logout = document.getElementById('logout');
const deletePost = document.getElementById('delete');
const updateButton = document.getElementById('edit');

if (showPassword && passwordInput) {
  showPassword.addEventListener('click', () => {
    if (passwordInput.type === 'password') {
      passwordInput.type = 'text';
      showPassword.classList.remove('fa-eye');
      showPassword.classList.add('fa-eye-slash');
    } else {
      passwordInput.type = 'password';
      showPassword.classList.remove('fa-eye-slash');
      showPassword.classList.add('fa-eye');
    }   
  });
}
// Set initial visibility based on input value
function updateShowPasswordVisibility() {
  if (!showPassword || !passwordInput) return;
  if (passwordInput.value.trim().length > 0 || document.activeElement === passwordInput) {
    showPassword.classList.remove('opacity-0', 'pointer-events-none');
    showPassword.classList.add('opacity-100');
  } else {
    showPassword.classList.add('opacity-0', 'pointer-events-none');
    showPassword.classList.remove('opacity-100');
  }
}

updateShowPasswordVisibility();

if (passwordInput) {
  passwordInput.addEventListener('input', updateShowPasswordVisibility);
  passwordInput.addEventListener('blur', updateShowPasswordVisibility);
  passwordInput.addEventListener('focus', updateShowPasswordVisibility);
}

const todaysDate = new Date().toISOString().slice(0, 10);

if (deletePost) {
  deletePost.addEventListener('click', () => {
    const endpoint = `/blog/${deletePost.dataset.id}`;

    fetch(endpoint, {
      method: 'DELETE'
    })
    .then((response) => response.json())
    .then((data) => window.location.href = data.redirect || '/')
    .catch(err => console.error(err))
  });
}


updateButton.addEventListener('click', () => {
  const blogId = updateButton.dataset.id;
  const image = document.getElementById('image').value;
  const title = document.getElementById('title').value;
  const content =document.getElementById('content').value;

  fetch(`/blog/${blogId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ image, title, content })
  })
  .then(res => res.json())
  .then(data => {
    if (data.redirect) {
      window.location.href = data.redirect;
    }
  })
  .catch(err => console.error(err));
});
