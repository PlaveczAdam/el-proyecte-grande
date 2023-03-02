using el_proyecte_grande_backend.Models.Dtos.AuthDtos;
using el_proyecte_grande_backend.Models.Entities;
using el_proyecte_grande_backend.Services.AuthServices;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

namespace el_proyecte_grande_backend.Controllers
{
    [ApiController, Route("api/auth")]
    public class AuthController : ControllerBase
    {
        IAuthService _authService;

        public AuthController(IAuthService authService)
        {
            _authService = authService;
        }

        [HttpPost("login")]
        public async Task<ActionResult<LoggedInUserDto>> Login(CredentialsDto credentials)
        {
            if (String.IsNullOrEmpty(credentials.Username) || String.IsNullOrEmpty(credentials.Password)) return Unauthorized();

            ClaimsIdentity? user = await _authService.LoginAttemptAsync(credentials.Username, credentials.Password);

            if (user == null) return Unauthorized();

            await HttpContext.SignInAsync(CookieAuthenticationDefaults.AuthenticationScheme, new ClaimsPrincipal(user), new AuthenticationProperties
            {
                AllowRefresh = true,
                IsPersistent = true
            });

            LoggedInUserDto loggedInUser = MakeLoggedInUserDto(user);
            return loggedInUser;
        }

        [HttpGet("logout")]
        public async Task<ActionResult> Logout()
        {
            await HttpContext.SignOutAsync();
            return Ok();
        }

        [HttpGet("validate")]
        [Authorize]
        public async Task<ActionResult> Validate()
        {
            return Ok();
        }

        private LoggedInUserDto MakeLoggedInUserDto(ClaimsIdentity user)
        {
            string username = user.Claims.First(c => c.Type == ClaimTypes.Name).Value;
            string email = user.Claims.First(c => c.Type == ClaimTypes.Email).Value;
            IEnumerable<string> roles = user.Claims.Where(c => c.Type == ClaimTypes.Role).Select(c => c.Value);
            return new LoggedInUserDto()
            {
                Username = username,
                Email = email,
                Roles = roles
            };
        }
    }
}
