namespace FirstProjectTestProject.Pricing

{
    public class NoDiscountStrategyPricing : IStrategyPricing
    {
        public int Calculate(int sum)
        {
            return sum;
        }
    }
}

