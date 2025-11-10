document.addEventListener('DOMContentLoaded', () => {
    showSection('hero');
});

function showSection(sectionId) {
    const sections = ['hero', 'form', 'resume'];
    sections.forEach(id => {
        document.getElementById(id).style.display = id === sectionId ? (id === 'hero' ? 'flex' : 'block') : 'none';
    });
}

function showForm() {
    showSection('form');
}

let profilePhotoDataUrl = '';
const photoInput = document.getElementById('photo');
if (photoInput) {
  photoInput.addEventListener('change', function () {
    const file = this.files && this.files[0];
    if (!file) {
      profilePhotoDataUrl = '';
      return;
    }
    const maxBytes = 1.5 * 1024 * 1024;
    if (file.size > maxBytes) {
      alert('Please choose an image smaller than 1.5 MB.');
      this.value = '';
      profilePhotoDataUrl = '';
      return;
    }

    const reader = new FileReader();
    reader.onload = function (e) {
      profilePhotoDataUrl = e.target.result; 
    };
    reader.readAsDataURL(file);
  });
}


function handleGenerateResume() {
    if (!simpleValidate()) return;
    generateResume();
    showSection('resume');
}

function editResume() {
    showSection('form');
}

function generateResume() {
    const rphoto = document.getElementById('r-photo');
    if (profilePhotoDataUrl && rphoto) {
    rphoto.src = profilePhotoDataUrl;
    rphoto.style.display = 'inline-block';
    } else if (rphoto) {
    rphoto.style.display = 'none';
    rphoto.src = '';
    }

    const fields = ['name', 'prof', 'email', 'phone', 'country', 'city', 'linkedin', 'github', 'summary'];
    fields.forEach(f => {
        document.getElementById(`r-${f}`).innerText = document.getElementById(f).value;
    });

    generateSection('#experience-section .row2', '#experience-display', ['#p-name', '#c-name'], true);
    generateSection('#education-section .row2', '#education-display', ['#degree-name', '#u-name'], true);
    generateSection('#project-section .row2', '#project-display', ['#project-name'], true);
    generateSection('#achievements-section .row2', '#achievements-display', ['#a-name'], false);

    generateList('#skills-section', '.skills ul', true);
    generateList('#language-section', '.languages ul');
    generateList('#hobby-section', '.hobbies ul');
}

document.getElementById("phone").addEventListener("input", function () {
  this.value = this.value.replace(/[^0-9]/g, ""); 
});

function generateSection(sectionSelector, displaySelector, titleSelectors, includeDates) {
    const sections = document.querySelectorAll(sectionSelector);
    let html = '';

    sections.forEach(section => {
        const titleValues = titleSelectors.map(sel => section.querySelector(sel)?.value || '');
        const titleHTML = titleValues.map(val => `<h3>${val}</h3>`).join(' ');

        let dateHTML = '';
        if (includeDates) {
            const dates = section.querySelectorAll('input[type="date"]');
            const start = dates[0]?.value || '';
            const end = section.querySelector('.present')?.checked ? 'Present' : (dates[1]?.value || '');
            dateHTML = `<span>${start} - ${end}</span>`;
        }

        const detailList = section.querySelectorAll('.details-list li');
        const details = Array.from(detailList).map(li => `<li>${li.textContent}</li>`).join('');

        html += `
        <div>
            ${titleHTML}
            ${dateHTML}
            <ul>${details}</ul>
        </div>`;
    });

    document.querySelector(displaySelector).innerHTML = html;
}

function generateList(sectionSelector, listSelector, includeRating = false) {
    const section = document.querySelector(sectionSelector);
    const list = document.querySelector(listSelector);
    list.innerHTML = '';

    if (includeRating) {
        const textInputs = section.querySelectorAll('input[type="text"]');
        const numberInputs = section.querySelectorAll('input[type="number"]');
        for (let i = 0; i < textInputs.length; i++) {
            const skill = textInputs[i].value.trim();
            const rating = numberInputs[i]?.value.trim();
            if (skill) {
                const li = document.createElement('li');
                li.style.listStyleType = "square";
                li.innerText = rating ? `${skill} - ${rating}/10` : skill;
                list.appendChild(li);
            }
        }
    } else {
        const inputs = section.querySelectorAll('input[type="text"]');
        inputs.forEach(input => {
            if (input.value.trim()) {
                const li = document.createElement('li');
                li.innerText = input.value;
                list.appendChild(li);
            }
        });
    }
}

function simpleValidate() {
  document.querySelectorAll('.input-error').forEach(el => el.classList.remove('input-error'));

  const required = ['name','prof','email','phone','city','country','linkedin','github','summary'];
  for (const id of required) {
    const el = document.getElementById(id);
    if (!el || !el.value.trim()) {          
      el && el.classList.add('input-error'); 
      el && el.focus(); 
      el && el.scrollIntoView({behavior:'smooth', block:'center'});
      return false;
    }
  }

  const phone = document.getElementById('phone').value.trim();
  if (!/^\d{10}$/.test(phone)) {
    const el = document.getElementById('phone');
    el.classList.add('input-error'); el.focus(); el.scrollIntoView({behavior:'smooth', block:'center'});
    return false;
  }

  const email = document.getElementById('email').value.trim();
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    const el = document.getElementById('email');
    el.classList.add('input-error'); el.focus(); el.scrollIntoView({behavior:'smooth', block:'center'});
    return false;
  }

  return true;
}

document.querySelectorAll('.add-btn').forEach(btn => {
    btn.addEventListener('click', function(){
        const type = this.dataset.type;
        const section = this.closest(`#${type}-section`);
        const row2 = section.querySelector('.row2');
        const clone = row2.cloneNode(true);

        clone.querySelectorAll('input').forEach(input => {
            input.value = '';
            if(input.classList.contains('end-date'))
                input.disabled = false;
            if(input.type === 'checkbox') input.checked = false;
        });
        clone.querySelectorAll('.details-list').forEach(list => list.innerHTML = '');
        const label = clone.querySelector('span');
        if(label){
            const count = section.querySelectorAll('.row2').length + 1;
            label.textContent = `${type.charAt(0).toUpperCase() + type.slice(1)} ${count}`;
        }
        const trash = document.createElement('i');
        trash.className = 'fa-solid fa-trash trash-icon'
        trash.addEventListener('click',()=>{
            clone.remove();
        });
        clone.style.position = 'relative';
        clone.appendChild(trash);
        section.appendChild(clone);
    });
});