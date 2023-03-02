using el_proyecte_grande_backend.Models.Dtos.AuthDtos;
using el_proyecte_grande_backend.Models.Entities;
using el_proyecte_grande_backend.Services.AuthServices;
using el_proyecte_grande_backend.Services.UserServices;
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
        private readonly IAuthService _authService;
        private readonly IUserService _userService;

        public AuthController(IAuthService authService, IUserService userService)
        {
            _authService = authService;
            _userService = userService;
        }

        [HttpPost("login")]
        public async Task<ActionResult<LoggedInUserDto>> Login(CredentialsDto credentials)
        {
            if (String.IsNullOrEmpty(credentials.Username) || String.IsNullOrEmpty(credentials.Password)) return Unauthorized();

            await EnableRootUserIfNecessary();

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
            await DisableRootUserIfNecessary();
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

        private async Task EnableRootUserIfNecessary()
        {
            int activeAdmins = await GetActiveAdminUsersCount();

            if (activeAdmins < 1) await _userService.ActivateRootUser();
        }

        private async Task DisableRootUserIfNecessary()
        {
            int activeAdmins = await GetActiveAdminUsersCount();

            if (activeAdmins > 1) await _userService.DeactivateRootUser();
        }

        private async Task<int> GetActiveAdminUsersCount()
        {
            IEnumerable<User> admins = await _userService.GetAdmins();
            if (!admins.Any()) throw new Exception("There are no admin users in the database");
            return admins.Where(a => a.IsActive).Count();
        }
    }
}
