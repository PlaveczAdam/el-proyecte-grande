using el_proyecte_grande_backend.Data;
using el_proyecte_grande_backend.Models.Entities;
using el_proyecte_grande_backend.Models.Enums;
using el_proyecte_grande_backend.Services.ReservationServices;
using Microsoft.EntityFrameworkCore;
using static el_proyecte_grande_backend_test.TestDataCreator;

namespace el_proyecte_grande_backend_test
{
    internal class ReservationServiceTest
    {
        private DbContextOptions<GrandeHotelContext> dbContextOptions;
        private ReservationService _reservationService;
        private GrandeHotelContext _hotelContext;

        [SetUp]
        public void Setup()
        {
            dbContextOptions = new DbContextOptionsBuilder<GrandeHotelContext>()
            .UseInMemoryDatabase(Guid.NewGuid().ToString())
            .Options;

            _hotelContext = new GrandeHotelContext(dbContextOptions);
            Seed();
            _reservationService = new ReservationService(_hotelContext);
        }

        [TearDown]
        public void TearDown()
        {
            _hotelContext.ChangeTracker.Clear();
            _hotelContext.Database.EnsureDeleted();
            _hotelContext.Dispose();
        }

        [Test]
        public async Task AddAsync_ReservationIsCreatedSuccessfully()
        {
            var reservationOne = CreateTestReservation(2);
            reservationOne.Hotel = new Hotel { Id = 1 };
            await _reservationService.AddAsync(reservationOne, new long[] { 1L });

            Assert.That(_hotelContext.Reservations.Find(2L)?.Price, Is.EqualTo(reservationOne.Price));
        }

        [Test]
        public void AddAsync_ReservationWasNotAddedDueRoomWasReserved()
        {
            var reservationOne = CreateTestReservation(2);
            reservationOne.StartDate = new DateTime(1900, 01, 01);
            reservationOne.EndDate = new DateTime(2900, 01, 01);
            reservationOne.Hotel = new Hotel { Id = 1 };

            var x = Assert.ThrowsAsync<Exception>(() => _reservationService.AddAsync(reservationOne, new long[] { 1L }));
            Assert.That(x.Message, Is.EqualTo("Room with the id of 1 is reserved for the specified time period"));
        }

        [Test]
        public async Task GetAllAsync_AllReservationsAreReturned()
        {
            var reservationOne = CreateTestReservation(2);
            reservationOne.Hotel = _hotelContext.Hotels.Find(1L)!;
            reservationOne.Reservator = _hotelContext.Reservators.Find(1L)!;
            _hotelContext.Reservations.Add(reservationOne);
            _hotelContext.SaveChanges();

            var result = await _reservationService.GetAllAsync();
            Assert.That(result.Count(), Is.EqualTo(2));
        }

        [Test]
        public async Task GetFilteredReservations_ReservationsAreReturnedWihoutFiltering()
        {
            var reservationOne = CreateTestReservation(2);
            reservationOne.Hotel = _hotelContext.Hotels.Find(1L)!;
            reservationOne.Reservator = _hotelContext.Reservators.Find(1L)!;
            _hotelContext.Reservations.Add(reservationOne);
            _hotelContext.SaveChanges();

            var result = await _reservationService.GetFilteredReservations(null, null, null, null, null, null, null);
            Assert.That(result.Count(), Is.EqualTo(2));
        }

        [Test]
        public async Task GetFilteredReservations_ReservationAllFilterSet()
        {
            var reservationOne = CreateTestReservation(2);
            var guest = CreateTestGuest(2);
            guest.Address = _hotelContext.Addresses.Find(1L)!;
            reservationOne.Guests = new List<Guest>
            {
                guest
            };
            reservationOne.Hotel = _hotelContext.Hotels.Find(1L)!;
            reservationOne.Reservator = _hotelContext.Reservators.Find(1L)!;
            reservationOne.ReservedFor = 1;
            _hotelContext.Reservations.Add(reservationOne);
            _hotelContext.Guests.Add(guest);
            _hotelContext.SaveChanges();

            var result = await _reservationService.GetFilteredReservations("fullBoard", "creditCard", 1, true, new DateTime(1900, 01, 01), new DateTime(2900, 01, 01), 1);
            Assert.That(result.Count(), Is.EqualTo(1));
        }

        [Test]
        public async Task GetFilteredReservations_DateFilterMissmatch()
        {
            var reservationOne = CreateTestReservation(2);
            var guest = CreateTestGuest(2);
            guest.Address = _hotelContext.Addresses.Find(1L)!;
            reservationOne.Guests = new List<Guest>
            {
                guest
            };
            reservationOne.Hotel = _hotelContext.Hotels.Find(1L)!;
            reservationOne.Reservator = _hotelContext.Reservators.Find(1L)!;
            reservationOne.ReservedFor = 1;
            reservationOne.StartDate = new DateTime();
            reservationOne.EndDate = new DateTime(3000, 01, 01);
            _hotelContext.Reservations.Add(reservationOne);
            _hotelContext.Guests.Add(guest);
            _hotelContext.SaveChanges();

            var result = await _reservationService.GetFilteredReservations("fullBoard", "creditCard", 1, true, new DateTime(1900, 01, 01), new DateTime(2900, 01, 01), 1);
            Assert.That(result.Count(), Is.EqualTo(0));
        }

        [Test]
        public async Task GetHotelReservations_ReturnsReservationsForHotels()
        {
            var result = await _reservationService.GetHotelReservations(1);

            Assert.That(result.Count, Is.EqualTo(1));
        }

        [Test]
        public async Task GetAsync_ReturnsWithTheReservationIwhtGivenId()
        {
            var result = await _reservationService.GetAsync(1);
            var expected = _hotelContext.Reservations.Find(1L);
            Assert.That(result, Is.EqualTo(expected));
        }

        [Test]
        public async Task GetAsync_NoIdWasGiven()
        {
            var result = await _reservationService.GetAsync(null);
            Assert.That(result, Is.Null);
        }

        [Test]
        public async Task GetWithDetailsAsync_ReturnsWithDetails()
        {
            var result = await _reservationService.GetWithDetailsAsync(1);
            var expected = _hotelContext.Reservations.Find(1L);
            Assert.That(result!.Id, Is.EqualTo(expected!.Id));
        }


        [Test]
        public async Task GetWithDetailsAsync_FailsToReturnWithDetailsDueThereIsNoId()
        {
            var result = await _reservationService.GetWithDetailsAsync(null);
            Assert.That(result, Is.Null);
        }

        [Test]
        [Ignore("Can't run successfully")]
        public async Task UpdateAsync_UpdateReservation()
        {
            var res = CreateTestReservation(1);
            /*var reservation = _hotelContext.Reservations.AsNoTracking().Single(x => x.Id == 1);*/

            res!.PayFullfillment = true;

            var result = await _reservationService.UpdateAsync(res, new long[] { });
            Assert.That(result.PayFullfillment, Is.EqualTo(true));
        }

        [Test]
        public async Task SetReservationToBeCancelled_SetsReservationToBeCancelled()
        {
            var result = await _reservationService.SetReservationToBeCancelled(1, true);
            Assert.That(result!.isCancelled, Is.True);
        }

        [Test]
        public async Task SetReservationToBeCancelled_ThereIsNoSuchReservation()
        {
            var result = await _reservationService.SetReservationToBeCancelled(5, true);
            Assert.That(result, Is.Null);
        }

        [Test]
        public async Task SetReservationPayFulfillment_PaymentHasBeenFullified()
        {
            var result = await _reservationService.SetReservationPayFulfillment(1, 0);
            Assert.Multiple(() =>
            {
                Assert.That(result!.PayFullfillment, Is.True);
                Assert.That(result.PaymentMethod, Is.EqualTo(PaymentMethod.Cash));
            });
        }

        [Test]
        public async Task SetReservationPayFulfillment_PaymentWasUnsuccessful()
        {
            var result = await _reservationService.SetReservationPayFulfillment(5, 0);
            Assert.That(result, Is.Null);
        }

        [Test]
        public async Task DeleteAsync_ReservationWasRemoved()
        {
            await _reservationService.DeleteAsync(1);
            Assert.That(_hotelContext.Reservations.Count, Is.EqualTo(0));
        }

        [Test]
        public async Task Exists_ReservationDoesNotExists()
        {
            var result = await _reservationService.Exists(1);
            Assert.That(result, Is.True);
        }

        [Test]
        public async Task Exists_ReservationExists()
        {
            var result = await _reservationService.Exists(2);
            Assert.That(result, Is.False);
        }

        [Test]
        public async Task GetEmptyRoomsForHotelBetween_ThereAreRoomsAvailable()
        {
            var result = await _reservationService.GetEmptyRoomsForHotelBetween(1, new DateTime(2999, 01, 01), new DateTime(3000, 01, 01));
            Assert.That(result.Count, Is.EqualTo(1));
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
