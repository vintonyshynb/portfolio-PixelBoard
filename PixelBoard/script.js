const board = document.getElementById("board")

function fetchNotes() {
    fetch("./api/get_notes.php")
        .then(res => res.json())
        .then(data => {
            board.innerHTML = ""

            data.forEach(note => {
                let div = document.createElement("div")
                div.className = "note"
                div.style.left = note.pos_x + "px"
                div.style.top = note.pos_y + "px"
                div.style.background = note.color
                div.style.color = note.textColor
                div.dataset.id = note.id

                div.innerHTML = `<span class="delete">X</span>${note.content}`

                board.appendChild(div)

                drag(div)

                div.querySelector(".delete").onclick = () => {
                    deleteNote(note.id, div)
                }
                div.addEventListener("contextmenu", (e) => {
                    e.preventDefault()
                    editNote(note, div)
                })
            })
        })
}

function drag(el) {
    let offsetX, offsetY, isDown = false

    el.addEventListener("mousedown", (e) => {
        isDown = true
        offsetX = e.offsetX
        offsetY = e.offsetY
    })

    document.addEventListener("mousemove", (e) => {
        if (!isDown) return
        el.style.left = (e.pageX - offsetX) + "px"
        el.style.top = (e.pageY - offsetY) + "px"
    })

    document.addEventListener("mouseup", (e) => {
        if (!isDown) return
        isDown = false

        let x = parseInt(el.style.left)
        let y = parseInt(el.style.top)
        let id = el.dataset.id

        updatePos(id, x, y)
    })
}

function updatePos(id, x, y) {
    let data = new FormData()
    data.append("id", id)
    data.append("x", x)
    data.append("y", y)

    fetch("./api/update_pos.php", {
        method: "POST",
        body: data
    })
}

board.addEventListener("dblclick", (e) => {
    if (e.target !== board) return

    let text = prompt("Treść notatki")
    if (!text) return

    let color = prompt("Kolor HEX np. #fffaaa", "#fffaaa")

    let textColor = prompt("Kolor HEX dla tekstu")

    let data = new FormData()
    data.append("content", text)
    data.append("color", color)
    data.append("textColor", textColor)

    fetch("./api/save_note.php", {
        method: "POST",
        body: data
    }).then(() => fetchNotes())
})

function deleteNote(id, el) {
    let data = new FormData()
    data.append("id", id)

    fetch("./api/delete_note.php", {
        method: "POST",
        body: data
    }).then(() => {
        el.remove()
    })
}

function editNote(note, el) {
    let newText = prompt("Edytuj treść", note.content)
    if (newText === null) return

    let newColor = prompt("Edytuj kolor HEX", note.color)
    if (newColor === null) return

    let newTextColor = prompt("Edytuj kolor tekstu HEX", note.textColor)
    if (newTextColor === null) return

    let data = new FormData()
    data.append("id", note.id)
    data.append("content", newText)
    data.append("color", newColor)
    data.append("textColor", newTextColor)

    fetch("./api/update_note.php", {
        method: "POST",
        body: data
    }).then(() => {

        el.innerHTML = `<span class="delete">X</span>${newText}`
        el.style.background = newColor
        el.style.color = newTextColor

        el.querySelector(".delete").onclick = () => {
            deleteNote(note.id, el)
        }
    })
}

fetchNotes()