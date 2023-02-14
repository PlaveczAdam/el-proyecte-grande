using Microsoft.EntityFrameworkCore;
using el_proyecte_grande_backend.Models.Entities;
using Microsoft.AspNetCore.Identity;

namespace el_proyecte_grande_backend.Data
{
    public class DbInitializer
    {
        private readonly GrandeHotelContext _context;

        public DbInitializer(GrandeHotelContext context)
        {
            _context = context;
        }

        public void Seed()
        {
            if (_context.Roles.Count() == 0)
            {
                _context.Roles.AddRange(new Role[] {
                    new Role {Name = "Admin" },
                    new Role {Name = "Manager" },
                    new Role {Name = "Receptionist" },
                    new Role {Name = "Staff" }
                    });

                _context.SaveChanges();

                User user = new User()
                {
                    Name = "Root",
                    Email = "",
                    Password = "",
                    IsActive = false,
                    Roles = new Role[] { _context.Roles.First(r => r.Name == "Admin") }
                };

                PasswordHasher<User> hasher = new PasswordHasher<User>();
                user.Password = hasher.HashPassword(user, "1234");

                _context.Users.Add(user);

                _context.SaveChanges();
            }; 
        }
    }
}
