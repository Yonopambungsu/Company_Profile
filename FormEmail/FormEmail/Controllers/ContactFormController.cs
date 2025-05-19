using FormEmail.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Net;
using System.Net.Mail;
using System.Web.Mvc;
using System.Threading.Tasks;
using System.Configuration;
using System.Net.Http;
using Newtonsoft.Json;

namespace FormEmail.Controllers
{
    public class ContactFormController : Controller
    {
        // GET: Contact
        public ActionResult ContactForm()
        {
            return View("ContactForm");
        }
        private const string recaptchaSecret = "6LcC4DMrAAAAALZpD8rYSoJuUCEoCbZ3Y9c2yRVD";
        [HttpPost]
        public async Task<ActionResult> ContactForm(string nom, string email, string telephone, string sujet, string message)
        {
            bool success = true;
            string messageRes = string.Empty;
            try
            {
                var recaptchaResponse = Request.Form["g-recaptcha-response"];
                var client = new HttpClient();
                var result = await client.PostAsync(
                    $"https://www.google.com/recaptcha/api/siteverify?secret={recaptchaSecret}&response={recaptchaResponse}",
                    new StringContent("")
                );
                var json = await result.Content.ReadAsStringAsync();
                dynamic data = JsonConvert.DeserializeObject(json);
                if (data.success == "true")
                {
                    var body = $@"
                <html>
                <head>
                    <style>
                        table {{
                            border-collapse: collapse;
                            width: 100%;
                            font-family: Arial, sans-serif;
                        }}
                        td {{
                            text-align: left;
                            padding: 8px;
                            border: none;
                        }}
                        .label {{
                            font-weight: bold;
                            width: 150px;
                        }}
                    </style>
                </head>
                <body>
                    <h2>Nouveau message de contact</h2>
                    <table>
                        <tr><td class='label'>Nom</td><td>{nom}</td></tr>
                        <tr><td class='label'>Email</td><td>{email}</td></tr>
                        <tr><td class='label'>Téléphone</td><td>{telephone}</td></tr>
                        <tr><td class='label'>Sujet</td><td>{sujet}</td></tr>
                        <tr><td class='label'>Message</td><td>{message}</td></tr>
                    </table>
                </body>
                </html>";


                    string smtpHost = ConfigurationManager.AppSettings["EmailHost"];
                    int smtpPort = Convert.ToInt32(ConfigurationManager.AppSettings["EmailPort"]);
                    bool enableSsl = Convert.ToBoolean(ConfigurationManager.AppSettings["EmailSsl"]);
                    string senderEmail = ConfigurationManager.AppSettings["EmailSender"];
                    string receiverEmail = ConfigurationManager.AppSettings["EmailReceiver"];
                    string password = ConfigurationManager.AppSettings["EmailPassword"];
                    string displayName = ConfigurationManager.AppSettings["EmailDisplayName"];


                    var messages = new MailMessage();
                    messages.To.Add(new MailAddress(receiverEmail));
                    messages.Subject = sujet;
                    messages.Body = body;
                    messages.From = new MailAddress(senderEmail, displayName);
                    messages.IsBodyHtml = true;

                    using (var smtp = new SmtpClient())
                    {
                        smtp.Host = smtpHost;
                        smtp.Port = smtpPort;
                        smtp.EnableSsl = enableSsl;
                        smtp.Credentials = new NetworkCredential(senderEmail, password);

                        smtp.Timeout = 10000;
                        smtp.DeliveryMethod = SmtpDeliveryMethod.Network;

                        await smtp.SendMailAsync(messages);
                    }
                }
                else
                {
                    throw new Exception("Veuillez valider le captcha si vous n'êtes pas un robot.");
                }
            }
            catch (Exception ex)
            {
                success = false;
                messageRes = ex.Message;
            }
            return Json(new { success = success, message = messageRes});
        }
    }
}