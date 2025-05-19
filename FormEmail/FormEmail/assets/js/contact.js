// Contact Form Validation
document.addEventListener('DOMContentLoaded', function () {
    const contactForm = document.getElementById('contactForm');
    const submitBtn = document.getElementById('submitBtn');

    if (contactForm) {
        contactForm.addEventListener('submit', function (e) {
            e.preventDefault();

            // Get form fields
            const nom = document.getElementById('nom');
            const email = document.getElementById('email');
            const telephone = document.getElementById('telephone');
            const sujet = document.getElementById('sujet');
            const message = document.getElementById('message');

            // Validate form
            let isValid = true;

            // Reset error styles
            const formGroups = document.querySelectorAll('.form-group');
            formGroups.forEach(group => {
                group.classList.remove('error');
                const errorMessage = group.querySelector('.error-message');
                if (errorMessage) {
                    errorMessage.remove();
                }
            });

            // Validate name (at least 2 characters)
            if (nom.value.trim().length < 2) {
                showError(nom, 'Le nom doit contenir au moins 2 caractÃ¨res');
                isValid = false;
            }

            // Validate email (simple regex pattern)
            const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailPattern.test(email.value.trim())) {
                showError(email, 'Veuillez entrer une adresse e-mail valide');
                isValid = false;
            }

            // Validate phone number (simple format validation)
            const phonePattern = /^[0-9\s\-\(\)\+\.]{10,15}$/;
            if (!phonePattern.test(telephone.value.trim())) {
                showError(telephone, 'Veuillez entrer un numÃ©ro de tÃ©lÃ©phone valide');
                isValid = false;
            }

            // Validate subject
            if (sujet.value === '') {
                showError(sujet, 'Veuillez sÃ©lectionner un sujet');
                isValid = false;
            }

            // Validate message (at least 10 characters)
            if (message.value.trim().length < 10) {
                showError(message, 'Le message doit contenir au moins 10 caractÃ¨res');
                isValid = false;
            }

            // If form is valid, submit it
            if (isValid) {


                // For demonstration purposes, we'll just show a success message
                // In a real implementation, this would submit to the server
                // Ubah tampilan tombol
                submitBtn.disabled = true;
                const originalText = submitBtn.innerHTML;
                submitBtn.innerHTML = `<span class="spinner-border spinner-border-sm me-2"></span>Envoi......`;

                const formData = new FormData(contactForm);
                const formElements = this.querySelectorAll('input, select, textarea, button');
                formElements.forEach(function (element) {
                    element.disabled = true;
                    if (element.tagName !== 'BUTTON') {
                        element.classList.add('disabled-gray');
                    }
                });
                fetch('/ContactForm/ContactForm', {
                    method: 'POST',
                    body: formData
                })
                .then(response => response.json())
                .then(data => {
                    if (!data.success) {
                        throw new Error(data.message || 'Erreur');
                    }

                    showFormSuccess();
                    //setTimeout(() => {
                    //    resetForm();
                    //}, 5000);
                })
                .catch(error => {
                    alert("Erreur : " + error.message);
                })
                .finally(() => {
                    grecaptcha.reset();
                    submitBtn.disabled = false;
                    submitBtn.innerHTML = originalText;
                });

                // Normally you would submit the form here:
                // this.submit();

            }
        });
    }

    // Function to show error message
    function showError(input, message) {
        const formGroup = input.closest('.form-group');
        formGroup.classList.add('error');

        // Create error message element
        const errorMessage = document.createElement('div');
        errorMessage.className = 'error-message';
        errorMessage.textContent = message;

        // Add error message to the form group
        formGroup.appendChild(errorMessage);

        // Add error styles to the input
        input.style.borderColor = '#e74c3c';
    }

    // Function to show success message
    function showFormSuccess() {
        const form = document.getElementById('contactForm');
        const successMessage = document.createElement('div');
        successMessage.className = 'success-message';
        successMessage.innerHTML = '<i class="fas fa-check-circle"></i> Votre message a Ã©tÃ© envoyÃ© avec succÃ¨s! Nous vous contacterons bientÃ´t.';

        // Add success message before the form
        form.parentNode.insertBefore(successMessage, form);

        // Hide the form
        form.style.display = 'none';
    }

    // Function to reset the form
    function resetForm() {
        const form = document.getElementById('contactForm');
        const successMessage = document.querySelector('.success-message');

        // Reset form fields
        form.reset();

        // Show the form again
        form.style.display = 'block';

        // Remove success message
        if (successMessage) {
            successMessage.remove();
        }
    }
});
