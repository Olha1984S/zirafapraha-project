using System;
using System.Collections.Generic;
using System.Linq;                              // Linq namespace for querying collections
using FirstProjectTestProject.Pricing;

namespace FirstProjectTestProject.Helpers

{
    public class TicketCalculator
    {
        private readonly IStrategyPricing strategy;                  // Поле для хранения стратегии ценообразования, которая будет использоваться для расчета общей стоимости билетов. 
                                                                    // readonly — означает, что это поле может быть инициализировано только в конструкторе класса и не может быть изменено после этого.
                                                                    // IStrategyPricing — тип данных для этого поля, который представляет стратегию ценообразования.
                                                                    // strategy — имя поля, которое будет использоваться для доступа к стратегии ценообразования внутри класса.

        // Конструктор получает стратегию снаружи
        public TicketCalculator(IStrategyPricing strategy)
        {
            this.strategy = strategy;
        }

        // Рассчитываем итоговую стоимость выбранных билетов
        public int CalculateTotal(List<int> prices)
        {
            // 1) Считаем сумму всех цен билетов
            int sum = prices.Sum();

            // 2) Применяем стратегию (например скидку)
            return strategy.Calculate(sum);
        }
    }
}
