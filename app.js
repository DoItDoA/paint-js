const canvas = document.getElementById("jsCanvas");
const ctx = canvas.getContext("2d"); // 그리기의 대상을 선택 , 하드웨어 가속 2d
const colors = document.getElementsByClassName("jsColor");
const range = document.getElementById("jsRange");
const mode = document.getElementById("jsMode");
const saveBtn = document.getElementById("jsSave");

const CANVAS_SIZE = 700;

let painting = false; // 그림그리기 유무 설정
let filling = false; // 채우기 유무 설정

canvas.width = CANVAS_SIZE; // css상의 700은 겉만 표시, js상에서 다루는 px의 크기도 있어야한다
canvas.height = CANVAS_SIZE;

ctx.strokeStyle = "black"; // 선 스타일 , 디폴트 블랙
ctx.fillStyle = "white"; // 채우기 스타일 , 디폴트 블랙 , 흰색 설정
ctx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);
ctx.lineWidth = 2.5; // 그리는 픽셀 2.5px 즉 붓의 두께

function stopPainting() {
  painting = false;
}

function startPainting() {
  painting = true;
}

function onMouseMove(event) {
  const x = event.offsetX; // 지정한 영역(canvas)기준으로 x좌표
  const y = event.offsetY; // 지정한 영역(canvas)기준으로 y좌표
  if (!painting) {
    ctx.beginPath(); // 새로운 경로(선) 만들기 시작, 이전 경로는 초기화
    ctx.moveTo(x, y); // 선이 시작하는 좌표
  } else {
    ctx.lineTo(x, y); // 선이 끝나는 좌표
    ctx.stroke(); // 선 그리기 시작
  }
}

function handleColorClick(event) {
  const color = event.target.style.backgroundColor; // 클릭된 배경색 가져오기
  ctx.strokeStyle = color;
  ctx.fillStyle = color;
}

function handleRangeChange(event) {
  const size = event.target.value;
  ctx.lineWidth = size;
}

function handleModeClick(event) {
  if (filling === true) {
    filling = false;
    mode.innerText = "채우기";
  } else {
    filling = true;
    mode.innerText = "그리기";
  }
}

function handleCanvasClick() {
  if (filling) {
    ctx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE); // 사각형으로 좌표만큼 채우기
  }
}

function handleCM(event) {
  event.preventDefault(); // 우클릭 메뉴가 안나옴
}

function handleSaveClick() {
  const image = canvas.toDataURL(); //캔버스 안의 이미지를 url로 만들기, default는 png
  const link = document.createElement("a");
  link.href = image;
  link.download = "paintJS"; // a태그에 다운로드 설정 , 네이밍은 다운로드명
  link.click();
}

if (canvas) {
  canvas.addEventListener("mousemove", onMouseMove);
  canvas.addEventListener("mousedown", startPainting); // 마우스 누르고 있을 때
  canvas.addEventListener("mouseup", stopPainting); // 마우스 뗐을 때
  canvas.addEventListener("mouseleave", stopPainting);
  canvas.addEventListener("click", handleCanvasClick); // 마우스 뗐을 때
  canvas.addEventListener("contextmenu", handleCM); // 마우스 우클릭시 메뉴가 나올시
}

// 선색 설정
Array.from(colors).forEach((color) =>
  color.addEventListener("click", handleColorClick)
); // getElementsByClassName로 불러오면 obj형식으로 나오는데 배열로 바꾼 다음, 각각 반복문으로 이번트 활성
// 선굵기 설정
if (range) {
  range.addEventListener("input", handleRangeChange);
}
// 채우기
if (mode) {
  mode.addEventListener("click", handleModeClick);
}
// 저장버튼
if (saveBtn) {
  saveBtn.addEventListener("click", handleSaveClick);
}
