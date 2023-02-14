using el_proyecte_grande_backend.Models.Dtos.UserNs;
using el_proyecte_grande_backend.Models.Entities;
using el_proyecte_grande_backend.Services.UserServices;
using Microsoft.AspNetCore.Mvc;

namespace el_proyecte_grande_backend.Controllers
{
    [ApiController, Route("/api/user")]
    public class UserController : Controller
    {
        private readonly IUserService _userService;

        public UserController(IUserService userService)
        {
            _userService = userService;
        }

        [HttpGet]
        public async Task<IEnumerable<UserDto>> GetAllUser()
        {
            return (await _userService.GetAllUsers()).Select(MapUserToDto);
        }

        [HttpPost]
        public async Task<UserDto> CreateUser([FromBody] UserDto userDto)
        {
            var user = await _userService.CreateUser(MapDtoToUser(userDto));
            return MapUserToDto(user);
        }

        private static UserDto MapUserToDto(User user)
        {
            return new UserDto(
                Name: user.Name,
                Email: user.Email,
                Password: "",
                IsActive: user.IsActive,
                Roles: user.Roles.ToList()
            );
        }

        private static User MapDtoToUser(UserDto userDto)
        {
            return new User()
            {
                Name = userDto.Name,
                Email = userDto.Email,
                Password = userDto.Password,
                IsActive = userDto.IsActive,
                Roles = userDto.Roles
            };
        }
    }
}
