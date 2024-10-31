function sentMail() {
    var parmas = {
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        subject: document.getElementById('subject').value,
        message: document.getElementById('message').value,
    }


const serviceID ="service_7jvwuah";
const templateID ="template_8jvpr2n"

emailjs.send(serviceID, templateID, parmas).then(
    res => {
        document.getElementById('name').value = "";
        document.getElementById('email').value = "";
        document.getElementById('subject').value = "";
        document.getElementById('message').value = "";
        console.log('success', res.status);
        alert("Message sent successfully");
    })
    .catch(err => console.log('error', err));
}
