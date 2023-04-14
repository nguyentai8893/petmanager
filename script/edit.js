"use strict";
isEdit = true;
const containerForm = document.getElementById("container-form");
const saveBtn = document.getElementById("save-btn");
// bắt sự kiện click
saveBtn.addEventListener("click", (e) => {
  e.preventDefault();
  const data = {
    id: idInput.value.trim(),
    age: parseInt(ageInput.value.trim()),
    name: nameInput.value.trim(),
    type: typeInput.value.trim(),
    weight: weightInput.value.trim(),
    lenght: lengthInput.value.trim(),
    color: colorInput.value.trim(),
    breed: breedInput.value.trim(),
    vaccinated: vaccinatedInput.checked,
    date: new Date().toLocaleDateString(),
    dewormed: dewormedInput.checked,
    sterilized: sterilizedInput.checked,
  };
  const validate = validateData(data);

  if (validate) {
    let newarr = petArr.map((item) => {
        if (item.id === data.id) {
          item = data;
        }
        return item
      })
      // lưu vào storage
    saveToStorage(
      "petArr",
      JSON.stringify(
        newarr
      )
    );
    containerForm.classList.add("hide");
    renderTableData(newarr);
  }
});
// sửa pet
const editPet = (id) => {
  containerForm.classList.remove("hide");
  petArr.forEach((item) => {
    if (item.id === id) {
      idInput.value = item.id;
      ageInput.value = item.age;
      nameInput.value = item.name;
      typeInput.value = item.type;
      weightInput.value = item.weight;
      lengthInput.value = item.lenght;
      colorInput.value = item.color;
      breedInput.value = item.breed;
      item.vaccinated
        ? vaccinatedInput.setAttribute("checked", true)
        : vaccinatedInput.removeAttribute("checked");
      item.dewormed
        ? dewormedInput.setAttribute("checked", true)
        : dewormedInput.removeAttribute("checked");
      item.sterilized
        ? sterilizedInput.setAttribute("checked", true)
        : sterilizedInput.removeAttribute("checked");
    }
  });
};
renderTableData(petArr);
