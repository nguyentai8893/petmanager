"use strict";
const $$ = document.getElementById.bind(document);

const idInput = $$("input-id");
const nameInput = $$("input-name");
const typeInput = $$("input-type");
const breedInput = $$("input--breed");
const vaccinatedInput = $$("input-vaccinated");
const dewormedInput = $$("input-dewormed");
const sterilizedInput = $$("input-sterilized");
const tbodyEl = $$("tbody");
const findBtn = $$("find-btn");
// get data
let petArr = getFromStorage("petArr")
  ? JSON.parse(getFromStorage("petArr"))
  : [];
let breedArr = JSON.parse(getFromStorage("breedArr"));
// bắt sự kiện click
findBtn.addEventListener("click", (e) => {
  const data = {
    id: idInput.value.trim(),
    name: nameInput.value.trim(),
    type: typeInput.value.trim(),
    breed: breedInput.value.trim(""),
    vaccinated: vaccinatedInput.checked,
    dewormed: dewormedInput.checked,
    sterilized: sterilizedInput.checked,
  };

  
  let petArrClone = [];
  if (data) {
    if (data.id) {
      console.log("dât", data);
      petArrClone = petArr.filter((item) => {
        return item.id.includes(data.id);
      });
    }
    console.log("pet", petArrClone);
    if (data.name) {
      petArrClone = petArr.filter((item) => {
        return item.name.includes(data.name);
      });
    }
    if (data.type && data.type != "Select Type") {
      petArrClone = petArr.filter((item) => {
        return item.type.includes(data.type);
      });
    }

    if (data.breed && data.breed != "Select Breed") {
      petArrClone = petArr.filter((item) => {
        return item.breed.includes(data.breed);
      });
    }
    if (data.vaccinated) {
      petArrClone = petArr.filter((item) => {
        return item.vaccinated == data.vaccinated;
      });
    }
    if (data.dewormed) {
      petArrClone = petArr.filter((item) => {
        return item.dewormed == data.dewormed;
      });
    }
    if (data.sterilized) {
      petArrClone = petArr.filter((item) => {
        return item.sterilized == data.sterilized;
      });
    
    }
  }
  console.log("pet", petArrClone);
  renderTableDatat(petArrClone);

  // resetInput();
});
// const resetInput = () => {
//   idInput.value = "";
//   nameInput.value = "";
//   typeInput.value = "";
//   breedInput.value = "";
//   vaccinatedInput.checked = false;
//   dewormedInput.checked = false;
//   sterilizedInput.checked = false;
// };
const seclectBreed = (breedArr) => {
  breedInput.innerHTML = "<option>Select Breed</option>";
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
function renderTableDatat(petArrClonee) {
  console.log("pet", petArrClonee);
  tbodyEl.innerHTML=""
  petArrClonee.map((item) => {
    const row = document.createElement("tr");
    row.innerHTML = `<th>${item.id} </th>
          <td>${item.name} </td>  
          <td>${item.age} </td>
          <td>${item.type} </td>  
          <td>${item.weight} kg</td> 
          <td>${item.lenght} cm</td> 
          <td>${item.breed} </td>
          <td><i class="bi bi-square-fill" style="color: ${
            item.color
          }"></i></td>
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
       `;
   

    tbodyEl.appendChild(row);
  }); 
  
}
