"use trict";
const $ = document.getElementById.bind(document);
const exportBtn = $("export-btn");
const importBtn = $("import-btn");
let inputFile = $("input-file");

let petArr = JSON.parse(getFromStorage("petArr"));

exportBtn.addEventListener("click", () => {
  // chuyển đổi định dạng
  let json = JSON.stringify(petArr);
  console.log(json);
  //   khởi tạo 1 blob
  let blob = new Blob([json], { type: "application/json " });
  // lưu file với định dạng .json
  saveAs(blob, "static.json");
});
importBtn.addEventListener("click", () => {
  //   kiểm tra người dùng đã chọn file chưa?
  if (inputFile.files.length === 0) {
    alert("vui lòng chọn file để import");
    return;
  }
  // khởi tạo 1 reader
  const reader = new FileReader();
  //  đọc file
  reader.readAsText(inputFile.files[0], "utf-8");
  //  sử lý khi đọc file xong
  reader.onload = (e) => {
    const data = e.target.result;

    // save vào storage
    if (petArr?.length)
      saveToStorage("petArr", JSON.stringify([...petArr, ...JSON.parse(data)]));
    else saveToStorage("petArr", data);
    alert("tải lên thành công");
    reset();
  };
  const reset = () => {
    inputFile.value = "";
  };

  //  sử lsy khi có lỗi xảy ra
  reader.onerror = (e) => {
    alert("sảy ra lỗi khi import", e.target.error);
  };
});
