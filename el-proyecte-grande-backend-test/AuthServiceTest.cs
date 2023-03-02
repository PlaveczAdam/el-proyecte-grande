using el_proyecte_grande_backend.Data;
using el_proyecte_grande_backend.Models.Entities;
using el_proyecte_grande_backend.Services.AuthServices;
using el_proyecte_grande_backend.Services.GuestServices;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using System.Security.Claims;

namespace el_proyecte_grande_backend_test
{
    internal class AuthServiceTest
    {
        private DbContextOptions<GrandeHotelContext> dbContextOptions;
        private AuthService _authService;
        private GrandeHotelContext _hotelContext;

        [SetUp]
        public void Setup()
        {
            dbContextOptions = new DbContextOptionsBuilder<GrandeHotelContext>()
            .UseInMemoryDatabase(Guid.NewGuid().ToString())
            .Options;

            _hotelContext = new GrandeHotelContext(dbContextOptions);
            Seed();
            _authService = new AuthService(_hotelContext);
        }


        [TearDown]
        public void TearDown()
        {
            _hotelContext.ChangeTracker.Clear();
            _hotelContext.Database.EnsureDeleted();
            _hotelContext.Dispose();
        }

        [Test]
        public async Task LoginAttemptAsyncReturnsAValidClaimsIdentityWhenGetsProperUsernameAndPassword()
        {
            string username = "TestUser";
            string password = "1234";

            ClaimsIdentity? actual = await _authService.LoginAttemptAsync(username, password);

            Assert.True(ClaimsIdentityIsValid(actual));
        }
        
        [Test]
        public async Task LoginAttemptAsyncReturnsNullWhenGetsEmptyUsernameAndPassword()
        {
            string username = "";
            string password = "";

            ClaimsIdentity? actual = await _authService.LoginAttemptAsync(username, password);

            Assert.False(ClaimsIdentityIsValid(actual));
        }
        
        [Test]
        public async Task LoginAttemptAsyncReturnsNullWhenGetsIncorrectUsername()
        {
            string username = "TestUser1";
            string password = "1234";

            ClaimsIdentity? actual = await _authService.LoginAttemptAsync(username, password);

            Assert.False(ClaimsIdentityIsValid(actual));
        }
        
        [Test]
        public async Task LoginAttemptAsyncReturnsNullWhenGetsIncorrectPassword()
        {
            string username = "TestUser";
            string password = "12345";

            ClaimsIdentity? actual = await _authService.LoginAttemptAsync(username, password);

            Assert.False(ClaimsIdentityIsValid(actual));
        }
        
        [Test]
        public async Task LoginAttemptAsyncReturnsNullWhenGetsCredentialsForInactiveUser()
        {
            string username = "InactiveUser";
            string password = "1234";

            ClaimsIdentity? actual = await _authService.LoginAttemptAsync(username, password);

            Assert.False(ClaimsIdentityIsValid(actual));
        }

        private bool ClaimsIdentityIsValid(ClaimsIdentity? actual)
        {
            if (actual == null
                || actual.Claims.First(c => c.Type == ClaimTypes.Name).Value != "TestUser"
                || actual.Claims.First(c => c.Type == ClaimTypes.Email).Value != "test@mail.com"
                || actual.Claims.First(c => c.Type == ClaimTypes.Role).Value != "Test"
                ) return false;
            return true;
        }

        private void Seed()
        {
            Role role = new Role()
            {
                Id = 1,
                Name = "Test",
                Users = new List<User>()
            };

            User user = new User()
            {
                Id = 1,
                Name = "TestUser",
                Email = "test@mail.com",
                IsActive = true,
                Roles = new List<Role>()
            };
            
            User inactiveUser = new User()
            {
                Id = 2,
                Name = "InactiveUser",
                Email = "test@mail.com",
                IsActive = false,
                Roles = new List<Role>()
            };

            PasswordHasher<User> passwordHasher = new PasswordHasher<User>();
            user.Password = passwordHasher.HashPassword(user, "1234");
            inactiveUser.Password = passwordHasher.HashPassword(inactiveUser, "1234");
            user.Roles.Add(role);
            inactiveUser.Roles.Add(role);

            _hotelContext.Add(user);
            _hotelContext.Add(inactiveUser);
            _hotelContext.SaveChanges();
        }
    }
}
