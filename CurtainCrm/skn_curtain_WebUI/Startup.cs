using Microsoft.Owin;
using Owin;

[assembly: OwinStartup(typeof(skn_curtain_WebUI.Startup))]
namespace skn_curtain_WebUI
{
    public partial class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            ConfigureAuth(app);
        }
    }
}