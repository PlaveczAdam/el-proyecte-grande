using el_proyecte_grande_backend.Data;
using el_proyecte_grande_backend.Models.Entities;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using System.Security.Claims;

namespace el_proyecte_grande_backend.Services.AuthServices
{
    public class AuthService : IAuthService
    {
        private readonly GrandeHotelContext _context;

        public AuthService(GrandeHotelContext context)
        {
            _context = context;
        }

        public async Task<ClaimsIdentity?> LoginAttemptAsync(string username, string password)
        {
            PasswordHasher<User> hasher = new PasswordHasher<User>();
            List<User> users = await _context.Users.Include(u => u.Roles).ToListAsync();
            User? user = users.FirstOrDefault(u => ChallangeUser(u, username, password));
            if (user == null) return null;

            List<Claim> claims = new List<Claim>()
            {
                new Claim(ClaimTypes.Name, username),
                new Claim(ClaimTypes.Email, user.Email)
            };

            user.Roles.ToList().ForEach(r => claims.Add(new Claim(ClaimTypes.Role, r.Name)));

            ClaimsIdentity identity = new ClaimsIdentity(claims, "Login");
            return identity;
        }

        public bool ChallangeUser(User user, string username, string password)
        {
            PasswordHasher<User> passwordHasher = new PasswordHasher<User>();
            PasswordVerificationResult match = passwordHasher.VerifyHashedPassword(user, user.Password, password);
            return user.Name == username && match != PasswordVerificationResult.Failed && user.IsActive;
        }
    }
}
