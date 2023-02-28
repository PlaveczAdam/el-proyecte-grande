using el_proyecte_grande_backend.Data;
using el_proyecte_grande_backend.Models.Entities;
using el_proyecte_grande_backend.Models.Enums;
using el_proyecte_grande_backend.Services.GuestServices;
using Microsoft.EntityFrameworkCore;
using static el_proyecte_grande_backend_test.TestDataCreator;

namespace el_proyecte_grande_backend_test
{
    internal class GuestServiceTest
    {
        private DbContextOptions<GrandeHotelContext> dbContextOptions;
        private GuestService _guestService;
        private GrandeHotelContext _hotelContext;

        [SetUp]
        public void Setup()
        {
            dbContextOptions = new DbContextOptionsBuilder<GrandeHotelContext>()
            .UseInMemoryDatabase(Guid.NewGuid().ToString())
            .Options;

            _hotelContext = new GrandeHotelContext(dbContextOptions);
            Seed();
            _guestService = new GuestService(_hotelContext);
        }

        [TearDown]
        public void TearDown()
        {
            _hotelContext.ChangeTracker.Clear();
            _hotelContext.Database.EnsureDeleted();
            _hotelContext.Dispose();
        }

        [Test]
        public async Task AddsANewGuestSuccessfully()
        {
            var guest = CreateTestGuestUpdateDto(2);
            await _guestService.AddGuestAsync(guest);

            Assert.That(_hotelContext.Guests.Find(2L)?.FirstName, Is.EqualTo(guest.FirstName));
        }

        [Test]
        public async Task GuestHasReservationList()
        {
            var guest = CreateTestGuestUpdateDto(2);
            guest.ReservationIds = new List<long> { 1 };
            await _guestService.AddGuestAsync(guest);

            Assert.That(_hotelContext.Guests.Find(2L)?.Reservations?.Count(), Is.EqualTo(1));
        }

        [Test]
        public void AddGuestAsync_HasNoValidReservationList()
        {
            var guest = CreateTestGuestUpdateDto(2);
            guest.ReservationIds = new List<long> { 2 };
            var x = Assert.ThrowsAsync<InvalidOperationException>(() => _guestService.AddGuestAsync(guest));
            Assert.That(x.Message, Is.EqualTo("One or more reservation(s) with the given Id(s) not exits in the database"));
        }

        [Test]
        public void AddGuestAsync_HasNoValidHotel()
        {
            var guest = CreateTestGuestUpdateDto(2);
            guest.HotelId = 10;
            var x = Assert.ThrowsAsync<InvalidOperationException>(() => _guestService.AddGuestAsync(guest));
            Assert.That(x.Message, Is.EqualTo("There is no hotel with the given Id in the database"));
        }
        [Test]
        public void AddGuestAsync_HasNoValidRoom()
        {
            var guest = CreateTestGuestUpdateDto(2);
            guest.RoomId = 100;
            var x = Assert.ThrowsAsync<InvalidOperationException>(() => _guestService.AddGuestAsync(guest));
            Assert.That(x.Message, Is.EqualTo("There is no room with the given Id in the database"));
        }

        [Test]
        public async Task AddGuestAsync_HasValidRoomAndHotel()
        {
            var guest = CreateTestGuestUpdateDto(2);
            guest.RoomId = 1;
            guest.HotelId = 1;

            var g = await _guestService.AddGuestAsync(guest);
            Assert.That(g.Room.Id, Is.EqualTo(guest.RoomId));
            Assert.That(g.Hotel.Id, Is.EqualTo(guest.HotelId));
        }

        [Test]
        public async Task ReturnsAllGuests()
        {
            var guestOne = CreateTestGuest(2);
            var guestTwo = CreateTestGuest(3);

            guestOne.Address = _hotelContext.Addresses.Find(guestOne.Address.Id)!;
            /*guestOne.Hotel = _hotelContext.Hotels.Find(guestOne.Hotel.Id);
            guestOne.Reservations = _hotelContext.Reservations.Where(x => x.Id == 1L).ToList();
            guestOne.Room = _hotelContext.Rooms.Find(guestOne.Room.Id);*/
            guestTwo.Address = _hotelContext.Addresses.Find(guestTwo.Address.Id)!;
            _hotelContext.Guests.Add(guestOne);
            _hotelContext.Guests.Add(guestTwo);
            _hotelContext.SaveChanges();

            var guests = await _guestService.GetAllGuestsAsync();
            Assert.That(guests, Is.EquivalentTo(new List<Guest> { guestOne, guestTwo }));
        }

        [Test]
        public async Task ReturnsUsersFromHotelsWithGivenId()
        {
            var hotelTwo = CreateTestHotel(3);
            _hotelContext.Hotels.Add(hotelTwo);
            _hotelContext.SaveChanges();
            var guestOne = CreateTestGuest(2);
            var guestTwo = CreateTestGuest(3);
            var guestThree = CreateTestGuest(4);

            guestOne.Address = _hotelContext.Addresses.Find(guestOne.Address.Id)!;
            guestTwo.Address = _hotelContext.Addresses.Find(guestTwo.Address.Id)!;
            guestThree.Address = _hotelContext.Addresses.Find(guestThree.Address.Id)!;
            guestOne.Hotel = hotelTwo;
            guestTwo.Hotel = hotelTwo;
            _hotelContext.Guests.Add(guestOne);
            _hotelContext.Guests.Add(guestTwo);
            _hotelContext.Guests.Add(guestThree);
            _hotelContext.SaveChanges();

            var guests = await _guestService.GetAllGuestByHotelAsync(3);
            var guestsEmpty = await _guestService.GetAllGuestByHotelAsync(1);

            Assert.That(guests, Is.EquivalentTo(new List<Guest> { guestOne, guestTwo }));
            Assert.That(guestsEmpty, Is.EquivalentTo(new List<Guest> { }));
            Assert.That(guestThree.Hotel, Is.Null);
        }

        [TestCase(3, GuestStatus.CheckedOut, 1)]
        [TestCase(3, null, 2)]
        [TestCase(null, GuestStatus.CheckedOut, 1)]
        [TestCase(null, null, 3)]
        public async Task ReturnsFilteredUsersByHotelIdAndGuestStatus(int? id, GuestStatus? status, int count)
        {
            var hotelTwo = CreateTestHotel(3);
            _hotelContext.Hotels.Add(hotelTwo);
            _hotelContext.SaveChanges();
            var guestOne = CreateTestGuest(2);
            var guestTwo = CreateTestGuest(3);
            var guestThree = CreateTestGuest(4);

            guestOne.Address = _hotelContext.Addresses.Find(guestOne.Address.Id)!;
            guestOne.Status = GuestStatus.CheckedOut;
            guestTwo.Address = _hotelContext.Addresses.Find(guestTwo.Address.Id)!;
            guestTwo.Status = GuestStatus.CheckedIn;
            guestThree.Address = _hotelContext.Addresses.Find(guestThree.Address.Id)!;
            guestOne.Hotel = hotelTwo;
            guestTwo.Hotel = hotelTwo;
            _hotelContext.Guests.Add(guestOne);
            _hotelContext.Guests.Add(guestTwo);
            _hotelContext.Guests.Add(guestThree);
            _hotelContext.SaveChanges();

            var guests = await _guestService.GetFilteredGuestListAsync(id, status);

            Assert.That(guests.Count, Is.EqualTo(count));
        }

        [Test]
        public async Task ReturnsAUserById()
        {
            var newguest = CreateTestGuest(1);
            var newguestTwo = CreateTestGuest(2);
            newguest.Address = _hotelContext.Addresses.Find(newguest.Address.Id)!;
            newguestTwo.Address = _hotelContext.Addresses.Find(newguestTwo.Address.Id)!;
            _hotelContext.Guests.Add(newguest);
            _hotelContext.Guests.Add(newguestTwo);
            _hotelContext.SaveChanges();

            var guest = await _guestService.GetGuestByIdAsync(2);

            Assert.That(guest, Is.EqualTo(newguestTwo));
        }

        [Test]
        public async Task UpdatesGuestDetailsSuccessfully()
        {
            var newguest = CreateTestGuest(1);
            newguest.Address = _hotelContext.Addresses.Find(newguest.Address.Id)!;
            _hotelContext.Guests.Add(newguest);
            _hotelContext.SaveChanges();

            var newData = CreateTestGuestUpdateDto(1);
            newData.FirstName = "Y";
            newData.Address = new Address { Id = 1 };
            var updated = await _guestService.UpdateGuestAsync(1, newData);
            Assert.That(updated.FirstName, Is.EqualTo("Y"));
        }

        [Test]
        public void NotMatchingIdS()
        {
            var newguest = CreateTestGuestUpdateDto(2);
            var x = Assert.ThrowsAsync<InvalidOperationException>(() => _guestService.UpdateGuestAsync(1, newguest));
            Assert.That(x.Message, Is.EqualTo("Guest Id modification is nat allowed."));
        }

        [Test]
        public async Task NoUserWasFound()
        {
            var newguest = CreateTestGuestUpdateDto(1);
            Assert.That(await _guestService.UpdateGuestAsync(1, newguest), Is.Null);
        }

        [Test]
        public void UpdateGuestAsync_HadNoValidReservation()
        {
            var guest = CreateTestGuestUpdateDto(2);
            guest.ReservationIds = new List<long> { 2 };
            guest.Address = new Address { Id = 1 };
            var guestone = CreateTestGuest(2);
            guestone.Address = _hotelContext.Addresses.Find(guest.Address.Id);
            _hotelContext.Guests.Add(guestone);
            _hotelContext.SaveChanges();
            var x = Assert.ThrowsAsync<InvalidOperationException>(() => _guestService.UpdateGuestAsync(2, guest));
            Assert.That(x.Message, Is.EqualTo("One or more reservation(s) with the given Id(s) not exits in the database"));
        }

        [Test]
        public async Task UpdateGuestStatusAsync_UserUpdatedSuccessfully()
        {
            var guestone = CreateTestGuest(2);
            guestone.Address = _hotelContext.Addresses.Find(guestone.Address.Id);
            guestone.Status = GuestStatus.CheckedOut;
            _hotelContext.Guests.Add(guestone);
            _hotelContext.SaveChanges();

            var result = await _guestService.UpdateGuestStatusAsync(2, (int)GuestStatus.CheckedIn);
            Assert.That(result.Status, Is.EqualTo(GuestStatus.CheckedIn));
        }

        [Test]
        public async Task UpdateGuestStatusAsync_UserNotExists()
        {
            var result = await _guestService.UpdateGuestStatusAsync(2, (int)GuestStatus.CheckedIn);
            Assert.That(result, Is.Null);
        }

        private void Seed()
        {
            var hotel = new Hotel()
            {
                Id = 1,
                Address = new Address()
                {
                    Id = 1,
                    Country = "Hungary",
                    Region = "Borsod-Abaúj-Zemplén",
                    PostalCode = "3900",
                    City = "Szerencs",
                    AddressLineOne = "Ondi út 1",
                    AddressLineTwo = ""
                },
                Classification = Classification.Standard,
                Floor = 1,
                Name = "Name",
                Rooms = 1,
                Status = HotelStatus.InUse
            };

            var roomType = new RoomType()
            {
                Id = 1,
                Accessories = new List<Accessory>(),
                Name = "Name",
                Price = 5000,
                RoomQuality = RoomQuality.Standard
            };

            var accessory = new Accessory()
            {
                Id = 1,
                Name = "Bed",
                Quantity = 1,
                RoomType = roomType
            };

            roomType.Accessories.Add(accessory);

            var room = new Room()
            {
                Id = 1,
                Accessible = true,
                DoorNo = 101,
                Floor = 1,
                Hotel = hotel,
                Reservations = new List<Reservation>(),
                RoomType = roomType,
                Status = RoomStatus.InUse
            };

            var reservation = new Reservation()
            {
                Id = 1,
                BoardType = BoardType.BedOnly,
                EndDate = DateTime.Now.ToUniversalTime(),
                Guests = new List<Guest>(),
                Hotel = hotel,
                PayFullfillment = false,
                Price = roomType.Price,
                Reservator = new Reservator()
                {
                    Id = 1,
                    Address = new Address()
                    {
                        Id = 2,
                        Country = "Hungary",
                        Region = "Borsod-Abaúj-Zemplén",
                        PostalCode = "3900",
                        City = "Szerencs",
                        AddressLineOne = "Ondi út 2",
                        AddressLineTwo = ""
                    },
                    Name = "Name",
                },
                ReserveDate = DateTime.Now.ToUniversalTime(),
                ReservedFor = 1,
                Rooms = new List<Room>()
                    {
                        room
                    },
                StartDate = DateTime.Now.ToUniversalTime()
            };

            room.Reservations.Add(reservation);

            _hotelContext.Hotels.Add(hotel);
            _hotelContext.Rooms.Add(room);
            _hotelContext.SaveChanges();
        }
    }
}
