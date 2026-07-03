using System.Text.Json;

namespace PharmacyAPI
{
    public class Utility
    {
        private readonly string _filePath = "AppData/MedicineDetails.json";

        // Read JSON
        public List<MedicineDetails> GetAllMedicineDetailsList()
        {
            if (!File.Exists(_filePath))
                return new List<MedicineDetails>();

            string json = File.ReadAllText(_filePath);

            if (string.IsNullOrWhiteSpace(json))
                return new List<MedicineDetails>();

            return JsonSerializer.Deserialize<List<MedicineDetails>>(json)
                   ?? new List<MedicineDetails>();
        }

        public void SaveMedicines(List<MedicineDetails> medicines)
        {
            var json = JsonSerializer.Serialize(
                medicines,
                new JsonSerializerOptions
                {
                    WriteIndented = true
                });

            File.WriteAllText(_filePath, json);
        }

        public bool AddMedicine(MedicineDetails medicine)
        {
            bool medicineAdded = false;

            var medicines = GetAllMedicineDetailsList();

            medicine.Id = medicines.Any()
                ? medicines.Max(x => x.Id) + 1
                : 1;

            medicines.Add(medicine);

            SaveMedicines(medicines);
            medicineAdded = true;
            return medicineAdded;
        }
    }
}
