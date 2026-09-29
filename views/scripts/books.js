const deleteBook = async (id) => {
    try {
        const data = await fetch('http://localhost:3000/books/' + id, {
            method: 'DELETE'
        })
        window.location.reload();
    }catch(e) {
        console.log('no es pot borrar el llibre')
    }
}


document.addEventListener('click', async(e) => {
    if (e.target.classList == 'eliminar') {
        const id = e.target.id
        await deleteBook(id)    
    }
});