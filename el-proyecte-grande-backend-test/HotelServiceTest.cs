using el_proyecte_grande_backend.Data;
using el_proyecte_grande_backend.Models.Entities;
using el_proyecte_grande_backend.Models.Enums;
using el_proyecte_grande_backend.Services.HotelServices;
using Microsoft.EntityFrameworkCore;
using static el_proyecte_grande_backend_test.TestDataCreator;

namespace el_proyecte_grande_backend_test
{
    public class HotelServiceTest
    {
        private DbContextOptions<GrandeHotelContext> dbContextOptions;
        private HotelService _hotelService;
        private GrandeHotelContext _hotelContext;

        [SetUp]
        public void Setup()
        {
            dbContextOptions = new DbContextOptionsBuilder<GrandeHotelContext>()
            .UseInMemoryDatabase(Guid.NewGuid().ToString())
            .Options;

            _hotelContext = new GrandeHotelContext(dbContextOptions);
            _hotelService = new HotelService(_hotelContext);
        }

        [TearDown]
        public void TearDown()
        {
            _hotelContext.ChangeTracker.Clear();
            _hotelContext.Database.EnsureDeleted();
            _hotelContext.Dispose();
        }

        [Test]
        public async Task NewHotelHasBeenCreatedSuccessfully()
        {
            var newHotel = CreateTestHotel(1);

            await _hotelService.AddHotel(newHotel);

            Assert.That(await _hotelContext.Hotels.CountAsync(), Is.EqualTo(1));
        }

        [Test]
        public async Task GetsAllTheHotels()
        {
            var hotelOne = CreateTestHotel(1);
            var hotelTwo = CreateTestHotel(2);

            _hotelContext.Hotels.Add(hotelOne);
            _hotelContext.Hotels.Add(hotelTwo);
            _hotelContext.SaveChanges();

            var hotels = await _hotelService.GetAllHotels();
            Assert.That(hotels, Is.EquivalentTo(new List<Hotel> { hotelOne, hotelTwo }));
        }

        [Test]
        public async Task GetHotelById()
        {
            var hotelOne = CreateTestHotel(1);
            var hotelTwo = CreateTestHotel(2);

            _hotelContext.Hotels.Add(hotelOne);
            _hotelContext.Hotels.Add(hotelTwo);
            _hotelContext.SaveChanges();

            var hotel = await _hotelService.GetHotel(2);
            Assert.That(hotel, Is.EqualTo(hotelTwo));
        }

        [Test]
        public async Task UpdatesHotelSuccessfully()
        {
            var hotelOne = CreateTestHotel(1);
            _hotelContext.Hotels.Add(hotelOne);
            _hotelContext.SaveChanges();
            var newData = CreateTestHotel(1);
            newData.Name = "Modified";
            var updated = await _hotelService.UpdateHotel(1, newData);
            Assert.Multiple(() =>
            {
                Assert.That(updated.Name, Is.EqualTo("Modified"));
                Assert.That(_hotelContext.Hotels.Find(1L)?.Name, Is.EqualTo("Modified"));
            });
        }

        [Test]
        public async Task UpdatesHotelStatusSuccessfully()
        {
            var hotelOne = CreateTestHotel(1);
            _hotelContext.Hotels.Add(hotelOne);
            _hotelContext.SaveChanges();
            var updated = await _hotelService.SetHotelStatus(1, HotelStatus.RenovationInProgress);
            Assert.Multiple(() =>
            {
                Assert.That(updated.Status, Is.EqualTo(HotelStatus.RenovationInProgress));
                Assert.That(_hotelContext.Hotels.Find(1L)?.Status, Is.EqualTo(HotelStatus.RenovationInProgress));
            });
        }

        [Test]
        public void UpdateHotelStatusThrowsExceptionWhenHotelNotFound()
        {
            var x = Assert.ThrowsAsync<Exception>(() => _hotelService.SetHotelStatus(1, HotelStatus.RenovationInProgress));
            Assert.That(x.Message, Is.EqualTo("There is no hotel."));
        }
    }
}