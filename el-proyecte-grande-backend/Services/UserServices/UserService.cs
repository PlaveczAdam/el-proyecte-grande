using el_proyecte_grande_backend.Data;
using el_proyecte_grande_backend.Models.Entities;
using Microsoft.EntityFrameworkCore;

namespace el_proyecte_grande_backend.Services.UserServices
{
    public class UserService : IUserService
    {
        private readonly GrandeHotelContext _context;

        public UserService(GrandeHotelContext context)
        {
            _context = context;
        }

        public async Task<User> CreateUser(User user)
        {
            var exists = _context.Users.Any(x => x.Name == user.Name);
            if (exists)
            {
                throw new Exception("User already Exists.");
            }
            _context.Users.Add(user);
            await _context.SaveChangesAsync();
            return user;
        }

        public async Task<IEnumerable<User>> GetAllUsers()
        {
            return await _context.Users.Include(x => x.Roles).ToListAsync();
        }

        public async Task<User> GetUserById(long id)
        {
            return await _context.Users.Include(x => x.Roles).SingleAsync(x => x.Id == id);
        }

        public async Task<User> SetUserRole(long userId, Role role)
        {
            var user = GetUserById(userId).Result;
            if (user is null)
            {
                throw new Exception("There is no such user.");
            }
            user.Roles.Add(role);
            await _context.SaveChangesAsync();
            return user;
        }

        public async Task<User> UpdateUser(long userId, User user)
        {
            var foundUser = GetUserById(userId).Result;
            foundUser.Name = user.Name;
            foundUser.Email = user.Email;
            foundUser.Password = user.Password;
            foundUser.IsActive = user.IsActive;
            foundUser.Roles = user.Roles;

            await _context.SaveChangesAsync();
            return foundUser;
        }

        public Task<User> UpdateUserActivity(long userId)
        {
            throw new NotImplementedException();
        }
    }
}
