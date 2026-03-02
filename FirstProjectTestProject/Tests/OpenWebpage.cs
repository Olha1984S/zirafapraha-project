using NUnit.Framework;                  // NUnit framework for unit testing
using OpenQA.Selenium;                  // Selenium WebDriver for browser automation
using OpenQA.Selenium.Chrome;           // ChromeDriver for controlling the Chrome browser
using OpenQA.Selenium.Support.UI;       // Support for WebDriver's wait functionality 
using System;                           // System namespace for basic functionalities
                                        // Пространство имен системы для основных функций

namespace FirstProjectTestProject.Tests       // namespace — это “контейнер” или “папка” для кода внутри проекта.
                                              // Пространство имен для тестового проекта, указывающее, что это первый тестовый проект.
{
    public class OpenWebpageTests           // Класс, содержащий тесты. В NUnit, тесты организуются в классы.
    {                                   
                                        // здесь указываеюмя переменные и методы, которые будут использоваться для тестирования для всех тестов в этом классе.
        private IWebDriver driver;      // Поле для хранения экземпляра WebDriver, который будет использоваться для управления браузером.
        private WebDriverWait wait;     // Поле для хранения экземпляра WebDriverWait, который будет использоваться для ожидания определенных условий в браузере.

        [SetUp]                         // Атрибут [SetUp] указывает, что метод Setup будет выполняться перед каждым тестом в этом классе.
        public void Setup()             // Метод для настройки тестовой среды, который будет выполняться перед каждым тестом.
                                        // Здесь можно инициализировать объекты, открывать браузер и т.д.
                                            // public — метод доступен извне
                                            // void — ничего не возвращает
                                            // Setup — имя метода
                                            // () — у него нет параметров
        {
            driver = new ChromeDriver();                                    // Инициализация WebDriver для Chrome, что позволяет управлять браузером Chrome.
            wait = new WebDriverWait(driver, TimeSpan.FromSeconds(10));     // Инициализация WebDriverWait с тайм-аутом в 10 секунд для ожидания определенных условий в браузере.
            driver.Manage().Window.Maximize();                              // Максимизация окна браузера для лучшего отображения и взаимодействия с элементами на странице.
        }

        [Test]                          // Атрибут [Test] указывает, что метод OpenWebpage является тестовым методом, который будет выполняться NUnit.
        public void OpenHomePage_ShouldDeclineCookies()             // Метод, который содержит код теста. 
                                                                    // Здесь можно написать код для автоматизации браузера, проверки условий и т.д.
                                                                        // public — метод доступен извне
                                                                        // void — ничего не возвращает
                                                                        // Test1 — имя метода
                                                                        // () — у него нет параметров
        {
            // 1) Открыть веб-страницу
            driver.Navigate().GoToUrl("https://zirafapraha.cz");    // Открываем веб-страницу в браузере.
            
            // ------ такие коменты обычно не пишут. сейчас это учебный пример, поэтому я их оставил ------
            TestContext.WriteLine("⏳ Ждём кнопку отказа от cookies...");
            // 2) Ждём кнопку отказа от cookies и кликаем
            IWebElement declineButton = wait.Until(d => d.FindElement(By.Id("CybotCookiebotDialogBodyButtonDecline"))       // IwebElement — интерфейс, представляющий элемент на веб-странице.
                                                                                                                            // Здесь мы используем WebDriverWait для ожидания появления кнопки отказа от cookies, которая идентифицируется по ID.
                                                                                                                            // declineButton — переменная, которая будет хранить найденный элемент кнопки отказа от cookies.
                                                                                                                            // d => d.FindElement(By.Id("CybotCookiebotDialogBodyButtonDecline")) — лямбда-выражение, которое используется для поиска элемента на странице. Оно говорит WebDriverWait, что нужно искать элемент с определенным ID.
            );

            declineButton.Click();          // Кликаем на найденную кнопку отказа от cookies.
            // Assert.Pass("Success");      // Успешное завершение теста. Этот вызов сообщает NUnit, что тест прошел успешно. Если бы возникла ошибка до этого момента, тест бы провалился.
        }

        [TearDown]                  // Атрибут [TearDown] указывает, что метод TearDown будет выполняться после каждого теста в этом классе.
        public void TearDown()      // Метод для очистки тестовой среды, который будет выполняться после каждого теста.
                                    // Здесь можно закрывать браузер, освобождать ресурсы и т.д.
                                    // public — метод доступен извне
                                    // void — ничего не возвращает
                                    // TearDown — имя метода
                                    // () — у него нет параметров
        {
            driver?.Quit();         // Закрываем браузер и освобождаем ресурсы, связанные с WebDriver.
                                    // Это важно для предотвращения утечек памяти и обеспечения чистой среды для следующих тестов.
                                    // ? — оператор безопасного вызова, который предотвращает возникновение исключения, если driver равен null (не инициализирован).
        }
    }
}