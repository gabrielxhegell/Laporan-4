document.addEventListener("DOMContentLoaded", function () {
    const content = document.getElementById("content");
    const nameInput = document.getElementById("name");
    const jumPilihan = document.getElementById("jumPilihan");
    const errors = document.getElementById('errors');
    const formButton = document.getElementById('formButton');
    const pilihanContainer = document.getElementById('container_pilihan');
    const groupPilihan = document.getElementById('group_pilihan');
    const container_radio = document.getElementById('container_radio');
    const group_radio = document.getElementById('group_radio');
    const hasil = document.getElementById('hasil');
    formButton.disabled = true;
    nameInput.addEventListener('input', function () {
        const name_errors = document.getElementById('name_errors');
        const jumlah = jumPilihan.value;
        if (nameInput.value === '') {
            name_errors.innerHTML = 'Nama tidak boleh kosong';
            formButton.disabled = true;
        } else if (jumlah > 5) {
            errors.innerHTML = 'Jumlah pilihan tidak boleh lebih dari 5';
            formButton.disabled = true;
        } else if (jumlah <= 0) {
            errors.innerHTML = 'Jumlah pilihan tidak boleh lebih kecil dari 1';
            formButton.disabled = true;
        } else {
            name_errors.innerHTML = '';
            errors.innerHTML = '';
            formButton.disabled = false;
        }
    });

    jumPilihan.addEventListener('input', function () {
        const name_errors = document.getElementById('name_errors');
        const jumlah = jumPilihan.value;
        if (nameInput.value === '') {
            name_errors.innerHTML = 'Nama tidak boleh kosong';
            formButton.disabled = true;
        } else if (jumlah > 5) {
            errors.innerHTML = 'Jumlah pilihan tidak boleh lebih dari 5';
            formButton.disabled = true;
        } else if (jumlah <= 0) {
            errors.innerHTML = 'Jumlah pilihan tidak boleh lebih kecil dari 1';
            formButton.disabled = true;
        } else {
            name_errors.innerHTML = '';
            errors.innerHTML = '';
            formButton.disabled = false;
        }
    });


    formButton.addEventListener('click', function () {
        const jumlah = jumPilihan.value;
        pilihanContainer.classList.remove('visually-hidden');
        content.classList.add('visually-hidden');
        groupPilihan.innerHTML = '';
        for (let i = 0; i < jumlah; i++) {
            const pilihan = document.createElement('div');
            pilihan.classList.add('mb-1');
            pilihan.innerHTML = `
            <div class="mb-1 row">
            <label for="pilihanInput" class="col-sm-4 col-form-label">Pilihan ${i + 1}</label>
            <div class="col-sm-8">
                <input type="text" class="form-control" id="pilihanInput" name="pilihanInput">
                <div class="invalid-feedback">Pilihan tidak boleh kosong.</div>
            </div>
        </div>`;
            groupPilihan.appendChild(pilihan);
        }


        const submitButton = document.createElement('button');
        submitButton.classList.add('btn', 'btn-primary', 'w-100', 'my-3');
        submitButton.innerHTML = 'Oke';
        submitButton.disabled = true;
        const invalid = document.querySelectorAll('.invalid-feedback');
        const pilihanInputs = document.querySelectorAll('input[name="pilihanInput"]');
        pilihanInputs.forEach(function (input, index) {
            input.addEventListener('input', function () {
                if (input.value === '') {
                    invalid[index].style.display = 'block';
                } else {
                    invalid[index].style.display = 'none';
                }
                let allInputsValid = true;
                pilihanInputs.forEach(function (input) {
                    if (input.value.trim() === '') {
                        allInputsValid = false;
                    }
                });
                submitButton.disabled = !allInputsValid;
            });
        });
        submitButton.addEventListener('click', function () {
            const pilihanInputs = document.querySelectorAll('input[name="pilihanInput"]');
            const pilihanValues = [];
            pilihanInputs.forEach(function (input) {
                pilihanValues.push(input.value);
            });
            container_radio.classList.remove('visually-hidden');
            pilihanContainer.classList.add('visually-hidden');

            pilihanValues.forEach(function (pilihan, index) {
                const radio = document.createElement('div');
                radio.classList.add('form-check');
                radio.innerHTML = `
                    <input class="form-check-input" type="radio" name="radioInput" id="radioPilihan" value="${pilihan}" >
                    <label class="form-check-label" for="radioPilihan${index}">
                        ${pilihan}
                    </label>`;
                group_radio.appendChild(radio);

                radio.querySelector('input[type="radio"]').addEventListener('change', function () {
                    const selectedValue = this.value;
                    console.log("VALUE:", selectedValue);
                    const formResult = document.createElement('div');
                    formResult.innerHTML = `
                        <div>
                            Hallo, Nama saya ${nameInput.value}, saya mempunyai pilihan sejumlah ${jumlah}, yaitu ${pilihanValues.join(', ')}, dan saya memilih ${selectedValue}
                        </div>`;
                    hasil.innerHTML = '';
                    hasil.appendChild(formResult);
                    const okeModals = document.getElementById('okeModals');
                    if (selectedValue === '' || selectedValue === undefined || selectedValue === null) {
                        okeModals.disabled = true;
                    } else {
                        okeModals.disabled = false;
                    }
                });
            });

            const pilihanRadio = document.querySelector('input[name="radioInput"]:checked');
            var ele = document.getElementsByName('radioInput');
            let x;
            for (i = 0; i < ele.length; i++) {
                if (ele[i].checked)
                    x = ele[i].value;
            }
            console.log("VALUE,", x);
            let selectedValue = '';

            if (pilihanRadio) {
                selectedValue = pilihanRadio.value;
            }



            const formResult = document.createElement('div');
            formResult.innerHTML = `
                <div>
                    Hallo, Nama saya ${nameInput.value}, saya mempunyai pilihan sejumlah ${jumlah}, yaitu ${pilihanValues.join(', ')}, dan saya memilih ${x}
                </div>`;
            hasil.appendChild(formResult);

        });
        groupPilihan.appendChild(submitButton);
    });
    const backButton = document.createElement('button');
    backButton.classList.add('btn', 'btn-secondary', 'w-100', 'mt-2');
    backButton.innerHTML = 'Kembali';
    backButton.addEventListener('click', function () {
        content.classList.remove('visually-hidden');
        container_radio.classList.add('visually-hidden');
        group_radio.innerHTML = '';
        hasil.innerHTML = '';
    });
    container_radio.appendChild(modalButton);
    container_radio.appendChild(backButton);
});


const modalButton = document.createElement('div');
modalButton.innerHTML = `
<button type="button" id="okeModals" class="btn btn-primary w-100 mt-3" data-bs-toggle="modal" data-bs-target="#exampleModal">
  Lihat Hasil
</button>
`;
