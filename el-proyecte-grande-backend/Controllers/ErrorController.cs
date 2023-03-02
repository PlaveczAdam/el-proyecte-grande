using Microsoft.AspNetCore.Mvc;

namespace el_proyecte_grande_backend.Controllers
{
    [ApiController, Route("api/error")]
    public class ErrorController : ControllerBase
    {
        [HttpGet("forbidden")]
        public ActionResult Forbidden()
        {
            return Forbid();
        }
    }
}
