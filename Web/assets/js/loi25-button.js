document.addEventListener('DOMContentLoaded', function() {
    // Referencia al botón
    const loi25Button = document.getElementById('loi25-button');
    
    if (loi25Button) {
        // Agregar event listener para el clic
        loi25Button.addEventListener('click', function(e) {
            e.preventDefault();
            // Abrir el PDF en una nueva pestaña
            window.open('https://www.gestion1984.com/mediatask/dump/pdf/loi-25---texte---gestion-1984.pdf', '_blank');
        });
        
        // Agregar soporte para teclado (accesibilidad)
        loi25Button.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                window.open('https://www.gestion1984.com/mediatask/dump/pdf/loi-25---texte---gestion-1984.pdf', '_blank');
            }
        });
    }
});