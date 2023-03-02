using el_proyecte_grande_backend.Data;
using el_proyecte_grande_backend.Models.Entities;
using el_proyecte_grande_backend.Services.UserServices;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using static el_proyecte_grande_backend_test.TestDataCreator;

namespace el_proyecte_grande_backend_test
{
    internal class UserServiceTest
    {
        private DbContextOptions<GrandeHotelContext> dbContextOptions;
        private UserService _userService;
        private GrandeHotelContext _hotelContext;
        private PasswordHasher<User> _passwordHasher;

        [SetUp]
        public void Setup()
        {
            dbContextOptions = new DbContextOptionsBuilder<GrandeHotelContext>()
            .UseInMemoryDatabase(Guid.NewGuid().ToString())
            .Options;

            _hotelContext = new GrandeHotelContext(dbContextOptions);
            _passwordHasher = new PasswordHasher<User>();
            _userService = new UserService(_hotelContext, _passwordHasher);
        }

        [TearDown]
        public void TearDown()
        {
            _hotelContext.ChangeTracker.Clear();
            _hotelContext.Database.EnsureDeleted();
            _hotelContext.Dispose();
        }

        [Test]
        public async Task CreateUser_UserWasSuccessfullyCreated()
        {
            var user = CreateTestUser(1);

            await _userService.CreateUser(user);

            Assert.That(_hotelContext.Users.Find(1L)?.Name, Is.EqualTo(user.Name));
        }

        [Test]
        public void CreateUser_UserFailedToCreateBecauseItExists()
        {
            var userOne = CreateTestUser(1);
            _hotelContext.Add(userOne);
            _hotelContext.SaveChanges();

            var userTwo = CreateTestUser(1);

            var x = Assert.ThrowsAsync<Exception>(() => _userService.CreateUser(userTwo));
            Assert.That(x.Message, Is.EqualTo("User already Exists."));
        }

        [Test]
        public async Task GetAllUsers_AllUsersAreReturned()
        {
            var userOne = CreateTestUser(1);
            var userTwo = CreateTestUser(2);
            _hotelContext.Add(userOne);
            _hotelContext.Add(userTwo);
            _hotelContext.SaveChanges();

            var users = await _userService.GetAllUsers();
            Assert.That(users, Is.EquivalentTo(new List<User> { userOne, userTwo }));
        }

        [Test]
        public async Task GetUserById_UserWithGivenIdIsReturned()
        {
            var userOne = CreateTestUser(1);
            var userTwo = CreateTestUser(2);
            _hotelContext.Add(userOne);
            _hotelContext.Add(userTwo);
            _hotelContext.SaveChanges();

            var user = await _userService.GetUserById(2);
            Assert.That(user, Is.EqualTo(userTwo));
        }

        [Test]
        public async Task SetUserRole_UpdatesTheUsersRoleToTheGivenRole()
        {
            var role = CreateTestRole(1);
            var userOne = CreateTestUser(1);
            _hotelContext.Users.Add(userOne);
            _hotelContext.Roles.Add(role);
            _hotelContext.SaveChanges();

            var updatedUser = await _userService.SetUserRole(1, new Role { Name = "A" });
            Assert.Multiple(() =>
            {
                Assert.That(updatedUser.Roles.Count, Is.EqualTo(1));
                Assert.That(_hotelContext.Users.Find(1L).Roles.Count, Is.EqualTo(1));
            });
        }

        [Test]
        public void SetUserRole_ThereWasNoUserToUpdate()
        {
            var userOne = CreateTestUser(1);

            var x = Assert.ThrowsAsync<InvalidOperationException>(() => _userService.SetUserRole(1, new Role { Name = "A" }));
            Assert.That(x.Message, Is.EqualTo("Sequence contains no elements"));
        }

        [Test]
        public async Task SetUserRole_UsersRoleHasBeenRemovedIfTheSameRoleWasGivenToThem()
        {
            var role = CreateTestRole(1);
            var userOne = CreateTestUser(1);
            userOne.Roles.Add(role);
            _hotelContext.Users.Add(userOne);
            _hotelContext.Roles.Add(role);
            _hotelContext.SaveChanges();

            var updatedUser = await _userService.SetUserRole(1, new Role { Name = "A" });
            Assert.Multiple(() =>
            {
                Assert.That(updatedUser.Roles.Count, Is.EqualTo(0));
                Assert.That(_hotelContext.Users.Find(1L).Roles.Count, Is.EqualTo(0));
            });
        }

        [Test]
        public async Task UpdateUser_UpdatesUserSuccessfully()
        {
            var userOne = CreateTestUser(1);
            _hotelContext.Users.Add(userOne);
            _hotelContext.SaveChanges();

            var newData = CreateTestUser(1);
            newData.Name = "D";
            var updated = await _userService.UpdateUser(1, newData);
            Assert.Multiple(() =>
            {
                Assert.That(updated.Name, Is.EqualTo("D"));
                Assert.That(_hotelContext.Users.Find(1L).Name, Is.EqualTo("D"));
            });
        }

        [Test]
        public async Task UpdateUserActivity_UsersActivityWasUpdatedSuccessfully()
        {
            var userOne = CreateTestUser(1);
            _hotelContext.Users.Add(userOne);
            _hotelContext.SaveChanges();

            var updated = await _userService.UpdateUserActivity(1, false);
            Assert.Multiple(() =>
            {
                Assert.That(updated.IsActive, Is.False);
                Assert.That(_hotelContext.Users.Find(1L).IsActive, Is.EqualTo(false));
            });
        }
    }
}
