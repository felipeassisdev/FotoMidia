function showAlert(type, message) {
    const alert = document.createElement('div');
    alert.className = `custom-alert ${type}`;
    alert.textContent = message;
    document.body.appendChild(alert);

    setTimeout(() => {
        alert.remove();
    }, 3000);
}

document.querySelectorAll('.folder').forEach(folder => {
    folder.addEventListener('click', function (e) {
        if (!this.classList.contains('acesso-liberado')) {
            e.preventDefault();
            showAlert('error', 'Pasta indisponível');
        }
    });
});

document.querySelectorAll('.download-btn').forEach(btn => {
    btn.addEventListener('click', function () {
        const imageUrl = this.dataset.image;
        const link = document.createElement('a');
        link.href = imageUrl;
        link.download = 'imagem-baixada';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);

        showAlert('success', 'Imagem está baixando');
    });
});

const lightbox = document.querySelector('.lightbox');
const lightboxImg = document.querySelector('.lightbox-img');
const closeBtn = document.querySelector('.lightbox .close');
const downloadBtn = document.querySelector('.lightbox .download-btn');

document.querySelectorAll('.folder img').forEach(img => {
    img.addEventListener('click', function () {
        lightboxImg.src = this.src;
        lightbox.classList.remove('hidden');
        downloadBtn.href = this.src;
        downloadBtn.download = this.src.split('/').pop();
    });
});

closeBtn.addEventListener('click', function () {
    lightbox.classList.add('hidden');
});

lightbox.addEventListener('click', function (e) {
    if (e.target === lightbox) {
        lightbox.classList.add('hidden');
    }
});

downloadBtn.addEventListener('click', function () {
    showAlert('success', 'Baixando imagem');
});

document.getElementById('search-input').addEventListener('input', function () {
    const searchValue = this.value.toLowerCase().trim();
    const folders = document.querySelectorAll('.folder-grid .folder');

    let found = false;

    folders.forEach(folder => {
        const folderName = folder.querySelector('p')?.textContent.toLowerCase().trim();
        if (folderName && folderName.includes(searchValue)) {
            folder.style.display = 'flex';
            found = true;
        } else {
            folder.style.display = 'none';
        }
    });

    if (!found && searchValue) {
        showAlert('error', 'Nenhuma pasta encontrada');
    }
});
