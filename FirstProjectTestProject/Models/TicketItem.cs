using OpenQA.Selenium;

namespace FirstProjectTestProject.Models
{
    public class TicketItem
    {
        public string Name { get; set; } = "";

        public int Price { get; set; }

        public IWebElement PlusButton { get; set; } = null!;
        public IWebElement MinusButton { get; set; } = null!;
        public IWebElement QuantityInput { get; set; } = null!;

        // Количество читается автоматически из input
        public int Quantity =>
            int.Parse(QuantityInput.GetAttribute("value") ?? "0");
    }
}