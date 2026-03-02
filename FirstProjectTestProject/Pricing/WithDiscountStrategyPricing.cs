using System;           // Мы используем Math.Round.
                        // Math находится в System.

namespace FirstProjectTestProject.Pricing

{
    // Стратегия расчёта цены со скидкой
    public class WithDiscountStrategyPricing : IStrategyPricing
    {
        public int Calculate(int sum)
        {
            return (int)Math.Round(sum * 0.9);
        }
    }
}


