function alterarNome() {
    const nomeAlunoInput = document.querySelector("#nomeDoAlunoInput");
    const nomeAlunoText = document.querySelector("#nomeDoAlunoText");

    nomeAlunoText.innerText = nomeAlunoInput.value;
}

const myModal = new bootstrap.Modal('#staticBackdrop', {
    keyboard: false
});

function closeModal() {
    myModal.hide();
};

const inputEle = document.querySelector("#nomeDoAlunoInput");
inputEle.addEventListener('keyup', function(e){
    var key = e.key;
    if (key == "Enter") { // codigo da tecla enter
        alterarNome();
        closeModal();
    }
});

myModal.show();