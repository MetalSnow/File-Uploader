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
