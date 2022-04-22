const addBox = document.querySelector(".add-box"),
    popupBox = document.querySelector(".popup-box"),
    closeIcon = document.querySelector("header i"),
    titleTag = document.querySelector("input"),
    descTag = document.querySelector("textarea"),
    addBtn = document.querySelector("button");

const notes = JSON.parse(localStorage.getItem("notes") || "[]");
addBox.addEventListener("click", () => {
    popupBox.classList.add("show");
});


// addBox.addEventListener("click", () => {
//     popupBox.classList.add("show");
// });

closeIcon.addEventListener("click", () => {
    titleTag.value = "";
    descTag.value = "";
    popupBox.classList.remove("show");
});

function showNotes() {
    document.querySelectorAll(".note").forEach(note => note.remove());
    notes.forEach((note, index) => {
        // console.log(note);
        let liTag = `  <li class="note">
        <div class="details">
            <p>${note.title}</p>
            <span>${note.description}</span>
        </div>
        <div class="bottom-content">
            <span>${note.date}</span>
            <div class="settings">
                <i onClick="showMenu(this)" class="uil uil-ellipsis-h"></i>
                <ul class="menu">
                   
                    <li onClick = "deleteNote(${index})"><i  class="uil uil-trash"></i>Delete</li>
                </ul>
                
            </div>
        </div>
    </li>`;
        addBox.insertAdjacentHTML("afterend", liTag);
    });
}
showNotes();

function showMenu(elem) {
    elem.parentElement.classList.add("show");
    document.addEventListener("click", e => {
        if(e.target.tagName != "I" || e.target != elem) {
            elem.parentElement.classList.remove("show");
        }
    });
}

function deleteNote(noteId){
    notes.splice(noteId, 1);
    localStorage.setItem("notes", JSON.stringify(notes));
    showNotes();
}


addBtn.addEventListener("click", e => {
    e.preventDefault();
    let noteTitle = titleTag.value,
        noteDesc = descTag.value;

    if (noteTitle || noteDesc) {
        let dateObj = new Date(),
            month = dateObj.getMonth(),
            day = dateObj.getDate(),
            year = dateObj.getFullYear();

        let noteInfo = {
            title: noteTitle, description: noteDesc,
            date: `${month} ${day}, ${year}`
        }
        notes.push(noteInfo);

        localStorage.setItem("notes", JSON.stringify(notes));
        closeIcon.click();
        showNotes();
    }
});