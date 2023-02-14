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
            var exists = _context.Users.Any(x => x.Id == user.Id);
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

        public Task<User> GetUserById(long id)
        {
            throw new NotImplementedException();
        }

        public Task<User> SetUserRole(long userId, string role)
        {
            throw new NotImplementedException();
        }

        public Task<User> UpdateUser(long userId, User user)
        {
            throw new NotImplementedException();
        }

        public Task<User> UpdateUserActivity(long userId)
        {
            throw new NotImplementedException();
        }
    }
}
