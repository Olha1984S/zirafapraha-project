using OpenQA.Selenium;
using OpenQA.Selenium.Support.UI;
using System;
using System.Collections.Generic;
using System.Linq;
using FirstProjectTestProject.Models;

namespace FirstProjectTestProject.Pages
{
    public class VstupenkyOnlinePage
    {
        private readonly IWebDriver driver;
        private readonly WebDriverWait wait;

        public VstupenkyOnlinePage(IWebDriver driver)
        {
            this.driver = driver;
            wait = new WebDriverWait(driver, TimeSpan.FromSeconds(10));
        }

        // ✅ Проверяем, что страница открылась
        public bool IsOpenedVstupenkyOnline()
        {
            return wait.Until(d =>
                d.FindElements(By.CssSelector("article.js-entry-product")).Count > 0
            );
        }

        // ✅ Метод 1: Получаем список билетов
        public List<TicketItem> GetTickets(int count = 4)
        {
            var items = driver.FindElements(By.CssSelector("article.js-entry-product"));

            List<TicketItem> tickets = new List<TicketItem>();

            for (int i = 0; i < count; i++)
            {
                var item = items[i];

                tickets.Add(new TicketItem
                {
                    Name = item.FindElement(By.CssSelector("h2.entry-item__name")).Text,
                    Price = int.Parse(item.GetAttribute("data-price") ?? "0"),

                    PlusButton = item.FindElement(By.CssSelector(".js-plus-product")),
                    MinusButton = item.FindElement(By.CssSelector(".js-minus-product")),
                    QuantityInput = item.FindElement(By.CssSelector("input.js-value-product"))
                });
            }

            return tickets;
        }

        // ✅ Метод 2: Клик по плюсу нужного билета
        public void ClickPlusOnTicket(List<TicketItem> tickets, int index)
        {
            tickets[index].PlusButton.Click();
            System.Threading.Thread.Sleep(500);
        }
    }
}