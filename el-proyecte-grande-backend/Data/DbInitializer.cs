using el_proyecte_grande_backend.Models.Entities;
using el_proyecte_grande_backend.Models.Enums;
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
            if (!_context.Roles.Any())
            {
                // Roles and Root User
                _context.Roles.AddRange(new Role[] {
                    new Role {Name = "Admin" },
                    new Role {Name = "Manager" },
                    new Role {Name = "Receptionist" },
                    new Role {Name = "Staff" }
                    });

                _context.SaveChanges();

                User user = new()
                {
                    Name = "Root",
                    Email = "",
                    Password = "",
                    IsActive = true,
                    Roles = new Role[] { _context.Roles.First(r => r.Name == "Admin") }
                };

                PasswordHasher<User> hasher = new();
                user.Password = hasher.HashPassword(user, "1234");

                _context.Users.Add(user);
                _context.SaveChanges();


                // Hotels
                Hotel grandHotel = new()
                {
                    Id = 1,
                    Name = "Grand Hotel",
                    Status = HotelStatus.InUse,
                    Classification = Classification.FirstClass,
                    Floor = 10,
                    Rooms = 200,
                    Address = new Address()
                    {
                        Id = 1,
                        PostalCode = "10001",
                        Country = "United States",
                        Region = "New York",
                        City = "New York",
                        AddressLineOne = "123 Main Street",
                        AddressLineTwo = ""
                    }
                };
                Hotel mountainLodge = new()
                {
                    Id = 2,
                    Name = "Mountain Lodge",
                    Status = HotelStatus.BuildingInProgress,
                    Classification = Classification.Comfort,
                    Floor = 3,
                    Rooms = 50,
                    Address = new Address()
                    {
                        Id = 2,
                        PostalCode = "81611",
                        Country = "United States",
                        Region = "Colorado",
                        City = "Aspen",
                        AddressLineOne = "789 Pine Street",
                        AddressLineTwo = ""
                    }
                };

                _context.Hotels.AddRange(grandHotel, mountainLodge);
                _context.SaveChanges();

                // RoomType and Rooms
                RoomType roomType = new()
                {
                    Id = 1,
                    Name = "Standard",
                    Price = 250.0,
                    RoomQuality = RoomQuality.Comfort
                };

                _context.RoomTypes.Add(roomType);
                _context.SaveChanges();

                Room room1 = new()
                {
                    Id = 1,
                    Floor = 2,
                    DoorNo = 201,
                    Accessible = true,
                    Status = RoomStatus.InUse,
                    RoomType = roomType,
                    Hotel = grandHotel
                };
                Room room2 = new()
                {
                    Id = 2,
                    Floor = 3,
                    DoorNo = 312,
                    Accessible = false,
                    Status = RoomStatus.InUse,
                    RoomType = roomType,
                    Hotel = grandHotel
                };
                Room room3 = new()
                {
                    Id = 3,
                    Floor = 5,
                    DoorNo = 508,
                    Accessible = true,
                    Status = RoomStatus.OutOfService,
                    RoomType = roomType,
                    Hotel = grandHotel
                };

                _context.Rooms.AddRange(room1, room2, room3);
                _context.SaveChanges();

                // Reservations 
                Reservation reservation1 = new()
                {
                    Id = 1,
                    ReservedFor = 2,
                    ReserveDate = DateTime.Now.AddDays(-50),
                    StartDate = DateTime.Now.AddDays(-40),
                    EndDate = DateTime.Now.AddDays(-30),
                    Price = 500.00,
                    PayFullfillment = false,
                    BoardType = BoardType.AllInclusive,
                    isCancelled = false,
                    Hotel = grandHotel,
                    Reservator = new Reservator
                    {
                        Id = 1,
                        Name = "John Doe",
                        Address = new Address()
                        {
                            Id = 5,
                            PostalCode = "12345",
                            Country = "USA",
                            Region = "California",
                            City = "Los Angeles",
                            AddressLineOne = "123 Main St",
                            AddressLineTwo = "Apt 456"
                        }
                    },
                    Rooms = new[] { room1 }
                };

                Reservation reservation2 = new()
                {
                    Id = 2,
                    ReservedFor = 4,
                    ReserveDate = DateTime.Now.AddDays(-50),
                    StartDate = DateTime.Now.AddDays(-20),
                    EndDate = DateTime.Now.AddDays(-10),
                    Price = 800.00,
                    PayFullfillment = false,
                    BoardType = BoardType.FullBoard,
                    isCancelled = false,
                    Hotel = grandHotel,
                    Reservator = new Reservator
                    {
                        Id = 2,
                        Name = "Jane Smith",
                        Address = new Address()
                        {
                            Id = 6,
                            PostalCode = "67890",
                            Country = "USA",
                            Region = "New York",
                            City = "Brooklyn",
                            AddressLineOne = "456 Elm St",
                            AddressLineTwo = ""
                        }
                    },
                    Rooms = new[] { room2 }
                };

                Reservation reservation3 = new()
                {
                    Id = 3,
                    ReservedFor = 3,
                    ReserveDate = DateTime.Now.AddDays(-10),
                    StartDate = DateTime.Now.AddDays(20),
                    EndDate = DateTime.Now.AddDays(30),
                    Price = 1200.00,
                    PayFullfillment = false,
                    BoardType = BoardType.AllInclusive,
                    isCancelled = false,
                    Hotel = grandHotel,
                    Reservator = new Reservator
                    {
                        Id = 3,
                        Name = "Bob Johnson",
                        Address = new Address()
                        {
                            Id = 7,
                            PostalCode = "54321",
                            Country = "Canada",
                            Region = "Ontario",
                            City = "Toronto",
                            AddressLineOne = "789 Maple Ave",
                            AddressLineTwo = "Unit 10"
                        }
                    },
                    Rooms = new[] { room1, room2 }
                };

                _context.Reservations.AddRange(reservation1, reservation2, reservation3);
                _context.SaveChanges();

                // Guests
                Guest guest1 = new()
                {
                    Id = 1,
                    PersonalId = "123456789",
                    FirstName = "John",
                    LastName = "Doe",
                    BirthPlace = "New York",
                    Phone = "+1-234-567-8901",
                    Email = "johndoe@example.com",
                    Note = "No specific requirements.",
                    BirthDate = new DateTime(1990, 1, 1),
                    Gender = Gender.Male,
                    Status = GuestStatus.CheckedOut,
                    Address = new Address()
                    {
                        Id = 3,
                        PostalCode = "12345",
                        Country = "United States",
                        Region = "New York",
                        City = "New York City",
                        AddressLineOne = "123 Main St",
                        AddressLineTwo = "Apt 4B"
                    },
                    Hotel = grandHotel
                };
                Guest guest2 = new()
                {
                    Id = 2,
                    PersonalId = "987654321",
                    FirstName = "Jane",
                    LastName = "Doe",
                    BirthPlace = "Los Angeles",
                    Phone = "+1-987-654-3210",
                    Email = "janedoe@example.com",
                    Note = "Vegetarian food preferred.",
                    BirthDate = new DateTime(1995, 5, 5),
                    Gender = Gender.Female,
                    Status = GuestStatus.CheckedOut,
                    Address = new Address()
                    {
                        Id = 4,
                        PostalCode = "54321",
                        Country = "United States",
                        Region = "California",
                        City = "Los Angeles",
                        AddressLineOne = "456 Elm St",
                        AddressLineTwo = "Suite 200"
                    },
                    Hotel = grandHotel
                };

                _context.Guests.AddRange(guest1, guest2);
                _context.SaveChanges();
            }
        }
    }
}
