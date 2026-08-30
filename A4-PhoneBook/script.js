// get html elements
const contactsList = document.getElementById("contactsList");
const searchInput = document.getElementById("searchInput");
const noContact = document.getElementById("noContact");

const contactForm = document.getElementById("contactForm");
const nameInput = document.getElementById("nameInput");
const phoneInput = document.getElementById("phoneInput");
const addBtn = document.getElementById("addBtn");

let contacts = [];

//Create Function to fetch json existing data
async function getContacts() {
  try {
    const response = await fetch("data.json");

    // combined json data and new created data
    const jsonContacts = await response.json(); //convert data into javascript array
    const savedContacts = JSON.parse(localStorage.getItem("newContact")) || [];
    contacts = [...jsonContacts, ...savedContacts];

    displayContacts(contacts); //contacts contains id, name, phone
  } catch (error) {
    console.log("Error fetching contacts ", error);
  }
}
// Display contacts
function displayContacts(contactData) {
  contactsList.innerHTML = "";
  if (contactData.length === 0) {
    noContact.classList.remove("d-none");
    return;
  }

  noContact.classList.add("d-none");

  contactData.forEach(function (contact) {
    const li = document.createElement("li"); //create a list li
    li.classList.add("list-group-item", "contact-item"); //add contact in li
    li.innerHTML = `<div class="contactDetails"> 
         <div class="contact-name">
            <i class="bi bi-person-circle user-icon "></i>
            ${contact.Name}        
        </div>
        <div class="contact-phone">
            <i class="bi bi-telephone-fill phone-icon "></i>
            ${contact.Mobile}
        </div>
    </div>
    `;
    contactsList.appendChild(li); //add list inside ul
  });
}

// add new contacts
addBtn.addEventListener("click", function () {
  const contactName = nameInput.value.trim();
  const contactPhone = phoneInput.value.trim();
  // empty field validation
  if (contactName == "" || contactPhone == "") {
    alert("Please enter missing fields Name and Phone number ");
  }
  //   create new contact or object
  const newContact = {
    id: contacts.length + 1,
    Name: contactName,
    Mobile: contactPhone,
  };

  contacts.unshift(newContact);

  // save new created data in local
  const savedContacts = JSON.parse(localStorage.getItem("newContact")) || [];
  savedContacts.unshift(newContact);

  // store local storage updated array
  localStorage.setItem("newContact", JSON.stringify(savedContacts));

  displayContacts(contacts);

  nameInput.value = "";
  phoneInput.value = "";
});

// Search Contacts
searchInput.addEventListener("input", function () {
  const searchValue = searchInput.value.toLowerCase().trim();
  const filteredContacts = contacts.filter(function (contact) {
    return contact.Name.toLowerCase().includes(searchValue);
  });
  displayContacts(filteredContacts);
});

getContacts();
