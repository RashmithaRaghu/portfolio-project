document.addEventListener('DOMContentLoaded',()=>{
    document.getElementById('hero').style.display = 'flex';
    document.getElementById('form').style.display = 'none';
    document.getElementById('resume').style.display = 'none';
});

function showForm(){
    document.getElementById('hero').style.display = 'none';
    document.getElementById('form').style.display = 'block';
    document.getElementById('resume').style.display = 'none';
}
function handleGenerateResume(){
    generateResume();
    document.getElementById('hero').style.display = 'none';
    document.getElementById('form').style.display = 'none';
    document.getElementById('resume').style.display = 'block';
}
function editResume(){
    document.getElementById('hero').style.display = 'none';
    document.getElementById('form').style.display = 'block';
    document.getElementById('resume').style.display = 'none';
}
function generateResume(){
    document.getElementById('r-name').innerText=document.getElementById('name').value
    document.getElementById('r-prof').innerText=document.getElementById('prof').value
    document.getElementById('r-email').innerText=document.getElementById('email').value
    document.getElementById('r-phone').innerText=document.getElementById('phone').value
    document.getElementById('r-country').innerText=document.getElementById('country').value
    document.getElementById('r-city').innerText=document.getElementById('city').value
    document.getElementById('r-linkedin').innerText=document.getElementById('linkedin').value
    document.getElementById('r-github').innerText=document.getElementById('github').value
    document.getElementById('r-summary').innerText=document.getElementById('summary').value
    const experienceSections=document.quesrySelectAll('#experience-section.row2');
    let experienceHTML = '';
    experienceSections.foreach(section=>{
        const post = section.querySelector('#p-name')?.value;
        const company = section.querySelector('#c-name')?.value;
        const dates = section.querySelectorAll('input[type="date"]');
        const start = dates[0]?.value || '';
        const end = section.querySelector('.present')?.checked ? 'Present' : (dates[0]?.value || '');

        const detailList = section.querySelectorAll('.details-list li');
        const details = Array.from(detailList).map(li=> `<li>${li.textContent}<li>`).join('');

        experienceHTML += `
        <div>
            <h3>${post}</h3>
            <span>${company} | ${start} - ${end} </span>
            <ul>${details}</ul>
        </div>
        `;
    });
    document.querySelector('#experience-display').innerHTML = experienceHTML;

     const educationSections=document.quesrySelectAll('#education-section.row2');
    let educationHTML = '';
    educationSections.foreach(section=>{
        const degree = section.querySelector('#d-name')?.value;
        const university = section.querySelector('#u-name')?.value;
        const dates = section.querySelectorAll('input[type="date"]');
        const start = dates[0]?.value || '';
        const end = section.querySelector('.present')?.checked ? 'Present' : (dates[0]?.value || '');

        const detailList = section.querySelectorAll('.details-list li');
        const details = Array.from(detailList).map(li=> `<li>${li.textContent}<li>`).join('');

        educationHTML += `
        <div>
            <h3>${degree}</h3>
            <span>${university} | ${start} - ${end} </span>
            <ul>${details}</ul>
        </div>
        `;
    });
    document.querySelector('#education-display').innerHTML = educationHTML;

    const projectSections=document.quesrySelectAll('#project-section.row2');
    let projectHTML = '';
    educationSections.foreach(section=>{
        const project = section.querySelector('#p-name')?.value;
        const dates = section.querySelectorAll('input[type="date"]');
        const start = dates[0]?.value || '';
        const end = section.querySelector('.present')?.checked ? 'Present' : (dates[0]?.value || '');

        const detailList = section.querySelectorAll('.details-list li');
        const details = Array.from(detailList).map(li=> `<li>${li.textContent}<li>`).join('');

        projectHTML += `
        <div>
            <h3>${project}</h3>
            <span>${start} - ${end} </span>
            <ul>${details}</ul>
        </div>
        `;
    });
    document.querySelector('#project-display').innerHTML = projectHTML;
}