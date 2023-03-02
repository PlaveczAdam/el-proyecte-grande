using el_proyecte_grande_backend.Utils;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;

namespace el_proyecte_grande_backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class EnumController : ControllerBase
    {

        // GET: api/enum/BoardTypes
        [HttpGet("{enumName}")]
        public ActionResult<EnumDetails> GetEnum(string enumName)
        {
            EnumDetails? enumDetails = EnumUtils.GetValuesOfEnum(enumName);
            if (enumDetails == null)
                return NotFound(JsonConvert.SerializeObject(new { message = $"Enum with the name of {enumName} does not exist" }));

            return Ok(enumDetails);
        }

    }
}
