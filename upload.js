const dropzone = document.querySelector('.dropzone');
const input = document.getElementById('input');

dropzone.addEventListener('dragover', (e) => {
  e.preventDefault();
  dropzone.classList.add('active');
});

dropzone.addEventListener('dragleave', (e) => {
  e.preventDefault();
  dropzone.classList.remove('active');
});

dropzone.addEventListener('drop', (e) => {
  e.preventDefault();
  dropzone.classList.remove('active');

  const files = e.dataTransfer.files;
  if (files.length > 0) {
    input.files = files;
  }

  // Log the names of the dropped files to the console.
  console.log(files);
});

// Allow the dropzone to be clicked to upload a file.
dropzone.addEventListener('click', (e) => {
  input.click();
  const file = input.files[0];
  console.log(file);
});
