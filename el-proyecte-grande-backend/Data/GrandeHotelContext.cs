using el_proyecte_grande_backend.Models.Entities;
using Microsoft.EntityFrameworkCore;

namespace el_proyecte_grande_backend.Data
{
	public class GrandeHotelContext : DbContext
	{

		public GrandeHotelContext(DbContextOptions<GrandeHotelContext> options) : base(options)
		{			
		}

		public DbSet<Hotel> Hotels { get; set; }
		public DbSet<Room> Rooms { get; set; }
		public DbSet<Guest> Guests { get; set; }
		public DbSet<Inventory> Inventories { get; set; }
		public DbSet<Reservation> Reservations { get; set; }

		public DbSet<Address> Addresses { get; set; }
		public DbSet<Accessory> Accessories { get; set; }
        public DbSet<Item> Items { get; set; }
        public DbSet<Reservator> Reservators { get; set; }
        public DbSet<RoomType> RoomTypes { get; set; }

        public DbSet<User> Users { get; set; }
        public DbSet<Role> Roles { get; set; }
    }
}
