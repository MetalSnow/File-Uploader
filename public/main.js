document.querySelectorAll('.list').forEach((element) => {
  const aTag = element.querySelector('a');
  const form = element.querySelector('#updateForm');
  const saveBtn = element.querySelector('#save');
  const cancelBtn = element.querySelector('#cancel');
  const updateBtn = element.querySelector('#update');

  updateBtn.addEventListener('click', () => {
    form.style.display = 'flex';
    aTag.style.display = 'none';
    updateBtn.style.display = 'none';
  });

  cancelBtn.addEventListener('click', () => {
    form.style.display = 'none';
    aTag.style.display = 'inline';
    updateBtn.style.display = 'inline-block';
  });
});

// Display input file uploaded name
const fileInput = document.querySelector('#file-upload');
const spanEl = document.querySelector('span');
const fileIcon = document.querySelector('.file-icon');

fileInput.addEventListener('change', () => {
  const fileName = fileInput.value.split('\\').splice(-1, 1).join('');
  spanEl.textContent = fileName;
  spanEl.style.color = '#0084d1';
  fileIcon.src = '/icons/file-2.png';
});
