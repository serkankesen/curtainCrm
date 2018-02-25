using Ninject;
using skn_curtain_Core;
using skn_curtain_Core.Repos;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace skn_curtain_WebUI.Infrastructure
{
    public class NinjectFactory : DefaultControllerFactory
    {
        private IKernel ninjectKernel;
        public NinjectFactory()
        {
            ninjectKernel = new StandardKernel();
            AddBindings();
        }
        protected override IController GetControllerInstance(System.Web.Routing.RequestContext requestContext, Type controllerType)
        {
            return controllerType == null
            ? null
            : (IController)ninjectKernel.Get(controllerType);
        }

        private void AddBindings()
        {
            ninjectKernel.Bind<IUser>().To<UserRepo>();
            ninjectKernel.Bind<ICustomer>().To<CustomerRepo>();
            ninjectKernel.Bind<ICurtainInfoes>().To<CurtainInfoRepo>();
        }
    }
}