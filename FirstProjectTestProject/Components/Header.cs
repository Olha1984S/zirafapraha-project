using OpenQA.Selenium;                 
using OpenQA.Selenium.Support.UI;       
using System;                           

namespace FirstProjectTestProject.Components

{
    public class Header           
    {
        private readonly IWebDriver driver;
        private readonly WebDriverWait wait;

        public Header(IWebDriver driver) 
        { 
            this.driver = driver;
            wait = new WebDriverWait(driver, TimeSpan.FromSeconds(10));
        }

        public void GoToVstupenkyOnline()
        {
            IWebElement vstupenkyOnlineLink = wait.Until(d => d.FindElement(By.CssSelector("a[href*='vstupenky-online']")));
            vstupenkyOnlineLink.Click();
        }
    }
}