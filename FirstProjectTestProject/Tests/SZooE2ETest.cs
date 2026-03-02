using FirstProjectTestProject.Helpers;
using FirstProjectTestProject.Models;
using FirstProjectTestProject.Pages;
using FirstProjectTestProject.Pricing;
using NUnit.Framework;
using OpenQA.Selenium;
using OpenQA.Selenium.Chrome;
using System.Collections.Generic;

namespace FirstProjectTestProject.Tests       // namespace — это “контейнер” или “папка” для кода внутри проекта.
                                              // Пространство имен для тестового проекта, указывающее, что это первый тестовый проект.
{
    public class SZooE2ETest           // Класс, содержащий тесты. В NUnit, тесты организуются в классы.
    {
        // здесь указываеюмя переменные и методы, которые будут использоваться для тестирования для всех тестов в этом классе.
        private IWebDriver driver;      // Поле для хранения экземпляра WebDriver, который будет использоваться для управления браузером.

        [SetUp]                         // Атрибут [SetUp] указывает, что метод Setup будет выполняться перед каждым тестом в этом классе.
        public void Setup()             // Метод для настройки тестовой среды, который будет выполняться перед каждым тестом.
                                        // Здесь можно инициализировать объекты, открывать браузер и т.д.
                                        // public — метод доступен извне
                                        // void — ничего не возвращает
                                        // Setup — имя метода
                                        // () — у него нет параметров
        {
            driver = new ChromeDriver();                                    // Инициализация WebDriver для Chrome, что позволяет управлять браузером Chrome.
            driver.Manage().Window.Maximize();                              // Максимизация окна браузера для лучшего отображения и взаимодействия с элементами на странице.
        }

        [Test]
        public void ParentTicket_ShouldBeAdded_AndTotalPriceCorrect()
        {
            // 1) Открываем сайт
            HomePage home = new HomePage(driver);
            home.OpenHomePage();
            home.DeclineCookies();
            home.GoToChoiceTickets();

            VstupenkyOnlinePage page = new VstupenkyOnlinePage(driver);

            Assert.IsTrue(page.IsOpenedVstupenkyOnline(),
                "❌ Страница билетов не открылась");

            // ===== ШАГ 1: Получаем список билетов =====
            var ticketList = page.GetTickets();

            Console.WriteLine("\n📌 Доступные билеты:");

            foreach (var t in ticketList)
            {
                Console.WriteLine($"{t.Name} | {t.Price} Kč | Кол-во: {t.Quantity}");
            }

            Console.WriteLine($"\n👉 Выбрано \"{ticketList.Sum(t => t.Quantity)}\" билетов!");

            // ===== ШАГ 2: Кликаем + на билете №2 =====
            Console.WriteLine("\n===== Добавляем билет №2 =====");

            page.ClickPlusOnTicket(ticketList, 1);

            Console.WriteLine("\nПосле клика:");

            foreach (var t in ticketList)
            {
                Console.WriteLine($"{t.Name} | Кол-во: {t.Quantity}");
            }

            Console.WriteLine($"\n👉 Выбрано \"{ticketList.Sum(t => t.Quantity)}\" билетов!");
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