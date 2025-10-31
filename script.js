document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('hero').style.display = 'flex';
    document.getElementById('form').style.display = 'none';
    document.getElementById('resume').style.display = 'none';
});

function showForm() {
    document.getElementById('hero').style.display = 'none';
    document.getElementById('form').style.display = 'block';
    document.getElementById('resume').style.display = 'none';
}

function handleGenerateResume() {
    generateResume();
    document.getElementById('hero').style.display = 'none';
    document.getElementById('form').style.display = 'none';
    document.getElementById('resume').style.display = 'block';
}

function editResume() {
    document.getElementById('hero').style.display = 'none';
    document.getElementById('form').style.display = 'block';
    document.getElementById('resume').style.display = 'none';
}

function generateResume() {
    document.getElementById('r-name').innerText = document.getElementById('name').value;
    document.getElementById('r-proof').innerText = document.getElementById('prof').value;
    document.getElementById('r-email').innerText = document.getElementById('email').value;
    document.getElementById('r-phone').innerText = document.getElementById('phone').value;
    document.getElementById('r-country').innerText = document.getElementById('country').value;
    document.getElementById('r-city').innerText = document.getElementById('city').value;
    document.getElementById('r-linkedin').innerText = document.getElementById('linkedin').value;
    document.getElementById('r-github').innerText = document.getElementById('Github').value;
    document.getElementById('r-summary').innerText = document.getElementById('summary').value;

    // Experience Section
    const experienceSections = document.querySelectorAll('#experience-section .row2');
    let experienceHTML = '';
    experienceSections.forEach(section => {
        const post = section.querySelector('#p-name')?.value;
        const company = section.querySelector('#c-name')?.value;
        const dates = section.querySelectorAll('input[type="date"]');
        const start = dates[0]?.value || '';
        const end = section.querySelector('.present')?.checked ? 'Present' : (dates[1]?.value || '');

        const detailList = section.querySelectorAll('.details-list li');
        const details = Array.from(detailList).map(li => `<li>${li.textContent}</li>`).join('');

        experienceHTML += `
        <div>
            <h3>${post}</h3>
            <span>${company} | ${start} - ${end}</span>
            <ul>${details}</ul>
        </div>
        `;
    });
    document.querySelector('#experience-display').innerHTML = experienceHTML;

    // Education Section
    const educationSections = document.querySelectorAll('#education-section .row2');
    let educationHTML = '';
    educationSections.forEach(section => {
        const degree = section.querySelector('#degree-name')?.value;
        const university = section.querySelector('#u-name')?.value;
        const dates = section.querySelectorAll('input[type="date"]');
        const start = dates[0]?.value || '';
        const end = section.querySelector('.present')?.checked ? 'Present' : (dates[1]?.value || '');

        const detailList = section.querySelectorAll('.details-list li');
        const details = Array.from(detailList).map(li => `<li>${li.textContent}</li>`).join('');

        educationHTML += `
        <div>
            <h3>${degree}</h3>
            <span>${university} | ${start} - ${end}</span>
            <ul>${details}</ul>
        </div>
        `;
    });
    document.querySelector('#education-display').innerHTML = educationHTML;

    // Project Section
    const projectSections = document.querySelectorAll('#project-section .row2');
    let projectHTML = '';
    projectSections.forEach(section => {
        const projectName = section.querySelector('#project-name')?.value;
        const dates = section.querySelectorAll('input[type="date"]');
        const start = dates[0]?.value || '';
        const end = section.querySelector('.present')?.checked ? 'Present' : (dates[1]?.value || '');

        const detailList = section.querySelectorAll('.details-list li');
        const details = Array.from(detailList).map(li => `<li>${li.textContent}</li>`).join('');

        projectHTML += `
        <div>
            <h3>${projectName}</h3>
            <span>${start} - ${end}</span>
            <ul>${details}</ul>
        </div>
        `;
    });
    document.querySelector('#project-display').innerHTML = projectHTML;

    // Achievements Section
    const achievementSections = document.querySelectorAll('#achievements-section .row2');
    let achievementHTML = '';
    achievementSections.forEach(section => {
        const title = section.querySelector('#a-name')?.value;

        const detailList = section.querySelectorAll('.details-list li');
        const details = Array.from(detailList).map(li => `<li>${li.textContent}</li>`).join('');

        achievementHTML += `
        <div>
            <h3>${title}</h3>
            <ul>${details}</ul>
        </div>
        `;
    });
    document.querySelector('#achievements-display').innerHTML = achievementHTML;

    // Skills Section
    const skillsSection = document.querySelector('#skills-section');
    const textInputs = skillsSection.querySelectorAll('input[type="text"]');
    const numberInputs = skillsSection.querySelectorAll('input[type="number"]');
    const skillList = document.querySelector('.skills ul');
    skillList.innerHTML = '';

    for (let i = 0; i < textInputs.length; i++) {
        const skill = textInputs[i].value.trim();
        const rating = numberInputs[i].value.trim();

        if (skill !== '') {
            const li = document.createElement('li');
            li.style.listStyleType = "square";
            li.innerText = rating ? `${skill} - ${rating}/10` : skill;
            skillList.appendChild(li);
        }
    }

    // Languages Section
    const languageSection = document.querySelector('#language-section');
    const languageInputs = languageSection.querySelectorAll('input[type="text"]');
    const languageList = document.querySelector('.languages ul');
    languageList.innerHTML = '';

    languageInputs.forEach(input => {
        if (input.value.trim() !== '') {
            const li = document.createElement('li');
            li.innerText = input.value;
            languageList.appendChild(li);
        }
    });

    // Hobbies Section
    const hobbySection = document.querySelector('#hobby-section');
    const hobbyInputs = hobbySection.querySelectorAll('input[type="text"]');
    const hobbyList = document.querySelector('.hobbies ul');
    hobbyList.innerHTML = '';

    hobbyInputs.forEach(input => {
        if (input.value.trim() !== '') {
            const li = document.createElement('li');
            li.innerText = input.value;
            hobbyList.appendChild(li);
        }
    });
}
