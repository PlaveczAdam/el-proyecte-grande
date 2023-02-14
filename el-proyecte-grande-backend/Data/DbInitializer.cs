using Microsoft.EntityFrameworkCore;
using el_proyecte_grande_backend.Models.Entities;

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

                    _context.Users.Add(
                            new User()
                            {
                                Name = "Root",
                                Email = "",
                                Password = "",
                                IsActive = false,
                                Roles = new Role[] { _context.Roles.First(r => r.Name == "Admin") }
                            }
                    );

                    _context.SaveChanges();
                }; 
        }
    }
}
