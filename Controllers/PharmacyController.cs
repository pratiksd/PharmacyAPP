using Microsoft.AspNetCore.Mvc;

namespace PharmacyAPI.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class PharmacyController : Controller
    {
        Utility utility = new Utility();
        //public IActionResult Index()
        //{
        //    return View();
        //}

        [HttpGet(Name = "GetAllMedicineDetailsList")]
        public List<MedicineDetails> GetAllMedicineDetailsList()
        {
            //Utility utility = new Utility();
            return  utility.GetAllMedicineDetailsList();
        }

        //public Task<MedicineDetails> GetMedicineDetailsById(int medicineId)
        //{

        //}

        [HttpPost(Name = "AddMedicine")]
        public IActionResult AddMedicine(MedicineDetails medicineDetails)
        {
            var result =  utility.AddMedicine(medicineDetails);
            return Ok(result);
        }
    }
}
