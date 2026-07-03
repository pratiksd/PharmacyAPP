using static System.Runtime.InteropServices.JavaScript.JSType;

namespace PharmacyAPI
{
    public class MedicineDetails
    {
        public int Id { get; set; }
        public string Name { get; set; }

        public string Notes { get; set; }

        public DateOnly ExpiryDate { get; set; }

        public int Quantity { get; set; }

        public decimal Price { get; set; }

        public string Brand { get; set; }
    }
}
