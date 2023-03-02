using el_proyecte_grande_backend.Data;
using el_proyecte_grande_backend.Models.Entities;
using el_proyecte_grande_backend.Models.Enums;
using el_proyecte_grande_backend.Services.InventoryServices;
using Microsoft.EntityFrameworkCore;
using static el_proyecte_grande_backend_test.TestDataCreator;

namespace el_proyecte_grande_backend_test
{
    internal class InventoryServiceTest
    {
        private DbContextOptions<GrandeHotelContext> dbContextOptions;
        private InventoryService _inventoryService;
        private GrandeHotelContext _hotelContext;

        [SetUp]
        public void Setup()
        {
            dbContextOptions = new DbContextOptionsBuilder<GrandeHotelContext>()
            .UseInMemoryDatabase(Guid.NewGuid().ToString())
            .Options;

            _hotelContext = new GrandeHotelContext(dbContextOptions);
            Seed();
            _inventoryService = new InventoryService(_hotelContext);
        }

        [TearDown]
        public void TearDown()
        {
            _hotelContext.ChangeTracker.Clear();
            _hotelContext.Database.EnsureDeleted();
            _hotelContext.Dispose();
        }
        [Test]
        public async Task GetAllInventoriesAsync_CreatesAnInventorySuccessfully()
        {
            var inventoryOne = CreateTestInventory(1);
            _hotelContext.Inventories.Add(inventoryOne);
            _hotelContext.SaveChanges();

            var result = await _inventoryService.GetAllInventoriesAsync();
            Assert.That(result!.Count, Is.EqualTo(1));
        }

        [Test]
        public async Task GetInventoryByIdAsync_ReturnsTheInventoryWithGivenId()
        {
            var inventoryOne = CreateTestInventory(1);
            _hotelContext.Inventories.Add(inventoryOne);
            _hotelContext.SaveChanges();

            var result = await _inventoryService.GetInventoryByIdAsync(1);
            Assert.That(result.Id, Is.EqualTo(_hotelContext.Inventories.Find(1L)!.Id));
        }

        [Test]
        public async Task GetInventoryByHotelIdAsync_ReturnsAGivenHotelsINventory()
        {
            var inventoryOne = CreateTestInventory(1);
            _hotelContext.Inventories.Add(inventoryOne);
            inventoryOne.Hotel = _hotelContext.Hotels.Find(1L)!;
            _hotelContext.SaveChanges();

            var result = await _inventoryService.GetInventoryByHotelIdAsync(1);
            Assert.That(result.Id, Is.EqualTo(_hotelContext.Inventories.Find(1L)!.Id));
        }

        [Test]
        public async Task GetItemsByInventoryIdAsync_ReturnsAGivenHotelsINventory()
        {
            var inventoryOne = CreateTestInventory(1);
            _hotelContext.Inventories.Add(inventoryOne);
            inventoryOne.Hotel = _hotelContext.Hotels.Find(1L)!;
            inventoryOne.Items = new List<Item> { CreateTestItem(1) };
            _hotelContext.SaveChanges();

            var result = await _inventoryService.GetItemsByInventoryIdAsync(1);
            Assert.That(result.Count, Is.EqualTo(1));
        }

        [Test]
        public async Task GetAllItemsAsync_ReturnsAllTheItems()
        {
            var itemOne = CreateTestItem(1);
            var itemTwo = CreateTestItem(2);
            _hotelContext.Items.Add(itemOne);
            _hotelContext.Items.Add(itemTwo);
            _hotelContext.SaveChanges();

            var result = await _inventoryService.GetAllItemsAsync();
            Assert.That(result!.Count, Is.EqualTo(2));
        }

        [Test]
        public async Task GetItemByIdAsync_asd()
        {
            var itemOne = CreateTestItem(1);
            _hotelContext.Items.Add(itemOne);
            _hotelContext.SaveChanges();

            var result = await _inventoryService.GetItemByIdAsync(1);
            Assert.That(result!.Id, Is.EqualTo(_hotelContext.Items.Find(1L)!.Id));
        }

        [Test]
        public async Task InventoryExistsAsync_InventoryExists()
        {
            var inventoryOne = CreateTestInventory(1);
            _hotelContext.Inventories.Add(inventoryOne);
            _hotelContext.SaveChanges();

            var result = await _inventoryService.InventoryExistsAsync(1);
            Assert.That(result, Is.True);
        }

        [Test]
        public async Task InventoryExistsAsync_InventoryDoesNotExists()
        {
            var inventoryOne = CreateTestInventory(1);
            _hotelContext.Inventories.Add(inventoryOne);
            _hotelContext.SaveChanges();

            var result = await _inventoryService.InventoryExistsAsync(3);
            Assert.That(result, Is.False);
        }

        [Test]
        public async Task CreateInventoryAsync_InventoryWasCreatedSuccessfully()
        {
            var inventory = CreateTestInventory(1);
            var result = await _inventoryService.CreateInventoryAsync(inventory);
            Assert.That(result, Is.True);
        }

        [Test]
        [Ignore("Needs to be decided if it stays in")]
        public async Task UpdateInventoryAsync_InventoryWasUpdatedSuccessfully()
        {
            var inventory = CreateTestInventory(1);
            _hotelContext.Inventories.Add(inventory);
            _hotelContext.SaveChanges();

            var updateData = CreateTestInventory(1);
            updateData.Items.Add(CreateTestItem(5));
            var result = await _inventoryService.UpdateInventoryAsync(/*1,*/ updateData);
            Assert.That(result, Is.True);
        }

        [Test]
        public async Task DeleteInventoryAsync_InvetoryWasSuccessfullyRemoved()
        {
            var inventory = CreateTestInventory(1);
            _hotelContext.Inventories.Add(inventory);
            _hotelContext.SaveChanges();

            var result = await _inventoryService.DeleteInventoryAsync(1);
            Assert.Multiple(() =>
            {
                Assert.That(result, Is.True);
                Assert.That(_hotelContext.Inventories.Count, Is.EqualTo(0));
            });
        }

        [Test]
        public async Task DeleteInventoryAsync_InvetoryWasNotRemovedDueThereWereNoInveotry()
        {
            var result = await _inventoryService.DeleteInventoryAsync(1);
            Assert.That(result, Is.False);
        }

        [Test]
        public void CreateItemAsync_ItemWasCreatedSuccessfully()
        {
            var item = CreateTestItem(1);

            var result = _inventoryService.CreateItemAsync(item);
            Assert.That(result.Id, Is.EqualTo(_hotelContext.Items.Find(1L)!.Id));
        }

        [Test]
        [Ignore("Needs to be decided if it stays in")]
        public async Task UpdateItemAsync_ItemWasUpdatedSuccessfully()
        {
            var item = CreateTestItem(1);
            _hotelContext.Items.Add(item);
            _hotelContext.SaveChanges();

            var updateData = CreateTestItem(1);
            updateData.Name = "X";
            var result = await _inventoryService.UpdateItemAsync(/*1,*/ updateData);
            Assert.That(result, Is.True);
        }

        [Test]
        public async Task DeleteItemAsync_ItemWasSuccessfullyRemoved()
        {
            var item = CreateTestItem(1);
            _hotelContext.Items.Add(item);
            _hotelContext.SaveChanges();

            var result = await _inventoryService.DeleteItemAsync(1);
            Assert.Multiple(() =>
            {
                Assert.That(result, Is.True);
                Assert.That(_hotelContext.Items.Count, Is.EqualTo(0));
            });
        }

        [Test]
        public async Task DeleteItemAsync_ItemWasNotRemoved()
        {
            var item = CreateTestItem(1);
            _hotelContext.Items.Add(item);
            _hotelContext.SaveChanges();

            var result = await _inventoryService.DeleteItemAsync(3);
            Assert.Multiple(() =>
            {
                Assert.That(result, Is.False);
                Assert.That(_hotelContext.Items.Count, Is.EqualTo(1));
            });
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
