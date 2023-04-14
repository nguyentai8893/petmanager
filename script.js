"use strict";

const $$ = document.getElementById.bind(document);
// get El DOM
const submitBtn = $$("submit-btn");
const idInput = $$("input-id");
const nameInput = $$("input-name");
const ageInput = $$("input-age");
const typeInput = $$("input-type");
const weightInput = $$("input-weight");
const lengthInput = $$("input-length");
const colorInput = $$("input-color-1");
const breedInput = $$("input-breed");
const vaccinatedInput = $$("input-vaccinated");
const dewormedInput = $$("input-dewormed");
const sterilizedInput = $$("input-sterilized");
const tbodyEl = $$("tbody");
const btnHealthy = $$("healthy-btn");
const btnCalc = $$("calc-btn");
const sidebarEl = $$("sidebar");
// fake data
// let petArr=[]
let isEdit = false;
let breedArr = getFromStorage("breedArr")
  ? JSON.parse(getFromStorage("breedArr"))
  : [];

let petArr = getFromStorage("petArr")
  ? JSON.parse(getFromStorage("petArr"))
  : [];

//   {
//     age: 12,
//     breed: "Tabby",
//     color: null,
//     date: "1/4/2023",
//     dewormed: true,
//     id: "ss01y",
//     lenght: "11",
//     name: "MICK",
//     sterilized: true,
//     type: "Dog",
//     vaccinated: true,
//     weight: "1",
//   },
//   {
//     age: 12,
//     breed: "sssssss",
//     color: null,
//     date: "1/4/2023",
//     dewormed: true,
//     id: "ss01",
//     lenght: "11",
//     name: "MICK",
//     sterilized: true,
//     type: "Dog",
//     vaccinated: false,
//     weight: "1",
//   },
// ];
// validate form
const validateData = (data) => {
  if (data.id === "") {
    alert("Please enter the ID.!");
    return;
  }
  for (let i = 0; i < petArr.length; i++) {
    if (data.id === petArr[i].id && !isEdit) {
      alert("ID must be unique!");
      return;
    }
  }
  if (data.name == "") {
    alert("Please enter the name.!");
    return;
  }
  if (data.age < 1 || data.age > 15 || data.age == "") {
    alert("Age must be between 1 and 15!");
    return;
  }
  if (data.type === "Select Type") {
    alert("Please choose type");
    return;
  }
  if (data.weight < 1 || data.weight > 15 || data.weight == "") {
    alert("Weight must be between 1 and 15!");
    return;
  }
  if (data.lenght < 1 || data.lenght > 100 || data.lenght == "") {
    alert("Length must be between 1 and 100!");
  }
  if (data.color == null) {
    alert("Please choose color");
    return;
  }
  // if (data.breed == "Select Breed") {
  //   alert("Please select Breed!");
  //   return;
  // }
  return data;
};
// lắng nghe sự kiện click btn submit
submitBtn?.addEventListener("click", function () {
  const time = new Date();
  //   get data from form
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
    date: time.toLocaleDateString(),
    dewormed: dewormedInput.checked,
    sterilized: sterilizedInput.checked,
  };
  const validate = validateData(data);

  if (validate) {
    petArr.push(data);
    saveToStorage("petArr", JSON.stringify(petArr));
    clearInput();
    renderTableData(petArr);
  }
});
// reset form
const clearInput = () => {
  idInput.value = "";
  nameInput.value = "";
  ageInput.value = "";
  typeInput.value = "Select Type";
  weightInput.value = "";
  lengthInput.value = "";
  colorInput.value = "#000";
  breedInput.value = "Select Breed";
  vaccinatedInput.checked = false;
  dewormedInput.checked = false;
  sterilizedInput.checked = false;
};

// xóa pet
const deletePet = (idDel) => {
  if (confirm("Are you sure?")) {
    petArr = petArr.filter((item) => item.id !== idDel);
    console.log("newarr", petArr);
    renderTableData(petArr);
  }
};
// kiểm tra pet có phải healthy?
let healthyCheck = false;
btnHealthy?.addEventListener("click", function () {
  const healthyArr = !healthyCheck
    ? petArr.filter(
        (item) =>
          item.vaccinated == true &&
          item.sterilized == true &&
          item.dewormed == true
      )
    : petArr;
  renderTableData(healthyArr);
  btnHealthy.innerText = !healthyCheck ? "show all pet" : "Show Healthy Pet";
  healthyCheck = !healthyCheck;
});
let calcCheck = false;
// btnCalc.addEventListener("click", function () {
//     calcCheck =true
//   renderTableData(petArr);
// });
// tính toán  chỉ số BMI
const calcPetBMI = (type, weight, length) => {
  const stat = type === "Dog" ? 703 : 886;
  return ((weight * stat) / length ** 2).toFixed(2);
};
sidebarEl.addEventListener("click", () => {
  sidebarEl.classList.toggle("active");
});
// chọn breed
const seclectBreed = (breedArr) => {
  breedInput.innerText = "<option>Select Breed</option>";
  breedArr.map((item) => {
    const ops = document.createElement("option");
    ops.innerText = item.name;
    breedInput.appendChild(ops);
  });
};
seclectBreed(breedArr);
typeInput.addEventListener("change", (e) => {
  let value = e.target.value;
  seclectBreed(breedArr.filter((item) => item.type === value));
});
//  init UI
renderTableData(petArr);
// render UI
function renderTableData(petArr, elm = tbodyEl) {
  elm.innerHTML = "";
  petArr?.map((item) => {
    const row = document.createElement("tr");
    row.innerHTML = `<th>${item.id} </th>
        <td>${item.name} </td>  
        <td>${item.age} </td>
        <td>${item.type} </td>  
        <td>${item.weight} kg</td> 
        <td>${item.lenght} cm</td> 
        <td>${item.breed} </td>
        <td><i class="bi bi-square-fill" style="color: ${item.color}"></i></td>
      <td>${
        item.vaccinated === true
          ? "<i class='bi bi-check-circle-fill'></i>"
          : "<i class='bi bi-x-circle-fill'> </i>"
      }</td>
    <td>${
      item.dewormed === true
        ? "<i class='bi bi-check-circle-fill'></i>"
        : "<i class='bi bi-x-circle-fill'> </i>"
    }</td>
      <td>${
        item.sterilized === true
          ? "<i class='bi bi-check-circle-fill'></i>"
          : "<i class='bi bi-x-circle-fill'> </i>"
      }</td>
      <td>${item.date}</td> 
     <td><button type="button" class ="${
       isEdit ? "btn btn-warning" : "btn btn-danger"
     }"
      ${
        isEdit
          ? `onclick="editPet('${item.id}')"`
          : `onclick="deletePet('${item.id}')"`
      }>${isEdit ? "Edit" : "Delete"}</button></td>
     `;

    elm.appendChild(row);
  });
}
