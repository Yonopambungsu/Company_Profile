<?php
// Configuration
$destinataire = "lesjardinstaillon@cgocable.ca"; // Adresse email de destination
$sujet_par_defaut = "Nouveau message du site web Les Jardins Taillon";

// Vérifier si le formulaire a été soumis
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Récupérer les données du formulaire
    $nom = filter_input(INPUT_POST, 'nom', FILTER_SANITIZE_STRING);
    $email = filter_input(INPUT_POST, 'email', FILTER_SANITIZE_EMAIL);
    $telephone = filter_input(INPUT_POST, 'telephone', FILTER_SANITIZE_STRING);
    $sujet_select = filter_input(INPUT_POST, 'sujet', FILTER_SANITIZE_STRING);
    $message_text = filter_input(INPUT_POST, 'message', FILTER_SANITIZE_STRING);
    
    // Vérifier si les données sont valides
    if (empty($nom) || empty($email) || empty($telephone) || empty($sujet_select) || empty($message_text)) {
        repondre_erreur("Tous les champs sont obligatoires.");
    }
    
    // Valider l'email
    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        repondre_erreur("L'adresse email n'est pas valide.");
    }
    
    // Préparer le sujet de l'email
    switch ($sujet_select) {
        case 'information':
            $sujet = "Demande d'information - Les Jardins Taillon";
            break;
        case 'visite':
            $sujet = "Demande de visite - Les Jardins Taillon";
            break;
        case 'disponibilite':
            $sujet = "Vérification de disponibilité - Les Jardins Taillon";
            break;
        case 'autre':
            $sujet = "Autre demande - Les Jardins Taillon";
            break;
        default:
            $sujet = $sujet_par_defaut;
    }
    
    // Créer le contenu de l'email
    $contenu_email = "Nouveau message du site web Les Jardins Taillon\n\n";
    $contenu_email .= "Nom: " . $nom . "\n";
    $contenu_email .= "Email: " . $email . "\n";
    $contenu_email .= "Téléphone: " . $telephone . "\n";
    $contenu_email .= "Sujet: " . $sujet_select . "\n\n";
    $contenu_email .= "Message:\n" . $message_text . "\n";
    
    // En-têtes de l'email
    $headers = "From: " . $email . "\r\n";
    $headers .= "Reply-To: " . $email . "\r\n";
    $headers .= "X-Mailer: PHP/" . phpversion();
    
    // Envoyer l'email
    if (mail($destinataire, $sujet, $contenu_email, $headers)) {
        // Email envoyé avec succès
        repondre_succes();
    } else {
        // Erreur lors de l'envoi de l'email
        repondre_erreur("Une erreur est survenue lors de l'envoi du message. Veuillez réessayer plus tard.");
    }
} else {
    // Si quelqu'un accède directement à ce fichier
    header("Location: contact.html");
    exit;
}

// Fonction pour répondre en cas d'erreur
function repondre_erreur($message) {
    header('Content-Type: application/json');
    echo json_encode(['success' => false, 'message' => $message]);
    exit;
}

// Fonction pour répondre en cas de succès
function repondre_succes() {
    header('Content-Type: application/json');
    echo json_encode(['success' => true, 'message' => 'Votre message a été envoyé avec succès!']);
    exit;
}
?>