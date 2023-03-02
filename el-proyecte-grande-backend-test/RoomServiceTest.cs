using el_proyecte_grande_backend.Data;
using el_proyecte_grande_backend.Models.Entities;
using el_proyecte_grande_backend.Models.Enums;
using el_proyecte_grande_backend.Services.RoomServices;
using Microsoft.EntityFrameworkCore;
using static el_proyecte_grande_backend_test.TestDataCreator;

namespace el_proyecte_grande_backend_test
{
    internal class RoomServiceTest
    {
        private DbContextOptions<GrandeHotelContext> dbContextOptions;
        private RoomService _roomService;
        private GrandeHotelContext _hotelContext;

        [SetUp]
        public void Setup()
        {
            dbContextOptions = new DbContextOptionsBuilder<GrandeHotelContext>()
            .UseInMemoryDatabase(Guid.NewGuid().ToString())
            .Options;

            _hotelContext = new GrandeHotelContext(dbContextOptions);
            Seed();
            _roomService = new RoomService(_hotelContext);
        }

        [TearDown]
        public void TearDown()
        {
            _hotelContext.ChangeTracker.Clear();
            _hotelContext.Database.EnsureDeleted();
            _hotelContext.Dispose();
        }

        [Test]
        public async Task GetAllRooms_AllRoomsAreListed()
        {
            var result = await _roomService.GetAllRooms();
            Assert.That(result.Count(), Is.EqualTo(1));
        }

        [Test]
        public async Task GetAllRooms_AllRoomsAreListedWithinAGivenHotel()
        {
            var result = await _roomService.GetAllRooms(1);
            Assert.That(result.Count(), Is.EqualTo(1));
        }

        [Test]
        public async Task GetFilteredRooms_ReturnsRoomsWithoutFiltering()
        {
            var result = await _roomService.GetFilteredRooms(null, null, null, null, null, null);
            Assert.That(result!.Count(), Is.EqualTo(1));
        }

        [Test]
        public async Task GetFilteredRooms_ReturnsRoomsWithAllFiltersOn()
        {
            var result = await _roomService.GetFilteredRooms("1", "1", "1", "6000", "1677755934000", "true");
            Assert.That(result!.Count(), Is.EqualTo(1));
        }

        [Test]
        public async Task GetRoomById_RoomWithGivenIdIsReturned()
        {
            var result = await _roomService.GetRoomById(1);
            Assert.That(result!.Id, Is.EqualTo(_hotelContext.Rooms.Find(1L)!.Id));
        }

        [Test]
        public async Task AddRoom_SucessfullyStoresNewRoom()
        {
            var roomOne = CreateTestNewRoom(2);
            var result = await _roomService.AddRoom(roomOne);
            Assert.That(result!.Id, Is.EqualTo(_hotelContext.Rooms.Find(2L)!.Id));
        }

        [Test]
        public async Task UpdateRoom_RoomWithNewValuesAreReturned()
        {
            var room = CreateTestNewRoom(1);
            room.Accessible = true;
            var result = await _roomService.UpdateRoom(1, room);
            Assert.That(result!.Id, Is.EqualTo(_hotelContext.Rooms.Find(1L)!.Id));
        }

        [Test]
        public async Task UpdateRoom_CannotUpdateRoom()
        {
            var room = CreateTestNewRoom(1);
            room.Accessible = true;
            var result = await _roomService.UpdateRoom(10, room);
            Assert.That(result, Is.Null);
        }

        [Test]
        public async Task SetRoomStatus_RoomStatusIsUpdated()
        {
            var result = await _roomService.SetRoomStatus(1, 0);
            Assert.That(result!.Status, Is.EqualTo(RoomStatus.OutOfService));
        }

        [Test]
        public async Task SetRoomStatus_RoomSatusCannotBeUpdated()
        {
            var result = await _roomService.SetRoomStatus(2, 0);
            Assert.That(result, Is.Null);
        }

        [Test]
        public async Task GetAllRoomTypes_ReturnsAllTheRoomTypes()
        {
            var result = await _roomService.GetAllRoomTypes();
            Assert.That(result.Count(), Is.EqualTo(1));
        }

        [Test]
        public async Task GetRoomTypeById_ReturnsTheRoomTypesWithIdGiven()
        {
            var result = await _roomService.GetRoomTypeById(1);
            Assert.That(result!.Id, Is.EqualTo(1));
        }

        [Test]
        public void AddRoomType_AddsRoomTypeSuccessfully()
        {
            var roomTypeOne = CreateTestNewRoomType(2);
            var result = _roomService.AddRoomType(roomTypeOne);

            Assert.That(_hotelContext.RoomTypes.Count, Is.EqualTo(2));
        }

        [Test]
        public async Task UpdateRoomType_UpdatesRoomTypeSuccessfully()
        {
            var roomType = CreateTestNewRoomType(1);
            roomType.Name = "B";
            var result = await _roomService.UpdateRoomType(1, roomType);
            Assert.That(result!.Name, Is.EqualTo("B"));
        }

        [Test]
        public async Task UpdateRoomType_ThereIsNoRoomTypeToUpdate()
        {
            var roomType = CreateTestNewRoomType(1);
            roomType.Name = "B";
            var result = await _roomService.UpdateRoomType(10, roomType);
            Assert.That(result, Is.Null);
        }

        [Test]
        public async Task GetAllAccessories_GetsAllAccessoryTypes()
        {
            var result = await _roomService.GetAllAccessories();
            Assert.That(result.Count(), Is.EqualTo(1));
        }

        [Test]
        public async Task GetAccessoryById_ReturnsAcessoryWithGivenId()
        {
            var result = await _roomService.GetAccessoryById(1);
            Assert.That(result!.Id, Is.EqualTo(_hotelContext.Accessories.Find(1L)!.Id));
        }

        [Test]
        public void AddAccessory_AddsAccessorySuccessfully()
        {
            var accessoryOne = CreateTestNewAccessory(1);
            var result = _roomService.AddAccessory(accessoryOne);

            Assert.That(_hotelContext.RoomTypes.Count, Is.EqualTo(1));
        }

        [Test]
        public async Task UpdateAccessory_UpdatesAccessory()
        {
            var accessoryOne = CreateTestNewAccessory(1);
            accessoryOne.Name = "B";
            var result = await _roomService.UpdateAccessory(1, accessoryOne);
            Assert.That(result!.Name, Is.EqualTo("B"));
        }

        [Test]
        public async Task UpdateAccessory_CouldNotUpdateAccessory()
        {
            var accessoryOne = CreateTestNewAccessory(1);
            accessoryOne.Name = "B";
            var result = await _roomService.UpdateAccessory(10, accessoryOne);
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
                EndDate = new DateTime(2023, 03, 08),
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
                ReserveDate = new DateTime(2023, 03, 03),
                ReservedFor = 1,
                Rooms = new List<Room>()
                    {
                        room
                    },
                StartDate = new DateTime(2023, 03, 02)
            };

            room.Reservations.Add(reservation);

            _hotelContext.Hotels.Add(hotel);
            _hotelContext.Rooms.Add(room);
            _hotelContext.SaveChanges();
        }
    }
}
