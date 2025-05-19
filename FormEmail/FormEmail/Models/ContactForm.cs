using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.ComponentModel.DataAnnotations;

namespace FormEmail.Models
{
    public class ContactForm
    {
        [Required]
        [Display(Name = "Nom complet")]
        public string FullName { get; set; }

        [Required, EmailAddress]
        [Display(Name = "Adresse e-mail")]
        public string Email { get; set; }

        [Required]
        [Display(Name = "Téléphone")]
        public string Phone { get; set; }

        [Required]
        [Display(Name = "Sujet")]
        public string Subject { get; set; }

        [Required]
        [Display(Name = "Message")]
        public string Message { get; set; }
    }
}