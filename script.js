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
    document.getElementById('hero').style.display = 'none';
    document.getElementById('form').style.display = 'none';
    document.getElementById('resume').style.display = 'block';
}
function editResume(){
    document.getElementById('hero').style.display = 'none';
    document.getElementById('form').style.display = 'block';
    document.getElementById('resume').style.display = 'none';
}