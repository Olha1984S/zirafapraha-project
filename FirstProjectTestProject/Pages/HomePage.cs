using OpenQA.Selenium;                  // Selenium WebDriver for browser automation
using OpenQA.Selenium.Support.UI;       // Support for WebDriver's wait functionality 
using System;                           // System namespace for basic functionalities
                                        // Пространство имен системы для основных функций
using FirstProjectTestProject.Components;

namespace FirstProjectTestProject.Pages       // namespace — это “контейнер” или “папка” для кода внутри проекта.
                                              // Пространство имен для тестового проекта, указывающее, что это первый тестовый проект.
{
    public class HomePage           // Класс, содержащий тесты. В NUnit, тесты организуются в классы.
    {                                   
                                        // здесь указываеюмя переменные и методы, которые будут использоваться для тестирования для всех тестов в этом классе.
        private readonly IWebDriver driver;     // Поле для хранения экземпляра WebDriver, который будет использоваться для управления браузером.
        private readonly WebDriverWait wait;    // Поле для хранения экземпляра WebDriverWait, который будет использоваться для ожидания определенных условий в браузере.
                                                // readonly — означает, что эти поля могут быть инициализированы только в конструкторе класса и не могут быть изменены после этого.
                                                // Это обеспечивает неизменность этих полей после их первоначальной установки.

        public HomePage(IWebDriver driver)      // Конструктор класса HomePage, который принимает IWebDriver в качестве параметра.
                                                // Это позволяет передать экземпляр WebDriver при создании объекта HomePage.
        {
            this.driver = driver;               // Инициализация поля driver с помощью переданного параметра.
            wait = new WebDriverWait(driver, TimeSpan.FromSeconds(10)); // Инициализация поля wait с помощью нового экземпляра WebDriverWait,
                                                                        // который использует переданный WebDriver и тайм-аут в 10 секунд.
        }

        // 1) Открыть веб-страницу
        public void OpenHomePage() {            // Метод для открытия домашней страницы. 
                                                    // public — метод доступен извне
                                                    // void — ничего не возвращает
                                                    // OpenHomePage — имя метода
                                                    // () — у него нет параметров
            driver.Navigate().GoToUrl("https://zirafapraha.cz");    // Открываем веб-страницу в браузере.
        }

        // 2) Отклонить cookies
        public void DeclineCookies()
        {
            IWebElement declineButton = wait.Until(d => d.FindElement(By.Id("CybotCookiebotDialogBodyButtonDecline"))   // IwebElement — интерфейс, представляющий элемент на веб-странице.
                                                                                                                        // Здесь мы используем WebDriverWait для ожидания появления кнопки отказа от cookies, которая идентифицируется по ID.
                                                                                                                        // declineButton — переменная, которая будет хранить найденный элемент кнопки отказа от cookies.
                                                                                                                        // d => d.FindElement(By.Id("CybotCookiebotDialogBodyButtonDecline")) — лямбда-выражение, которое используется для поиска элемента на странице.
                                                                                                                        // Оно говорит WebDriverWait, что нужно искать элемент с определенным ID.
            );

            declineButton.Click();      // Кликаем на найденную кнопку отказа от cookies.
        }
        public void GoToChoiceTickets()
        {
            Header header = new Header(driver);
            header.GoToVstupenkyOnline();
        }

    }
}