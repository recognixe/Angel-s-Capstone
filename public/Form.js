const createForm = document.querySelector('form')

createForm.addEventListener('submit', async (e)=>{
	e.preventDefault()
	const bookData = new FormData(createForm)
	const reqBody = Object.fromEntries(bookData)

	const response = await fetch('/add/pets.', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(reqBody)
	})
    window.location.href = '/'
})

async function deletePet(id) {
 await fetch('/delete/' + id, {method: 'DELETE'});
 window.location.href = "/pets"
}

async function editPet(e, id) {
 e.preventDefault();

 const formData = new FormData(e.target);
 const formObject = Object.fromEntries(formData.entries());

 await fetch('/Pets/' + id, {
   method: 'PATCH',
   headers: { 'Content-Type': 'application/json' },
   body: JSON.stringify(formObject)
 });




 window.location.href = '/'
}

async function deletePet(id) {
 await fetch('/deletepets/' + id, {method: 'DELETE'});
 window.location.href = "/"
}
