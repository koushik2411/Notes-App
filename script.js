const searchInput = document.getElementById("searchInput");
const addBtn = document.getElementById("addNoteBtn");
const notesContainer = document.getElementById("notesContainer");
const noteModal = document.getElementById("noteModal");
const modalTextarea = document.getElementById("modalTextarea");
const closeBtn = document.getElementById("closeModal");

let note = [];

// Load notes from localStorage
const savedNotes = JSON.parse(localStorage.getItem("notes"));

if (savedNotes) {
  savedNotes.reverse().forEach((note) => {
    createNote(note.text, note.color, note.time);
  });
}

// CREATE NOTE

function createNote(text = "", color = "#f4f4f4", time = "") {
  const note = document.createElement("div");
  note.classList.add("note");
  note.style.background = color;

  const textArea = document.createElement("textarea");
  textArea.value = text;

  const colorPicker = document.createElement("input");
  colorPicker.type = "color";
  colorPicker.textContent = "BG Color";
  colorPicker.value = color;
  colorPicker.classList.add("colorPicker");

  const timeStamp = document.createElement("div");
  timeStamp.classList.add("timeStamp");

  if (time === "") {
    time = new Date().toLocaleString();
  }

  timeStamp.textContent = time;

  const deleteBtn = document.createElement("button");
  deleteBtn.textContent = "Delete";
  deleteBtn.classList.add("deleteBtn");

  note.appendChild(textArea);
  note.appendChild(colorPicker);
  note.appendChild(timeStamp);
  note.appendChild(deleteBtn);

  notesContainer.prepend(note);

  // Save on Edit
  textArea.addEventListener("input", saveNotes);

  // Change Color
  colorPicker.addEventListener("input", function () {
    note.style.background = colorPicker.value;
    saveNotes();
  });

  // Delete Note
  deleteBtn.addEventListener("click", function () {
    note.style.opacity = "0";
    note.style.transform = "translateY(-20px)";

    setTimeout(() => {
      note.remove();
      saveNotes();
    }, 300);
  });

  // noteModal
  textArea.addEventListener("click", function () {
    activeTextarea = textArea;
    modalTextarea.value = textArea.value;
    noteModal.classList.add("active");
  });
}

// Modal Edit Sync
modalTextarea.addEventListener("input", function () {
  if (activeTextarea) {
    activeTextarea.value = modalTextarea.value;
    saveNotes();
  }
});

// Close Modal
closeBtn.addEventListener("click", function(){
    noteModal.classList.remove("active");
})

// ADD NOTE BUTTON
addBtn.addEventListener("click", function () {
  createNote();
  saveNotes();
});

// SAVE NOTES FUNCTION
function saveNotes() {
  const notes = document.querySelectorAll(".note");

  let notesData = [];

  notes.forEach((note) => {
    const text = note.querySelector("textarea").value;
    const color = note.querySelector(".colorPicker").value;
    const time = note.querySelector(".timeStamp").textContent;

    notesData.push({
      text,
      color,
      time,
    });
  });

  localStorage.setItem("notes", JSON.stringify(notesData));
}

// SEARCH NOTES
searchInput.addEventListener("input", function () {
  const query = searchInput.value.toLowerCase();

  const notes = document.querySelectorAll(".note");

  notes.forEach((note) => {
    const text = note.querySelector("textarea").value.toLowerCase();

    if (text.includes(query)) {
      note.style.display = "flex";
    } else {
      note.style.display = "none";
    }
  });
});

noteModal.addEventListener("click",function(e){
    if(e.target===noteModal){
        noteModal.classList.remove("active")
    }
})
