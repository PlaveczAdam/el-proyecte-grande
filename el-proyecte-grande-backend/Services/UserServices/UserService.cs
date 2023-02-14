using el_proyecte_grande_backend.Data;
using el_proyecte_grande_backend.Models.Entities;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

namespace el_proyecte_grande_backend.Services.UserServices
{
    public class UserService : IUserService
    {
        private readonly GrandeHotelContext _context;
        private readonly PasswordHasher<User> _passwordHasher;

        public UserService(GrandeHotelContext context, PasswordHasher<User> passwordHasher)
        {
            _context = context;
            _passwordHasher = passwordHasher;
            Seed();
        }

        public async Task<User> CreateUser(User user)
        {
            var exists = _context.Users.Any(x => x.Name == user.Name);
            if (exists)
            {
                throw new Exception("User already Exists.");
            }
            var roles = _context.Roles.ToList().Where(x => user.Roles.Any(y => x.Name == y.Name));
            user.Roles = roles.ToList();
            user.Password = _passwordHasher.HashPassword(user, user.Password);
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
            foundUser.Password = _passwordHasher.HashPassword(user, user.Password);
            foundUser.IsActive = user.IsActive;
            foundUser.Roles = user.Roles;

            await _context.SaveChangesAsync();
            return foundUser;
        }

        public async Task<User> UpdateUserActivity(long userId, bool activity)
        {
            var foundUser = GetUserById(userId).Result;
            foundUser.IsActive = activity;
            await _context.SaveChangesAsync();
            return foundUser;
        }

        private void Seed()
        {
            if (_context.Roles.Any())
            {
                return;
            }

            _context.Roles.Add(new Role()
            {
                Name = "Admin"
            });
            _context.Roles.Add(new Role()
            {
                Name = "Manager"
            });
            _context.Roles.Add(new Role()
            {
                Name = "Receptionist"
            });
            _context.Roles.Add(new Role()
            {
                Name = "Staff"
            });
            _context.SaveChanges();
        }
    }
}
