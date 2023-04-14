"use strict";

const submitBtn = document.getElementById("submit-btn");
const inputBreed = document.getElementById("input-breed");
const inputType = document.getElementById("input-type");
const tbodyEl = document.getElementById("tbody");

// let breedArr = [];
// lấy data từ storage
let breedArr = getFromStorage("breedArr")
  ? JSON.parse(getFromStorage("breedArr"))
  : [];
// bắt sự kiện click submit
submitBtn.addEventListener("click", () => {
  const data = {
    name: inputBreed.value.trim(),
    type: inputType.value.trim(),
  };
  const validateData = (data) => {
    if (data.name == null) {
      alert("please enter Breed!");
      return;
    }
    if (data.type == "Select Type") {
      alert("please select type");
      return;
    }
    return data;
  };
  const validate = validateData(data);
  if (validate) {
    breedArr.push(data);
    saveToStorage("breedArr", JSON.stringify(breedArr));
    clearInput();
    renderBreedTable(breedArr);
  }
});
const clearInput = () => {
  inputBreed.value = "";
};
// xóa pet
const deletePet = (i) => {
  if (confirm("Are you sure?")) {
    breedArr = breedArr.filter((_, index) => i !== index);
    saveToStorage("breedArr", JSON.stringify(breedArr));
    renderBreedTable(breedArr);
  }
};
// render ui
const renderBreedTable = (breedArr) => {
  console.log(breedArr);
  tbodyEl.innerHTML = "";
  breedArr.map((item, i) => {
    const row = document.createElement("tr");
    row.innerHTML = `<th>${i + 1}</th>
        <td>${item.name} </td>  
        <td>${item.type} </td> 
        <td><button class='btn-danger' onclick="deletePet(${i})" >delete</button> </td> 
        `;
    tbodyEl.appendChild(row);
  });
};

renderBreedTable(breedArr);
