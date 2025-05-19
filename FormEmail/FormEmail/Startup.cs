using Microsoft.Owin;
using Owin;

[assembly: OwinStartupAttribute(typeof(FormEmail.Startup))]
namespace FormEmail
{
    public partial class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            ConfigureAuth(app);
        }
    }
}
