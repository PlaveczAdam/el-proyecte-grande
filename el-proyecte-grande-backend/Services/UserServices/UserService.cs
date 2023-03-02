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
        }

        public async Task<User> CreateUser(User user)
        {
            var exists = _context.Users.Any(x => x.Name == user.Name);
            if (exists)
            {
                throw new Exception("User already Exists.");
            }
            var roles = GetOriginalRoles(user);
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

        public async Task<IEnumerable<User>> GetAdmins()
        {
            Role adminRole = await _context.Roles.FirstAsync(r => r.Name == "Admin");
            return await _context.Users.Include(x => x.Roles).Where(x => x.Roles.Contains(adminRole)).ToListAsync();
        }

        public async Task<User> GetUserById(long id)
        {
            return await _context.Users.Include(x => x.Roles).SingleAsync(x => x.Id == id);
        }

        public async Task<User> SetUserRole(long userId, Role role)
        {
            var user = await GetUserById(userId);
           /* if (user is null)
            {
                throw new Exception("There is no such user.");
            }*/
            var foundRole = _context.Roles.Single(x => x.Name == role.Name);

            if (user.Roles.Contains(foundRole))
            {
                user.Roles.Remove(foundRole);
            }
            else
            {
                user.Roles.Add(foundRole);
            }
            await _context.SaveChangesAsync();
            return user;
        }

        public async Task<User> UpdateUser(long userId, User user)
        {
            var foundUser = await GetUserById(userId);
            var roles = GetOriginalRoles(user);

            foundUser.Name = user.Name;
            foundUser.Email = user.Email;
            foundUser.Password = _passwordHasher.HashPassword(user, user.Password);
            foundUser.IsActive = user.IsActive;
            foundUser.Roles = roles.ToList();

            await _context.SaveChangesAsync();
            return foundUser;
        }

        public async Task<User> UpdateUserActivity(long userId, bool activity)
        {
            var foundUser = await GetUserById(userId);
            foundUser.IsActive = activity;
            await _context.SaveChangesAsync();
            return foundUser;
        }

        private IEnumerable<Role> GetOriginalRoles(User user)
        {
            return _context.Roles.ToList().Where(x => user.Roles.Any(y => x.Name == y.Name));
        }

        public async Task ActivateRootUser()
        {
            User rootUser = await _context.Users.FirstAsync(u => u.Name == "Root");
            rootUser.IsActive = true;
            await _context.SaveChangesAsync();
        }
    }
}
